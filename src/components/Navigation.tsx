"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const isPast = window.scrollY > 20;
      setScrolled((prev) => (prev !== isPast ? isPast : prev));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = useCallback(() => {
    if (resolvedTheme) {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    } else {
      const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'light' : 'dark');
    }
  }, [resolvedTheme, setTheme]);

  const navLinks = [
    { name: 'Hackathons', path: '/hackathons' },
    { name: 'Conferences', path: '/conferences' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Technical Talks', path: '/technical-talks' },
    { name: 'Team', path: '/team' },
  ];

  return (
    <>
      <div 
        data-lenis-prevent
        className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-4 sm:px-6 pointer-events-none"
      >
        <div 
          className={`max-w-5xl mx-auto pointer-events-auto rounded-full transition-all duration-300 py-2.5 px-4 sm:px-5 ${
            scrolled 
              ? 'bg-white/50 dark:bg-[#070E1A]/50 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] border border-white/60 dark:border-white/15' 
              : 'bg-white/40 dark:bg-[#070E1A]/40 backdrop-blur-[8px] shadow-sm border border-white/50 dark:border-white/10'
          }`}
        >
          <div className="flex justify-between items-center h-11">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center pl-1 sm:pl-2">
              <Link 
                href="/" 
                className="group flex items-center gap-2.5 select-none touch-manipulation cursor-pointer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/90 shadow-sm flex items-center justify-center p-1 group-hover:scale-105 active:scale-95 transition-transform duration-200">
                  <Image
                    src="/assets/ieee_cs.png"
                    alt="IEEE Logo"
                    width={24}
                    height={24}
                    className="object-contain pointer-events-none"
                    priority
                  />
                </div>
                <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white hidden sm:block pointer-events-none">
                  IEEE CS <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-primary to-ieee-cyan">CU</span>
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1 bg-black/[0.04] dark:bg-white/[0.05] p-1 rounded-full border border-black/[0.04] dark:border-white/[0.08]">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link 
                    key={link.name}
                    href={link.path} 
                    prefetch={true}
                    className={`relative isolate px-3.5 lg:px-4 py-1.5 text-sm font-bold rounded-full transition-colors duration-200 select-none touch-manipulation cursor-pointer ${
                      isActive 
                        ? 'text-white shadow-md' 
                        : 'text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/10 active:bg-black/[0.08]'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 bg-gradient-to-r from-ieee-primary to-ieee-cyan rounded-full -z-10 shadow-md shadow-ieee-primary/30 pointer-events-none" />
                    )}
                    <span className="relative z-10 pointer-events-none">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2.5 sm:gap-3 pr-1">
              <button
                type="button"
                onClick={toggleTheme}
                className="w-9 h-9 p-2 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-slate-700 dark:text-slate-200 hover:bg-black/[0.08] dark:hover:bg-white/[0.12] active:scale-95 transition-all duration-200 focus:outline-none flex items-center justify-center shrink-0 border border-black/[0.04] dark:border-white/[0.08] touch-manipulation cursor-pointer select-none"
                aria-label="Toggle theme"
              >
                {mounted ? (
                  resolvedTheme === 'dark' ? (
                    <Sun className="h-4 w-4 text-amber-400 pointer-events-none" />
                  ) : (
                    <Moon className="h-4 w-4 text-slate-700 pointer-events-none" />
                  )
                ) : (
                  <span className="w-4 h-4 block pointer-events-none" />
                )}
              </button>

              <a
                href="https://www.ieee.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex bg-gradient-to-r from-ieee-primary to-ieee-cyan text-white px-5 py-2 rounded-full text-sm font-bold shadow-md shadow-ieee-primary/30 hover:shadow-lg hover:shadow-ieee-cyan/40 active:scale-95 transition-all duration-200 select-none touch-manipulation cursor-pointer"
              >
                Join Us
              </a>
              
              {/* Mobile Menu Toggle */}
              <button 
                type="button"
                className="md:hidden p-2 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-slate-700 dark:text-slate-200 active:scale-95 transition-transform duration-200 focus:outline-none border border-black/[0.04] dark:border-white/[0.08] touch-manipulation cursor-pointer select-none"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            data-lenis-prevent
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-x-4 top-20 z-50 md:hidden bg-white/70 dark:bg-[#070E1A]/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/60 dark:border-white/15 p-5 overflow-hidden"
          >
            <nav className="flex flex-col space-y-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link 
                    key={link.name}
                    href={link.path} 
                    prefetch={true}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-bold select-none touch-manipulation cursor-pointer transition-colors duration-150 ${
                      isActive 
                        ? 'bg-ieee-primary/15 text-ieee-primary dark:text-ieee-cyan' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-black/[0.05] dark:hover:bg-white/5 active:bg-black/[0.08] dark:active:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-3 mt-1 border-t border-slate-200/50 dark:border-white/10">
                <a
                  href="https://www.ieee.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-ieee-primary to-ieee-cyan text-white px-5 py-3 rounded-xl text-base font-bold shadow-md shadow-ieee-primary/30 active:scale-[0.99] touch-manipulation cursor-pointer select-none"
                >
                  Join Us
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
