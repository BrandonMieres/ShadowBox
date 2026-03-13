import { db } from "@vercel/postgres"

// Función para inicializar la base de datos
export async function initializeDatabase() {
  try {
    // Verificar si la tabla de usuarios existe
    const tableExists = await db.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'users'
      )
    `)

    // Si la tabla no existe, crearla
    if (!tableExists.rows[0].exists) {
      await db.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `)
      console.log("Tabla de usuarios creada exitosamente")
    }

    return { success: true, message: "Base de datos inicializada correctamente" }
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      message: "Error al inicializar la base de datos",
    }
  }
}
