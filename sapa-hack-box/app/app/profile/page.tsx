"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../context/auth-context"
import { motion } from "framer-motion"
import { LogOut, Shield, User, Award, Trophy, RefreshCw } from "lucide-react"
import UserLevel from "../components/UserLevel"

export default function Profile() {
  const { user, logout, loading, getUserPoints } = useAuth()
  const [isClient, setIsClient] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userPoints, setUserPoints] = useState(0)
  const [isUpdatingPoints, setIsUpdatingPoints] = useState(false)

  // Verificar si estamos en el cliente y obtener los puntos una sola vez
  useEffect(() => {
    setIsClient(true)

    // Verificar si hay un usuario en localStorage directamente
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setIsAuthenticated(true)
        setUserPoints(parsedUser.puntos || 0)

        // Obtener los puntos actualizados una sola vez al cargar la página
        if (parsedUser.id) {
          fetchUserPoints()
        }
      }
    } catch (error) {
      console.error("Error verificando usuario en localStorage:", error)
    }
  }, [])

  // Función para obtener los puntos actualizados del usuario
  const fetchUserPoints = async () => {
    if (!user && !isAuthenticated) return

    setIsUpdatingPoints(true)
    try {
      const points = await getUserPoints()
      setUserPoints(points)
    } catch (error) {
      console.error("Error al obtener puntos:", error)
    } finally {
      setIsUpdatingPoints(false)
    }
  }

  // Si no hay usuario y estamos en el cliente, redirigir a login
  useEffect(() => {
    if (isClient && !loading && !user && !isAuthenticated) {
      console.log("No hay usuario autenticado, redirigiendo a login")
      window.location.href = "/auth/login"
    }
  }, [isClient, user, loading, isAuthenticated])

  // Si estamos cargando o no estamos en el cliente, mostrar cargando
  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-black to-emerald-900">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    )
  }

  // Si no hay usuario autenticado, mostrar mensaje
  if (!user && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-black to-emerald-900">
        <div className="text-white text-xl">No estás autenticado. Redirigiendo...</div>
      </div>
    )
  }

  // Obtener datos del usuario (del estado o localStorage)
  const userData =
    user ||
    (() => {
      try {
        const storedUser = localStorage.getItem("user")
        return storedUser ? JSON.parse(storedUser) : null
      } catch (error) {
        console.error("Error obteniendo usuario de localStorage:", error)
        return null
      }
    })()

  // Si no hay datos de usuario, mostrar error
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-black to-emerald-900">
        <div className="text-white text-xl">Error obteniendo datos del usuario</div>
      </div>
    )
  }

  // Definir los niveles y rangos (igual que en UserLevel.tsx)
  const LEVELS = [
    { level: 1, requiredPoints: 0, title: "HackerNoob", description: "Acabas de entrar en el mundo hacker" },
    {
      level: 5,
      requiredPoints: 10,
      title: "Script Kiddie",
      description: "Usas herramientas sin entender cómo funcionan",
    },
    { level: 10, requiredPoints: 25, title: "Aprendiz de Código", description: "Empiezas a entender los fundamentos" },
    { level: 15, requiredPoints: 50, title: "Cazador de Bugs", description: "Encuentras fallos por casualidad" },
    {
      level: 20,
      requiredPoints: 100,
      title: "Explorador de Redes",
      description: "Te mueves por las redes con soltura",
    },
    { level: 25, requiredPoints: 200, title: "Ingeniero Reverso", description: "Puedes desmontar sistemas simples" },
    {
      level: 30,
      requiredPoints: 350,
      title: "Analista de Malware",
      description: "Entiendes cómo funcionan las amenazas",
    },
    {
      level: 35,
      requiredPoints: 500,
      title: "Pentester Junior",
      description: "Realizas pruebas de penetración básicas",
    },
    { level: 40, requiredPoints: 750, title: "Hacker Ético", description: "Sigues metodologías de seguridad" },
    {
      level: 45,
      requiredPoints: 1000,
      title: "Cazador de Vulnerabilidades",
      description: "Encuentras fallos antes que nadie",
    },
    {
      level: 50,
      requiredPoints: 1500,
      title: "Maestro de Exploits",
      description: "Creas tus propias herramientas de ataque",
    },
    { level: 55, requiredPoints: 2000, title: "Ninja de la Red", description: "Te mueves sin ser detectado" },
    { level: 60, requiredPoints: 2500, title: "Arquitecto de Seguridad", description: "Diseñas sistemas seguros" },
    { level: 65, requiredPoints: 3000, title: "Mago del Kernel", description: "Manipulas el núcleo de los sistemas" },
    { level: 70, requiredPoints: 3500, title: "Señor de las Sombras", description: "Operas desde el anonimato total" },
    {
      level: 75,
      requiredPoints: 4000,
      title: "Ingeniero de 0-days",
      description: "Descubres vulnerabilidades desconocidas",
    },
    {
      level: 80,
      requiredPoints: 5000,
      title: "Leyenda del Ciberespacio",
      description: "Tu nombre es conocido en los foros",
    },
    {
      level: 85,
      requiredPoints: 6000,
      title: "Guardián del Ciberespacio",
      description: "Proteges infraestructuras críticas",
    },
    { level: 90, requiredPoints: 7500, title: "Oráculo Digital", description: "Predices ataques antes de que ocurran" },
    { level: 95, requiredPoints: 9000, title: "Fantasma en la Máquina", description: "Eres prácticamente invisible" },
    {
      level: 100,
      requiredPoints: 10000,
      title: "Dios de la Ciberseguridad",
      description: "Has alcanzado el nivel máximo de maestría",
    },
  ]

  // Encontrar el rango actual
  const points = userPoints > 0 ? userPoints : userData.puntos || 0
  const currentLevelData = LEVELS.filter((l) => l.requiredPoints <= points).pop() || LEVELS[0]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-black to-emerald-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-3xl shadow-2xl backdrop-filter backdrop-blur-lg border border-green-500/20 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <Shield className="inline-block text-green-400 w-16 h-16 mb-4" />
            <h1 className="text-3xl font-bold text-white">Perfil de Usuario</h1>
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#9eff00]/20 text-[#9eff00]">
              <Trophy className="mr-1 h-4 w-4" />
              {currentLevelData.title}
            </div>
          </motion.div>

          <div className="space-y-6">
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 p-3 rounded-full">
                  <User className="h-6 w-6 text-black" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">{userData.username}</h2>
                  <p className="text-gray-300">{userData.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#9eff00] p-3 rounded-full">
                    <Award className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Puntos</h2>
                    <p className="text-[#9eff00] font-bold">{points} puntos</p>
                  </div>
                </div>
                <button
                  onClick={fetchUserPoints}
                  disabled={isUpdatingPoints}
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                  title="Actualizar puntos"
                >
                  <RefreshCw className={`h-5 w-5 text-white ${isUpdatingPoints ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logout}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
            >
              <LogOut className="mr-2 h-5 w-5" />
              Cerrar Sesión
            </motion.button>
          </div>
        </div>

        {/* Componente de nivel de usuario */}
        <UserLevel points={points} />
      </motion.div>
    </div>
  )
}
