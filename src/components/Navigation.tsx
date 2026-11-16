"use client";

import React, { useState, useEffect } from 'react';
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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Hackathons', path: '/hackathons' },
    { name: 'Conferences', path: '/conferences' },
    { name: 'Workshops', path: '/workshops' },
    { name: 'Technical Talks', path: '/technical-talks' },
    { name: 'Team', path: '/team' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 pointer-events-none">
        <div 
          className={`max-w-5xl mx-auto transition-all duration-500 ease-in-out pointer-events-auto rounded-full ${
            scrolled 
              ? 'bg-white/85 dark:bg-[#060B12]/85 backdrop-blur-xl shadow-xl border border-slate-200/60 dark:border-white/10 py-2 px-5' 
              : 'bg-white/60 dark:bg-[#0D1826]/60 backdrop-blur-md border border-slate-200/40 dark:border-white/10 py-3.5 px-4'
          }`}
        >
          <div className="flex justify-between items-center h-12">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center pl-2">
              <Link href="/" className="group flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white shadow-sm flex items-center justify-center p-1 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src="/assets/ieee_cs.png"
                    alt="IEEE Logo"
                    width={24}
                    height={24}
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white hidden sm:block">
                  IEEE CS <span className="text-transparent bg-clip-text bg-gradient-to-r from-ieee-primary to-ieee-cyan">CU</span>
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1 bg-slate-200/50 dark:bg-[#060B18]/70 p-1 rounded-full border border-slate-300/40 dark:border-white/10">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link 
                    key={link.name}
                    href={link.path} 
                    className={`relative px-4 py-1.5 text-sm font-bold rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'text-white shadow-md' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 bg-gradient-to-r from-ieee-primary to-ieee-cyan rounded-full -z-10 shadow-md shadow-ieee-primary/30"></span>
                    )}
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 pr-1">
              <button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors focus:outline-none flex items-center justify-center shrink-0 border border-slate-200 dark:border-white/10"
                aria-label="Toggle theme"
              >
                {mounted ? (
                  resolvedTheme === 'dark' ? (
                    <Sun className="h-4 w-4 text-amber-400" />
                  ) : (
                    <Moon className="h-4 w-4 text-slate-700" />
                  )
                ) : (
                  <span className="w-4 h-4 block" />
                )}
              </button>

              <a
                href="https://www.ieee.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex bg-gradient-to-r from-ieee-primary to-ieee-cyan text-white px-5 py-2 rounded-full text-sm font-bold shadow-md shadow-ieee-primary/30 hover:shadow-lg hover:shadow-ieee-cyan/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Join Us
              </a>
              
              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 focus:outline-none border border-slate-200 dark:border-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-24 z-40 md:hidden bg-white/95 dark:bg-[#080E1E]/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/80 dark:border-white/10 p-6 overflow-hidden"
          >
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link 
                    key={link.name}
                    href={link.path} 
                    className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                      isActive 
                        ? 'bg-ieee-primary/15 text-ieee-primary dark:text-ieee-cyan' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 mt-2 border-t border-slate-100 dark:border-white/10">
                <a
                  href="https://www.ieee.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-gradient-to-r from-ieee-primary to-ieee-cyan text-white px-5 py-3 rounded-xl text-base font-bold shadow-md shadow-ieee-primary/30"
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
