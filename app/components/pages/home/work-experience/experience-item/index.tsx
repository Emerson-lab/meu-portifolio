'use client'
import Image from "next/image"
import { motion } from 'framer-motion'
import ptBR from "date-fns/locale/pt-BR"
import { ExperienceItemProps } from "./types"
import { RichText } from "@/app/components/rich-text"
import { TechBadge } from "@/app/components/tech-badge"
import { differenceInMonths, differenceInYears, format } from "date-fns"
import { techBadgeAnimation } from "@/app/lib/animations"

export const ExperienceItem = ({ expirencie }: ExperienceItemProps) => {

  const startDate = new Date(expirencie.startDate);

  const formattedStartDate = format(startDate, 'MMM yyyy', { locale: ptBR });
  const formattedEndDate = expirencie.endDate ?
    format(new Date(expirencie.endDate), 'MMM yyyy', { locale: ptBR }) :
    'o momento'

  const end = expirencie.endDate ?
    new Date(expirencie.endDate) :
    new Date(expirencie.endDate);

  const months = differenceInMonths(end, startDate);
  const years = differenceInYears(end, startDate);
  const monthsRemaining = months % 12

  const formattedDuration =
    years > 0
      ? `${years} ano${years > 1 ? 's' : ''}${monthsRemaining > 0
        ? ` e ${monthsRemaining} mes${monthsRemaining > 1 ? 'es' : ''}`
        : ''
      }`
      : `${months} mes${months > 1 ? 'es' : ''}`

  return (
    <motion.div
      className="grid grid-cols-[40px,1fr] gap-4 md:gap-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full border border-gray-500 p-0.5">
          <Image
            src={expirencie.companyLogo.url}
            alt={`Logo da empressa ${expirencie.companyName}`}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>

        <div className="h-full w-[1px] bg-gray-800"></div>
      </div>

      <div>
        <div className="flex flex-col gap-2 text-sm sm:text-base">
          <a
            href={expirencie.companyUrl}
            target="_blank"
            className="text-gray-500 hover:text-emerald-500 transition-colors"
          >
            @ {expirencie.companyName}
          </a>
          <h4 className="text-gray-300">{expirencie.role}</h4>
          <span className="text-gray-500">
            {formattedStartDate} • {formattedEndDate}
          </span>
          <div className="text-gray-400">
            <RichText content={expirencie.description.raw} />
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-3 mt-6 font-semibold">Competências</p>
        <div className="flex gap-x-2 gap-y-3 flex-wrap lg:max-w-[350px] mb-8">
          {expirencie.technologies.map((tech, index) => (
            <TechBadge
              key={`experience-${expirencie.companyName}-tech-${tech.name}`}
              name={tech.name}
              {...techBadgeAnimation}
              transition={{ duration: .2, delay: index * .1 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}