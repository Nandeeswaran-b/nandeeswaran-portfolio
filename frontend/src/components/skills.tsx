'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Cpu, BarChart, Settings, Library, Sparkles, Brain } from 'lucide-react';
import { skills } from '@/lib/data';
import RadarChart from './radar-chart';

const categories = [
  { id: 'Programming', name: 'Programming Languages', icon: Code, color: 'text-neon-blue' },
  { id: 'Machine Learning', name: 'Machine Learning', icon: Cpu, color: 'text-electric' },
  { id: 'Data Analytics', name: 'Data Analytics', icon: BarChart, color: 'text-neon-emerald' },
  { id: 'Libraries', name: 'Libraries', icon: Library, color: 'text-pink-500' },
  { id: 'Tools', name: 'Development Tools', icon: Settings, color: 'text-neon-indigo' },
  { id: 'Soft Skills', name: 'Soft Skills', icon: Brain, color: 'text-amber-500' },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('Programming');
  const filteredSkills = skills.filter((s) => s.category === activeTab);

  return (
    <section id="section-skills" className="py-24 space-y-16 scroll-mt-20 relative">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 -z-20 w-80 h-80 rounded-full bg-electric/5 filter blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="space-y-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-neon-blue text-xs font-bold uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Competencies</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white"
        >
          Technical <span className="bg-gradient-to-r from-electric to-neon-blue bg-clip-text text-transparent">Skills</span>
        </motion.h2>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Tab Selectors */}
        <div className="lg:col-span-3 flex flex-col space-y-2">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setActiveTab(cat.id)}
                whileHover={{ scale: 1.01, x: 4 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-white dark:bg-white/10 border-slate-300 dark:border-white/20 text-slate-800 dark:text-white shadow-md'
                    : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${cat.color}`} />
                  <span className="font-semibold text-sm">{cat.name}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="w-1.5 h-1.5 rounded-full bg-electric"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Center: Progress bars */}
        <div className="lg:col-span-5 flex">
          <div className="premium-card p-6 rounded-2xl flex-grow flex flex-col justify-center overflow-hidden min-h-[350px]">
            <motion.div
              layout
              className="grid grid-cols-1 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="space-y-1.5 p-3.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 dark:text-slate-200">{skill.name}</span>
                      <span className="text-xs text-electric font-semibold">{skill.proficiency}%</span>
                    </div>
                    {/* Bar container */}
                    <div className="h-2 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-300 dark:border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-electric to-neon-blue rounded-full"
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Right: Radar Chart */}
        <div className="lg:col-span-4 flex">
          <div className="premium-card p-6 rounded-2xl flex-grow flex flex-col justify-center items-center overflow-hidden min-h-[350px]">
            <div className="w-full text-center space-y-2">
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                Capability Mapping Matrix
              </span>
              <RadarChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
