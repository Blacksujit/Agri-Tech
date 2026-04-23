'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ScanSearch, BadgeCheck } from 'lucide-react';
import Link from 'next/link';

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const } },
};

export function HeroSection() {
  return (
    <section id="hero" className="relative pt-[78px] overflow-hidden bg-gradient-to-br from-[#f7fbf6] via-[#f0f7f1] to-[#fef9f0]">
      <div className="absolute top-12 right-[14%] w-[280px] h-[280px] rounded-full bg-[#ffb547]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-6 left-[8%] w-[220px] h-[220px] rounded-full bg-[#2f9a4a]/20 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1240px] px-7 py-20 md:py-24 lg:py-28">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-[1fr_0.98fr] gap-14 items-center"
        >
          {/* Copy */}
          <div className="max-w-[620px]">
            <motion.div variants={item} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2f9a4a]/10 text-[#2f9a4a] text-[13px] font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-[#2f9a4a]" />
              AI guidance built for real farm decisions
            </motion.div>

            <motion.h1 variants={item} className="text-5xl md:text-[66px] font-extrabold leading-[1.02] tracking-tight text-[#0f1720] mb-5">
              AI-Powered Crop Care for Smarter Farming
            </motion.h1>

            <motion.p variants={item} className="text-lg md:text-[21px] leading-relaxed text-[#0f1720]/62 mb-8 max-w-[560px]">
              Help farmers act before crops fail. ArogyaKrishi turns crop photos, soil signals, and nutrient data into simple guidance that is fast, practical, and easy to trust.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center gap-3.5 mb-8">
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 h-[52px] px-6 rounded-md text-[15px] font-medium bg-[#2f9a4a] text-white shadow-[0_14px_30px_rgba(46,158,68,0.22)] hover:bg-[#268a3f] transition-colors">
                Start Analysis
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="#features" className="inline-flex items-center justify-center h-[52px] px-6 rounded-md text-[15px] font-medium bg-white text-[#0f1720] border border-black/10 hover:bg-black/5 transition-colors">
                Explore Features
              </Link>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-3 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/88 text-[13px] font-semibold text-[#0f1720] shadow-[0_10px_24px_rgba(14,43,22,0.06)]">
                <ScanSearch className="w-4 h-4 text-[#2f9a4a]" />
                Disease detection in minutes
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/88 text-[13px] font-semibold text-[#0f1720] shadow-[0_10px_24px_rgba(14,43,22,0.06)]">
                <BadgeCheck className="w-4 h-4 text-[#2f9a4a]" />
                Soil and fertilizer guidance in one flow
              </div>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-3.5 flex-wrap">
              <div className="flex -space-x-2.5">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-9.5 h-9.5 rounded-full bg-gradient-to-br from-[#2f9a4a] to-[#ffb547] border-[3px] border-[#f7fbf6] flex items-center justify-center text-[10px] font-bold text-white">
                    F{i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#6b7276]">
                Trusted by <strong className="text-[#0f1720] font-bold">10,000+</strong> progressive farmers
              </p>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div variants={item} className="relative hidden lg:block min-h-[500px]">
            <div className="absolute -top-3 -left-5 z-10 p-4 rounded-lg bg-white/92 shadow-[0_18px_36px_rgba(14,43,22,0.1)] min-w-[200px]">
              <p className="text-xs text-[#6b7276] mb-1">Fast AI decision support</p>
              <p className="text-[28px] font-bold leading-tight text-[#0f1720] mb-1">92% faster</p>
              <p className="text-[13px] text-[#6b7276]">From photo to guidance in minutes.</p>
            </div>

            <div className="relative z-[2] p-5 rounded-2xl bg-white/82 shadow-[0_30px_70px_rgba(14,43,22,0.12)]">
              <div className="overflow-hidden rounded-xl bg-white shadow-[0_20px_50px_rgba(14,43,22,0.09)]">
                <div className="h-[260px] bg-gradient-to-br from-[#2f9a4a]/20 via-[#e6f6ea] to-[#ffb547]/20 flex items-center justify-center">
                  <span className="text-sm text-[#6b7276]">Hero Image Placeholder</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5 mt-3.5">
                <div className="overflow-hidden rounded-xl bg-white shadow-[0_20px_50px_rgba(14,43,22,0.09)]">
                  <div className="h-[120px] bg-gradient-to-br from-[#e6f6ea] to-[#2f9a4a]/10 flex items-center justify-center">
                    <span className="text-xs text-[#6b7276]">Disease Preview</span>
                  </div>
                </div>
                <div className="overflow-hidden rounded-xl bg-white shadow-[0_20px_50px_rgba(14,43,22,0.09)]">
                  <div className="h-[120px] bg-gradient-to-br from-[#fef9f0] to-[#ffb547]/10 flex items-center justify-center">
                    <span className="text-xs text-[#6b7276]">Soil Preview</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-2 -right-4 z-10 p-4 rounded-lg bg-white/92 shadow-[0_18px_36px_rgba(14,43,22,0.1)] min-w-[200px]">
              <p className="text-xs text-[#6b7276] mb-1">All-in-one crop support</p>
              <p className="text-[28px] font-bold leading-tight text-[#0f1720] mb-1">3 core tools</p>
              <p className="text-[13px] text-[#6b7276]">Disease, soil, and fertilizer from one dashboard.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
