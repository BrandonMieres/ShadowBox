"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Shield, Zap, Users, Database, Server, ArrowRight } from "lucide-react"
import { useTranslation } from "../../hooks/useTranslation"

export default function IntegratedSecurityApproach() {
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

  const processSteps = [
    {
      title: t("integratedSecurity.process.assessment.title"),
      description: t("integratedSecurity.process.assessment.description"),
      icon: Shield,
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/30",
      hoverBorderColor: "group-hover:border-blue-500/70",
    },
    {
      title: t("integratedSecurity.process.strategy.title"),
      description: t("integratedSecurity.process.strategy.description"),
      icon: Database,
      color: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-500/30",
      hoverBorderColor: "group-hover:border-purple-500/70",
    },
    {
      title: t("integratedSecurity.process.implementation.title"),
      description: t("integratedSecurity.process.implementation.description"),
      icon: Server,
      color: "from-green-500/20 to-green-600/20",
      borderColor: "border-green-500/30",
      hoverBorderColor: "group-hover:border-green-500/70",
    },
    {
      title: t("integratedSecurity.process.improvement.title"),
      description: t("integratedSecurity.process.improvement.description"),
      icon: Zap,
      color: "from-red-500/20 to-red-600/20",
      borderColor: "border-red-500/30",
      hoverBorderColor: "group-hover:border-red-500/70",
    },
  ]

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-900 via-black to-blue-900 pt-20">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-6">{t("integratedSecurity.title")}</h1>
            <div className="h-1 w-40 bg-gradient-to-r from-[#9eff00] to-transparent mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <div className="bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-8 border border-[#9eff00]/20">
                <p className="text-lg text-gray-300 mb-6">{t("integratedSecurity.subtitle1")}</p>
                <p className="text-lg text-gray-300 mb-6">{t("integratedSecurity.subtitle2")}</p>
                <div className="flex items-center gap-2 text-[#9eff00] font-medium">
                  <Shield className="h-5 w-5" />
                  <span>{t("integratedSecurity.integration")}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9eff00] to-blue-500 rounded-lg blur opacity-30"></div>
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
                  alt="Integrated Security Approach"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-block bg-[#9eff00] text-black text-xs font-bold px-2 py-1 rounded mb-2">
                    ADVANCED SECURITY
                  </div>
                  <h2 className="text-2xl font-bold text-white">Comprehensive Protection</h2>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Teams Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t("integratedSecurity.integration")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(255, 0, 0, 0.3)" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl blur-xl opacity-50 hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-6 border border-red-500/30 hover:border-red-500/70 transition-all duration-300 h-full">
                <div className="bg-red-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Zap className="h-7 w-7 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{tString("integratedSecurity.redTeam.title")}</h3>
                <p className="text-gray-300">{tString("integratedSecurity.redTeam.description")}</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 255, 0.3)" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl blur-xl opacity-50 hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-6 border border-blue-500/30 hover:border-blue-500/70 transition-all duration-300 h-full">
                <div className="bg-blue-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Shield className="h-7 w-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{tString("integratedSecurity.blueTeam.title")}</h3>
                <p className="text-gray-300">{tString("integratedSecurity.blueTeam.description")}</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(128, 0, 255, 0.3)" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-xl blur-xl opacity-50 hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/70 transition-all duration-300 h-full">
                <div className="bg-purple-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Users className="h-7 w-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{tString("integratedSecurity.purpleTeam.title")}</h3>
                <p className="text-gray-300">{tString("integratedSecurity.purpleTeam.description")}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#9eff00]/30 to-blue-500/30 rounded-lg blur-xl opacity-75"></div>
            <div className="relative bg-black/60 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden border border-[#9eff00]/20 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">{t("integratedSecurity.benefits")}</h2>
                  <ul className="space-y-4">
                    {(() => {
                      const benefitsList = t<string[]>("integratedSecurity.benefitsList", { returnObjects: true })

                      if (Array.isArray(benefitsList)) {
                        return benefitsList.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <div className="mt-1 bg-[#9eff00]/20 p-1 rounded">
                              <ChevronRight className="h-4 w-4 text-[#9eff00]" />
                            </div>
                            <span className="text-gray-300">{item}</span>
                          </motion.li>
                        ))
                      } else {
                        return (
                          <motion.li
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.9 }}
                            className="text-gray-300"
                          >
                            Benefits information not available
                          </motion.li>
                        )
                      }
                    })()}
                  </ul>
                </div>
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src="/images/security-trends.png"
                    alt="Security Benefits"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t("integratedSecurity.process.title")}</h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {processSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>
                  <div
                    className={`relative bg-black/50 backdrop-filter backdrop-blur-md rounded-xl overflow-hidden border ${step.borderColor} ${step.hoverBorderColor} transition-all duration-300 h-full flex flex-col`}
                  >
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-black/50 p-3 rounded-full">
                          <Icon className="h-6 w-6 text-[#9eff00]" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {typeof step.title === "string"
                            ? step.title
                            : tString(
                                `integratedSecurity.process.${index === 0 ? "assessment" : index === 1 ? "strategy" : index === 2 ? "implementation" : "improvement"}.title`,
                              )}
                        </h3>
                      </div>
                      <p className="text-gray-300 flex-grow">
                        {typeof step.description === "string"
                          ? step.description
                          : tString(
                              `integratedSecurity.process.${index === 0 ? "assessment" : index === 1 ? "strategy" : index === 2 ? "implementation" : "improvement"}.description`,
                            )}
                      </p>
                      <div className="mt-4 flex justify-end">
                        <div className="w-8 h-8 rounded-full bg-[#9eff00]/20 flex items-center justify-center text-[#9eff00] group-hover:bg-[#9eff00]/40 transition-colors">
                          {index + 1}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-lg blur-xl opacity-75"></div>
            <div className="relative bg-black/60 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden border border-purple-500/20 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">{tString("integratedSecurity.cta.title")}</h2>
                  <p className="text-xl text-gray-300 mb-6">{tString("integratedSecurity.cta.subtitle")}</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/content/contact"
                      className="inline-flex items-center bg-[#9eff00] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#8be000] transition-colors"
                    >
                      {t("integratedSecurity.cta.button")}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </motion.div>
                </div>
                <div className="relative h-64 lg:h-auto overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-pulse"></div>
                  <Image
                    src="/images/cyber-attack.png"
                    alt="Integrated Security"
                    width={500}
                    height={300}
                    className="rounded-lg object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
