"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Shield } from "lucide-react"
import { useTranslation } from "../../../hooks/useTranslation"

// Particle animation component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-black to-purple-900/20 opacity-80"></div>
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-red-500"
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

export default function EnterpriseAttackSimulations() {
  const { t, tString } = useTranslation()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

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

  // Get simulation steps from translation
  const simulationSteps = t("products.enterpriseAttackSimulations.simulationSteps", { returnObjects: true }) || []

  // Define step colors and icons
  const stepStyles = [
    { icon: "📋", color: "from-blue-500/20 to-blue-600/20" },
    { icon: "🔍", color: "from-green-500/20 to-green-600/20" },
    { icon: "🚪", color: "from-yellow-500/20 to-yellow-600/20" },
    { icon: "🕸️", color: "from-orange-500/20 to-orange-600/20" },
    { icon: "💾", color: "from-red-500/20 to-red-600/20" },
    { icon: "📊", color: "from-purple-500/20 to-purple-600/20" },
  ]

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-red-900 via-black to-purple-900 pt-20">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-6">{t("products.enterpriseAttackSimulations.title")}</h1>
          <div className="h-1 w-40 bg-gradient-to-r from-[#9eff00] to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t("products.enterpriseAttackSimulations.subtitle1")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative h-80 w-full overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
                alt={t("products.imageAlt")}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-block bg-[#9eff00] text-black text-xs font-bold px-2 py-1 rounded mb-2">
                  {t("products.enterpriseAttackSimulations.advancedSecurity")}
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {t("products.enterpriseAttackSimulations.realWorldScenarios")}
                </h2>
              </div>
            </div>

            <div className="mt-8 bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-6 border border-red-500/20">
              <p className="text-gray-300 mb-4">{t("products.enterpriseAttackSimulations.subtitle2")}</p>
              <div className="flex items-center gap-2 text-red-400">
                <Shield className="h-5 w-5" />
                <span className="font-medium">{t("products.enterpriseAttackSimulations.specialists")}</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-8 border border-[#9eff00]/20 h-full">
              <h2 className="text-2xl font-bold text-white mb-6">
                {t("products.enterpriseAttackSimulations.benefits")}
              </h2>
              <ul className="space-y-4">
                {(() => {
                  const benefitsList = t("products.enterpriseAttackSimulations.benefitsList", { returnObjects: true })

                  // Si es un array, mapear cada elemento
                  if (Array.isArray(benefitsList)) {
                    return benefitsList.map((item: string, index: number) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 bg-[#9eff00]/20 p-1 rounded">
                          <ChevronRight className="h-4 w-4 text-[#9eff00]" />
                        </div>
                        <span className="text-gray-300">{item}</span>
                      </motion.li>
                    ))
                  }

                  // Fallback para cuando no es un array
                  return (
                    <motion.li
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-3"
                    >
                      <div className="mt-1 bg-[#9eff00]/20 p-1 rounded">
                        <ChevronRight className="h-4 w-4 text-[#9eff00]" />
                      </div>
                      <span className="text-gray-300">{t("products.enterpriseAttackSimulations.fallbackBenefit")}</span>
                    </motion.li>
                  )
                })()}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {t("products.enterpriseAttackSimulations.howItWorks")}
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {Array.isArray(simulationSteps) &&
              simulationSteps.map((step: any, index: number) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="relative"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${stepStyles[index % stepStyles.length].color} rounded-xl blur-xl opacity-50 hover:opacity-100 transition-opacity duration-300`}
                  ></div>
                  <div className="relative bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-6 border border-gray-700 hover:border-[#9eff00]/50 transition-all duration-300 h-full">
                    <div className="text-4xl mb-4">{stepStyles[index % stepStyles.length].icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                    <div className="absolute top-4 right-4 text-xs font-bold bg-black/50 rounded-full px-2 py-1 text-[#9eff00]">
                      {t("products.enterpriseAttackSimulations.step")} {index + 1}
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-red-900 to-black rounded-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                {t("products.enterpriseAttackSimulations.readyToTest")}
              </h2>
              <p className="text-gray-300 mb-6">{t("products.enterpriseAttackSimulations.expertTeam")}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/content/contact"
                  className="inline-flex items-center bg-[#9eff00] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#8be000] transition-colors"
                >
                  {t("products.enterpriseAttackSimulations.scheduleConsultation")}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
            <div className="relative h-64 lg:h-auto">
              <Image
                src="/images/security-trends.png"
                alt={t("products.enterpriseAttackSimulations.securityTeamAlt")}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-transparent opacity-60"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
