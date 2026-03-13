import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    // Eliminar la cookie de autenticación
    cookies().delete("authToken")

    return NextResponse.json({
      success: true,
      message: "Sesión cerrada correctamente",
    })
  } catch (error) {
    console.error("Error en logout:", error)
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
