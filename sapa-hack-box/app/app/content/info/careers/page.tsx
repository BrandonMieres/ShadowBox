"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Award, Code, Database, Shield, Zap, Book } from "lucide-react"
import { useTranslation } from "../../../hooks/useTranslation"

export default function CareersPage() {
  const { t } = useTranslation()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Corregir la forma en que se accede a las traducciones de experts

  // Reemplazar la función getExperts con esta versión corregida:
  const getExperts = () => {
    const expertsData = t("info.careers.experts", {
      returnObjects: true,
    }) as Array<{
      name: string
      description: string
      achievements: string
      technologies: string
      class: string
    }>

    // Default experts if translation is not available or not an array
    if (!Array.isArray(expertsData)) {
      return [
        {
          name: "Dr. Sarah Chen",
          image: "/images/machines/Quantum Breach.webp",
          description:
            "Leading expert in cryptography and secure communications. Dr. Chen has published numerous papers on quantum-resistant encryption algorithms and teaches Advanced Cryptography.",
          achievements: "IEEE Cybersecurity Award 2024, 15+ years in the field",
          technologies: "Quantum Cryptography, Post-Quantum Cryptography, Secure Multi-Party Computation",
          class: "Advanced Cryptography",
          icon: Shield,
          color: "from-purple-500/20 to-purple-600/20",
          borderColor: "border-purple-500/30",
          hoverBorderColor: "group-hover:border-purple-500/70",
        },
        {
          name: "Mark Rodriguez",
          image: "/images/machines/CyberNexus.webp",
          description:
            "Former black hat hacker turned cybersecurity consultant. Mark brings real-world experience to the classroom, teaching students about the latest hacking techniques and how to defend against them.",
          achievements: "DEFCON CTF Winner, Certified Ethical Hacker (CEH)",
          technologies: "Penetration Testing, Malware Analysis, Social Engineering",
          class: "Ethical Hacking and Countermeasures",
          icon: Code,
          color: "from-red-500/20 to-red-600/20",
          borderColor: "border-red-500/30",
          hoverBorderColor: "group-hover:border-red-500/70",
        },
        {
          name: "Dr. Aisha Patel",
          image: "/images/machines/Neural Infiltrator.webp",
          description:
            "Specializes in AI-driven cybersecurity solutions. Dr. Patel's research focuses on using machine learning to detect and prevent cyber attacks in real-time.",
          achievements: "ACM Computing Innovation Fellow, 20+ published papers",
          technologies: "Machine Learning, Deep Learning, Anomaly Detection",
          class: "AI in Cybersecurity",
          icon: Database,
          color: "from-blue-500/20 to-blue-600/20",
          borderColor: "border-blue-500/30",
          hoverBorderColor: "group-hover:border-blue-500/70",
        },
        {
          name: "John Doe",
          image: "/images/machines/Crypto Sentinel.webp",
          description:
            "Expert in network security and infrastructure protection. John has consulted for Fortune 500 companies and government agencies, helping them secure their critical systems.",
          achievements: "CISSP, CISM, 10+ years industry experience",
          technologies: "Firewalls, Intrusion Detection Systems, VPNs",
          class: "Network Security Fundamentals",
          icon: Zap,
          color: "from-green-500/20 to-green-600/20",
          borderColor: "border-green-500/30",
          hoverBorderColor: "group-hover:border-green-500/70",
        },
      ]
    }

    // Map the translation data to include additional properties
    const icons = [Shield, Code, Database, Zap]
    const colors = [
      {
        color: "from-purple-500/20 to-purple-600/20",
        borderColor: "border-purple-500/30",
        hoverBorderColor: "group-hover:border-purple-500/70",
      },
      {
        color: "from-red-500/20 to-red-600/20",
        borderColor: "border-red-500/30",
        hoverBorderColor: "group-hover:border-red-500/70",
      },
      {
        color: "from-blue-500/20 to-blue-600/20",
        borderColor: "border-blue-500/30",
        hoverBorderColor: "group-hover:border-blue-500/70",
      },
      {
        color: "from-green-500/20 to-green-600/20",
        borderColor: "border-green-500/30",
        hoverBorderColor: "group-hover:border-green-500/70",
      },
    ]

    return expertsData.map((expert, index) => {
      const colorIndex = index % colors.length
      return {
        ...expert,
        image: "/images/machines/CyberNexus.webp",
        icon: icons[index % icons.length],
        ...colors[colorIndex],
      }
    })
  }

  const experts = getExperts()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Particle animation component
  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/20 opacity-80"></div>
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.1,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
              ],
              y: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
              ],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-900 via-black to-blue-900 pt-20">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-6">{t("info.careers.title")}</h1>
          <div className="h-1 w-40 bg-gradient-to-r from-[#9eff00] to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("info.careers.meetTeam")}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {experts.map((expert, index) => {
            const Icon = expert.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${expert.color} rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div
                  className={`relative bg-black/50 backdrop-filter backdrop-blur-md rounded-xl overflow-hidden border ${expert.borderColor} ${expert.hoverBorderColor} transition-all duration-300 h-full flex flex-col`}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-1/3 flex items-center justify-center p-4">
                      <div className="relative w-48 h-48 overflow-hidden rounded-full border-4 border-[#9eff00]/30">
                        <Image
                          src={expert.image || "/placeholder.svg"}
                          alt={expert.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm rounded-full p-2">
                        <Icon className="h-6 w-6 text-[#9eff00]" />
                      </div>
                    </div>
                    <div className="p-6 md:w-2/3">
                      <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#9eff00] transition-colors duration-300">
                        {expert.name}
                      </h2>
                      <p className="text-gray-300 mb-4">{expert.description}</p>

                      <div className="space-y-2 mt-4">
                        <div className="flex items-start gap-2">
                          <Award className="h-5 w-5 text-[#9eff00] mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-white">{t("info.careers.achievements")}</p>
                            <p className="text-sm text-gray-400">{expert.achievements}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Code className="h-5 w-5 text-[#9eff00] mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-white">{t("info.careers.technologies")}</p>
                            <p className="text-sm text-gray-400">{expert.technologies}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <Book className="h-5 w-5 text-[#9eff00] mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-white">{t("info.careers.class")}</p>
                            <p className="text-sm text-[#9eff00]">{expert.class}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Join Our Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-purple-900 to-black rounded-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10">
              <h2 className="text-3xl font-bold text-white mb-4">{t("info.careers.joinTeam")}</h2>
              <p className="text-gray-300 mb-6">{t("info.careers.lookingFor")}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center bg-[#9eff00] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#8be000] transition-colors"
                >
                  {t("info.careers.viewPositions")}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
            <div className="relative h-64 lg:h-auto">
              <Image
                src="/images/security-trends.png"
                alt="Join Our Team"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-transparent opacity-60"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
