import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { sql } from "@vercel/postgres"

export async function GET(request: Request) {
  try {
    // 1. Obtener el token de la cookie
    const cookieHeader = request.headers.get("cookie")
    if (!cookieHeader) {
      // Si no hay cookies, simplemente devolver que no está autenticado (sin error)
      return NextResponse.json(
        {
          authenticated: false,
          reason: "no-cookie",
        },
        { status: 200 },
      )
    }

    // 2. Extraer el token
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => {
        const [name, ...value] = c.split("=")
        return [name, value.join("=")]
      }),
    )

    const token = cookies.auth_token

    if (!token) {
      // Si no hay token, simplemente devolver que no está autenticado (sin error)
      return NextResponse.json(
        {
          authenticated: false,
          reason: "no-token",
        },
        { status: 200 },
      )
    }

    // 3. Verificar el token
    try {
      const secret = process.env.JWT_SECRET || "fallback_secret"
      const decoded = jwt.verify(token, secret) as { id: number }

      // 4. Obtener información del usuario
      try {
        const userResult = await sql`
          SELECT id, username, gmail FROM users WHERE id = ${decoded.id}
        `

        if (userResult.rows.length === 0) {
          return NextResponse.json(
            {
              authenticated: false,
              reason: "user-not-found",
            },
            { status: 200 },
          )
        }

        const user = userResult.rows[0]

        // 5. Devolver información del usuario
        return NextResponse.json(
          {
            authenticated: true,
            user: {
              id: user.id,
              username: user.username,
              email: user.gmail,
            },
          },
          { status: 200 },
        )
      } catch (dbError) {
        console.error("Error en consulta de base de datos:", dbError)
        return NextResponse.json(
          {
            authenticated: false,
            reason: "database-error",
            error: String(dbError),
          },
          { status: 200 },
        )
      }
    } catch (jwtError) {
      // Si el token no es válido, simplemente devolver que no está autenticado (sin error)
      console.log("Token no válido o expirado:", jwtError)
      return NextResponse.json(
        {
          authenticated: false,
          reason: "invalid-token",
        },
        { status: 200 },
      )
    }
  } catch (error) {
    console.error("Error general en verificación de autenticación:", error)
    // Siempre devolver una respuesta 200 con JSON válido
    return NextResponse.json(
      {
        authenticated: false,
        reason: "general-error",
      },
      { status: 200 },
    )
  }
}
