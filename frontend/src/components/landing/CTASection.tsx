'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function CTASection() {
  return (
    <section id="cta" className="py-28 bg-[#f7fbf6]">
      <div className="mx-auto max-w-[1240px] px-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl p-14 md:p-16 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,181,71,0.32) 0%, rgba(47,154,74,0.18) 100%)',
            boxShadow: '0 20px 48px rgba(14,43,22,0.08)',
          }}
        >
          {/* Decorative orbs */}
          <div className="absolute -top-20 -right-10 w-[220px] h-[220px] rounded-full bg-[#2f9a4a]/24 pointer-events-none" />
          <div className="absolute -bottom-16 -left-5 w-[180px] h-[180px] rounded-full bg-[#ffb547]/52 pointer-events-none" />

          <div className="relative z-[2]">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[#0f1720] mb-4">
              Start protecting your crops today
            </h2>
            <p className="text-lg md:text-xl text-[#6b7276] leading-relaxed max-w-[680px] mx-auto mb-8">
              Join farmers and agriculture teams using AI to identify crop issues earlier, understand soil better, and apply inputs with greater confidence.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center h-[52px] px-6 rounded-md text-[15px] font-medium bg-[#2f9a4a] text-white shadow-[0_14px_30px_rgba(46,158,68,0.22)] hover:bg-[#268a3f] transition-colors"
              >
                Start Analysis
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center h-[52px] px-6 rounded-md text-[15px] font-medium bg-white text-[#0f1720] border border-black/10 hover:bg-black/5 transition-colors"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
