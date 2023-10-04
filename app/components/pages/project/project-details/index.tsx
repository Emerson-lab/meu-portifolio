import { FiGlobe } from "react-icons/fi";
import { TbBrandGithub } from "react-icons/tb";
import { Button } from "@/app/components/button";
import { TtechBadge } from "@/app/components/tech-badge";
import { SectionTitle } from "@/app/components/section-title";
import { Link } from "@/app/components/link";
import { HiArrowNarrowLeft } from "react-icons/hi";

export default function ProjectDeatails() {

  return (
    <section className="w-full sm:min-h-[750px] flex flex-col items-center justify-end relative pb-10 sm:pb-24 py-24 px-6 overflow-hidden">
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: "url(/images/hero-bg.png) no-repeat center/cover, url(https://media.graphassets.com/7Kic5YHkQcmGrN57MSXw) no-repeat center/cover"
        }}
      />

      <SectionTitle
        subtitle="projetos"
        title="BookWise"
        className="text-center items-center sm:[&>h3]:text-4xl"
      />

      <p className="text-gray-400 text-center max-w-[640px] my-4 sm:my-6 text-sm sm:text-base">
        BookWise Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, beatae. dolor sit amet consectetur adipisicing elit
      </p>
      <div className="w-full max-w-[330px] flex flex-wrap gap-2 items-center justify-center">
        <TtechBadge name="Next.js" />
        <TtechBadge name="Next.js" />
        <TtechBadge name="Next.js" />
        <TtechBadge name="Next.js" />
        <TtechBadge name="Next.js" />
        <TtechBadge name="Next.js" />
      </div>
      <div className="my-6 sm:my-12 flex items-center gap-2 sm:gap-4 flex-col sm:flex-row">
        <a href="https://github.com" target="_blank">
          <Button className="min-w-[180px]">
            <TbBrandGithub size={20} />
            Repositório
          </Button>
        </a>
        <a href="https://github.com" target="_blank">
          <Button className="min-w-[180px]">
            <FiGlobe size={20} />
            Projeto Online
          </Button>
        </a>
      </div>
      <Link href="/projects">
        <HiArrowNarrowLeft size={20}/>
        Voltar para projetos
      </Link>
    </section>
  )
}