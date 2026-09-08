import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string().trim().min(3).max(50),
  email: z.string().email(),
  message: z.string().trim().min(1).max(500),
  captchaToken: z.string().min(1).max(2048),
})

const RATE_LIMIT_MAX_REQUESTS = 5
const RATE_LIMIT_WINDOW_SECONDS = 10 * 60

type TurnstileResponse = {
  success: boolean
}

type RedisResponse = {
  result?: number
  error?: string
}

function getClientIp(request: Request) {
  return (
    request.headers.get('x-vercel-forwarded-for') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'
  )
}

async function hashIp(ip: string) {
  const bytes = new TextEncoder().encode(ip)
  const digest = await crypto.subtle.digest('SHA-256', bytes)

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

async function consumeRateLimit(ip: string) {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!redisUrl || !redisToken) {
    throw new Error('Rate limiting is not configured')
  }

  const key = `contact-rate-limit:${await hashIp(ip)}`
  const script = [
    "local current = redis.call('INCR', KEYS[1])",
    "if current == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end",
    'return current',
  ].join('; ')

  const response = await fetch(redisUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${redisToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      command: ['EVAL', script, '1', key, RATE_LIMIT_WINDOW_SECONDS],
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Rate limiting failed with status ${response.status}`)
  }

  const data = await response.json() as RedisResponse

  if (data.error || typeof data.result !== 'number') {
    throw new Error('Rate limiting returned an invalid response')
  }

  return data.result <= RATE_LIMIT_MAX_REQUESTS
}

async function verifyCaptcha(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    throw new Error('Turnstile is not configured')
  }

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: ip,
  })

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body,
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    throw new Error(`Turnstile failed with status ${response.status}`)
  }

  const data = await response.json() as TurnstileResponse
  return data.success
}

export async function POST(request: Request) {
  try {
    const webhookUrl = process.env.WEBHOOK_URL

    if (!webhookUrl) {
      console.error('Contact form is missing WEBHOOK_URL')
      return NextResponse.json(
        { message: 'Formulário temporariamente indisponível.' },
        { status: 503 }
      )
    }

    const body = await request.json();
    const parsedBody = bodySchema.safeParse(body)

    if (!parsedBody.success) {
      return NextResponse.json(
        { message: 'Dados inválidos.' },
        { status: 400 }
      )
    }

    const { name, email, message, captchaToken } = parsedBody.data
    const ip = getClientIp(request)

    if (!await consumeRateLimit(ip)) {
      return NextResponse.json(
        { message: 'Muitas tentativas. Tente novamente mais tarde.' },
        {
          status: 429,
          headers: { 'Retry-After': String(RATE_LIMIT_WINDOW_SECONDS) },
        }
      )
    }

    if (!await verifyCaptcha(captchaToken, ip)) {
      return NextResponse.json(
        { message: 'Verificação anti-bot inválida.' },
        { status: 403 }
      )
    }

    const messageData = {
      allowed_mentions: { parse: [] },
      embeds: [
        {
          title: 'Mensagem de Contato',
          color: 0x4983f5,
          fields: [
            {
              name: 'Nome',
              value: name,
              inline: true,
            },
            {
              name: 'E-mail',
              value: email,
              inline: true,
            },
            {
              name: 'Mensagem',
              value: message,
            },
          ],
        },
      ],
    }

    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageData),
      cache: 'no-store',
    })

    if (!discordResponse.ok) {
      throw new Error(`Discord webhook failed with status ${discordResponse.status}`)
    }

    return NextResponse.json({
      message: 'Mensagem enviada com sucesso!'
    })

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Formulário temporariamente indisponível.' },
      { status: 503 }
    );
  }
}
