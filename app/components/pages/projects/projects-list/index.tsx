'use client'

import Link from "next/link"
import { motion } from 'framer-motion'
import { ProjectListProps } from "./types"
import { ProjectCard } from "./project-card"
import { fadeUpAnimation } from "@/app/lib/animations"

export const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <section className="container py-32 grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-x-4 gap-y-6" >
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          {...fadeUpAnimation}
          transition={{ duration: .5, delay: index * .1 }}
        >
          <Link href={`projects/${project.slug}`}>
            <ProjectCard project={project} />
          </Link>
        </motion.div>
      ))}

    </section>
  )
}