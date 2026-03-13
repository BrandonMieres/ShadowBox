"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Server, Shield, Code, Terminal } from "lucide-react"
import { useTranslation } from "../../../hooks/useTranslation"

export default function CyberRanges() {
  const { t, tString } = useTranslation()

  const ranges = [
    {
      title: t("products.cyberRanges.ranges.networkDefense.title"),
      description: t("products.cyberRanges.ranges.networkDefense.description"),
      difficulty: t("products.cyberRanges.ranges.networkDefense.difficulty"),
      image: "/images/machines/Quantum Breach.webp",
      icon: Server,
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/30",
      hoverBorderColor: "group-hover:border-blue-500/70",
    },
    {
      title: t("products.cyberRanges.ranges.webAppSecurity.title"),
      description: t("products.cyberRanges.ranges.webAppSecurity.description"),
      difficulty: t("products.cyberRanges.ranges.webAppSecurity.difficulty"),
      image: "/images/machines/CyberNexus.webp",
      icon: Code,
      color: "from-green-500/20 to-green-600/20",
      borderColor: "border-green-500/30",
      hoverBorderColor: "group-hover:border-green-500/70",
    },
    {
      title: t("products.cyberRanges.ranges.icsSecurity.title"),
      description: t("products.cyberRanges.ranges.icsSecurity.description"),
      difficulty: t("products.cyberRanges.ranges.icsSecurity.difficulty"),
      image: "/images/machines/Neural Infiltrator.webp",
      icon: Shield,
      color: "from-red-500/20 to-red-600/20",
      borderColor: "border-red-500/30",
      hoverBorderColor: "group-hover:border-red-500/70",
    },
    {
      title: t("products.cyberRanges.ranges.cloudSecurity.title"),
      description: t("products.cyberRanges.ranges.cloudSecurity.description"),
      difficulty: t("products.cyberRanges.ranges.cloudSecurity.difficulty"),
      image: "/images/machines/Crypto Sentinel.webp",
      icon: Terminal,
      color: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-500/30",
      hoverBorderColor: "group-hover:border-purple-500/70",
    },
  ]

  // Particle animation component
  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-emerald-900/20 opacity-80"></div>
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500"
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

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-900 via-black to-emerald-900 pt-20">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-6">{tString("products.cyberRanges.title")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{tString("products.cyberRanges.subtitle")}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {ranges.map((range, index) => {
            const Icon = range.icon
            const rangeKey = Object.keys(t("products.cyberRanges.ranges", { returnObjects: true }))[index] || ""

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${range.color} rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div
                  className={`relative bg-black/50 backdrop-filter backdrop-blur-md rounded-xl overflow-hidden border ${range.borderColor} ${range.hoverBorderColor} transition-all duration-300 h-full flex flex-col`}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={range.image || "/placeholder.svg"}
                      alt={
                        typeof range.title === "string"
                          ? range.title
                          : tString(`products.cyberRanges.ranges.${rangeKey}.title`)
                      }
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full p-2">
                      <Icon className="h-6 w-6 text-[#9eff00]" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#9eff00] transition-colors duration-300">
                      {typeof range.title === "string"
                        ? range.title
                        : tString(`products.cyberRanges.ranges.${rangeKey}.title`)}
                    </h2>
                    <p className="text-gray-300 mb-4">
                      {typeof range.description === "string"
                        ? range.description
                        : tString(`products.cyberRanges.ranges.${rangeKey}.description`)}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-sm text-gray-400 bg-black/30 px-3 py-1 rounded-full border border-gray-700">
                        {tString("products.cyberRanges.difficulty")}:{" "}
                        {typeof range.difficulty === "string"
                          ? range.difficulty
                          : tString(`products.cyberRanges.ranges.${rangeKey}.difficulty`)}
                      </span>
                      <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          href="#"
                          className="inline-flex items-center text-[#9eff00] hover:text-white transition-colors duration-300"
                        >
                          <span>{tString("products.cyberRanges.tryRange")}</span>
                          <ChevronRight className="ml-1 h-4 w-4 group-hover:ml-2 transition-all duration-300" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {tString("products.cyberRanges.whyChoose")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: t("products.cyberRanges.features.realisticEnvironments.title"),
                description: t("products.cyberRanges.features.realisticEnvironments.description"),
                icon: Server,
              },
              {
                title: t("products.cyberRanges.features.handsOnLearning.title"),
                description: t("products.cyberRanges.features.handsOnLearning.description"),
                icon: Terminal,
              },
              {
                title: t("products.cyberRanges.features.expertGuidance.title"),
                description: t("products.cyberRanges.features.expertGuidance.description"),
                icon: Shield,
              },
            ].map((feature, index) => {
              const featureKeys = ["realisticEnvironments", "handsOnLearning", "expertGuidance"]
              const featureKey = featureKeys[index] || ""

              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 255, 0, 0.1)" }}
                  className="bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-6 border border-[#9eff00]/20 hover:border-[#9eff00]/50 transition-all duration-300"
                >
                  <div className="bg-[#9eff00]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <feature.icon className="h-7 w-7 text-[#9eff00]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {typeof feature.title === "string"
                      ? feature.title
                      : tString(`products.cyberRanges.features.${featureKey}.title`)}
                  </h3>
                  <p className="text-gray-300">
                    {typeof feature.description === "string"
                      ? feature.description
                      : tString(`products.cyberRanges.features.${featureKey}.description`)}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-900 to-black rounded-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10">
              <h2 className="text-3xl font-bold text-white mb-4">{tString("products.cyberRanges.cta.title")}</h2>
              <p className="text-gray-300 mb-6">{tString("products.cyberRanges.cta.description")}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/content/contact"
                  className="inline-flex items-center bg-[#9eff00] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#8be000] transition-colors"
                >
                  {tString("products.cyberRanges.cta.button")}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
            <div className="relative h-64 lg:h-auto">
              <Image
                src="/images/cyber-attack.png"
                alt="Cyber Range Training"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent opacity-60"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
