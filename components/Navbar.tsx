
import React, { useState } from 'react';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-xl border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <a href="#/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tighter brand-font text-amber-500">SGG</span>
              <span className="text-xl font-light tracking-widest hidden sm:block">EXPORT</span>
            </a>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-amber-500 transition-colors duration-200 text-sm font-medium uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href="#/admin" 
              className="hidden lg:block bg-amber-600 hover:bg-amber-700 px-5 py-2 rounded-full text-xs font-bold transition-all shadow-lg hover:shadow-amber-500/20"
            >
              ADMIN PANEL
            </a>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-slate-300 hover:text-white"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium border-b border-slate-700 hover:bg-slate-700"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#/admin" 
              className="block px-3 py-4 text-amber-500 font-bold"
            >
              Admin Panel
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
