import { ComponentProps } from 'react'
import { RichText as CMSRitchText } from '@graphcms/rich-text-react-renderer'

type RichTextProps = ComponentProps<typeof CMSRitchText>

export const RichText = ({ ...props }: RichTextProps) => {
  return (
    <CMSRitchText
      {...props}
      renderers={{
        bold: ({ children }) => (
          <b className='text-gray-50 font-medium'>{children}</b>
        )
      }}
    />
  )
}