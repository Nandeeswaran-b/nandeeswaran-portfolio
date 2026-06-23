'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Code, Sparkles, Download } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import Footer from './footer';

export default function Contact() {
  return (
    <section id="section-contact" className="py-24 space-y-16 scroll-mt-20 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -z-20 w-80 h-80 bg-electric/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="space-y-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-neon-blue text-xs font-bold uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white"
        >
          Connect <span className="bg-gradient-to-r from-electric to-neon-blue bg-clip-text text-transparent">With Me</span>
        </motion.h2>
      </div>

      {/* Content Layout Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Contact Info cards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Card 1: Email */}
          <div className="premium-card p-6 rounded-2xl flex gap-4 items-center">
            <div className="p-3 bg-electric/10 border border-electric/25 text-electric rounded-xl shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Email Address</p>
              <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-electric transition-colors">
                {personalInfo.email}
              </a>
            </div>
          </div>

          {/* Card 2: Phone */}
          <div className="premium-card p-6 rounded-2xl flex gap-4 items-center">
            <div className="p-3 bg-neon-blue/10 border border-neon-blue/25 text-neon-blue rounded-xl shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Phone Number</p>
              <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-electric transition-colors">
                {personalInfo.phone}
              </a>
            </div>
          </div>

          {/* Card 3: Location */}
          <div className="premium-card p-6 rounded-2xl flex gap-4 items-center">
            <div className="p-3 bg-neon-indigo/10 border border-neon-indigo/25 text-neon-indigo rounded-xl shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Location</p>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Tamil Nadu, India</p>
            </div>
          </div>
        </motion.div>

        {/* Right: Social & Resume Links */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="premium-card p-8 rounded-2xl space-y-6"
        >
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Professional Directories</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            I am actively seeking internship opportunities and entry-level positions where I can apply machine learning systems and visual analytical tools to make data actionable.
          </p>

          {/* Social Row */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 p-4 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-electric text-slate-700 dark:text-slate-300 hover:text-electric rounded-xl text-xs font-bold transition-all"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 p-4 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-electric text-slate-700 dark:text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>

            <a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 p-4 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-electric text-slate-700 dark:text-slate-300 hover:text-orange-400 rounded-xl text-xs font-bold transition-all"
            >
              <Code className="w-5 h-5" />
              <span>LeetCode</span>
            </a>
          </div>

          {/* Resume link */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/5">
            <a
              href={personalInfo.resumeFolder}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-gradient-to-r from-electric to-neon-indigo hover:from-electric-600 hover:to-neon-indigo text-white font-bold rounded-xl text-sm shadow-md shadow-electric/15 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Resume Hub</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Page Footer integrated inside contact slide */}
      <div className="pt-16 border-t border-slate-200 dark:border-white/5">
        <Footer />
      </div>
    </section>
  );
}
