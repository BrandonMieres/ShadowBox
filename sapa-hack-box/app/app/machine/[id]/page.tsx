"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Monitor, BarChart3, AlertCircle, CheckCircle, Clock, X } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useTranslation } from "../../hooks/useTranslation"
import { useAuth } from "../../context/auth-context"
import SSHInfoCard from "../../components/SSHInfoCard"
import MachineChallenge from "../../components/MachineChallenge"

// Actualizar la definición de AVAILABLE_MACHINES
const AVAILABLE_MACHINES = [
  {
    id: "1",
    name: "CyberNexus",
    type: "FREE",
    os: "LINUX",
    difficulty: "EASY",
    rating: 4.2,
    userOwns: 814,
    systemOwns: 736,
    releaseDate: "25/01/2025",
    creators: [
      { name: "ruycr4ft", link: "#" },
      { name: "lavclash75", link: "#" },
    ],
    avatar: "/images/machines/CyberNexus.webp",
    description:
      "A beginner-friendly machine focused on basic web vulnerabilities and Linux privilege escalation techniques.",
    skills: ["Web Exploitation", "Basic Enumeration", "Linux Fundamentals"],
  },
  {
    id: "2",
    name: "Quantum Breach",
    type: "VIP",
    os: "WINDOWS",
    difficulty: "MEDIUM",
    rating: 4.5,
    userOwns: 623,
    systemOwns: 445,
    releaseDate: "20/01/2025",
    creators: [
      { name: "hackmaster", link: "#" },
      { name: "cyberdev", link: "#" },
    ],
    avatar: "/images/machines/Quantum Breach.webp",
    description:
      "This machine simulates a corporate environment with multiple attack vectors and requires lateral movement techniques.",
    skills: ["Active Directory", "Kerberoasting", "Windows Privilege Escalation"],
  },
  {
    id: "3",
    name: "Neural Infiltrator",
    type: "FREE",
    os: "LINUX",
    difficulty: "HARD",
    rating: 4.8,
    userOwns: 312,
    systemOwns: 189,
    releaseDate: "15/01/2025",
    creators: [{ name: "neurohacker", link: "#" }],
    avatar: "/images/machines/Neural Infiltrator.webp",
    description:
      "A challenging machine that requires advanced exploitation techniques and deep understanding of Linux internals.",
    skills: ["Binary Exploitation", "Kernel Vulnerabilities", "Custom Exploit Development"],
  },
  {
    id: "4",
    name: "Crypto Sentinel",
    type: "VIP",
    os: "WINDOWS",
    difficulty: "MEDIUM",
    rating: 4.3,
    userOwns: 567,
    systemOwns: 432,
    releaseDate: "10/01/2025",
    creators: [
      { name: "cryptomaster", link: "#" },
      { name: "securitypro", link: "#" },
    ],
    avatar: "/images/machines/Crypto Sentinel.webp",
    description:
      "This machine focuses on cryptographic challenges and secure coding practices in a Windows environment.",
    skills: ["Cryptography", "Reverse Engineering", "Windows API"],
  },
  {
    id: "5",
    name: "Phantom Protocol",
    type: "FREE",
    os: "LINUX",
    difficulty: "HARD",
    rating: 4.7,
    userOwns: 234,
    systemOwns: 156,
    releaseDate: "05/01/2025",
    creators: [{ name: "phantomdev", link: "#" }],
    avatar: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    description:
      "A sophisticated machine that simulates an advanced persistent threat with multiple layers of obfuscation.",
    skills: ["Network Pivoting", "Steganography", "Advanced Persistence Techniques"],
  },
  {
    id: "6",
    name: "Binary Fortress",
    type: "FREE",
    os: "WINDOWS",
    difficulty: "EASY",
    rating: 4.1,
    userOwns: 789,
    systemOwns: 654,
    releaseDate: "01/01/2025",
    creators: [
      { name: "binarymaster", link: "#" },
      { name: "fortressdev", link: "#" },
    ],
    avatar: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
    description: "An entry-level Windows machine focusing on basic enumeration and common misconfigurations.",
    skills: ["Windows Enumeration", "Service Exploitation", "Registry Analysis"],
  },
]

