'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Menu, X } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { href: '#problem', label: 'Problems' },
  { href: '#solution', label: 'Solution' },
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it Works' },
  { href: '#trust', label: 'Benefits' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? 'bg-[#f7fbf6]/95 backdrop-blur-md shadow-sm border-black/5'
          : 'bg-[#f7fbf6]/80 backdrop-blur-sm border-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1240px] px-7">
        <div className="flex h-[78px] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2.5 text-lg font-bold text-[#0f1720] whitespace-nowrap">
            <Sprout className="h-6 w-6 text-[#2f9a4a]" />
            <span>ArogyaKrishi</span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6b7276]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#0f1720] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 whitespace-nowrap">
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-[42px] px-[18px] rounded-md text-sm font-medium text-[#0f1720] hover:bg-black/5 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center h-[42px] px-[18px] rounded-md text-sm font-medium bg-[#2f9a4a] text-white shadow-[0_14px_30px_rgba(46,158,68,0.22)] hover:bg-[#268a3f] transition-colors"
            >
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-[#f7fbf6] border-t border-black/5 px-7 py-4"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-[#6b7276] hover:text-[#0f1720] py-2"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t border-black/5">
              <Link href="/login" className="text-sm font-medium text-[#0f1720] py-2">
                Log in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center h-[42px] px-[18px] rounded-md text-sm font-medium bg-[#2f9a4a] text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
