import React from 'react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <div className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <img
                src="/assets/ieee_cs_cu.png"
                alt="IEEE CS CU Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="#" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
              Hackathons
            </Link>
            <Link href="#" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
              Conferences
            </Link>
            <Link href="#" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
              Workshops
            </Link>
            <Link href="#" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
              Technical Talks
            </Link>
          </nav>
          <div className="hidden md:flex items-center">
            <Link
              href="#"
              className="bg-black text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
