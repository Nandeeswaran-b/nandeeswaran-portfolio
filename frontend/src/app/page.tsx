'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import Internship from '@/components/internship';
import Projects from '@/components/projects';
import Certifications from '@/components/certifications';
import Achievements from '@/components/achievements';
import Contact from '@/components/contact';

const sections = [
  { id: 'home', Component: Hero, label: 'Home' },
  { id: 'about', Component: About, label: 'About' },
  { id: 'skills', Component: Skills, label: 'Skills' },
  { id: 'internships', Component: Internship, label: 'Internships' },
  { id: 'projects', Component: Projects, label: 'Projects' },
  { id: 'certifications', Component: Certifications, label: 'Certifications' },
  { id: 'achievements', Component: Achievements, label: 'Achievements' },
  { id: 'contact', Component: Contact, label: 'Contact' },
];

export default function Home() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const idx = sections.findIndex((s) => s.id === hash);
      if (idx !== -1) {
        setActiveIdx(idx);
      } else {
        setActiveIdx(0);
      }
    };

    // Check initial hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if focused on input, textarea or contenteditable element
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.hasAttribute('contenteditable'))
      ) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const next = Math.min(sections.length - 1, activeIdx + 1);
        window.location.hash = `#${sections[next].id}`;
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prev = Math.max(0, activeIdx - 1);
        window.location.hash = `#${sections[prev].id}`;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIdx]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-t-electric animate-spin"></div>
      </div>
    );
  }

  const navigateToSection = (id: string) => {
    window.location.hash = `#${id}`;
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 dark:bg-background relative">
      {/* Background Animated Blobs for Luxury Depth */}
      <div className="absolute top-10 left-10 -z-20 w-72 h-72 rounded-full bg-electric/5 dark:bg-electric/10 filter blur-[80px] animate-blob pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 -z-20 w-80 h-80 rounded-full bg-neon-blue/5 dark:bg-neon-blue/10 filter blur-[100px] animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 -z-20 w-96 h-96 rounded-full bg-neon-indigo/5 dark:bg-neon-indigo/10 filter blur-[120px] animate-blob animation-delay-4000 pointer-events-none"></div>

      {/* Slide Deck Container */}
      <motion.div
        animate={{ y: `-${activeIdx * 100}vh` }}
        transition={{ type: 'spring', damping: 28, stiffness: 90 }}
        className="h-full w-full flex flex-col"
      >
        {sections.map(({ id, Component }) => (
          <div
            key={id}
            id={`slide-${id}`}
            className="h-screen w-screen flex flex-col justify-start relative overflow-hidden shrink-0 pt-20"
          >
            {/* Scrollable inner frame to prevent any overflow cuts */}
            <div className="h-full w-full overflow-y-auto px-4 sm:px-6 md:px-8 py-6 select-text scrollbar-thin scrollbar-thumb-slate-700">
              <div className="max-w-5xl mx-auto pb-16">
                <Component />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Floating Side Dot Navigation Indicator (Right side) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col space-y-3.5 bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-2.5 rounded-full backdrop-blur-md">
        {sections.map((sec, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={sec.id}
              onClick={() => navigateToSection(sec.id)}
              className="relative group flex items-center justify-center focus:outline-none"
              aria-label={`Go to ${sec.label}`}
            >
              {/* Dot element */}
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-electric scale-125'
                    : 'bg-slate-400/60 dark:bg-slate-500/50 hover:bg-electric'
                }`}
              />

              {/* Tooltip Label */}
              <span className="absolute right-7 py-1 px-2.5 rounded-lg bg-slate-900/90 dark:bg-background border border-slate-200 dark:border-white/10 text-[9px] font-black text-white dark:text-slate-300 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all pointer-events-none whitespace-nowrap shadow-xl uppercase tracking-wider">
                {sec.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
