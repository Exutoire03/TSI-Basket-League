import { NextResponse } from 'next/server';
import teams from '@/data/teams.json';

export async function GET() {
  return NextResponse.json(teams);
}
