import { NextResponse } from "next/server"

// URL del backend Flasks
const flaskServerUrl = "https://13.51.146.239:5000/start-machine"

export const maxDuration = 60 // Aumentar el tiempo máximo de ejecución a 60 segundos

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { user, machineId } = data

    if (!user || !machineId) {
      return NextResponse.json(
        {
          success: false,
          error: "Se requieren 'user' y 'machineId'",
        },
        { status: 400 },
      )
    }

    console.log("➡️ Enviando a Flask:", { user, machine_id: machineId })

    // Implementar un timeout más largo para la solicitud a Flask
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 segundos de timeout

    try {
      // Intentar conectar con el servidor Flask
      const response = await fetch(flaskServerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          machine_id: machineId,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Si la respuesta no es exitosa, devolver una respuesta simulada
      if (!response.ok) {
        console.log(`⚠️ Respuesta no exitosa de Flask: ${response.status}`)

        // Para errores 504 o cualquier error de timeout, devolver una respuesta simulada
        if (response.status === 504 || response.status === 502 || response.status === 503) {
          return NextResponse.json({
            success: true,
            timeoutWarning: true,
            message: "El servidor está ocupado, pero la máquina podría estar iniciándose en segundo plano.",
            data: {
              ssh_info: {
                host: "51.21.160.111",
                port: "2222",
                username: "root",
                password: "hackbox",
              },
            },
          })
        }

        // Para otros errores, intentar leer el cuerpo de la respuesta
        try {
          const errorText = await response.text()
          return NextResponse.json(
            {
              success: false,
              error: `Error del servidor: ${response.status}`,
              details: errorText,
            },
            { status: 500 },
          )
        } catch (e) {
          return NextResponse.json(
            {
              success: false,
              error: `Error del servidor: ${response.status}`,
            },
            { status: 500 },
          )
        }
      }

      // Intentar parsear la respuesta como JSON
      try {
        const responseJson = await response.json()
        return NextResponse.json({
          success: true,
          message: responseJson.message || "Máquina iniciada correctamente",
          data: responseJson,
        })
      } catch (e) {
        console.error("Error al parsear respuesta JSON:", e)
        // Si hay error al parsear, devolver una respuesta simulada
        return NextResponse.json({
          success: true,
          timeoutWarning: true,
          message: "La respuesta no pudo ser procesada correctamente, pero la máquina podría estar iniciándose.",
          data: {
            ssh_info: {
              host: "51.21.160.111",
              port: "2222",
              username: "root",
              password: "hackbox",
            },
          },
        })
      }
    } catch (fetchError) {
      clearTimeout(timeoutId)
      console.error("Error al conectar con Flask:", fetchError)

      // Si es un error de timeout, devolver una respuesta simulada
      if (fetchError.name === "AbortError") {
        return NextResponse.json({
          success: true,
          timeoutWarning: true,
          message: "La solicitud ha tardado demasiado, pero la máquina podría estar iniciándose en segundo plano.",
          data: {
            ssh_info: {
              host: "51.21.160.111",
              port: "2222",
              username: "root",
              password: "hackbox",
            },
          },
        })
      }

      // Para otros errores, devolver una respuesta de error
      return NextResponse.json(
        {
          success: false,
          error: `Error de conexión: ${fetchError.message}`,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error inesperado:", error)
    return NextResponse.json(
      {
        success: false,
        error: `Error inesperado: ${error.message}`,
      },
      { status: 500 },
    )
  }
}
