import { getRelativeTimeString } from "@/app/utils/get-relative-time";

type KnownTechProps = {
  tech: {
    name: string;
    startDate: string;
    icon: React.ReactNode;
  }
}

export const KnownTech = ({ tech }: KnownTechProps) => {
  const relativeTime = getRelativeTimeString(
    new Date(tech.startDate), 'pt-BR'
  ).replace('há ', '')
  return (
    <div className="p-6 rounded-lg bg-gray-600/20 text-gray-500 flex gap-2 flex-col hover:text-emerald-500 hover:bg-gray-600/30 transition-all">
      <div className="flex items-ceenter justify-between">
        <p className="font-medium">{tech.name}</p>
        {tech.icon}
      </div>

      <span>{relativeTime} de experiência</span>
    </div>
  )
}