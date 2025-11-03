'use client';

import React from 'react';
import { useTheme } from './ThemeProvider';
import Link from 'next/link';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-lg dark:bg-background-dark transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="text-2xl md:text-3xl font-heading font-bold hover:text-accent transition-colors">
          TSI Basket League
        </Link>
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Link href="/" className="hover:text-accent transition-colors text-sm md:text-base">
            Accueil
          </Link>
          <Link href="/teams" className="hover:text-accent transition-colors text-sm md:text-base">
            Équipes
          </Link>
          <Link href="/matches" className="hover:text-accent transition-colors text-sm md:text-base">
            Matchs
          </Link>
          <Link href="/standings" className="hover:text-accent transition-colors text-sm md:text-base">
            Classement
          </Link>
        </nav>
        <button 
          onClick={toggleTheme}
          className="bg-accent hover:bg-opacity-80 text-primary font-bold py-2 px-4 rounded transition-all duration-300 dark:bg-opacity-80 dark:text-white"
          aria-label="Changer le thème"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Header;
