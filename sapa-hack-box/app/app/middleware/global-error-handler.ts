import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Solo aplicar a rutas de API
  if (!request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Continuar con la solicitud
  try {
    const response = NextResponse.next()

    // Añadir encabezados para evitar caché
    response.headers.set("Cache-Control", "no-store, max-age=0")

    return response
  } catch (error) {
    console.error("❌ [GLOBAL-ERROR] Error no capturado en API:", error)

    // Devolver una respuesta de error estructurada
    return NextResponse.json(
      {
        success: false,
        message: "Error interno del servidor",
        error: error instanceof Error ? error.message : String(error),
        path: request.nextUrl.pathname,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

export const config = {
  matcher: "/api/:path*",
}
