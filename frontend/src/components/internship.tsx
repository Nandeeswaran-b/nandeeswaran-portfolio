'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, Code, CheckSquare, Sparkles, GraduationCap } from 'lucide-react';
import { internships, education } from '@/lib/data';

// Timeline animation variants
const timelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const nodeVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 80 }
  }
};

type TimelineFilter = 'all' | 'work' | 'education';

export default function Internship() {
  const [activeTab, setActiveTab] = useState<TimelineFilter>('all');

  // Map and sort items. Tamil Infotech (2026) first, DeepByte (2025) second, SNS (2022-2026) third.
  const unifiedItems = [
    ...internships.map(i => ({ ...i, type: 'work', title: i.role, subtitle: i.company, year: 2026 })),
    ...education.map(e => ({ ...e, type: 'education', title: e.degree, subtitle: e.institution, year: 2022 }))
  ].sort((a, b) => b.year - a.year); // Sort roughly descending

  const filteredItems = unifiedItems.filter(item => {
    if (activeTab === 'all') return true;
    return item.type === activeTab;
  });

  return (
    <section id="section-internships" className="py-24 space-y-16 scroll-mt-20 relative">
      {/* Background glow */}
      <div className="absolute top-1/4 right-1/4 -z-20 w-80 h-80 bg-neon-indigo/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="space-y-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-neon-blue text-xs font-bold uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Timeline Experience</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white"
        >
          Career & <span className="bg-gradient-to-r from-electric to-neon-blue bg-clip-text text-transparent">Education</span>
        </motion.h2>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2.5">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all ${
            activeTab === 'all'
              ? 'bg-electric text-white border-electric shadow-lg'
              : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
        >
          All Timeline
        </button>
        <button
          onClick={() => setActiveTab('work')}
          className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all ${
            activeTab === 'work'
              ? 'bg-electric text-white border-electric shadow-lg'
              : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
        >
          Work Experience
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all ${
            activeTab === 'education'
              ? 'bg-electric text-white border-electric shadow-lg'
              : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'
          }`}
        >
          Education History
        </button>
      </div>

      {/* Timeline nodes */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative border-l border-slate-200 dark:border-white/10 pl-8 ml-4 space-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.title + idx}
                variants={nodeVariants}
                layout
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative group"
              >
                {/* Circle Node indicator */}
                <div className="absolute -left-12 top-1.5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-white/10 flex items-center justify-center group-hover:border-electric transition-colors">
                  {item.type === 'education' ? (
                    <GraduationCap className="w-4 h-4 text-slate-400 group-hover:text-electric" />
                  ) : (
                    <Briefcase className="w-4 h-4 text-slate-400 group-hover:text-electric" />
                  )}
                </div>

                {/* Content card */}
                <div className="premium-card p-8 rounded-2xl">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white group-hover:text-electric transition-colors">
                          {item.title}
                        </h3>
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          item.type === 'education'
                            ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                            : 'bg-electric/10 text-electric border-electric/20'
                        }`}>
                          {item.type}
                        </span>
                      </div>
                      <p className="text-lg text-slate-600 dark:text-slate-300 font-semibold">{item.subtitle}</p>
                    </div>
                    
                    {/* Meta details */}
                    <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-3 py-1 rounded-xl">
                      <Calendar className="w-4 h-4 text-electric" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                    {item.description}
                  </p>

                  {/* Tags & Badges */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 mt-6 border-t border-slate-200 dark:border-white/5">
                    {/* Skills badges */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckSquare className="w-4 h-4 text-neon-emerald" />
                        <span>Core Competencies</span>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((sk) => (
                          <span key={sk} className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs px-2.5 py-1 rounded-lg text-slate-700 dark:text-slate-300">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Technologies badges */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Code className="w-4 h-4 text-neon-blue" />
                        <span>Technologies Used</span>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <span key={tech} className="bg-electric/15 border border-electric/30 text-xs px-2.5 py-1 rounded-lg text-electric dark:text-electric-500 font-semibold">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
