'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Shield } from 'lucide-react';

// Définition des types pour les props du composant
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

interface MatchCardProps {
  match: Match;
  homeTeam: Team;
  awayTeam: Team;
}

// Traductions et styles des statuts
const STATUS_INFO = {
  finished: { label: 'Terminé', style: 'bg-gray-500/20 text-gray-300 border-gray-600' },
  live: { label: 'En Direct', style: 'bg-red-500/20 text-red-400 border-red-500 animate-pulse' },
  scheduled: { label: 'À venir', style: 'bg-blue-500/20 text-blue-400 border-blue-500' },
};

const MatchCard: React.FC<MatchCardProps> = ({ match, homeTeam, awayTeam }) => {

  const { status, score, date, venue } = match;
  const { label, style: statusStyle } = STATUS_INFO[status];

  const isFinished = status === 'finished';
  const homeWinner = isFinished && score.home > score.away;
  const awayWinner = isFinished && score.away > score.home;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div 
      className={`group relative flex flex-col bg-gray-800/40 backdrop-blur-md border border-gray-700 rounded-3xl shadow-lg 
                 transition-all duration-300 hover:border-yellow-400/50 hover:shadow-yellow-400/20 hover:shadow-2xl hover:scale-[1.02] overflow-hidden
                 ${status === 'live' ? 'ring-2 ring-red-500/50 shadow-red-500/20' : ''}`}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-yellow-400/0 to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:via-transparent group-hover:to-yellow-400/5 transition-all duration-500 pointer-events-none rounded-3xl"></div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
      </div>
      {/* Header de la carte avec le statut */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${statusStyle} shadow-lg`}>
          {label}
        </span>
      </div>
      
      {/* Live indicator particles */}
      {status === 'live' && (
        <div className="absolute top-4 left-4 z-10">
          <div className="relative">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
      )}

      {/* Corps de la carte */}
      <div className="flex-grow p-6 flex flex-col justify-center relative z-10">
        <div className="flex justify-around items-center text-center">
          
          {/* Équipe Domicile */}
          <div className={`flex flex-col items-center gap-3 transition-all duration-300 ${isFinished && !homeWinner ? 'opacity-60' : 'opacity-100'}`}>
            <div className="relative">
              <Image 
                src={homeTeam.logo} 
                alt={homeTeam.name} 
                width={88} 
                height={88} 
                className="h-20 w-20 md:h-24 md:w-24 object-contain rounded-full group-hover:scale-110 transition-transform duration-300" 
              />
              {homeWinner && (
                <div className="absolute -inset-2 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
              )}
            </div>
            <h3 className={`font-bold text-lg md:text-xl transition-colors duration-300 ${homeWinner ? 'text-yellow-400' : 'text-gray-100'}`}>
              {homeTeam.name}
            </h3>
          </div>

          {/* Score ou VS */}
          <div className="font-heading text-4xl md:text-5xl font-bold">
            {status === 'scheduled' ? (
              <span className="text-gray-600">VS</span>
            ) : (
              <div className="flex items-center gap-3">
                <span className={homeWinner ? 'text-yellow-400' : 'text-white'}>{score.home}</span>
                <span className="text-gray-500">-</span>
                <span className={awayWinner ? 'text-yellow-400' : 'text-white'}>{score.away}</span>
              </div>
            )}
          </div>

          {/* Équipe Extérieur */}
          <div className={`flex flex-col items-center gap-3 transition-all duration-300 ${isFinished && !awayWinner ? 'opacity-60' : 'opacity-100'}`}>
            <div className="relative">
              <Image 
                src={awayTeam.logo} 
                alt={awayTeam.name} 
                width={88} 
                height={88} 
                className="h-20 w-20 md:h-24 md:w-24 object-contain rounded-full group-hover:scale-110 transition-transform duration-300" 
              />
              {awayWinner && (
                <div className="absolute -inset-2 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
              )}
            </div>
            <h3 className={`font-bold text-lg md:text-xl transition-colors duration-300 ${awayWinner ? 'text-yellow-400' : 'text-gray-100'}`}>
              {awayTeam.name}
            </h3>
          </div>
        </div>

        {/* Barre de score pour les matchs terminés */}
        {isFinished && (
          <div className="mt-5 flex h-2 rounded-full overflow-hidden bg-gray-700 shadow-inner">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-500 relative overflow-hidden"
              style={{ width: `${(score.home / (score.home + score.away)) * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        )}
      </div>

      {/* Footer de la carte */}
      <div className="bg-black/20 border-t border-gray-700/50 px-4 py-3 md:px-6 relative z-10">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <div className="flex items-center gap-2 group-hover:text-yellow-400 transition-colors duration-300">
            <Calendar size={16} />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-2 group-hover:text-yellow-400 transition-colors duration-300">
            <MapPin size={16} />
            <span className="truncate max-w-[120px]">{venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;