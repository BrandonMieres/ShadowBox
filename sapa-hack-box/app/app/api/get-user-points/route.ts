import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "ID de usuario requerido",
        },
        { status: 400 },
      )
    }

    console.log("🔍 [GET-USER-POINTS] Obteniendo puntos para el usuario:", userId)

    // Consultar los puntos del usuario en la base de datos
    const result = await sql`
      SELECT puntos FROM users WHERE id = ${userId}
    `

    if (result.rows.length === 0) {
      console.log("❌ [GET-USER-POINTS] Usuario no encontrado")
      return NextResponse.json(
        {
          success: false,
          error: "Usuario no encontrado",
        },
        { status: 404 },
      )
    }

    const points = result.rows[0].puntos || 0
    console.log("✅ [GET-USER-POINTS] Puntos obtenidos:", points)

    return NextResponse.json({
      success: true,
      points,
    })
  } catch (error) {
    console.error("❌ [GET-USER-POINTS] Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor",
        details: String(error),
      },
      { status: 500 },
    )
  }
}
