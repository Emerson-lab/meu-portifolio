import { ReactNode } from 'react'
import './globals.css'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { BckToTop } from './components/back-to-top'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import { ContactForm } from './components/contact-form'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${plexMono.variable}`}>
      <body>
        <Header />
        {children}
        <ContactForm />
        <Footer />
        <BckToTop />
      </body>
    </html>
  )
}
