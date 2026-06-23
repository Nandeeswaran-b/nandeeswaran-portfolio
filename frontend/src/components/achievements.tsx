'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Code, FileText, Sparkles, Globe, Award } from 'lucide-react';
import { achievements } from '@/lib/data';

const getIcon = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes('leetcode') || lower.includes('solved')) return Code;
  if (lower.includes('paper') || lower.includes('presentation')) return FileText;
  if (lower.includes('projects')) return Trophy;
  return Award;
};

export default function Achievements() {
  return (
    <section id="section-achievements" className="py-24 space-y-16 scroll-mt-20 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/3 -z-20 w-80 h-80 bg-neon-indigo/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="space-y-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-neon-blue text-xs font-bold uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Milestones & Metrics</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white"
        >
          Major <span className="bg-gradient-to-r from-electric to-neon-blue bg-clip-text text-transparent">Achievements</span>
        </motion.h2>
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {achievements.map((ach, idx) => {
          const Icon = getIcon(ach.title);
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="premium-card p-8 rounded-2xl flex gap-6 items-start relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-electric/5 rounded-full filter blur-2xl group-hover:bg-electric/10 transition-colors pointer-events-none"></div>

              {/* Icon Node */}
              <div className="p-4 rounded-2xl bg-electric/10 border border-electric/20 text-electric shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Icon className="w-7 h-7" />
              </div>

              {/* Details */}
              <div className="space-y-2 flex-grow">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-snug group-hover:text-electric transition-colors">
                  {ach.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
