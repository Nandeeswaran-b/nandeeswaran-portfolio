'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Cpu, Database, Target, Award, Search, Sparkles, GraduationCap } from 'lucide-react';
import { personalInfo } from '@/lib/data';

const brandingCards = [
  {
    title: 'Data Science',
    description: 'Mining statistical patterns and hidden structures in high-dimensional datasets to build clean data models.',
    icon: Database,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: 'Machine Learning',
    description: 'Engineering classical regression/classification models and ensemble parameters for predictive precision.',
    icon: Cpu,
    color: 'from-electric to-neon-blue'
  },
  {
    title: 'Artificial Intelligence',
    description: 'Exploring neural networks, deep learning architectures, and cognitive modeling technologies.',
    icon: BrainCircuit,
    color: 'from-neon-indigo to-purple-600'
  },
  {
    title: 'Analytics & EDA',
    description: 'Transforming sparse databases into visual dashboards and extracting clean statistical distributions.',
    icon: Search,
    color: 'from-neon-emerald to-teal-500'
  }
];

export default function About() {
  return (
    <section id="section-about" className="py-24 space-y-16 scroll-mt-20">
      {/* Header */}
      <div className="space-y-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-neon-blue text-xs font-bold uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Personal Branding</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white"
        >
          Who Is <span className="bg-gradient-to-r from-electric to-neon-blue bg-clip-text text-transparent">Nandeeswaran B?</span>
        </motion.h2>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Summary Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6 space-y-8"
        >
          <div className="premium-card p-8 md:p-10 rounded-2xl relative overflow-hidden">
            {/* Glow blobs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-electric/5 rounded-full filter blur-2xl"></div>
            
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center space-x-2 relative z-10">
              <Target className="w-6 h-6 text-electric" />
              <span>Career Objective & Vision</span>
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base pt-4 relative z-10">
              I am currently pursuing my <strong>B.Tech in Artificial Intelligence and Data Science</strong> at <strong>{personalInfo.college}</strong> ({personalInfo.degree}). 
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base relative z-10">
              My vision is to bridge the gap between complex mathematical formulas and real-world software logic. I am dedicated to continuous learning, problem-solving, and writing clean pipelines to deploy predictive ML frameworks that make data actionable.
            </p>
            
            {/* Details timeline facts */}
            <div className="pt-6 border-t border-slate-200 dark:border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              <div className="flex items-center space-x-2.5 text-slate-700 dark:text-slate-300">
                <GraduationCap className="w-5 h-5 text-electric shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold">B.Tech Student</p>
                  <p className="text-[10px] text-slate-500">2024 - 2028</p>
                </div>
              </div>
              <div className="flex items-center space-x-2.5 text-slate-700 dark:text-slate-300">
                <Award className="w-5 h-5 text-neon-blue shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold">Credited Analytics</p>
                  <p className="text-[10px] text-slate-500">Power BI & Excel</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Competencies Cards Grid */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {brandingCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -5 }}
                className="premium-card p-6 rounded-2xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white">{card.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
