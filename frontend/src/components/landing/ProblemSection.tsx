'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, CloudSunRain, FlaskConical } from 'lucide-react';

const problems = [
  {
    icon: ShieldAlert,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    title: 'Crop disease moves faster than support',
    text: 'By the time a farmer gets the right answer, infected leaves may already affect neighboring plants and reduce yield.',
  },
  {
    icon: CloudSunRain,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    title: 'Field decisions are difficult under uncertainty',
    text: 'Soil condition, weather shifts, and crop suitability can change quickly, making the next step hard to judge with confidence.',
  },
  {
    icon: FlaskConical,
    iconBg: 'bg-stone-100',
    iconColor: 'text-stone-500',
    title: 'Wrong fertilizer advice wastes money',
    text: 'Overuse and underuse both hurt the farm. Farmers need clearer nutrient guidance that protects both budget and soil health.',
  },
];

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.1 } }),
};

export function ProblemSection() {
  return (
    <section id="problem" className="py-28 bg-[#f7fbf6]">
      <div className="mx-auto max-w-[1240px] px-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-[780px] mx-auto mb-[60px]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2f9a4a]/10 text-[#2f9a4a] text-[13px] font-semibold mb-4">
            The problem farmers face
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[#0f1720] mb-4">
            The cost of uncertainty in farming
          </h2>
          <p className="text-xl text-[#6b7276] leading-relaxed">
            When disease spreads, soil quality is misunderstood, or fertilizer is applied without clear guidance, the result is crop loss, wasted spend, and stress at the worst time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              custom={i}
              variants={item}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="bg-white border border-black/5 rounded-lg p-8 min-h-[260px] shadow-[0_16px_36px_rgba(14,43,22,0.05)] hover:shadow-[0_20px_48px_rgba(14,43,22,0.08)] transition-shadow"
            >
              <div className={`w-[54px] h-[54px] rounded-md flex items-center justify-center mb-5 ${problem.iconBg}`}>
                <problem.icon className={`w-6 h-6 ${problem.iconColor}`} />
              </div>
              <h3 className="text-[22px] font-bold leading-tight text-[#0f1720] mb-3">
                {problem.title}
              </h3>
              <p className="text-base leading-relaxed text-[#6b7276]">
                {problem.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
