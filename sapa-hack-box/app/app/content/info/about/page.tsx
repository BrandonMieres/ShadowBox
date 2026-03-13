"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Users, Globe, Award, Target } from "lucide-react"
import { useTranslation } from "../../../hooks/useTranslation"

// Particle animation component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-black to-blue-900/20 opacity-80"></div>
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-green-500"
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

export default function AboutPage() {
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

  // Get milestones from translations with proper type checking
  const getMilestones = () => {
    const milestoneData = t("info.about.milestones", {
      returnObjects: true,
    }) as Array<{ year: string; title: string; description: string }>

    // Default milestones if translation is not available or not an array
    if (!Array.isArray(milestoneData)) {
      return [
        {
          year: "2020",
          title: "Foundation",
          description: "ShadowBox was founded with a mission to revolutionize cybersecurity education.",
          icon: Target,
        },
        {
          year: "2021",
          title: "Platform Launch",
          description: "Launched our cybersecurity challenge platform with 50+ machines and labs.",
          icon: Globe,
        },
        {
          year: "2022",
          title: "Global Expansion",
          description: "Expanded our services to over 20 countries worldwide.",
          icon: Users,
        },
        {
          year: "2023",
          title: "Enterprise Solutions",
          description: "Introduced enterprise-grade security training and simulation services.",
          icon: Users,
        },
        {
          year: "2024",
          title: "Industry Recognition",
          description: "Received multiple industry awards for innovation in cybersecurity education.",
          icon: Award,
        },
      ]
    }

    // Map the translation data to include icons
    return milestoneData.map((milestone, index) => {
      const icons = [Target, Globe, Users, Users, Award]
      return {
        ...milestone,
        icon: icons[index % icons.length],
      }
    })
  }

  const milestones = getMilestones()

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-green-900 via-black to-blue-900 pt-20">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-6">{t("info.about.title")}</h1>
          <div className="h-1 w-40 bg-gradient-to-r from-[#9eff00] to-transparent mx-auto mb-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9eff00] to-blue-500 rounded-lg blur opacity-30"></div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/images/cyber-conference.png"
                alt="ShadowBox Campus"
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-block bg-[#9eff00] text-black text-xs font-bold px-2 py-1 rounded mb-2">
                  {t("info.about.established")}
                </div>
                <h2 className="text-2xl font-bold text-white">{t("info.about.ourCampus")}</h2>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-8 border border-[#9eff00]/20">
              <p className="text-lg text-gray-300 mb-6">{t("info.about.description1")}</p>
              <p className="text-lg text-gray-300 mb-6">{t("info.about.description2")}</p>
              <div className="flex items-center gap-2 text-[#9eff00] font-medium">
                <Target className="h-5 w-5" />
                <span>{t("common.ourMission")}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Our Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t("info.about.ourJourney")}</h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#9eff00] to-blue-500 rounded-full hidden md:block"></div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon
                const isEven = index % 2 === 0

                return (
                  <motion.div key={index} variants={itemVariants} className="relative">
                    <div className={`md:flex items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
                      {/* Timeline dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#9eff00] rounded-full flex items-center justify-center z-10 hidden md:flex">
                        <Icon className="h-4 w-4 text-black" />
                      </div>

                      {/* Content */}
                      <div className={`md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                        <div className="bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-6 border border-[#9eff00]/20 hover:border-[#9eff00]/50 transition-all duration-300">
                          <div className="flex items-center gap-2 mb-2 md:hidden">
                            <Icon className="h-5 w-5 text-[#9eff00]" />
                            <span className="text-[#9eff00] font-bold">{milestone.year}</span>
                          </div>
                          <div className={`md:flex ${isEven ? "md:justify-end" : ""} items-center gap-2 mb-2 hidden`}>
                            {isEven && <span className="text-[#9eff00] font-bold">{milestone.year}</span>}
                            {isEven && <Icon className="h-5 w-5 text-[#9eff00]" />}
                            {!isEven && <Icon className="h-5 w-5 text-[#9eff00]" />}
                            {!isEven && <span className="text-[#9eff00] font-bold">{milestone.year}</span>}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                          <p className="text-gray-300">{milestone.description}</p>
                        </div>
                      </div>

                      {/* Empty space for alignment */}
                      <div className="md:w-1/2 hidden md:block"></div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Our Approach */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">{t("info.about.ourApproach")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: t("info.about.learnByDoing.title"),
                description: t("info.about.learnByDoing.description"),
                icon: Target,
                color: "from-green-500/20 to-green-600/20",
              },
              {
                title: t("info.about.communityDriven.title"),
                description: t("info.about.communityDriven.description"),
                icon: Users,
                color: "from-blue-500/20 to-blue-600/20",
              },
              {
                title: t("info.about.alwaysEvolving.title"),
                description: t("info.about.alwaysEvolving.description"),
                icon: Globe,
                color: "from-purple-500/20 to-purple-600/20",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 255, 0, 0.1)" }}
                className="relative"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-xl blur-xl opacity-50 hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div className="relative bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-6 border border-[#9eff00]/20 hover:border-[#9eff00]/50 transition-all duration-300 h-full">
                  <div className="bg-[#9eff00]/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <item.icon className="h-7 w-7 text-[#9eff00]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {typeof item.title === "string"
                      ? item.title
                      : tString(
                          `info.about.${index === 0 ? "learnByDoing" : index === 1 ? "communityDriven" : "alwaysEvolving"}.title`,
                        )}
                  </h3>
                  <p className="text-gray-300">
                    {typeof item.description === "string"
                      ? item.description
                      : tString(
                          `info.about.${index === 0 ? "learnByDoing" : index === 1 ? "communityDriven" : "alwaysEvolving"}.description`,
                        )}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-gradient-to-r from-green-900 to-black rounded-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10">
              <h2 className="text-3xl font-bold text-white mb-4">{tString("info.about.joinMission")}</h2>
              <p className="text-gray-300 mb-6">{tString("info.about.description4")}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/content/contact"
                  className="inline-flex items-center bg-[#9eff00] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#8be000] transition-colors"
                >
                  {t("info.about.getStarted")}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
            <div className="relative h-64 lg:h-auto">
              <Image
                src="/images/cyber-attack.png"
                alt="Join Our Mission"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-transparent opacity-60"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
