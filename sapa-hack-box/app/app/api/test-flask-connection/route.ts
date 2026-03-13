import { NextResponse } from "next/server"

export async function GET() {
  try {
    // URL del servidor Flask
    const flaskServerUrl = "https://13.51.146.239:5000/health"

    console.log("Verificando conexión con:", flaskServerUrl)

    // Configuración de la solicitud con timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 segundos de timeout

    try {
      // Hacer la solicitud al servidor Flask
      const response = await fetch(flaskServerUrl, {
        method: "GET",
        signal: controller.signal,
      })

      // Limpiar el timeout
      clearTimeout(timeoutId)

      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        return NextResponse.json({
          success: false,
          error: `El servidor respondió con: ${response.status} ${response.statusText}`,
        })
      }

      // Obtener la respuesta
      const data = await response.text()

      return NextResponse.json({
        success: true,
        message: "Conexión exitosa con el servidor Flask",
        response: data,
      })
    } catch (fetchError: any) {
      // Limpiar el timeout
      clearTimeout(timeoutId)

      // Manejar errores específicos de fetch
      if (fetchError.name === "AbortError") {
        return NextResponse.json({
          success: false,
          error: "La solicitud al servidor excedió el tiempo de espera (5s)",
        })
      }

      return NextResponse.json({
        success: false,
        error: `Error de conexión: ${fetchError.message}`,
      })
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: `Error inesperado: ${error.message}`,
    })
  }
}
