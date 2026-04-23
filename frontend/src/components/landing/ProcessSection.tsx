'use client';

import { motion } from 'framer-motion';
import { Camera, Cpu, FileSearch, BadgeCheck } from 'lucide-react';

const steps = [
  { badge: '1', icon: Camera, title: 'Upload image', text: 'Take a clear photo of your crop or provide field details directly from your phone.' },
  { badge: '2', icon: Cpu, title: 'AI analyzes', text: 'The platform processes image and soil data using trained agricultural intelligence.' },
  { badge: '3', icon: FileSearch, title: 'Get results', text: 'See disease predictions, soil guidance, and fertilizer recommendations in a simple format.' },
  { badge: '4', icon: BadgeCheck, title: 'Take action', text: 'Use the recommended next step to protect crops earlier and make more confident decisions.' },
];

export function ProcessSection() {
  return (
    <section id="how-it-works" className="py-28 bg-[#eaf5ec]">
      <div className="mx-auto max-w-[1240px] px-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-[780px] mx-auto mb-[60px]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2f9a4a]/10 text-[#2f9a4a] text-[13px] font-semibold mb-4">
            How it works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[#0f1720] mb-4">
            From photo to action in four simple steps
          </h2>
          <p className="text-xl text-[#6b7276] leading-relaxed">
            ArogyaKrishi is designed to feel guided and intuitive, so users always know what to do next.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          <div className="grid sm:grid-cols-2 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.badge}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative bg-white border border-black/5 rounded-xl p-7 min-h-[232px] shadow-[0_14px_34px_rgba(14,43,22,0.05)] hover:shadow-[0_18px_44px_rgba(14,43,22,0.08)] transition-shadow"
              >
                <div className="absolute top-4.5 right-4.5 w-[30px] h-[30px] rounded-full bg-[#0f1720] text-[#f7fbf6] flex items-center justify-center text-[13px] font-bold">
                  {step.badge}
                </div>
                <div className="w-[72px] h-[72px] mt-3 mb-5 rounded-lg bg-[#2f9a4a]/10 flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-[#2f9a4a]" />
                </div>
                <h4 className="text-xl font-bold text-[#0f1720] mb-2.5">{step.title}</h4>
                <p className="text-[15px] leading-relaxed text-[#6b7276]">{step.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-xl bg-white shadow-[0_18px_44px_rgba(14,43,22,0.08)] p-4 hidden lg:block"
          >
            <div className="h-[420px] bg-gradient-to-br from-[#f0f7f1] via-[#e6f6ea] to-[#fef9f0] flex items-center justify-center rounded-lg">
              <span className="text-sm text-[#6b7276]">Process Visualization</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
