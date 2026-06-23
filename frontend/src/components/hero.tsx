'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Mail, Linkedin, Github, Code, Sparkles, Database, Briefcase, Award } from 'lucide-react';
import { personalInfo } from '@/lib/data';

const titles = [
  "Aspiring Data Scientist",
  "Machine Learning Engineer",
  "AI & Data Science Student",
  "Predictive Modeler"
];

// Simple count up component
function Counter({ target, duration = 1.5, suffix = '' }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const stepTime = Math.max(Math.floor(totalMiliseconds / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 40); // increment steps
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
}

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [titleIdx, setTitleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const activeTitle = titles[titleIdx];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(activeTitle.substring(0, charIdx - 1));
        setCharIdx(prev => prev - 1);
      }, 40);
    } else {
      timer = setTimeout(() => {
        setTypedText(activeTitle.substring(0, charIdx + 1));
        setCharIdx(prev => prev + 1);
      }, 80);
    }

    if (!isDeleting && charIdx === activeTitle.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setTitleIdx(prev => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, titleIdx]);

  const navigateToSection = (target: string) => {
    window.location.hash = target;
  };

  return (
    <section id="section-home" className="min-h-screen flex flex-col justify-center pt-20 pb-16 relative">
      <div className="space-y-6 max-w-4xl relative z-10">
        {/* Sparkles Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-electric/10 border border-electric/30 text-neon-blue text-xs font-bold uppercase tracking-wider shadow-sm shadow-electric/10"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Transforming data into intelligent solutions.</span>
        </motion.div>

        {/* Big Name */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 80 }}
            className="text-6xl md:text-8xl font-black tracking-tight leading-none"
          >
            {personalInfo.name}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="h-10 text-xl md:text-3xl font-medium text-slate-700 dark:text-slate-300 flex items-center"
          >
            <span>I am an&nbsp;</span>
            <span className="text-electric font-bold border-r-2 border-electric pr-1 animate-pulse glow-text">
              {typedText}
            </span>
          </motion.div>
        </div>

        {/* Career Objective Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          {personalInfo.careerObjective}
        </motion.p>

        {/* CTA Button Row */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-4 pt-4"
        >
          <a
            href={personalInfo.resumeFolder}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-electric to-neon-indigo hover:from-electric-600 hover:to-neon-indigo text-white font-bold shadow-xl shadow-electric/25 hover:shadow-electric/45 transition-all flex items-center space-x-2 transform hover:-translate-y-0.5 duration-200"
          >
            <Download className="w-5 h-5" />
            <span>Download Resume</span>
          </a>
          <button
            onClick={() => navigateToSection('#projects')}
            className="px-8 py-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-800 dark:text-white font-bold transition-all flex items-center space-x-2 transform hover:-translate-y-0.5 duration-200"
          >
            <span>View Projects</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigateToSection('#contact')}
            className="px-8 py-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white font-bold transition-all flex items-center space-x-2 transform hover:-translate-y-0.5 duration-200"
          >
            <Mail className="w-5 h-5" />
            <span>Contact</span>
          </button>
        </motion.div>

        {/* Social Icons Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center space-x-3 pt-6"
        >
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-electric text-slate-600 dark:text-slate-400 hover:text-electric rounded-xl transition-all hover:scale-105"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-electric text-slate-600 dark:text-slate-400 hover:text-white rounded-xl transition-all hover:scale-105"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={personalInfo.leetcode}
            target="_blank"
            rel="noreferrer"
            className="p-3 bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-electric text-slate-600 dark:text-slate-400 hover:text-orange-400 rounded-xl transition-all hover:scale-105"
            aria-label="LeetCode"
          >
            <Code className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Stats Cards Section */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 50 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 relative z-10"
      >
        {/* Card 1 */}
        <div className="premium-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-5 dark:opacity-10 group-hover:opacity-20 transition-opacity">
            <Briefcase className="w-16 h-16 text-electric" />
          </div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Internships Done</span>
          <span className="text-4xl font-black text-slate-800 dark:text-white mt-4 block">
            <Counter target={2} />
          </span>
        </div>

        {/* Card 2 */}
        <div className="premium-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-5 dark:opacity-10 group-hover:opacity-20 transition-opacity">
            <Award className="w-16 h-16 text-neon-blue" />
          </div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Certifications</span>
          <span className="text-4xl font-black text-slate-800 dark:text-white mt-4 block">
            <Counter target={4} />
          </span>
        </div>

        {/* Card 3 */}
        <div className="premium-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-5 dark:opacity-10 group-hover:opacity-20 transition-opacity">
            <Database className="w-16 h-16 text-neon-indigo" />
          </div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Live Projects</span>
          <span className="text-4xl font-black text-slate-800 dark:text-white mt-4 block">
            <Counter target={3} />
          </span>
        </div>

        {/* Card 4 */}
        <div className="premium-card p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-5 dark:opacity-10 group-hover:opacity-20 transition-opacity">
            <Code className="w-16 h-16 text-neon-emerald" />
          </div>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">LeetCode Problems</span>
          <span className="text-4xl font-black text-slate-800 dark:text-white mt-4 block">
            <Counter target={412} suffix="+" />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
