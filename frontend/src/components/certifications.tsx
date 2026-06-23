'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Sparkles, X, ShieldCheck, Bookmark } from 'lucide-react';
import { certifications } from '@/lib/data';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

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
            onClick={() => setSelectedCert(cert)}
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
                <div className="pt-1" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="inline-flex items-center text-xs text-electric hover:text-neon-blue font-bold gap-1 transition-colors"
                  >
                    <span>Verify Credentials</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Lightbox Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 relative shadow-2xl overflow-hidden flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold/Purple decorative light beams */}
              <div className="absolute -top-1/4 -right-1/4 w-60 h-60 bg-electric/10 rounded-full filter blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-1/4 -left-1/4 w-60 h-60 bg-neon-indigo/10 rounded-full filter blur-3xl pointer-events-none"></div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Verified Badge Header */}
              <div className="flex items-center gap-2 pb-4 border-b border-white/5">
                <ShieldCheck className="w-6 h-6 text-neon-emerald" />
                <span className="text-[10px] font-black text-neon-emerald uppercase tracking-widest">
                  Verified Digital Credential
                </span>
              </div>

              {/* Certificate Layout body */}
              <div className="py-8 space-y-6 text-center">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-white/5 border border-white/10 text-electric">
                    <Bookmark className="w-8 h-8 fill-electric" />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">
                    THIS ACCREDITATION CERTIFIES THAT
                  </span>
                  <h4 className="text-2xl font-black text-white bg-gradient-to-r from-white via-slate-100 to-electric bg-clip-text text-transparent">
                    Nandeeswaran B
                  </h4>
                  <span className="text-[9px] font-semibold text-slate-500 block italic">
                    has successfully fulfilled the competency standards for
                  </span>
                </div>

                <div className="space-y-1 px-4">
                  <h5 className="text-lg font-extrabold text-slate-200 leading-snug">
                    {selectedCert.name}
                  </h5>
                  <p className="text-xs text-slate-400 font-medium">Issued by: {selectedCert.issuer}</p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-white/5 flex gap-4">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-xs font-bold text-slate-300 hover:bg-white/5 transition-colors"
                >
                  Close Preview
                </button>
                {selectedCert.driveLink && (
                  <a
                    href={selectedCert.driveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-electric to-neon-blue text-center text-xs font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                  >
                    <span>Open Drive Folder</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
