import { database as db } from "./db"
import { sql } from "@vercel/postgres"
import bcrypt from "bcryptjs"

// Interfaces
export interface User {
  id: number
  username: string
  gmail: string
  password?: string
  email: string
  created_at?: Date
}

export interface NewUser {
  username: string
  gmail: string
  password: string
}

export interface UserResponse {
  id: number
  username: string
  gmail: string
}

// Función para asegurar que la tabla users existe
export async function ensureUsersTable(): Promise<boolean> {
  try {
    console.log("🔍 [DB-OPS] Verificando si la tabla users existe")

    // Verificar si la tabla users existe
    const tableCheckResult = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'users'
      ) as exists
    `)

    const tableExists = tableCheckResult.rows[0].exists

    if (!tableExists) {
      console.log("⚠️ [DB-OPS] La tabla users no existe, creándola")

      // Crear la tabla users
      await db.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) NOT NULL,
          gmail VARCHAR(100) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `)

      console.log("✅ [DB-OPS] Tabla users creada correctamente")
      return true
    } else {
      console.log("✅ [DB-OPS] La tabla users ya existe")
      return true
    }
  } catch (error) {
    console.error("❌ [DB-OPS] Error al verificar/crear tabla users:", error)
    throw error
  }
}

// Función para buscar un usuario por gmail
export async function findUserByGmail(gmail: string): Promise<User | null> {
  try {
    console.log("🔍 [DB-OPS] Buscando usuario por gmail:", gmail)

    const result = await db.query("SELECT id, username, gmail, password FROM users WHERE gmail = $1", [gmail])

    if (result.rows.length === 0) {
      console.log("⚠️ [DB-OPS] Usuario no encontrado")
      return null
    }

    console.log("✅ [DB-OPS] Usuario encontrado:", { id: result.rows[0].id, username: result.rows[0].username })
    return result.rows[0]
  } catch (error) {
    console.error("❌ [DB-OPS] Error al buscar usuario por gmail:", error)
    throw error
  }
}

// Función para buscar un usuario por id
export async function findUserById(id: number): Promise<User | null> {
  try {
    console.log("🔍 [DB-OPS] Buscando usuario por id:", id)

    const result = await db.query("SELECT id, username, gmail FROM users WHERE id = $1", [id])

    if (result.rows.length === 0) {
      console.log("⚠️ [DB-OPS] Usuario no encontrado")
      return null
    }

    console.log("✅ [DB-OPS] Usuario encontrado:", { id: result.rows[0].id, username: result.rows[0].username })
    return result.rows[0]
  } catch (error) {
    console.error("❌ [DB-OPS] Error al buscar usuario por id:", error)
    throw error
  }
}

// Función para crear un nuevo usuario
export async function createUser(user: NewUser): Promise<UserResponse> {
  try {
    console.log("🔍 [DB-OPS] Creando nuevo usuario:", { username: user.username, gmail: user.gmail })

    const result = await db.query(
      `INSERT INTO users (username, gmail, password)
       VALUES ($1, $2, $3)
       RETURNING id, username, gmail`,
      [user.username, user.gmail, user.password],
    )

    console.log("✅ [DB-OPS] Usuario creado correctamente:", {
      id: result.rows[0].id,
      username: result.rows[0].username,
    })

    return result.rows[0]
  } catch (error) {
    console.error("❌ [DB-OPS] Error al crear usuario:", error)
    throw error
  }
}

// Ejemplo de función que usa una transacción
export async function createUserWithTransaction(user: NewUser): Promise<UserResponse> {
  return db.transaction(async (client) => {
    // Verificar si el usuario ya existe
    const checkResult = await client.query("SELECT id FROM users WHERE gmail = $1", [user.gmail])

    if (checkResult.rows.length > 0) {
      throw new Error("El usuario ya existe")
    }

    // Crear el usuario
    const result = await client.query(
      `INSERT INTO users (username, gmail, password)
       VALUES ($1, $2, $3)
       RETURNING id, username, gmail`,
      [user.username, user.gmail, user.password],
    )

    return result.rows[0]
  })
}

// Función para registrar un usuario
export async function registerUser(username: string, email: string, password: string) {
  try {
    // Verificar si el usuario ya existe
    const existingUser = await sql`
      SELECT * FROM users WHERE username = ${username} OR email = ${email}
    `

    if (existingUser.rows.length > 0) {
      return { success: false, message: "El usuario o email ya existe" }
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insertar el usuario
    const result = await sql`
      INSERT INTO users (username, email, password)
      VALUES (${username}, ${email}, ${hashedPassword})
      RETURNING id, username, email, created_at
    `

    return {
      success: true,
      user: result.rows[0],
      message: "Usuario registrado exitosamente",
    }
  } catch (error) {
    console.error("Error al registrar usuario:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      message: "Error al registrar usuario",
    }
  }
}

// Función para autenticar un usuario
export async function loginUser(username: string, password: string) {
  try {
    // Buscar el usuario
    const result = await sql`
      SELECT * FROM users WHERE username = ${username}
    `

    if (result.rows.length === 0) {
      return { success: false, message: "Usuario no encontrado" }
    }

    const user = result.rows[0]

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return { success: false, message: "Contraseña incorrecta" }
    }

    // No devolver la contraseña
    const { password: _, ...userWithoutPassword } = user

    return {
      success: true,
      user: userWithoutPassword,
      message: "Inicio de sesión exitoso",
    }
  } catch (error) {
    console.error("Error al autenticar usuario:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      message: "Error al autenticar usuario",
    }
  }
}

// Función para obtener un usuario por ID
export async function getUserById(id: number) {
  try {
    const result = await sql`
      SELECT id, username, email, created_at FROM users WHERE id = ${id}
    `

    if (result.rows.length === 0) {
      return { success: false, message: "Usuario no encontrado" }
    }

    return {
      success: true,
      user: result.rows[0],
      message: "Usuario encontrado",
    }
  } catch (error) {
    console.error("Error al obtener usuario:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      message: "Error al obtener usuario",
    }
  }
}
