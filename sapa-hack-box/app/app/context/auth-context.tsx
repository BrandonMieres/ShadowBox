"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define the User type
interface User {
  id: number | string
  username: string
  email: string
  puntos?: number
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  checkAuth: () => Promise<boolean>
  updateUserPoints: (newPoints: number) => void
  getUserPoints: () => Promise<number>
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true) // Iniciar como true para evitar parpadeos

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const loadUser = () => {
      try {
        console.log("🔍 Verificando usuario en localStorage")
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          console.log("✅ Usuario encontrado en localStorage:", parsedUser)
          setUser(parsedUser)
        } else {
          console.log("❌ No se encontró usuario en localStorage")
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error)
      } finally {
        setLoading(false)
      }
    }

    // Ejecutar inmediatamente
    loadUser()

    // Configurar un intervalo para verificar cada 30 segundos (30000 ms)
    const interval = setInterval(loadUser, 30000)

    // Limpiar intervalo al desmontar
    return () => clearInterval(interval)
  }, [])

  // Check authentication status
  const checkAuth = async (): Promise<boolean> => {
    try {
      // Verificar si hay un usuario en el estado
      if (user) {
        return true
      }

      // Intentar cargar desde localStorage como respaldo
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        return true
      }

      return false
    } catch (error) {
      console.error("Error checking auth:", error)
      return false
    }
  }

  // Login function
  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      setLoading(true)
      console.log("🔍 Iniciando proceso de login:", { email })

      // Llamar a la API de login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        console.log("✅ Login exitoso, guardando usuario:", data.user)

        // Guardar usuario en localStorage (con manejo de errores)
        try {
          localStorage.setItem("user", JSON.stringify(data.user))

          // Verificación inmediata después de guardar
          console.log("🔍 Verificando que el usuario se guardó correctamente")
          const storedUser = localStorage.getItem("user")
          console.log("Usuario guardado:", storedUser)

          // Disparar evento de login exitoso para mostrar el banner de cookies
          const loginSuccessEvent = new Event("loginSuccess")
          window.dispatchEvent(loginSuccessEvent)
        } catch (storageError) {
          console.error("Error guardando en localStorage:", storageError)
        }

        // Actualizar estado
        setUser(data.user)

        return {
          success: true,
          message: "Login exitoso",
        }
      } else {
        console.error("❌ Error en login:", data.error)
        return {
          success: false,
          message: data.error || "Error en el login",
        }
      }
    } catch (error: any) {
      console.error("❌ Error durante login:", error)
      return {
        success: false,
        message: error.message || "Error inesperado durante el login",
      }
    } finally {
      setLoading(false)
    }
  }

  // Register function
  const register = async (
    username: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      setLoading(true)
      console.log("🔍 Iniciando proceso de registro:", { username, email })

      // Llamar a la API de registro
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await response.json()

      if (data.success) {
        console.log("✅ Registro exitoso, guardando usuario:", data.user)

        // Guardar usuario en localStorage (con manejo de errores)
        try {
          localStorage.setItem("user", JSON.stringify(data.user))

          // Verificación inmediata después de guardar
          console.log("🔍 Verificando que el usuario se guardó correctamente")
          const storedUser = localStorage.getItem("user")
          console.log("Usuario guardado:", storedUser)

          // Disparar evento de login exitoso para mostrar el banner de cookies
          const loginSuccessEvent = new Event("loginSuccess")
          window.dispatchEvent(loginSuccessEvent)
        } catch (storageError) {
          console.error("Error guardando en localStorage:", storageError)
        }

        // Actualizar estado
        setUser(data.user)

        return {
          success: true,
          message: "Registro exitoso",
        }
      } else {
        console.error("❌ Error en registro:", data.error)
        return {
          success: false,
          message: data.error || "Error en el registro",
        }
      }
    } catch (error: any) {
      console.error("❌ Error durante registro:", error)
      return {
        success: false,
        message: error.message || "Error inesperado durante el registro",
      }
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    try {
      console.log("🚪 Cerrando sesión")

      // Llamar a la API de logout
      fetch("/api/auth/logout", {
        method: "POST",
      }).catch((error) => {
        console.error("Error durante logout:", error)
      })

      // Limpiar localStorage y estado
      localStorage.removeItem("user")
      setUser(null)

      // Usar window.location para redirección más confiable
      window.location.href = "/"
    } catch (error) {
      console.error("❌ Error durante logout:", error)
      setUser(null)
    }
  }

  // Función para actualizar los puntos del usuario en el estado y localStorage
  const updateUserPoints = (newPoints: number) => {
    if (user) {
      const updatedUser = { ...user, puntos: newPoints }
      setUser(updatedUser)

      // Actualizar en localStorage
      try {
        localStorage.setItem("user", JSON.stringify(updatedUser))
      } catch (error) {
        console.error("Error al actualizar puntos en localStorage:", error)
      }
    }
  }

  // Función para obtener los puntos actualizados del usuario desde la base de datos
  const getUserPoints = async (): Promise<number> => {
    if (!user || !user.id) return 0

    try {
      const response = await fetch("/api/get-user-points", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      })

      const data = await response.json()

      if (data.success) {
        // Actualizar los puntos en el estado y localStorage
        updateUserPoints(data.points)
        return data.points
      } else {
        console.error("Error al obtener puntos:", data.error)
        return user.puntos || 0
      }
    } catch (error) {
      console.error("Error al obtener puntos:", error)
      return user.puntos || 0
    }
  }

  // Provide the auth context to children
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        checkAuth,
        updateUserPoints,
        getUserPoints,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
