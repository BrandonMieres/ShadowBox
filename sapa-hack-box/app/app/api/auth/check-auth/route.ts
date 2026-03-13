import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Esta ruta simplemente devuelve un éxito para verificar que la API funciona
    return NextResponse.json({
      success: true,
      message: "API funcionando correctamente",
    })
  } catch (error) {
    console.error("Error en check-auth:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error interno del servidor",
      },
      { status: 500 },
    )
  }
}
