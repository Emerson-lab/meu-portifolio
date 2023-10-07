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
        ),
        ul: ({ children }) => (
          <ul className='list-disc list-inside pl-2 flex flex-col gap-2'>
            {children}
          </ul>
        ),
        a: ({ children, ...props }) => (
          <a
            {...props}
            className='hover:text-emerald-500 transition-colors underline'>
            {children}
          </a>
        )
      }}
    />
  )
}