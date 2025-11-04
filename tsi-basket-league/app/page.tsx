'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import TeamCard from '@/components/TeamCard';

interface Team {
  id: number;
  name: string;
  city: string;
  logo: string;
  mainColor: string;
  secondaryColor: string;
}

interface Match {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  score: { home: number; away: number };
  status: string;
  date: string;
  location: string;
}

interface Standing {
  teamId: number;
  teamName: string;
  wins: number;
  losses: number;
}

export default function Home() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamsRes, matchesRes, standingsRes] = await Promise.all([
          fetch('/api/teams'),
          fetch('/api/matches'),
          fetch('/api/standings')
        ]);

        const teamsData = await teamsRes.json();
        const matchesData = await matchesRes.json();
        const standingsData = await standingsRes.json();

        setTeams(teamsData);
        setMatches(matchesData);
        setStandings(standingsData.slice(0, 5));
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTeamName = (teamId: number) => {
    return teams.find(t => t.id === teamId)?.name || 'Équipe inconnue';
  };

  const recentMatches = matches.filter(m => m.status === 'finished').slice(-3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-heading text-text-primary dark:text-text-light">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="bg-background dark:bg-background-dark text-text-primary dark:text-text-light transition-colors duration-300">
      {/* Section Hero */}
      <section className="bg-gradient-to-br from-accent-secondary to-primary text-white py-20 px-4 dark:from-accent-secondary dark:to-primary">
        <div className="container mx-auto text-center animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 animate-slide-up">
              TSI Basket League
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up-delay">
              La ligue de basketball électronique de référence. Suivez vos équipes favorites et ne ratez aucun match.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay">
              <Link 
                href="/teams"
                className="bg-accent text-accent-secondary font-bold py-3 px-8 rounded-lg hover:bg-hover transition-all transform hover:scale-105 shadow-lg"
              >
                Voir les équipes
              </Link>
              <Link 
                href="/standings"
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-accent-secondary transition-all transform hover:scale-105"
              >
                Consulter le classement
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Résultats récents */}
      <section className="py-16 px-4 bg-background dark:bg-background-dark">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold mb-10 text-center animate-slide-up text-text-primary dark:text-text-light">
            Résultats récents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentMatches.length > 0 ? recentMatches.map((match) => (
              <div 
                key={match.id} 
                className="bg-background-secondary dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl hover:bg-hover transition-all transform hover:-translate-y-1 border-l-4 border-accent"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg text-text-primary dark:text-text-light">{getTeamName(match.homeTeamId)}</span>
                  <span className="text-2xl font-bold text-accent">{match.score.home}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg text-text-primary dark:text-text-light">{getTeamName(match.awayTeamId)}</span>
                  <span className="text-2xl font-bold text-accent">{match.score.away}</span>
                </div>
                <div className="text-sm text-text-secondary dark:text-gray-400 pt-4 border-t border-border dark:border-gray-700">
                  {formatDate(match.date)}
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center text-text-secondary">
                Aucun résultat récent
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section Classement Top 5 */}
      <section className="py-16 px-4 bg-background-secondary dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold mb-10 text-center animate-slide-up text-text-primary dark:text-text-light">
            Classement - Top 5
          </h2>
          <div className="bg-background dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-accent-secondary text-white dark:bg-background-dark">
                  <tr>
                    <th className="px-6 py-4 text-left font-heading">Rang</th>
                    <th className="px-6 py-4 text-left font-heading">Équipe</th>
                    <th className="px-6 py-4 text-center font-heading">Victoires</th>
                    <th className="px-6 py-4 text-center font-heading">Défaites</th>
                    <th className="px-6 py-4 text-center font-heading">% Victoires</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((standing, index) => (
                    <tr 
                      key={standing.teamId} 
                      className="border-b border-border dark:border-gray-700 hover:bg-hover dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 font-bold text-accent">#{index + 1}</td>
                      <td className="px-6 py-4 font-semibold text-text-primary dark:text-text-light">{standing.teamName}</td>
                      <td className="px-6 py-4 text-center text-success">{standing.wins}</td>
                      <td className="px-6 py-4 text-center text-alert">{standing.losses}</td>
                      <td className="px-6 py-4 text-center text-text-primary dark:text-text-light">
                        {standing.wins + standing.losses > 0 
                          ? ((standing.wins / (standing.wins + standing.losses)) * 100).toFixed(0) 
                          : 0}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/standings"
              className="inline-block bg-accent-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Voir le classement complet
            </Link>
          </div>
        </div>
      </section>

      {/* Section Équipes en vedette */}
      <section className="py-16 px-4 bg-background dark:bg-background-dark">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold mb-10 text-center animate-slide-up text-text-primary dark:text-text-light">
            Équipes en vedette
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teams.map((team) => (
              <div key={team.id} className="animate-fade-in">
                <TeamCard logo={team.logo} name={team.name} city={team.city} />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/teams"
              className="inline-block bg-accent text-accent-secondary font-bold py-3 px-8 rounded-lg hover:bg-hover transition-all transform hover:scale-105 shadow-lg"
            >
              Découvrir toutes les équipes
            </Link>
          </div>
        </div>
      </section>

      {/* Section CTA Finale */}
      <section className="py-20 px-4 bg-gradient-to-r from-accent-secondary to-primary text-white dark:from-accent-secondary dark:to-primary">
        <div className="container mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Rejoignez la communauté
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Ne manquez aucune action de la TSI Basket League. Suivez les matchs en direct, consultez les statistiques et restez informé de tous les événements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/matches"
              className="bg-accent text-accent-secondary font-bold py-3 px-8 rounded-lg hover:bg-hover transition-all transform hover:scale-105 shadow-lg"
            >
              Explorer les matchs
            </Link>
            <Link 
              href="/standings"
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-accent-secondary transition-all transform hover:scale-105"
            >
              Suivre la ligue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
