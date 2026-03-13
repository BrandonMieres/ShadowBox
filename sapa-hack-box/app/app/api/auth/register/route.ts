import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    // 1. Obtener y validar los datos
    const { username, email, password } = await request.json()

    if (!username || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Faltan campos requeridos",
        },
        { status: 400 },
      )
    }

    // 2. Verificar si el usuario ya existe
    const existingUser = await sql`
      SELECT * FROM users WHERE gmail = ${email}
    `

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "El usuario ya existe",
        },
        { status: 400 },
      )
    }

    // 3. Hashear la contraseña
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // 4. Crear el usuario
    const result = await sql`
      INSERT INTO users (username, gmail, password)
      VALUES (${username}, ${email}, ${hashedPassword})
      RETURNING id, username, gmail
    `

    const user = result.rows[0]

    // 5. Generar una respuesta exitosa
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.gmail,
      },
    })
  } catch (error) {
    console.error("Error en registro:", error)
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
