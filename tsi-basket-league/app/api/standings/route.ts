import { NextResponse } from 'next/server';
import matches from '@/data/matches.json';
import teams from '@/data/teams.json';

interface TeamStats {
  [key: number]: { wins: number; losses: number };
}

export async function GET() {
  const teamStats: TeamStats = teams.reduce((acc, team) => {
    acc[team.id] = { wins: 0, losses: 0 };
    return acc;
  }, {} as TeamStats);

  matches.forEach(match => {
    if (match.status === 'finished') {
      if (match.score.home > match.score.away) {
        teamStats[match.homeTeamId].wins++;
        teamStats[match.awayTeamId].losses++;
      } else {
        teamStats[match.homeTeamId].losses++;
        teamStats[match.awayTeamId].wins++;
      }
    }
  });

  const standings = Object.entries(teamStats)
    .map(([teamId, stats]) => {
      const team = teams.find(t => t.id === parseInt(teamId));
      return {
        teamId: parseInt(teamId),
        teamName: team ? team.name : 'Unknown',
        wins: stats.wins,
        losses: stats.losses,
      };
    })
    .sort((a, b) => b.wins - a.wins);

  return NextResponse.json(standings);
}
