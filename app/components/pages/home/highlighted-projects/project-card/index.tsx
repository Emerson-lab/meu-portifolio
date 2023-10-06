import Image from "next/image"
import { ProjectCardType } from "./types"
import { Link } from "@/app/components/link"
import { HiArrowNarrowRight } from "react-icons/hi"
import { TtechBadge } from "@/app/components/tech-badge"

export const ProjectCard = ({ project }: ProjectCardType) => {
  return (
    <div className="flex gap-6 lg:gap-12 flex-col lg:flex-row">
      <div className="w-full h-full">
        <Image
          width={420}
          height={304}
          src={project.thumbnail.url}
          alt={`Thumbnail do Site Portas Abertas ${project.title}`}
          className="w-full h-[200px] sm:h-[300px] lg:w-[420px] lg:min-h-full object-cover rounded-lg"
        />
      </div>

      <div>
        <h3 className="flex items-center gap-3 font-medium text-lg text-gray-50">
          <Image
            width={20}
            height={20}
            src="/images/icons/project-title-icon.svg"
            alt=""
          />
          {project.title}
        </h3>

        <p className="text-gray-400 my-6">
          {project.shortDescription}
        </p>

        <div className="flex gap-x-2 gap-y-3 flex-wrap mb-8 lg:max-w-[350px]">
          {project.technologies.map(tech => (
            <TtechBadge key={`${project.title}-tech-${tech.name}`} name={tech.name} />
          ))}
        </div>

        <Link href={`projects/${project.slug}`}>
          Ver projeto
          <HiArrowNarrowRight />
        </Link>
      </div>
    </div>
  )
}