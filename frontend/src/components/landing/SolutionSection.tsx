'use client';

import { motion } from 'framer-motion';
import { ScanSearch, Map, Leaf, Brain } from 'lucide-react';

const solutions = [
  { icon: ScanSearch, title: 'Detect diseases instantly', text: 'Upload a crop image and get likely disease identification without waiting for manual inspection.' },
  { icon: Map, title: 'Recommend suitable crops', text: 'Use soil intelligence to understand field potential and match crops with better growing conditions.' },
  { icon: Leaf, title: 'Optimize fertilizer use', text: 'Turn NPK values into clearer fertilizer advice so farmers spend smarter and protect soil quality.' },
  { icon: Brain, title: 'Provide AI-based insights', text: 'Translate technical outputs into simple recommendations that are easy to act on in the field.' },
];

export function SolutionSection() {
  return (
    <section id="solution" className="py-28 bg-[#eaf5ec]">
      <div className="mx-auto max-w-[1240px] px-7">
        <div className="grid lg:grid-cols-[0.92fr_1.08fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2f9a4a]/10 text-[#2f9a4a] text-[13px] font-semibold mb-4">
              Why ArogyaKrishi works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[#0f1720] mt-4 mb-4">
              AI guidance built for real field decisions
            </h2>
            <p className="text-xl text-[#6b7276] leading-relaxed mb-6">
              ArogyaKrishi converts complex agricultural data into clear next steps. The experience is simple enough for farmers, but strong enough for agriculture stakeholders and field teams.
            </p>
            <div className="flex items-stretch gap-3.5 mb-6">
              <div className="flex-1 bg-white rounded-md p-4 shadow-[0_12px_28px_rgba(14,43,22,0.05)]">
                <strong className="block text-[22px] leading-tight text-[#0f1720] mb-1">Instant</strong>
                <span className="text-[13px] text-[#6b7276]">Photo-based disease identification</span>
              </div>
              <div className="flex-1 bg-white rounded-md p-4 shadow-[0_12px_28px_rgba(14,43,22,0.05)]">
                <strong className="block text-[22px] leading-tight text-[#0f1720] mb-1">Practical</strong>
                <span className="text-[13px] text-[#6b7276]">Crop and fertilizer recommendations</span>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl bg-white shadow-[0_20px_50px_rgba(14,43,22,0.09)]">
              <div className="h-[200px] bg-gradient-to-br from-[#2f9a4a]/15 via-[#e6f6ea] to-[#ffb547]/15 flex items-center justify-center">
                <span className="text-sm text-[#6b7276]">Farmer + Advisor Visualization</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border border-black/5 rounded-xl p-7 shadow-[0_16px_36px_rgba(14,43,22,0.06)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {solutions.map((sol, i) => (
                <motion.div
                  key={sol.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-[#e6f6ea] rounded-lg p-5 min-h-[174px]"
                >
                  <div className="w-12 h-12 rounded-md bg-[#2f9a4a]/10 flex items-center justify-center mb-3">
                    <sol.icon className="w-6 h-6 text-[#2f9a4a]" />
                  </div>
                  <h4 className="text-[17px] font-bold text-[#0f1720] mb-2">{sol.title}</h4>
                  <p className="text-sm leading-relaxed text-[#6b7276]">{sol.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
