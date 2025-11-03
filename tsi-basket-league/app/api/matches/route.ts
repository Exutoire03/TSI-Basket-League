import { NextResponse } from 'next/server';
import matches from '@/data/matches.json';

export async function GET() {
  return NextResponse.json(matches);
}
