import { sql, db } from "@vercel/postgres"

// Exportar funciones para interactuar con la base de datos
export const database = {
  // Función para ejecutar consultas
  query: async (text: string, params?: any[]) => {
    console.log("🔍 [DB] Ejecutando consulta:", {
      text,
      params: params?.map((p) => (typeof p === "string" && p.length > 20 ? `${p.substring(0, 20)}...` : p)),
    })

    try {
      // Ejecutar la consulta con Vercel Postgres
      const result = await sql.query(text, params || [])
      return result
    } catch (error) {
      console.error("❌ [DB] Error al ejecutar consulta:", error)
      throw error
    }
  },

  // Función para ejecutar una transacción
  transaction: async (callback: (client: any) => Promise<any>) => {
    console.log("🔍 [DB] Iniciando transacción")

    try {
      // Iniciar transacción
      await sql`BEGIN`

      // Ejecutar callback con el cliente
      const result = await callback(sql)

      // Confirmar transacción
      await sql`COMMIT`

      console.log("✅ [DB] Transacción completada con éxito")
      return result
    } catch (error) {
      // Revertir transacción en caso de error
      console.error("❌ [DB] Error en transacción, revirtiendo:", error)
      await sql`ROLLBACK`
      throw error
    }
  },

  // Función para probar la conexión
  testConnection: async () => {
    try {
      const result = await sql`SELECT NOW() as time`
      return {
        success: true,
        time: result.rows[0]?.time,
        client: "Vercel Postgres",
      }
    } catch (error) {
      console.error("❌ [DB] Error al probar conexión:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        client: "Vercel Postgres",
      }
    }
  },
}

// Exportar el cliente SQL directamente para casos especiales
export { sql }

// Exportar la función de prueba de conexión para facilitar su uso
export const testConnection = database.testConnection

// Exportar el objeto db para acceso directo al pool de conexiones
export { db }
