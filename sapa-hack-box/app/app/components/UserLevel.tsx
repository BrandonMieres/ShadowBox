"use client"
import { motion } from "framer-motion"
import { Trophy, Star, TrendingUp, Award } from "lucide-react"

interface UserLevelProps {
  points: number
}

// Definir los niveles, puntos requeridos y rangos
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
  { level: 20, requiredPoints: 100, title: "Explorador de Redes", description: "Te mueves por las redes con soltura" },
  { level: 25, requiredPoints: 200, title: "Ingeniero Reverso", description: "Puedes desmontar sistemas simples" },
  {
    level: 30,
    requiredPoints: 350,
    title: "Analista de Malware",
    description: "Entiendes cómo funcionan las amenazas",
  },
  { level: 35, requiredPoints: 500, title: "Pentester Junior", description: "Realizas pruebas de penetración básicas" },
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

export default function UserLevel({ points }: UserLevelProps) {
  // Encontrar el nivel actual y el siguiente nivel
  const currentLevelData = LEVELS.filter((l) => l.requiredPoints <= points).pop() || LEVELS[0]
  const nextLevelIndex = LEVELS.findIndex((l) => l === currentLevelData) + 1
  const nextLevelData = nextLevelIndex < LEVELS.length ? LEVELS[nextLevelIndex] : null

  // Calcular el progreso hacia el siguiente nivel
  let progressPercentage = 100
  let pointsForNextLevel = 0
  let pointsProgress = 0

  if (nextLevelData) {
    const currentLevelPoints = currentLevelData.requiredPoints
    const nextLevelPoints = nextLevelData.requiredPoints
    pointsForNextLevel = nextLevelPoints - currentLevelPoints
    pointsProgress = points - currentLevelPoints
    progressPercentage = Math.min(100, Math.round((pointsProgress / pointsForNextLevel) * 100)) || 0
  }

  // Si está en el nivel máximo
  const isMaxLevel = currentLevelData.level === LEVELS[LEVELS.length - 1].level

  return (
    <div className="bg-black bg-opacity-50 p-6 rounded-xl border border-[#9eff00]/30 backdrop-filter backdrop-blur-lg">
      <div className="flex items-center gap-3 mb-4">
        <Trophy className="h-6 w-6 text-[#9eff00]" />
        <h3 className="text-xl font-bold text-white">Nivel y Rango</h3>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-[#9eff00] text-black font-bold rounded-full w-8 h-8 flex items-center justify-center">
              {currentLevelData.level}
            </div>
            <span className="text-white font-medium">Nivel {currentLevelData.level}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-[#9eff00]" />
            <span className="text-white font-bold">{points} puntos</span>
          </div>
        </div>

        <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Award className="h-5 w-5 text-[#9eff00]" />
            <h4 className="text-lg font-bold text-white">{currentLevelData.title}</h4>
          </div>
          <p className="text-gray-300 text-sm">{currentLevelData.description}</p>
        </div>

        {/* Eliminado el aviso de puntos restantes */}
      </div>

      {!isMaxLevel && nextLevelData && (
        <>
          <div className="w-full bg-gray-800 rounded-full h-2.5 mb-2">
            <motion.div
              className="bg-[#9eff00] h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1 }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Nivel {currentLevelData.level}</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>Nivel {nextLevelData.level}</span>
            </div>
          </div>
        </>
      )}

      {isMaxLevel && (
        <div className="text-center text-[#9eff00] font-bold">¡Has alcanzado el nivel máximo! Eres una leyenda.</div>
      )}
    </div>
  )
}
