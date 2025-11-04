'use client';

import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-accent-secondary text-white py-8 mt-12 dark:bg-background-dark transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">TSI Basket League</h3>
            <p className="text-sm opacity-90">
              La ligue de basketball électronique de référence. 
              Suivez vos équipes favorites et ne ratez aucun match.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-accent transition-colors">Accueil</Link></li>
              <li><Link href="/teams" className="hover:text-accent transition-colors">Équipes</Link></li>
              <li><Link href="/matches" className="hover:text-accent transition-colors">Matchs</Link></li>
              <li><Link href="/standings" className="hover:text-accent transition-colors">Classement</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-bold mb-4">Contact</h4>
            <p className="text-sm opacity-90 mb-2">Email: contact@tsibasklleague.com</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-accent transition-colors">📘 Facebook</a>
              <a href="#" className="hover:text-accent transition-colors">📷 Instagram</a>
              <a href="#" className="hover:text-accent transition-colors">🐦 Twitter</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white border-opacity-20 pt-6 text-center text-sm">
          <p>&copy; 2025 TSI Basket League. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
