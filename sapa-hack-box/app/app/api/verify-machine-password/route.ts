import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(request: Request) {
  try {
    const { machineId, password } = await request.json()

    if (!machineId || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Se requiere el ID de la máquina y la contraseña",
        },
        { status: 400 },
      )
    }

    // Consultar la respuesta correcta en la base de datos
    const result = await sql`
      SELECT respuesta FROM maquinas WHERE id = ${machineId}
    `

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Máquina no encontrada",
        },
        { status: 404 },
      )
    }

    const correctPassword = result.rows[0].respuesta
    const isCorrect = password === correctPassword

    return NextResponse.json({
      success: true,
      isCorrect,
      message: isCorrect ? "¡Respuesta correcta!" : "Respuesta incorrecta",
    })
  } catch (error: any) {
    console.error("Error al verificar la contraseña:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Error inesperado: ${error.message}`,
      },
      { status: 500 },
    )
  }
}
