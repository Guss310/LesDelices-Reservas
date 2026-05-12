'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/menu', label: 'Carta' },
  { href: '/reservas', label: 'Reservas' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen ? 'bg-verde shadow-lg' : 'bg-verde/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="text-dorado font-heading text-xl font-bold tracking-wide group-hover:text-dorado-light transition-colors">
              Les Délices
            </span>
            <span className="text-white/70 text-xs tracking-widest uppercase">
              Punta del Este
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors ${
                  pathname === link.href
                    ? 'text-dorado font-semibold'
                    : 'text-white/80 hover:text-dorado'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/reservas"
              className="bg-dorado text-verde-dark font-semibold text-sm px-5 py-2 rounded hover:bg-dorado-light transition-colors"
            >
              Reservar Mesa
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded focus:outline-none"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-verde-dark border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm tracking-wide py-1 ${
                  pathname === link.href ? 'text-dorado font-semibold' : 'text-white/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/reservas"
              onClick={() => setIsOpen(false)}
              className="bg-dorado text-verde-dark font-semibold text-sm px-5 py-2.5 rounded text-center mt-2"
            >
              Reservar Mesa
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
