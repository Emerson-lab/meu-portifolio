
type TechBadgeProps = {
  name: string;
}

export const TtechBadge = ({name}: TechBadgeProps) => {
  return (
    <span className="text-emerald-400 bg-emerald-900/80 text-sm py-1 px-3 rounded-lg">
      {name}
    </span>
  )
}