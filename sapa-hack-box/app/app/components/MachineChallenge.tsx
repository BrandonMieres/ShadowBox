"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, Award, Loader2, Lock, HelpCircle } from "lucide-react"
import { useAuth } from "../context/auth-context"

interface MachineChallengeProps {
  machineId: string | number
  machineName: string
}

export default function MachineChallenge({ machineId, machineName }: MachineChallengeProps) {
  const { user, updateUserPoints } = useAuth()
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [points, setPoints] = useState(0)
  const [challengeCompleted, setChallengeCompleted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const resetChallenge = () => {
    setPassword("")
    setError(null)
    setSuccess(null)
    setAttempts(0)
    setPoints(0)
    setChallengeCompleted(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      setError("Debes iniciar sesión para completar desafíos")
      return
    }

    if (!password.trim()) {
      setError("Por favor, ingresa una respuesta")
      return
    }

    setIsSubmitting(true)
    setError(null)
    setSuccess(null)

    try {
      // Verificar la respuesta
      const verifyResponse = await fetch("/api/verify-machine-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          machineId,
          password: password.trim(),
        }),
      })

      const verifyData = await verifyResponse.json()

      if (!verifyResponse.ok) {
        throw new Error(verifyData.error || "Error al verificar la respuesta")
      }

      setAttempts((prev) => prev + 1)

      if (verifyData.isCorrect) {
        // Calcular puntos basados en intentos
        const earnedPoints = Math.max(10 - attempts * 2, 1)

        // Actualizar puntos en la base de datos
        const updateResponse = await fetch("/api/update-user-points", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            pointsEarned: earnedPoints,
          }),
        })

        const updateData = await updateResponse.json()

        if (!updateResponse.ok) {
          throw new Error(updateData.error || "Error al actualizar puntos")
        }

        setPoints(earnedPoints)
        setSuccess(`¡Respuesta correcta! Has ganado ${earnedPoints} puntos.`)
        setChallengeCompleted(true)

        // Actualizar los puntos en el contexto y localStorage una sola vez
        if (typeof updateUserPoints === "function") {
          updateUserPoints(updateData.currentPoints)
        }
      } else {
        setError("Respuesta incorrecta. Inténtalo de nuevo.")
      }
    } catch (err: any) {
      setError(err.message || "Error al verificar la respuesta")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 rounded-lg border border-[#9eff00]/30 bg-black/50 p-6 backdrop-blur-md"
    >
      <div className="flex items-center gap-3 mb-4">
        <Award className="h-6 w-6 text-[#9eff00]" />
        <h3 className="text-xl font-bold text-white">Desafío de la Máquina</h3>
      </div>

      <div className="mb-4">
        <p className="text-gray-300">
          Responde correctamente a las preguntas sobre <span className="text-[#9eff00] font-medium">{machineName}</span>{" "}
          para ganar puntos.
        </p>
      </div>

      {!user && (
        <div className="bg-yellow-900/50 border border-yellow-500 text-yellow-200 px-4 py-3 rounded relative mb-4 flex items-center">
          <Lock className="h-5 w-5 mr-2 text-yellow-400" />
          <span>Debes iniciar sesión para completar desafíos y ganar puntos.</span>
        </div>
      )}

      {success && (
        <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded relative mb-4 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded relative mb-4 flex items-center">
          <XCircle className="h-5 w-5 mr-2 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-[#9eff00]" />
        </div>
      ) : !challengeCompleted && user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="challenge-password" className="block text-sm font-medium text-gray-300 mb-1">
              Pregunta 1: ¿Cuál es la contraseña de esta máquina?
            </label>
            <input
              type="text"
              id="challenge-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu respuesta"
              className="w-full px-4 py-2 bg-gray-800 bg-opacity-50 border border-gray-700 focus:border-[#9eff00] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#9eff00] focus:border-transparent transition-all duration-300"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#9eff00] text-black rounded-md hover:bg-[#8be000] transition-colors flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Verificando...
                </>
              ) : (
                "Enviar Respuesta"
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-[#1A1C1E] p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-[#9eff00]" />
              <span className="text-white font-medium">Desafío completado</span>
            </div>
            <div className="bg-[#9eff00]/20 px-3 py-1 rounded-full">
              <span className="text-[#9eff00] font-bold">+{points} puntos</span>
            </div>
          </div>
          <p className="text-gray-400 mt-2 text-sm">¡Felicidades! Has completado el desafío de esta máquina.</p>
          <button
            onClick={resetChallenge}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
          >
            Intentar de nuevo
          </button>
        </div>
      )}

      {attempts > 0 && !challengeCompleted && (
        <div className="mt-4 flex items-center text-xs text-gray-400">
          <span>Intentos: {attempts}</span>
          <div className="ml-4 flex items-center group relative">
            <HelpCircle className="h-4 w-4 text-gray-500 cursor-help" />
            <span className="ml-1 cursor-help">Pista</span>
            <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48">
              Intenta con una contraseña común o relacionada con el nombre de la máquina
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
