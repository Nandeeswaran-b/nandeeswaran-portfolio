'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Sun, Moon } from 'lucide-react';
import { useTheme } from './theme-provider';
import { personalInfo } from '@/lib/data';

const navItems = [
  { name: 'Home', target: '#home' },
  { name: 'About', target: '#about' },
  { name: 'Skills', target: '#skills' },
  { name: 'Internships', target: '#internships' },
  { name: 'Projects', target: '#projects' },
  { name: 'Certifications', target: '#certifications' },
  { name: 'Achievements', target: '#achievements' },
  { name: 'Contact', target: '#contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      setActiveSection(hash);
    };
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    setIsOpen(false);
    window.location.hash = target;
    setActiveSection(target);
  };

  const hasBackground = activeSection !== '#home' && activeSection !== '';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        hasBackground
          ? 'bg-slate-50/80 dark:bg-background/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center space-x-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-electric to-neon-blue flex items-center justify-center shadow-md shadow-electric/25 group-hover:scale-105 transition-transform">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-slate-900 via-slate-700 to-electric dark:from-white dark:via-slate-200 dark:to-electric bg-clip-text text-transparent group-hover:opacity-90">
              {personalInfo.name}
            </span>
          </a>
 
          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.target;
              return (
                <a
                  key={item.name}
                  href={item.target}
                  onClick={(e) => handleNavClick(e, item.target)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-electric dark:text-white bg-electric/5 dark:bg-white/10 shadow-sm border border-electric/10 dark:border-white/10'
                      : 'text-slate-500 dark:text-slate-400 hover:text-electric dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
             
             {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-electric dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all focus:outline-none"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu toggle & Theme toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 focus:outline-none"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-slate-50/90 dark:bg-background/90 backdrop-blur-lg border-b border-black/5 dark:border-white/5 shadow-2xl z-30 transition-all">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.target;
              return (
                <a
                  key={item.name}
                  href={item.target}
                  onClick={(e) => handleNavClick(e, item.target)}
                  className={`block px-4 py-2.5 rounded-lg text-base font-semibold transition-all ${
                    isActive
                      ? 'text-white bg-electric border border-electric/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-electric dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
