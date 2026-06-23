import React from 'react';
import { Github, Linkedin, Code } from 'lucide-react';
import { personalInfo } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-100 dark:bg-[#02040a] border-t border-slate-200 dark:border-white/5 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          
          {/* Logo Brand */}
          <div>
            <span className="font-bold text-lg bg-gradient-to-r from-slate-900 via-slate-700 to-electric dark:from-white dark:via-slate-300 dark:to-electric bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto md:mx-0">
              Aspiring Data Scientist | AI & Data Science Student at SNS College of Engineering.
            </p>
          </div>

          {/* Social Row */}
          <div className="flex flex-col items-center">
            <h3 className="text-xs font-semibold text-slate-700 dark:text-white tracking-wider uppercase">Connect</h3>
            <div className="flex space-x-4 mt-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-slate-800 dark:hover:text-white p-2.5 rounded-lg bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 transition-all"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-slate-850 dark:hover:text-white p-2.5 rounded-lg bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 transition-all"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Details credits */}
          <div className="text-center md:text-right text-sm text-slate-500 dark:text-slate-400">
            <p className="flex items-center justify-center md:justify-end gap-1">
              <span>Made by Nandeeswaran B</span>
            </p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-500 flex items-center justify-center md:justify-end gap-1">
              <Code className="w-3.5 h-3.5" /> Next.js + Tailwind + Framer Motion
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/5 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Nandeeswaran B. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
