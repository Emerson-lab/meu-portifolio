type CMSIconTyope = {
  icon: string;
}

export const CMSIcon = ({ icon }: CMSIconTyope) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: icon
      }}
    />
  )
}