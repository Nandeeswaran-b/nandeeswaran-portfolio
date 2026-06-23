'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Sparkles, Award, Terminal, X, CheckCircle, TrendingUp, HelpCircle } from 'lucide-react';
import { projects } from '@/lib/data';

const filterCategories = ['All', 'Machine Learning', 'Data Analytics'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 14 }
  }
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="section-projects" className="py-24 space-y-16 scroll-mt-20 relative">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 -z-20 w-80 h-80 bg-electric/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="space-y-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-electric/10 border border-electric/30 text-neon-blue text-xs font-bold uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>My Projects</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white"
        >
          Live Projects <span className="bg-gradient-to-r from-electric to-neon-blue bg-clip-text text-transparent">Showcase</span>
        </motion.h2>
      </div>

      {/* Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-2"
      >
        {filterCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
              activeFilter === cat
                ? 'bg-slate-900 dark:bg-white text-white dark:text-background border-slate-900 dark:border-white shadow-md'
                : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        layout
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.title}
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              className="premium-card rounded-2xl overflow-hidden flex flex-col group h-full cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Graphic Cover */}
              <div className="h-48 overflow-hidden relative bg-slate-900">
                {project.coverImage ? (
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-950/80">
                    <Terminal className="w-12 h-12 text-slate-700" />
                  </div>
                )}
                <span className="absolute top-4 left-4 bg-background/90 dark:bg-background/90 text-electric border border-electric/30 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  {project.category}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-electric transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold italic">{project.subtitle}</p>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed flex-grow">
                  {project.description}
                </p>

                {/* Technology Badges */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Card Footer Links */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-4">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 text-xs font-bold transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source</span>
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 dark:text-slate-400 hover:text-electric flex items-center gap-1 text-xs font-bold transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-electric font-semibold text-xs flex items-center gap-1 hover:underline"
                  >
                    <span>Details</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Case Study Details Slide-out Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Sliding Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 w-full max-w-xl bg-slate-50 dark:bg-background h-full z-50 p-6 md:p-8 overflow-y-auto shadow-2xl border-l border-slate-200 dark:border-white/10 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start border-b border-slate-200 dark:border-white/10 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-electric bg-electric/10 border border-electric/25 px-2.5 py-0.5 rounded-full">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white pt-1.5 leading-tight">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{selectedProject.subtitle}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-500 hover:text-slate-800 dark:hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Details Metrics Grid */}
                {selectedProject.details && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Key Performance</span>
                      <span className="text-lg font-extrabold text-electric leading-none">
                        {selectedProject.details.keyMetricVal}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block pt-0.5">({selectedProject.details.keyMetric})</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Core Method</span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block truncate pt-1">
                        {selectedProject.details.modelType}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block pt-0.5">({selectedProject.details.datasetSize})</span>
                    </div>
                  </div>
                )}

                {/* Challenge Section */}
                {selectedProject.challenge && (
                  <div className="space-y-2 p-5 rounded-xl border border-rose-500/20 bg-rose-500/5">
                    <h4 className="text-xs font-black text-rose-500 dark:text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4" />
                      <span>The Challenge</span>
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>
                )}

                {/* Methodology Section */}
                {selectedProject.methodology && (
                  <div className="space-y-2 p-5 rounded-xl border border-electric/20 bg-electric/5">
                    <h4 className="text-xs font-black text-electric uppercase tracking-widest flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" />
                      <span>Data pipeline & Methodology</span>
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedProject.methodology}
                    </p>
                  </div>
                )}

                {/* Business Impact Section */}
                {selectedProject.impact && (
                  <div className="space-y-2 p-5 rounded-xl border border-neon-emerald/20 bg-neon-emerald/5">
                    <h4 className="text-xs font-black text-neon-emerald uppercase tracking-widest flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" />
                      <span>Business Impact</span>
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedProject.impact}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom buttons */}
              <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-white/10 mt-8">
                {selectedProject.githubLink && (
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-200 dark:border-white/10 text-center text-xs font-bold text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {selectedProject.liveLink && (
                  <a
                    href={selectedProject.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-electric to-neon-blue text-center text-xs font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Launch Project</span>
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
