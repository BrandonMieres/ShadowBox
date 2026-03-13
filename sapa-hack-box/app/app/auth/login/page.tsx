"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react"
import { useAuth } from "../../context/auth-context"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { loading, login: loginUser, user } = useAuth()

  // Verificar si el usuario ya está autenticado
  useEffect(() => {
    // Si el usuario ya está autenticado, redirigir a perfil
    if (user) {
      console.log("Usuario ya autenticado, redirigiendo a perfil")
      window.location.href = "/profile"
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsSubmitting(true)

    try {
      // Use the login function from auth context
      const result = await loginUser(email, password)

      if (result.success) {
        // Mostrar mensaje de éxito
        setSuccess("Login exitoso. Redirigiendo...")

        // Redirección directa sin usar router ni componentes adicionales
        setTimeout(() => {
          window.location.href = "/profile"
        }, 1000)
      } else {
        setError(result.message || "Error al iniciar sesión")
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Determine if the form is in a loading state
  const isLoading = loading || isSubmitting

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-black to-emerald-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-filter backdrop-blur-lg border border-green-500/20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <Shield className="inline-block text-green-400 w-16 h-16 mb-4" />
            <h1 className="text-3xl font-bold text-white">Iniciar Sesión</h1>
          </motion.div>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded relative mb-4">
                <span className="block sm:inline">{error}</span>
              </div>
            </motion.div>
          )}

          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded relative mb-4">
                <span className="block sm:inline">{success}</span>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Correo Electrónico
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu correo electrónico"
                  className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 border border-green-500/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 pl-10"
                  required
                  disabled={isLoading}
                />
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-green-400" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 border border-green-500/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 pl-10"
                  required
                  disabled={isLoading}
                />
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-green-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white transition-colors duration-300"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Iniciar Sesión"}
              </motion.button>
            </motion.div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-400">
              ¿No tienes una cuenta?{" "}
              <Link
                href="/auth/register"
                className="font-medium text-green-400 hover:text-green-300 transition-colors duration-300"
              >
                Regístrate
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
