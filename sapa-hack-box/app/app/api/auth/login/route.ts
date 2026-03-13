import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    // 1. Obtener y validar los datos
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Faltan campos requeridos",
        },
        { status: 400 },
      )
    }

    console.log("🔍 [SIMPLE-LOGIN] Buscando usuario con gmail:", email)

    // 2. Buscar el usuario en la base de datos
    const userResult = await sql`
      SELECT id, username, gmail, password, puntos FROM users WHERE gmail = ${email}
    `

    if (userResult.rows.length === 0) {
      console.log("❌ [SIMPLE-LOGIN] Usuario no encontrado")
      return NextResponse.json(
        {
          success: false,
          error: "Credenciales inválidas",
        },
        { status: 401 },
      )
    }

    const user = userResult.rows[0]
    console.log("✅ [SIMPLE-LOGIN] Usuario encontrado:", { id: user.id, username: user.username })

    // 3. Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      console.log("❌ [SIMPLE-LOGIN] Contraseña incorrecta")
      return NextResponse.json(
        {
          success: false,
          error: "Credenciales inválidas",
        },
        { status: 401 },
      )
    }

    console.log("✅ [SIMPLE-LOGIN] Contraseña correcta, login exitoso")
    console.log("📊 [SIMPLE-LOGIN] Puntos del usuario:", user.puntos || 0)

    // 4. Devolver los datos del usuario (sin la contraseña)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.gmail, // Mapear gmail a email para mantener consistencia en el frontend
        puntos: user.puntos || 0, // Incluir los puntos del usuario
      },
    })
  } catch (error) {
    console.error("❌ [SIMPLE-LOGIN] Error en login:", error)
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
