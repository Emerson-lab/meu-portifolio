import { WorkExperienceProps } from "./types"
import { ExperienceItem } from "./experience-item"
import { SectionTitle } from "@/app/components/section-title"

export const WorkExperience = ({ expirencies }: WorkExperienceProps) => {
  return (
    <section className="container py-16 flex gap-10 mb:gap-4 lg:gap-16 flex-col md:flex-row">
      <div className="max-w-[420px]">
        <SectionTitle subtitle="experiências" title="Experiência Profissional" />
        <p className="text-gray-400 mt-6">
          Estou sempre aberto a novos desafios e projetos emocionantes.
          Vamos trabalhar juntos para criar soluções incríveis para sua empresa!
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {expirencies?.map(expirencie => (
          <ExperienceItem
            key={expirencie.companyName}
            expirencie={expirencie}
          />
        ))}
      </div>
    </section>
  )
}