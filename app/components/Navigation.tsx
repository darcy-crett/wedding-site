'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/registry', label: 'Registry' },
    { href: '/rsvp', label: 'RSVP' },
  ]

  return (
    <nav className="bg-white border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Names */}
          <Link href="/" className="font-serif text-xl text-stone-800">
            Kaylah & Darcy
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  pathname === link.href
                    ? 'text-stone-800 font-medium'
                    : 'text-stone-600 hover:text-stone-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}