"use client"
import Link from "next/link"
import Image from "next/image"
import { NavItem } from "./nav-item"
import { motion } from "framer-motion"

const navItems = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Projetos',
    href: '/projects'
  }
]

export const Header = () => {

  return (
    <motion.header
      className="absolute top-0 w-full z-10 h-24 flex items-center justify-center"
      initial={{ top: -100 }}
      animate={{ top: 0 }}
      transition={{ duration: .5 }}
    >
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image
            width={58}
            height={49}
            src="/images/logo.svg"
            alt="Logo"
            priority
          />
        </Link>
        <nav className="flex items-center gap-4 sm:gap-80">
          {navItems?.map(item => {
            return (
              <NavItem {...item} key={item.label} />
            )
          })}
        </nav>
      </div>
    </motion.header>
  )
}