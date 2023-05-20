'use client'

import { z } from 'zod'
import { useForm } from "react-hook-form"
import { Button } from "../button"
import { SectionTitle } from "../section-title"
import { zodResolver } from '@hookform/resolvers/zod'
import { HiOutlineArrowNarrowRight } from "react-icons/hi"

const contactformSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  message: z.string().min(1).max(500)
})

type ContactFormData = z.infer<typeof contactformSchema>

export const ContactForm = () => {
  const { handleSubmit, register } = useForm<ContactFormData>({
    resolver: zodResolver(contactformSchema)
  });

  const onSubmit = (data: ContactFormData) => {
    console.log(data)
  }

  return (
    <section className="py-16 px-6 md:py-32 flex items-center justify-center bg-gray-950">
      <div className="2-full max-w-[420px] mx-auto">
        <SectionTitle
          subtitle="contato"
          title="Vamos trabalhar juntos? Entre em contato"
          className="items-center text-center"
        />

        <form
          className="mt-12 w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            placeholder="Nome"
            className="w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-500 p-4 focus:outline-none focus:ring-2 ring-emerald-600"
            {...register('name')}
          />
          <input
            placeholder="Email"
            type="email"
            className="w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-500 p-4 focus:outline-none focus:ring-2 ring-emerald-600"
            {...register('email')}
          />
          <textarea
            placeholder="Mensagem"
            className="resize-none w-full h-[138px] bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-500 p-4 focus:outline-none focus:ring-2 ring-emerald-600"
            maxLength={500}
            {...register('message')}
          />
          <Button className="w-max mx-auto mt-6 shadow-button">
            Enviar mensagem
            <HiOutlineArrowNarrowRight size={18} />
          </Button>
        </form>
      </div>

    </section>
  )
}