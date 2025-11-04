'use client';

import React, { useState, useEffect } from 'react';
import MatchCard from '@/components/MatchCard';
import { Loader, Trophy, ArrowUpDown, Clock, Zap } from 'lucide-react';

// Interfaces
interface Team {
  id: number;
  name: string;
  logo: string;
}

interface Match {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  score: { home: number; away: number };
  status: 'finished' | 'live' | 'scheduled';
  date: string;
  venue: string;
}

// Constants
const FILTER_TRANSLATIONS = {
  all: 'Tous',
  finished: 'Terminés',
  live: 'En Direct',
  scheduled: 'À venir',
};

// Main Component
export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [filter, setFilter] = useState<'all' | 'finished' | 'live' | 'scheduled'>('all');
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [nextMatch, setNextMatch] = useState<Match | null>(null);
  const [nextMatchHomeTeam, setNextMatchHomeTeam] = useState<Team | null>(null);
  const [nextMatchAwayTeam, setNextMatchAwayTeam] = useState<Team | null>(null);
  const [countdown, setCountdown] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [matchesRes, teamsRes] = await Promise.all([
          fetch('/api/matches'),
          fetch('/api/teams'),
        ]);
        const matchesData: Match[] = await matchesRes.json();
        const teamsData: Team[] = await teamsRes.json();
        setMatches(matchesData);
        setTeams(teamsData);

        // Find the next scheduled match
        const now = new Date();
        const upcomingMatches = matchesData
          .filter(m => new Date(m.date) > now && m.status === 'scheduled')
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        if (upcomingMatches.length > 0) {
          const next = upcomingMatches[0];
          setNextMatch(next);
          setNextMatchHomeTeam(teamsData.find(t => t.id === next.homeTeamId) || null);
          setNextMatchAwayTeam(teamsData.find(t => t.id === next.awayTeamId) || null);
        }

      } catch (error) {
        console.error("Erreur de chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Countdown timer for next match
  useEffect(() => {
    if (!nextMatch) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const matchTime = new Date(nextMatch.date).getTime();
      const distance = matchTime - now;

      if (distance < 0) {
        setCountdown('Le match a commencé!');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (days > 0) {
        setCountdown(`${days}j ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setCountdown(`${minutes}m ${seconds}s`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [nextMatch]);

  const getTeam = (id: number) => teams.find(t => t.id === id);

  const filteredMatches = matches
    .filter(match => {
      if (filter === 'all') return true;
      return match.status === filter;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  // Count matches by status
  const matchCounts = {
    all: matches.length,
    finished: matches.filter(m => m.status === 'finished').length,
    live: matches.filter(m => m.status === 'live').length,
    scheduled: matches.filter(m => m.status === 'scheduled').length,
  };

  // Group matches by date
  const groupedMatches = filteredMatches.reduce((groups, match) => {
    const date = new Date(match.date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(match);
    return groups;
  }, {} as Record<string, Match[]>);

  const formatDate = (dateString: string, includeTime = true) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit', month: 'short', year: 'numeric'
    };
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-200 min-h-screen font-body overflow-hidden">
      <div className="container mx-auto px-4 py-10">
        
        {/* En-tête */}
        <header className="text-center mb-12 animate-fade-in-down">
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-200">
            Calendrier des Matchs
          </h1>
          <p className="text-lg text-gray-400 mt-3 max-w-2xl mx-auto">
            Vibrez au rythme de la TSI Basket League. Retrouvez tous les scores, classements et actualités.
          </p>
          
          {/* Live indicator */}
          {matchCounts.live > 0 && (
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500 rounded-full animate-pulse">
              <Zap className="text-red-400" size={20} />
              <span className="text-red-400 font-bold">
                {matchCounts.live} match{matchCounts.live > 1 ? 's' : ''} en direct
              </span>
            </div>
          )}
        </header>

        {/* Hero Section - Prochain Match */}
        {!loading && nextMatch && nextMatchHomeTeam && nextMatchAwayTeam && (
          <section className="mb-16">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-heading font-bold text-yellow-400 mb-3">Prochain Match</h2>
              {countdown && (
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400/10 border border-yellow-400/30 rounded-full">
                  <Clock className="text-yellow-400" size={20} />
                  <span className="text-yellow-400 font-bold text-lg">{countdown}</span>
                </div>
              )}
            </div>
            <div className="max-w-4xl mx-auto">
              <MatchCard match={nextMatch} homeTeam={nextMatchHomeTeam} awayTeam={nextMatchAwayTeam} />
            </div>
          </section>
        )}

        {/* Filtres et Tri */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12 animate-fade-in">
          {/* Filtres */}
          <nav className="flex items-center bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full p-1.5 shadow-lg">
            {(['all', 'finished', 'live', 'scheduled'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`relative px-4 py-2 text-sm md:px-6 font-bold rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400
                  ${filter === status ? 'text-gray-900' : 'text-gray-300 hover:text-white'}
                `}
              >
                {filter === status && (
                  <span className="absolute inset-0 bg-yellow-400 rounded-full z-0 motion-safe:animate-expand"></span>
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {FILTER_TRANSLATIONS[status]}
                  <span className="text-xs opacity-75">({matchCounts[status]})</span>
                </span>
              </button>
            ))}
          </nav>

          {/* Bouton de tri */}
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full hover:border-yellow-400/50 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
          >
            <ArrowUpDown size={16} className="text-yellow-400" />
            <span className="text-sm font-bold text-gray-300">
              {sortOrder === 'asc' ? 'Plus anciens' : 'Plus récents'}
            </span>
          </button>
        </div>

        {/* Contenu principal */}
        <main>
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
              <Loader className="animate-spin text-yellow-400" size={48} />
              <p className="text-gray-400 text-lg">Chargement des matchs...</p>
            </div>
          ) : filteredMatches.length > 0 ? (
            <div className="space-y-12 motion-safe:animate-fade-in-up">
              {Object.entries(groupedMatches).map(([date, dateMatches], index) => (
                <div key={date} className="space-y-6">
                  {/* Date separator */}
                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
                    <h3 className="text-xl font-heading font-bold text-yellow-400 capitalize px-4">
                      {date}
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
                  </div>
                  
                  {/* Matches grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dateMatches.map(match => {
                      const homeTeam = getTeam(match.homeTeamId);
                      const awayTeam = getTeam(match.awayTeamId);
                      if (!homeTeam || !awayTeam) return null;

                      return (
                        <MatchCard key={match.id} match={match} homeTeam={homeTeam} awayTeam={awayTeam} />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <Trophy size={56} className="mx-auto text-gray-600 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-400 mb-2">Aucun match trouvé</h3>
              <p className="text-gray-500">
                Il n'y a pas de matchs correspondant à la catégorie "{FILTER_TRANSLATIONS[filter]}" pour le moment.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
