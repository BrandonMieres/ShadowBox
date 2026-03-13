import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(request: Request) {
  try {
    // Obtener los datos de la solicitud
    const data = await request.json()
    const { userId, pointsEarned } = data

    console.log("🔍 Actualizando puntos para usuario:", userId)

    // Verificar que los datos necesarios estén presentes
    if (!userId || pointsEarned === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: "Se requieren userId y pointsEarned",
        },
        { status: 400 },
      )
    }

    // Actualizar los puntos del usuario
    await sql`
      UPDATE users 
      SET puntos = puntos + ${pointsEarned} 
      WHERE id = ${userId}
    `

    // Obtener los puntos actualizados del usuario
    const userResult = await sql`
      SELECT puntos FROM users WHERE id = ${userId}
    `

    const updatedPoints = userResult.rows[0].puntos

    return NextResponse.json({
      success: true,
      message: `Puntos actualizados correctamente. +${pointsEarned} puntos`,
      currentPoints: updatedPoints,
    })
  } catch (error: any) {
    console.error("❌ Error al actualizar puntos:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Error inesperado: ${error.message}`,
      },
      { status: 500 },
    )
  }
}
