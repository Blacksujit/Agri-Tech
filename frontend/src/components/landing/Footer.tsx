'use client';

import Link from 'next/link';
import { Sprout } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Disease Detection', href: '/dashboard/disease-detection' },
    { label: 'Soil Analysis', href: '/dashboard/soil-prediction' },
    { label: 'Fertilizer Advisor', href: '/dashboard/fertilizer-recommendation' },
  ],
  Company: [
    { label: 'Why it matters', href: '#problem' },
    { label: 'Trust & Benefits', href: '#trust' },
    { label: 'Get Started', href: '#cta' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer id="footer" className="pt-16 pb-9 border-t border-black/5 bg-[#f0f7f1]">
      <div className="mx-auto max-w-[1240px] px-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-11">
          <div>
            <Link href="/" className="flex items-center gap-2.5 text-lg font-bold text-[#0f1720] mb-4">
              <Sprout className="h-6 w-6 text-[#2f9a4a]" />
              <span>ArogyaKrishi</span>
            </Link>
            <p className="text-[15px] leading-relaxed text-[#6b7276] max-w-[360px]">
              AI-powered agriculture support for disease detection, soil understanding, fertilizer planning, and faster decision-making in the field.
            </p>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[15px] font-bold text-[#0f1720] mb-4">{heading}</h4>
              <div className="flex flex-col gap-3.5">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-[#6b7276] hover:text-[#0f1720] transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-7 border-t border-black/5 text-sm text-[#6b7276]">
          <span>© {new Date().getFullYear()} ArogyaKrishi. Built for smarter farming.</span>
          <span>Production-ready AI agriculture platform</span>
        </div>
      </div>
    </footer>
  );
}
