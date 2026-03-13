"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Search, Filter, Server, Monitor, Shield } from "lucide-react"
import { useTranslation } from "../../hooks/useTranslation"

interface Machine {
  id: number
  name: string
  difficulty: string
  category: string
  points: number
  image: string
  os: string
  description: string
  type: string
}

export default function Machines() {
  const [machines, setMachines] = useState<Machine[]>([])
  const [filter, setFilter] = useState({ difficulty: "", category: "", os: "", type: "" })
  const [searchTerm, setSearchTerm] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    // Simulating an API call to fetch machines
    setTimeout(() => {
      setMachines([
        {
          id: 1,
          name: "CyberNexus",
          difficulty: "Easy",
          category: "Web",
          points: 10,
          image: "/images/machines/CyberNexus.webp",
          os: "Linux",
          description:
            "A beginner-friendly machine focused on basic web vulnerabilities and Linux privilege escalation techniques.",
          type: "Free",
        },
        {
          id: 2,
          name: "Quantum Breach",
          difficulty: "Medium",
          category: "Crypto",
          points: 20,
          image: "/images/machines/Quantum Breach.webp",
          os: "Windows",
          description:
            "This machine simulates a corporate environment with multiple attack vectors and requires lateral movement techniques.",
          type: "VIP",
        },
        {
          id: 3,
          name: "Neural Infiltrator",
          difficulty: "Hard",
          category: "Reverse Engineering",
          points: 30,
          image: "/images/machines/Neural Infiltrator.webp",
          os: "Linux",
          description:
            "A challenging machine that requires advanced exploitation techniques and deep understanding of Linux internals.",
          type: "Free",
        },
        {
          id: 4,
          name: "Crypto Sentinel",
          difficulty: "Medium",
          category: "Crypto",
          points: 25,
          image: "/images/machines/Crypto Sentinel.webp",
          os: "Windows",
          description:
            "This machine focuses on cryptographic challenges and secure coding practices in a Windows environment.",
          type: "VIP",
        },
        {
          id: 5,
          name: "Phantom Protocol",
          difficulty: "Hard",
          category: "Network",
          points: 35,
          image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
          os: "Linux",
          description:
            "A sophisticated machine that simulates an advanced persistent threat with multiple layers of obfuscation.",
          type: "Free",
        },
        {
          id: 6,
          name: "Binary Fortress",
          difficulty: "Easy",
          category: "Binary Exploitation",
          points: 15,
          image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
          os: "Windows",
          description: "An entry-level Windows machine focusing on basic enumeration and common misconfigurations.",
          type: "Free",
        },
      ])
    }, 1000)
  }, [])

  const getFilteredMachines = () => {
    return machines.filter(
      (machine) =>
        (filter.difficulty === "" || machine.difficulty === filter.difficulty) &&
        (filter.category === "" || machine.category === filter.category) &&
        (filter.os === "" || machine.os === filter.os) &&
        (filter.type === "" || machine.type === filter.type) &&
        (searchTerm === "" || machine.name.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }

  const filteredMachines = getFilteredMachines()

  const resetFilters = () => {
    setFilter({ difficulty: "", category: "", os: "", type: "" })
    setSearchTerm("")
  }

  const getOSIcon = (os: string) => {
    switch (os.toLowerCase()) {
      case "linux":
        return <Server className="h-4 w-4 text-green-400" />
      case "windows":
        return <Monitor className="h-4 w-4 text-blue-400" />
      default:
        return <Shield className="h-4 w-4 text-purple-400" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500 text-black"
      case "medium":
        return "bg-yellow-500 text-black"
      case "hard":
        return "bg-red-500 text-black"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getTypeColor = (type: string) => {
    return type.toLowerCase() === "vip" ? "bg-purple-500 text-white" : "bg-green-500 text-black"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-black to-emerald-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4 md:mb-0">{t("machines.title")}</h1>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search machines..."
                className="pl-10 pr-4 py-2 bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-lg text-white w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-lg text-white hover:bg-black/70 transition-colors"
            >
              <Filter size={18} />
              Filters
            </button>
          </div>
        </motion.div>

        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 p-6 bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-lg"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                <select
                  value={filter.difficulty}
                  onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
                  className="w-full bg-black/70 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">{t("machines.allDifficulties")}</option>
                  <option value="Easy">{t("home.difficulty.easy")}</option>
                  <option value="Medium">{t("home.difficulty.medium")}</option>
                  <option value="Hard">{t("home.difficulty.hard")}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={filter.category}
                  onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                  className="w-full bg-black/70 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">{t("machines.allCategories")}</option>
                  <option value="Web">Web</option>
                  <option value="Crypto">Crypto</option>
                  <option value="Reverse Engineering">Reverse Engineering</option>
                  <option value="Network">Network</option>
                  <option value="Binary Exploitation">Binary Exploitation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Operating System</label>
                <select
                  value={filter.os}
                  onChange={(e) => setFilter({ ...filter, os: e.target.value })}
                  className="w-full bg-black/70 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All OS</option>
                  <option value="Linux">Linux</option>
                  <option value="Windows">Windows</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                <select
                  value={filter.type}
                  onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                  className="w-full bg-black/70 text-white rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  <option value="Free">Free</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={resetFilters} className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
                Reset Filters
              </button>
            </div>
          </motion.div>
        )}

        {machines.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white text-xl"
            >
              {t("common.loading")}
            </motion.div>
          </div>
        ) : filteredMachines.length === 0 ? (
          <div className="flex items-center justify-center h-64 bg-black/50 backdrop-blur-sm border border-green-500/30 rounded-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white text-xl"
            >
              No machines found matching your filters.
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredMachines.map((machine, index) => (
              <motion.div
                key={machine.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-black/50 backdrop-filter backdrop-blur-md rounded-xl overflow-hidden border border-green-500/20 group-hover:border-green-500/50 transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={machine.image || "/placeholder.svg"}
                      alt={machine.name}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(machine.type)}`}>
                        {machine.type}
                      </div>
                      <div
                        className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(machine.difficulty)}`}
                      >
                        {t(`home.difficulty.${machine.difficulty.toLowerCase()}`)}
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm text-xs font-medium text-white px-2 py-1 rounded">
                      {getOSIcon(machine.os)}
                      <span>{machine.os}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-green-400 transition-colors duration-300">
                      {machine.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{machine.description}</p>
                    <div className="mt-auto flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-400">Points:</span>
                        <span className="text-sm font-medium text-green-400">{machine.points}</span>
                      </div>
                      <Link
                        href={`/machine/${machine.id}`}
                        className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors duration-300"
                      >
                        <span>{t("common.startChallenge")}</span>
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:ml-2 transition-all duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
