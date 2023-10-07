'use client'
import Image from "next/image"
import { motion } from 'framer-motion';
import { ProjectCardType } from "./types"
import { Link } from "@/app/components/link"
import { HiArrowNarrowRight } from "react-icons/hi"
import { TechBadge } from "@/app/components/tech-badge"
import { fadeUpAnimation, techBadgeAnimation } from "@/app/lib/animations";

export const ProjectCard = ({ project }: ProjectCardType) => {

  return (
    <motion.div
      className="flex gap-6 lg:gap-12 flex-col lg:flex-row"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: .5 }}
    >
      <motion.div
        className="w-full h-[200px] sm:h-[300px] lg:w-[420px] lg:min-h-full"
        initial={{ opacity: 0, y: 100, scale: .5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: .5 }}
        transition={{ duration: .3, delay: .3 }}
      >
        <Image
          width={420}
          height={304}
          src={project.thumbnail.url}
          alt={`Thumbnail do Site Portas Abertas ${project.title}`}
          className="w-full h-full object-cover rounded-lg"
        />
      </motion.div>

      <div className="flex-1 lg:py-[18px]">
        <motion.h3
          className="flex items-center gap-3 font-medium text-lg text-gray-50"
          {...fadeUpAnimation}
          transition={{ duration: .7 }}
        >
          <Image
            width={20}
            height={20}
            src="/images/icons/project-title-icon.svg"
            alt=""
          />
          {project.title}
        </motion.h3>

        <motion.p className="text-gray-400 my-6"
          {...fadeUpAnimation}
          transition={{ duration: .2, delay: .3 }}
        >
          {project.shortDescription}
        </motion.p>

        <div className="flex gap-x-2 gap-y-3 flex-wrap mb-8 lg:max-w-[350px]">
          {project.technologies.map((tech, index) => (
            <TechBadge
              key={`${project.title}-tech-${tech.name}`}
              name={tech.name}
              {...techBadgeAnimation}
              transition={{ duration: .2, delay: .5 + index * .1 }}
            />
          ))}
        </div>

        <Link href={`projects/${project.slug}`}>
          Ver projeto
          <HiArrowNarrowRight />
        </Link>
      </div>
    </motion.div>
  )
}