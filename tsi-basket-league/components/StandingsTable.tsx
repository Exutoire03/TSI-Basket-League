import React from 'react';

interface Standing {
  rank: number;
  team: string;
  wins: number;
  losses: number;
}

interface StandingsTableProps {
  standings: Standing[];
}

const StandingsTable: React.FC<StandingsTableProps> = ({ standings }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Rank</th>
          <th className="py-2 px-4 border-b">Team</th>
          <th className="py-2 px-4 border-b">Wins</th>
          <th className="py-2 px-4 border-b">Losses</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((standing) => (
          <tr key={standing.rank}>
            <td className="py-2 px-4 border-b text-center">{standing.rank}</td>
            <td className="py-2 px-4 border-b">{standing.team}</td>
            <td className="py-2 px-4 border-b text-center">{standing.wins}</td>
            <td className="py-2 px-4 border-b text-center">{standing.losses}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StandingsTable;
