'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Sparkles } from 'lucide-react';
import { certifications } from '@/lib/data';

export default function Certifications() {
  return (
    <section id="section-certifications" className="py-24 space-y-16 scroll-mt-20 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -z-20 w-80 h-80 bg-electric/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="space-y-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-neon-blue text-xs font-bold uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Accreditation & Credentials</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white"
        >
          Professional <span className="bg-gradient-to-r from-electric to-neon-blue bg-clip-text text-transparent">Certifications</span>
        </motion.h2>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {certifications.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="premium-card p-6 rounded-2xl flex gap-5 items-start group cursor-pointer"
            onClick={() => cert.driveLink && window.open(cert.driveLink, '_blank')}
          >
            {/* Badge Icon */}
            <div className="p-3.5 rounded-xl bg-electric/10 border border-electric/20 text-electric shrink-0 group-hover:bg-electric/20 transition-all">
              <Award className="w-6 h-6" />
            </div>

            {/* Text details */}
            <div className="space-y-3 flex-grow min-w-0">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-snug group-hover:text-electric transition-colors truncate">
                  {cert.name}
                </h3>
                <p className="text-sm text-slate-400 font-semibold">{cert.issuer}</p>
              </div>

              {cert.driveLink && (
                <div className="pt-1">
                  <span className="inline-flex items-center text-xs text-electric group-hover:text-neon-blue font-bold gap-1 transition-colors">
                    <span>Verify Credentials</span>
                    <ExternalLink className="w-3.5 h-3.5 animate-pulse" />
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
