import { NextResponse } from "next/server"
import players from "@/data/players.json"

// ✅ GET /api/players
// Renvoie tous les joueurs ou filtre selon le teamId fourni
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const teamId = searchParams.get("teamId")

    let filteredPlayers = players

    // Si teamId est fourni, filtre les joueurs de l'équipe correspondante
    if (teamId) {
      const id = parseInt(teamId, 10)
      filteredPlayers = filteredPlayers.filter((p) => p.teamId === id)
    }

    return NextResponse.json(filteredPlayers, { status: 200 })
  } catch (error) {
    console.error("Erreur API /players:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des joueurs" },
      { status: 500 }
    )
  }
}
