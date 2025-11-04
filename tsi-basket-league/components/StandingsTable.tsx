'use client';

import React from 'react';
import Image from 'next/image';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Interface mise à jour pour correspondre aux données de l'API
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

interface StandingsTableProps {
  standings: Standing[];
}

// Composant pour la barre de ratio de victoires
const WinLossBar: React.FC<{ wins: number; losses: number }> = ({ wins, losses }) => {
  const total = wins + losses;
  if (total === 0) {
    return <div className="h-2 bg-gray-600 rounded-full"></div>;
  }
  const winPercentage = (wins / total) * 100;

  return (
    <div className="h-2 w-full bg-red-500/30 rounded-full overflow-hidden">
      <div 
        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
        style={{ width: `${winPercentage}%` }}
      ></div>
    </div>
  );
};

const StandingsTable: React.FC<StandingsTableProps> = ({ standings }) => {
  return (
    <div className="w-full max-w-5xl mx-auto font-body">
      {/* En-tête du tableau */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">
        <div className="col-span-1">#</div>
        <div className="col-span-4">Équipe</div>
        <div className="col-span-2 text-center">Victoires / Défaites</div>
        <div className="col-span-2 text-center">% Victoires</div>
        <div className="col-span-3 text-center">Diff. Points</div>
      </div>

      {/* Liste des équipes */}
      <div className="space-y-3">
        {standings.map((team, index) => {
          const rank = index + 1;
          const winPercentage = team.gamesPlayed > 0 ? ((team.wins / team.gamesPlayed) * 100).toFixed(1) : '0';
          const pointDifference = team.pointsFor - team.pointsAgainst;

          return (
            <div
              key={team.id}
              className="grid grid-cols-12 items-center gap-4 p-4 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg 
                         transition-all duration-300 hover:bg-gray-800 hover:border-yellow-400/50 hover:scale-[1.01] hover:shadow-yellow-400/10"
              style={{ animation: `slideUp 0.5s ease-out ${index * 0.05}s both` }}
            >
              {/* Rang */}
              <div className="col-span-2 md:col-span-1 flex items-center gap-4">
                <span className="text-xl font-bold text-yellow-400 w-8 text-center">{rank}</span>
              </div>

              {/* Nom de l'équipe */}
              <div className="col-span-10 md:col-span-4 flex items-center">
                <Image 
                  src={team.logo} 
                  alt={team.name} 
                  width={40} 
                  height={40} 
                  className="h-10 w-10 object-contain rounded-full mr-4 border-2 border-gray-600" 
                />
                <span className="font-bold text-lg text-gray-100 truncate">{team.name}</span>
              </div>

              {/* Victoires / Défaites (Mobile & Desktop) */}
              <div className="col-span-6 md:col-span-2 flex flex-col items-center justify-center">
                <div className="flex gap-3">
                  <span className="font-bold text-xl text-green-400">{team.wins}</span>
                  <span className="text-gray-500">-</span>
                  <span className="font-bold text-xl text-red-400">{team.losses}</span>
                </div>
                <div className="md:hidden text-xs text-gray-400">V - D</div>
              </div>

              {/* % Victoires (Desktop) */}
              <div className="hidden md:col-span-2 md:flex flex-col items-center justify-center">
                <span className="font-semibold text-lg text-gray-200">{winPercentage}%</span>
                <WinLossBar wins={team.wins} losses={team.losses} />
              </div>

              {/* Différence de points (Desktop) */}
              <div className="hidden md:col-span-3 md:flex items-center justify-center gap-2 font-semibold text-lg">
                {pointDifference > 0 ? (
                  <TrendingUp size={20} className="text-green-500" />
                ) : pointDifference < 0 ? (
                  <TrendingDown size={20} className="text-red-500" />
                ) : (
                  <Minus size={20} className="text-gray-500" />
                )}
                <span className={pointDifference > 0 ? 'text-green-400' : pointDifference < 0 ? 'text-red-400' : 'text-gray-400'}>
                  {pointDifference > 0 ? `+${pointDifference}` : pointDifference}
                </span>
              </div>

              {/* % Victoires (Mobile) */}
              <div className="col-span-6 md:hidden flex flex-col items-center justify-center">
                 <span className="font-semibold text-lg text-gray-200">{winPercentage}%</span>
                 <div className="text-xs text-gray-400">Ratio Victoires</div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StandingsTable;