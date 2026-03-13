import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Función para hashear contraseñas
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

// Función para comparar contraseñas
export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Función para generar tokens JWT
export function generateToken(payload: { id: number; username: string; email: string }): string {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    console.error("❌ [AUTH-UTILS] JWT_SECRET no está definido en las variables de entorno")
    throw new Error("JWT_SECRET no está definido")
  }

  return jwt.sign(payload, secret, { expiresIn: "7d" })
}

// Función para verificar tokens JWT
export function verifyToken(token: string): { id: number; username: string; email: string } | null {
  try {
    const secret = process.env.JWT_SECRET

    if (!secret) {
      console.error("❌ [AUTH-UTILS] JWT_SECRET no está definido en las variables de entorno")
      return null
    }

    return jwt.verify(token, secret) as { id: number; username: string; email: string }
  } catch (error) {
    console.error("❌ [AUTH-UTILS] Error al verificar token:", error)
    return null
  }
}
