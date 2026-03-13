"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Server, X, ExternalLink } from "lucide-react"

interface ActiveMachine {
  id: string
  name: string
  startedAt: number
}

export default function ActiveMachineIndicator() {
  const [activeMachine, setActiveMachine] = useState<ActiveMachine | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Cargar información de la máquina activa
    const checkActiveMachine = () => {
      try {
        const storedActiveMachine = localStorage.getItem("activeMachine")
        if (storedActiveMachine) {
          setActiveMachine(JSON.parse(storedActiveMachine))
          setIsVisible(true)
        } else {
          setActiveMachine(null)
        }
      } catch (error) {
        console.error("Error loading active machine data:", error)
      }
    }

    // Verificar al cargar el componente
    checkActiveMachine()

    // Configurar un intervalo para actualizar el tiempo transcurrido
    const interval = setInterval(checkActiveMachine, 30000) // Verificar cada 30 segundos

    // Limpiar el intervalo al desmontar
    return () => clearInterval(interval)
  }, [])

  // Si no hay máquina activa, no mostrar nada
  if (!activeMachine || !isVisible) return null

  // Calcular tiempo transcurrido
  const getElapsedTime = () => {
    const elapsedMs = Date.now() - activeMachine.startedAt
    const minutes = Math.floor(elapsedMs / 60000)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    }
    return `${minutes}m`
  }

  // Cerrar el indicador temporalmente
  const hideIndicator = () => {
    setIsVisible(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-xs rounded-lg bg-[#1A1C1E] p-3 shadow-lg border border-gray-700">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <Server className="h-5 w-5 text-green-400 mr-2" />
          <div>
            <p className="text-sm font-medium text-white">
              Máquina activa: <span className="text-blue-400">{activeMachine.name}</span>
            </p>
            <p className="text-xs text-gray-400">Tiempo activo: {getElapsedTime()}</p>
          </div>
        </div>
        <button
          onClick={hideIndicator}
          className="ml-2 rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <Link
        href={`/machine/${activeMachine.id}`}
        className="mt-2 flex items-center justify-center rounded-md bg-blue-600/20 px-2 py-1 text-xs text-blue-400 hover:bg-blue-600/30"
      >
        <ExternalLink className="h-3 w-3 mr-1" />
        Ir a la máquina
      </Link>
    </div>
  )
}
