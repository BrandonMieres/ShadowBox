"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Shield, Eye, AlertTriangle, Lock } from "lucide-react"
import { useTranslation } from "../../../hooks/useTranslation"

export default function PurpleTeamPage() {
  const { t, tString } = useTranslation()

  // Particle animation component
  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-purple-900/20 opacity-80"></div>
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

  const purpleTeamSkills = [
    {
      icon: Eye,
      title: t("teams.purpleTeam.skills.teamCollaboration.title"),
      description: t("teams.purpleTeam.skills.teamCollaboration.description"),
    },
    {
      icon: AlertTriangle,
      title: t("teams.purpleTeam.skills.attackSimulation.title"),
      description: t("teams.purpleTeam.skills.attackSimulation.description"),
    },
    {
      icon: Shield,
      title: t("teams.purpleTeam.skills.defenseValidation.title"),
      description: t("teams.purpleTeam.skills.defenseValidation.description"),
    },
    {
      icon: Lock,
      title: t("teams.purpleTeam.skills.gapAnalysis.title"),
      description: t("teams.purpleTeam.skills.gapAnalysis.description"),
    },
    {
      icon: AlertTriangle,
      title: t("teams.purpleTeam.skills.continuousImprovement.title"),
      description: t("teams.purpleTeam.skills.continuousImprovement.description"),
    },
    {
      icon: Eye,
      title: t("teams.purpleTeam.skills.knowledgeTransfer.title"),
      description: t("teams.purpleTeam.skills.knowledgeTransfer.description"),
    },
  ]

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-900 via-black to-purple-900 pt-20">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold text-white mb-6">{tString("teams.purpleTeam.title")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{tString("teams.purpleTeam.description")}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative h-80 w-full overflow-hidden rounded-xl">
              <Image
                src="/images/cyber-conference.png"
                alt="Purple Team collaboration"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-block bg-purple-500 text-black text-xs font-bold px-2 py-1 rounded mb-2">
                  COLLABORATIVE SECURITY
                </div>
                <h2 className="text-2xl font-bold text-white">The Best of Both Worlds</h2>
              </div>
            </div>

            <div className="mt-8 bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-6 border border-purple-500/20">
              <p className="text-gray-300 mb-4">{tString("teams.purpleTeam.additionalInfo")}</p>
              <div className="flex items-center gap-2 text-purple-400">
                <Eye className="h-5 w-5" />
                <span className="font-medium">Collaborative Security Specialists</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-8 border border-purple-500/20 h-full">
              <h2 className="text-2xl font-bold text-white mb-6">{tString("teams.purpleTeam.responsibilities")}</h2>
              <ul className="space-y-4">
                {(() => {
                  const responsibilitiesList = t<string[]>("teams.purpleTeam.responsibilitiesList", {
                    returnObjects: true,
                  })

                  if (Array.isArray(responsibilitiesList)) {
                    return responsibilitiesList.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 bg-purple-500/20 p-1 rounded">
                          <ChevronRight className="h-4 w-4 text-purple-400" />
                        </div>
                        <span className="text-gray-300">{item}</span>
                      </motion.li>
                    ))
                  } else {
                    return (
                      <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                        className="text-gray-300"
                      >
                        Responsibilities information not available
                      </motion.li>
                    )
                  }
                })()}
              </ul>

              <h2 className="text-2xl font-bold text-white mt-10 mb-6">{tString("teams.purpleTeam.companies")}</h2>
              <ul className="space-y-4">
                {(() => {
                  const companiesList = t<string[]>("teams.purpleTeam.companiesList", { returnObjects: true })

                  if (Array.isArray(companiesList)) {
                    return companiesList.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 bg-purple-500/20 p-1 rounded">
                          <ChevronRight className="h-4 w-4 text-purple-400" />
                        </div>
                        <span className="text-gray-300">{item}</span>
                      </motion.li>
                    ))
                  } else {
                    return (
                      <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.8 }}
                        className="text-gray-300"
                      >
                        Companies information not available
                      </motion.li>
                    )
                  }
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
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Purple Team Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purpleTeamSkills.map((skill, index) => {
              const Icon = skill.icon
              const skillKey = Object.keys(t("teams.purpleTeam.skills", { returnObjects: true }))[index] || ""

              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(128, 0, 255, 0.3)" }}
                  className="bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-6 border border-purple-500/20"
                >
                  <div className="bg-purple-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Icon className="h-7 w-7 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {typeof skill.title === "string"
                      ? skill.title
                      : tString(`teams.purpleTeam.skills.${skillKey}.title`)}
                  </h3>
                  <p className="text-gray-300">
                    {typeof skill.description === "string"
                      ? skill.description
                      : tString(`teams.purpleTeam.skills.${skillKey}.description`)}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-purple-900 to-black rounded-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10">
              <h2 className="text-3xl font-bold text-white mb-4">{tString("teams.purpleTeam.joinSection.title")}</h2>
              <p className="text-gray-300 mb-6">{tString("teams.purpleTeam.joinSection.description")}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/content/contact"
                  className="inline-flex items-center bg-purple-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors"
                >
                  {tString("teams.purpleTeam.exploreConcepts")}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
            <div className="relative h-64 lg:h-auto">
              <Image
                src="/images/cyber-conference.png"
                alt={tString("teams.purpleTeam.joinSection.imageAlt")}
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
