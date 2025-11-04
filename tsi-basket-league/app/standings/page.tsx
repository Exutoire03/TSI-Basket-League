'use client';

import React, { useState, useEffect } from 'react';
import StandingsTable from '@/components/StandingsTable';
import { Loader, Trophy } from 'lucide-react';

// Interface pour les données du classement
interface Standing {
  id: number;
  name: string;
  logo: string;
  wins: number;
  losses: number;
  pointsFor: number;
  pointsAgainst: number;
  gamesPlayed: number;
}

export default function StandingsPage() {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/standings');
        const data = await res.json();
        setStandings(data);
      } catch (error) {
        console.error("Erreur lors du chargement du classement:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-950 to-black text-gray-200 min-h-screen font-body">
      <div className="container mx-auto px-4 py-10">
        
        {/* En-tête de la page */}
        <header className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
            Classement de la Ligue
          </h1>
          <p className="text-lg text-gray-400 mt-3 max-w-2xl mx-auto">
            Suivez la course aux playoffs et découvrez qui dominera la saison régulière de la TSI Basket League.
          </p>
        </header>

        {/* Contenu principal */}
        <main className="animate-fade-in-up">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="animate-spin text-yellow-400" size={48} />
            </div>
          ) : standings.length > 0 ? (
            <StandingsTable standings={standings} />
          ) : (
            <div className="text-center py-16">
              <Trophy size={56} className="mx-auto text-gray-600" />
              <h3 className="mt-6 text-2xl font-semibold text-gray-400">Classement non disponible</h3>
              <p className="mt-2 text-gray-500">
                Les données du classement sont en cours de mise à jour. Veuillez réessayer plus tard.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