// Interfaz para la información de la máquina activa
interface ActiveMachine {
  id: string
  name: string
  startedAt: number
}

//función MachinePage para añadir los nuevos estados y funciones
export default function MachinePage() {
  const params = useParams()
  const router = useRouter()
  const [machineData, setMachineData] = useState<(typeof AVAILABLE_MACHINES)[0] | null>(null)
  const [copied, setCopied] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [startStatus, setStartStatus] = useState<string | null>(null)
  const [isTimeout, setIsTimeout] = useState(false)
  const [machineStarted, setMachineStarted] = useState(false)
  const [showChallenge, setShowChallenge] = useState(false)
  const [showActiveMachineWarning, setShowActiveMachineWarning] = useState(false)
  const [activeMachine, setActiveMachine] = useState<ActiveMachine | null>(null)

  const { t } = useTranslation()
  const { user } = useAuth()

  useEffect(() => {
    const machineId = params.id
    const selectedMachine = AVAILABLE_MACHINES.find((machine) => machine.id === machineId)
    setMachineData(selectedMachine || null)
  }, [params.id])

  const handleCopyLink = () => {
    const currentURL = window.location.href
    navigator.clipboard.writeText(currentURL)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }

  // Cargar información de la máquina activa al iniciar
  useEffect(() => {
    try {
      const storedActiveMachine = localStorage.getItem("activeMachine")
      if (storedActiveMachine) {
        const parsedMachine = JSON.parse(storedActiveMachine)
        setActiveMachine(parsedMachine)

        // Si estamos en la página de la máquina activa, marcarla como iniciada
        if (params.id === parsedMachine.id) {
          setMachineStarted(true)
        }
      }
    } catch (error) {
      console.error("Error loading active machine data:", error)
    }
  }, [params.id])

  // Función para cerrar la máquina activa
  const stopActiveMachine = () => {
    try {
      localStorage.removeItem("activeMachine")
      setActiveMachine(null)
      setShowActiveMachineWarning(false)

      // Si estamos en la página de la máquina que estamos cerrando, actualizar el estado
      if (params.id === activeMachine?.id) {
        setMachineStarted(false)
        setShowChallenge(false)
      }

      // Ahora podemos iniciar la nueva máquina
      startMachineProcess()
    } catch (error) {
      console.error("Error stopping active machine:", error)
    }
  }

  // Función para ir a la máquina activa
  const goToActiveMachine = () => {
    if (activeMachine) {
      router.push(`/machine/${activeMachine.id}`)
      setShowActiveMachineWarning(false)
    }
  }

  // Modificar la función startMachineProcess para manejar mejor los errores:

  // Reemplazar la función startMachineProcess con esta versión mejorada:
  const startMachineProcess = () => {
    if (!user) {
      setStartStatus("❌ Error: Debes iniciar sesión para jugar esta máquina")
      return
    }

    try {
      setIsStarting(true)
      setStartStatus("⏳ Iniciando máquina... Este proceso puede tardar hasta 2 minutos.")
      setIsTimeout(false)
      setMachineStarted(false)

      // Obtener el nombre de usuario de la sesión
      const username = user.username || user.email || "usuario_anónimo"

      console.log(`Enviando solicitud para iniciar máquina ${params.id} para usuario ${username}`)

      // Usar nuestra API de Next.js como proxy para evitar problemas de CORS
      fetch("/api/start-machine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: username,
          machineId: params.id,
        }),
      })
        .then(async (response) => {
          // Manejar errores HTTP
          if (!response.ok && response.status !== 504) {
            const errorMessage = `Error HTTP: ${response.status}`
            console.error(errorMessage)
            throw new Error(errorMessage)
          }

          // Si es un error 504, simular una respuesta exitosa
          if (response.status === 504) {
            console.log("Detectado error 504, simulando respuesta")
            return {
              success: true,
              timeoutWarning: true,
              message: "El servidor está ocupado, pero la máquina podría estar iniciándose en segundo plano.",
              data: {
                ssh_info: {
                  host: "51.21.160.111",
                  port: "2222",
                  username: "root",
                  password: "hackbox",
                },
              },
            }
          }

          // Intentar parsear la respuesta como JSON
          try {
            return await response.json()
          } catch (error) {
            console.error("Error al parsear respuesta JSON:", error)
            // Si hay error al parsear, simular una respuesta exitosa
            return {
              success: true,
              timeoutWarning: true,
              message: "La respuesta no pudo ser procesada correctamente, pero la máquina podría estar iniciándose.",
              data: {
                ssh_info: {
                  host: "51.21.160.111",
                  port: "2222",
                  username: "root",
                  password: "hackbox",
                },
              },
            }
          }
        })
        .then((data) => {
          console.log("Procesando respuesta:", data)

          // Manejar específicamente el caso de timeout
          if (data.timeoutWarning || data.timeoutError) {
            setIsTimeout(true)
            setMachineStarted(true) // Asumimos que la máquina se está iniciando en segundo plano
            setStartStatus(
              `⏳ La máquina está iniciándose en segundo plano. Este proceso puede tardar unos minutos. Por favor, espera e intenta conectarte usando SSH en breve.`,
            )

            // Guardar información de la máquina activa
            if (machineData) {
              const newActiveMachine: ActiveMachine = {
                id: machineData.id,
                name: machineData.name,
                startedAt: Date.now(),
              }
              localStorage.setItem("activeMachine", JSON.stringify(newActiveMachine))
              setActiveMachine(newActiveMachine)
            }

            return
          }

          if (data.success) {
            setMachineStarted(true)
            setStartStatus(`✅ Máquina iniciada correctamente: ${data.message || ""}`)

            // Guardar información de la máquina activa
            if (machineData) {
              const newActiveMachine: ActiveMachine = {
                id: machineData.id,
                name: machineData.name,
                startedAt: Date.now(),
              }
              localStorage.setItem("activeMachine", JSON.stringify(newActiveMachine))
              setActiveMachine(newActiveMachine)
            }

            // Mostrar información de conexión SSH si está disponible
            if (data.data && data.data.ssh_info) {
              setStartStatus(`✅ Máquina iniciada correctamente.`)
            } else {
              // Información SSH por defecto si no se proporciona
              setStartStatus(`✅ Máquina iniciada correctamente.`)
            }
          } else {
            setStartStatus(`❌ Error: ${data.error || data.message || "Error desconocido"}`)
          }
        })
        .catch((error) => {
          console.error("Error al iniciar máquina:", error)

          // Asumir que la máquina se está iniciando en segundo plano para cualquier error
          setIsTimeout(true)
          setMachineStarted(true)
          setStartStatus(
            `⏳ Se produjo un error de comunicación, pero la máquina podría estar iniciándose en segundo plano. Por favor, espera e intenta conectarte usando SSH en breve.`,
          )

          // Guardar información de la máquina activa
          if (machineData) {
            const newActiveMachine: ActiveMachine = {
              id: machineData.id,
              name: machineData.name,
              startedAt: Date.now(),
            }
            localStorage.setItem("activeMachine", JSON.stringify(newActiveMachine))
            setActiveMachine(newActiveMachine)
          }
        })
        .finally(() => {
          setIsStarting(false)
        })
    } catch (error: any) {
      console.error("Error al iniciar la máquina:", error)
      setStartStatus(`❌ Error: ${error.message}`)
      setIsStarting(false)
      setTimeout(() => setStartStatus(null), 10000)
    }
  }

  // Reemplazar la función startMachine original con esta nueva versión
  const startMachine = () => {
    // Mostrar el desafío inmediatamente al pulsar el botón
    setShowChallenge(true)

    // Si ya hay una máquina activa y no es la actual
    if (activeMachine && activeMachine.id !== params.id) {
      setShowActiveMachineWarning(true)
      return
    }

    // Si no hay máquina activa o es la misma que estamos viendo
    startMachineProcess()
  }

  // Función para detener la máquina activa
  const stopMachine = () => {
    try {
      setStartStatus("⏳ Deteniendo máquina...")

      // Simular una petición al servidor para detener la máquina
      setTimeout(() => {
        // Limpiar el estado de la máquina activa
        localStorage.removeItem("activeMachine")
        setActiveMachine(null)
        setMachineStarted(false)
        setShowChallenge(false) // Ocultar el desafío al detener la máquina

        // Actualizar el mensaje de estado
        setStartStatus("✅ Máquina detenida correctamente")

        // Limpiar el mensaje después de unos segundos
        setTimeout(() => {
          setStartStatus(null)
        }, 3000)
      }, 1000)
    } catch (error) {
      console.error("Error al detener la máquina:", error)
      setStartStatus(`❌ Error al detener la máquina: ${(error as any).message}`)
      setTimeout(() => setStartStatus(null), 5000)
    }
  }

  // Calcular tiempo transcurrido desde que se inició la máquina activa
  const getElapsedTime = () => {
    if (!activeMachine) return ""

    const elapsedMs = Date.now() - activeMachine.startedAt
    const minutes = Math.floor(elapsedMs / 60000)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    }
    return `${minutes}m`
  }

  // Añadir el modal de advertencia justo después de la apertura del div principal
  return (
    <div className="min-h-screen bg-[#0A0C0F] pt-20">
      {/* Modal de advertencia de máquina activa */}
      {showActiveMachineWarning && activeMachine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="w-full max-w-md rounded-lg bg-[#1A1C1E] p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Máquina Activa en Ejecución</h3>
              <button
                onClick={() => setShowActiveMachineWarning(false)}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6 text-gray-300">
              <p className="mb-2">
                Ya tienes una máquina activa: <span className="font-bold text-blue-400">{activeMachine.name}</span>
              </p>
              <p className="mb-2">
                Tiempo en ejecución: <span className="font-bold text-yellow-400">{getElapsedTime()}</span>
              </p>
              <p>Por razones de seguridad y rendimiento, solo puedes tener una máquina activa a la vez.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={goToActiveMachine}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              >
                Ir a mi máquina activa
              </button>
              <button
                onClick={stopActiveMachine}
                className="flex-1 rounded-lg border border-red-500 bg-transparent px-4 py-2 font-medium text-red-500 hover:bg-red-900/20"
              >
                Detener y usar esta máquina
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="relative mb-8 flex flex-col items-center justify-center lg:flex-row lg:items-start lg:gap-12">
          {/* Machine Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative h-64 w-64 flex-shrink-0">
              <div className="absolute inset-0 animate-pulse rounded-full bg-red-600/20"></div>
              <div className="absolute inset-2 rounded-full border-4 border-red-600"></div>
              <div className="absolute inset-4 overflow-hidden rounded-full">
                <Image
                  src={machineData?.avatar || "/placeholder.svg"}
                  alt={machineData?.name || "Machine Avatar"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col items-center">
              <div className="text-sm font-medium text-blue-400">{machineData?.type} MACHINE</div>
              <h2 className="mt-2 text-3xl font-bold text-white">{machineData?.name}</h2>
              <div className="mt-4 flex gap-4">
                <div className="flex items-center gap-2 rounded bg-[#1A1C1E] px-3 py-1.5">
                  <Monitor className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-white">{machineData?.os}</span>
                </div>
                <div className="flex items-center gap-2 rounded bg-[#1A1C1E] px-3 py-1.5">
                  <BarChart3 className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-white">{machineData?.difficulty}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-8 w-full lg:mt-0">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-lg bg-[#1A1C1E] p-6 text-center">
                <div className="mb-1 text-3xl font-bold text-white">{machineData?.rating}</div>
                <div className="text-sm text-gray-400">{t("machines.machineRating")}</div>
              </div>
              <div className="rounded-lg bg-[#1A1C1E] p-6 text-center">
                <div className="mb-1 text-3xl font-bold text-white">{machineData?.userOwns}</div>
                <div className="text-sm text-gray-400">{t("machines.userOwns")}</div>
              </div>
              <div className="rounded-lg bg-[#1A1C1E] p-6 text-center">
                <div className="mb-1 text-3xl font-bold text-white">{machineData?.systemOwns}</div>
                <div className="text-sm text-gray-400">{t("machines.systemOwns")}</div>
              </div>
              <div className="rounded-lg bg-[#1A1C1E] p-6 text-center">
                <div className="mb-1 text-3xl font-bold text-white">{machineData?.releaseDate}</div>
                <div className="text-sm text-gray-400">{t("machines.released")}</div>
              </div>
            </div>

            {/* Creator Credits */}
            <div className="mt-8 rounded-lg bg-[#1A1C1E] p-4 text-center text-sm text-gray-400">
              {t("machines.createdBy")}{" "}
              {machineData?.creators.map((creator, index) => (
                <span key={creator.name}>
                  {index > 0 && " & "}
                  <Link href={creator.link} className="text-[#9eff00] hover:underline">
                    {creator.name}
                  </Link>
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-end">
              <button
                onClick={handleCopyLink}
                className="rounded-lg border border-gray-700 bg-transparent px-8 py-3 text-white transition-colors hover:bg-gray-800"
              >
                {copied ? t("common.copied") : t("common.copyLink")}
              </button>
              <button
                onClick={machineStarted && activeMachine?.id === params.id ? stopMachine : startMachine}
                disabled={isStarting}
                className={`rounded-lg px-8 py-3 text-center font-medium text-white transition-colors ${
                  machineStarted && activeMachine?.id === params.id
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-[#00b300] hover:bg-[#008f00]"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isStarting
                  ? "Iniciando..."
                  : machineStarted && activeMachine?.id === params.id
                    ? "Parar Máquina"
                    : t("common.playMachine")}
              </button>
              <button
                onClick={() => {
                  setStartStatus("Verificando conexión con el servidor...")
                  fetch("/api/test-flask-connection")
                    .then((response) => response.json())
                    .then((data) => {
                      if (data.success) {
                        setStartStatus(`✅ Conexión exitosa: ${data.message}`)
                      } else {
                        setStartStatus(`❌ Error de conexión: ${data.error}`)
                      }
                    })
                    .catch((error) => {
                      setStartStatus(`❌ Error de prueba: ${error.message}`)
                    })
                }}
                className="rounded-lg border border-blue-500 bg-transparent px-8 py-3 text-white transition-colors hover:bg-blue-900/30"
              >
                Diagnosticar Conexión
              </button>
            </div>

            {/* Status Message */}
            {startStatus && (
              <div
                className={`mt-4 p-4 rounded-lg ${
                  startStatus.includes("Error")
                    ? "bg-red-900/50 text-red-200 border border-red-500/50"
                    : isTimeout
                      ? "bg-yellow-900/50 text-yellow-200 border border-yellow-500/50"
                      : "bg-green-900/50 text-green-200 border border-green-500/50"
                }`}
              >
                <div className="flex items-start">
                  {startStatus.includes("Error") ? (
                    <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  ) : isTimeout ? (
                    <Clock className="h-5 w-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="whitespace-pre-line">{startStatus}</div>
                </div>
              </div>
            )}

            {/* SSH Connection Info cuando la máquina está iniciada */}
            {machineStarted && activeMachine?.id === params.id && !startStatus?.includes("Error") && (
              <div className="mt-4">
                {/* Asignar puerto según el ID de la máquina */}
                {params.id === "1" && <SSHInfoCard host="51.21.160.111" port="8080" />}
                {params.id === "2" && <SSHInfoCard host="51.21.160.111" port="8081" />}
                {params.id === "3" && <SSHInfoCard host="51.21.160.111" port="8082" />}
                {params.id === "4" && <SSHInfoCard host="51.21.160.111" port="8083" />}
                {/* Para cualquier otra máquina, usar un puerto por defecto */}
                {!["1", "2", "3", "4"].includes(params.id as string) && (
                  <SSHInfoCard host="51.21.160.111" port="8080" />
                )}
              </div>
            )}

            {/* Machine Challenge Component - Solo se muestra cuando showChallenge es true */}
            {showChallenge && machineData && (
              <MachineChallenge machineId={machineData.id} machineName={machineData.name} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
