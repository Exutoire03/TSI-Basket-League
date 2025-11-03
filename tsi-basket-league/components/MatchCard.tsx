import React from 'react';

interface MatchCardProps {
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  date: string;
}

const MatchCard: React.FC<MatchCardProps> = ({ team1, team2, score1, score2, date }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold">{team1}</span>
        <span>{score1}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold">{team2}</span>
        <span>{score2}</span>
      </div>
      <div className="text-sm text-gray-500 mt-2">{date}</div>
    </div>
  );
};

export default MatchCard;
