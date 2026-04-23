'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    tag: 'Disease Detection',
    tagColor: 'bg-[#2f9a4a]/10 text-[#2f9a4a]',
    linkColor: 'text-[#2f9a4a]',
    title: 'Spot diseases before they spread',
    text: 'Take a plant photo and let AI identify visible disease patterns. Farmers get fast predictions and clearer guidance for the next action.',
    points: ['Simple image upload from phone', 'Quick diagnosis with practical recommendations'],
    cta: 'See disease analysis',
    href: '/dashboard/disease-detection',
    reverse: false,
  },
  {
    tag: 'Soil Analysis',
    tagColor: 'bg-[#ffb547]/15 text-[#2b1a00]',
    linkColor: 'text-[#c48a20]',
    title: "Know your soil's true potential",
    text: 'Analyze soil conditions and understand what your land can support. Better soil understanding leads to better crop planning and stronger yield confidence.',
    points: ['Soil interpretation in farmer-friendly language', 'Crop suitability guidance based on field conditions'],
    cta: 'Explore soil insights',
    href: '/dashboard/soil-prediction',
    reverse: true,
  },
  {
    tag: 'Fertilizer Advisor',
    tagColor: 'bg-[#2f9a4a]/10 text-[#2f9a4a]',
    linkColor: 'text-[#2f9a4a]',
    title: 'Feed your crops exactly what they need',
    text: 'Input nutrient values and receive fertilizer recommendations tailored to crop needs. Reduce waste, lower cost, and support healthier field performance over time.',
    points: ['Better use of NPK-based insights', 'More confident fertilizer purchase decisions'],
    cta: 'Get fertilizer plan',
    href: '/dashboard/fertilizer-recommendation',
    reverse: false,
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="py-28 bg-[#f7fbf6]">
      <div className="mx-auto max-w-[1240px] px-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-[780px] mx-auto mb-[60px]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2f9a4a]/10 text-[#2f9a4a] text-[13px] font-semibold mb-4">
            Feature showcase
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[#0f1720] mb-4">
            Everything you need to grow better
          </h2>
          <p className="text-xl text-[#6b7276] leading-relaxed">
            Each tool is focused, visual, and easy to understand so farmers can move from doubt to action without delay.
          </p>
        </motion.div>

        <div className="flex flex-col gap-24">
          {features.map((feat, i) => (
            <motion.div
              key={feat.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className={`grid lg:grid-cols-[1fr_1fr] gap-11 items-center ${feat.reverse ? 'lg:[direction:rtl]' : ''}`}
            >
              <div className={`overflow-hidden rounded-xl bg-white shadow-[0_18px_44px_rgba(14,43,22,0.08)] p-4 ${feat.reverse ? 'lg:[direction:ltr]' : ''}`}>
                <div className="h-[260px] bg-gradient-to-br from-[#f0f7f1] to-[#fef9f0] flex items-center justify-center rounded-lg">
                  <span className="text-sm text-[#6b7276]">{feat.tag} Preview</span>
                </div>
              </div>
              <div className={`max-w-[520px] ${feat.reverse ? 'lg:[direction:ltr]' : ''}`}>
                <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-[13px] font-semibold mb-5 ${feat.tagColor}`}>
                  {feat.tag}
                </div>
                <h3 className="text-3xl md:text-[42px] font-bold leading-tight tracking-tight text-[#0f1720] mb-4">
                  {feat.title}
                </h3>
                <p className="text-lg text-[#6b7276] leading-relaxed mb-6">
                  {feat.text}
                </p>
                <div className="grid gap-3 mb-6">
                  {feat.points.map((pt) => (
                    <div key={pt} className="flex items-center gap-2.5 text-[15px] text-[#0f1720]">
                      <Check className="w-4 h-4 text-[#2f9a4a]" />
                      {pt}
                    </div>
                  ))}
                </div>
                <Link href={feat.href} className={`inline-flex items-center gap-2 text-[15px] font-semibold hover:underline ${feat.linkColor}`}>
                  {feat.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
