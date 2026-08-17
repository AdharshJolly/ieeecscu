import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-[#0a0f1c] border-t border-slate-200 dark:border-slate-800/50 mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-10 md:mb-0 max-w-sm">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center p-1.5">
                  <Image
                    src="/assets/ieee_cs.png"
                    alt="IEEE Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">IEEE CS</h2>
                  <p className="text-ieee-primary font-semibold text-sm">CHRIST University</p>
                </div>
              </div>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Empowering the next generation of computing professionals through innovation, leadership, and collaboration.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end w-full md:w-auto">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-ieee-primary/50"></span>
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/ieee-cscu/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200/50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-[#0A66C2] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/ieeecscu/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200/50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-1.5">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              &copy; {new Date().getFullYear()} IEEE CS CHRIST University. All Rights Reserved.
            </p>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
              Developed by <a href="https://linkedin.com/in/adharsh-jolly" target="_blank" rel="noopener noreferrer" className="hover:text-ieee-primary transition-colors">Adharsh Jolly</a>
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-ieee-primary transition-colors">Privacy Policy</Link>
            <a href="https://edu.ieee.org/in-cucs/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-ieee-primary hover:text-ieee-secondary transition-colors">
              Official Website
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
