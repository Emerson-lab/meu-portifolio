'use client'
import { motion } from 'framer-motion';
import { CMSIcon } from "@/app/components/cms-icon";
import { KnownTech as IKnownTech } from "@/app/Types/projects";
import { getRelativeTimeString } from "@/app/utils/get-relative-time";

type KnownTechProps = {
  tech: IKnownTech;
  index: number
}

export const KnownTech = ({ tech, index }: KnownTechProps) => {
  const relativeTime = getRelativeTimeString(
    new Date(tech.startDate), 'pt-BR'
  ).replace('há ', '');

  return (
    <motion.div
      className="p-6 rounded-lg bg-gray-600/20 text-gray-500 flex gap-2 flex-col hover:text-emerald-500 hover:bg-gray-600/30 transition-all"
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.15, delay: index * 0.1 }}
    >
      <div className="flex items-ceenter justify-between">
        <p className="font-medium">{tech.name}</p>
        <CMSIcon icon={tech.iconSvg} />
      </div>

      <span>{relativeTime} de experiência</span>
    </motion.div>
  )
}