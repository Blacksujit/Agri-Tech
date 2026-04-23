'use client';

import { motion } from 'framer-motion';

const stats = [
  { number: '94%', label: 'model accuracy on supported crop disease predictions' },
  { number: '3x', label: 'faster access to crop guidance compared with manual diagnosis flow' },
  { number: '20%', label: 'potential reduction in unnecessary fertilizer usage through better targeting' },
  { number: '24/7', label: 'availability for farmers, agri-advisors, and agriculture stakeholders' },
];

export function TrustSection() {
  return (
    <section id="trust" className="py-28 bg-[#f7fbf6]">
      <div className="mx-auto max-w-[1240px] px-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="rounded-xl p-14 md:p-16 text-white"
          style={{
            background: 'linear-gradient(135deg, #2f9a4a 0%, #1d6b32 100%)',
            boxShadow: '0 24px 60px rgba(20,80,34,0.2)',
          }}
        >
          <div className="text-center max-w-[760px] mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/16 text-[13px] font-semibold mb-4 text-white">
              Built to earn trust
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-white mb-4">
              Better decisions, stronger yields, more confidence
            </h2>
            <p className="text-xl leading-relaxed text-white/82">
              The platform focuses on practical outcomes: faster diagnosis, more efficient input use, and support that feels reliable in the field.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center py-3"
              >
                <div className="text-5xl md:text-[54px] font-extrabold leading-none tracking-tight text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-[15px] leading-relaxed text-white/82">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
