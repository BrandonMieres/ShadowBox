"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import CyberSecurityDomains from "./components/CyberSecurityDomains"
import { ChevronRight, Shield, Terminal, Award, Zap } from "lucide-react"
import { useTranslation } from "./hooks/useTranslation"

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.section>
  )
}

const featuredMachines = [
  { id: 1, name: "CyberNexus", image: "/images/machines/CyberNexus.webp", difficulty: "Easy" },
  { id: 2, name: "Quantum Breach", image: "/images/machines/Quantum Breach.webp", difficulty: "Medium" },
  { id: 3, name: "Neural Infiltrator", image: "/images/machines/Neural Infiltrator.webp", difficulty: "Hard" },
  { id: 4, name: "Crypto Sentinel", image: "/images/machines/Crypto Sentinel.webp", difficulty: "Medium" },
]

const certifications = [
  { name: "CompTIA Security+", description: "Foundational IT security certification", icon: Shield },
  {
    name: "Certified Ethical Hacker (CEH)",
    description: "Demonstrates expertise in ethical hacking methodologies",
    icon: Terminal,
  },
  { name: "CISSP", description: "Advanced certification for information security professionals", icon: Award },
  { name: "OSCP", description: "Hands-on penetration testing certification", icon: Zap },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

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

  const { t } = useTranslation()

  const carouselImages = ["/images/cyber-conference.png", "/images/cyber-attack.png", "/images/security-trends.png"]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Video Background */}
      <AnimatedSection>
        <section className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0 z-0 bg-black"></div>

          <div className="relative z-10 flex h-full items-center px-4 sm:px-6 lg:px-8">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-3xl"
              >
                <motion.h1
                  className="mb-6 text-6xl font-bold leading-tight text-white sm:text-7xl lg:text-8xl"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {t("home.hero.title")}
                </motion.h1>
                <motion.p
                  className="mb-8 max-w-xl text-lg text-gray-300 sm:text-xl"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {t("home.hero.subtitle")}
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Link
                    href="#"
                    className="group relative inline-flex items-center overflow-hidden rounded-md bg-green-500 px-8 py-3 text-base font-semibold text-black transition-all duration-300 hover:bg-green-600"
                  >
                    <span className="absolute -end-full transition-all group-hover:end-4">
                      <ChevronRight className="h-5 w-5" />
                    </span>
                    <span className="transition-all group-hover:me-4">{t("home.hero.readMore")}</span>
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center rounded-md border border-green-500/30 bg-black/30 backdrop-blur-sm px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-black/50 hover:border-green-500/50"
                  >
                    {t("home.hero.getDemo")}
                  </Link>
                </motion.div>
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <Link
                    href="#"
                    className="group inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
                  >
                    <span className="rounded bg-green-500 px-2 py-1 text-xs font-bold text-black">
                      {t("common.new")}
                    </span>
                    {t("home.hero.trial")}
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <div className="flex flex-col items-center">
              <span className="text-green-400 text-sm mb-2">{t("common.scrollDown")}</span>
              <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center p-1">
                <motion.div
                  className="w-1 h-2 bg-green-400 rounded-full"
                  animate={{
                    y: [0, 12, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </section>
      </AnimatedSection>

      {/* Featured Machines Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white inline-block relative">
              {t("home.featuredMachines.title")}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-transparent"></span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">{t("home.featuredMachines.description")}</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredMachines.map((machine, index) => (
              <motion.div key={machine.id} variants={itemVariants} className="group relative">
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
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-xs font-medium text-green-400 px-2 py-1 rounded">
                      {t(`home.difficulty.${machine.difficulty.toLowerCase()}`)}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-green-400 transition-colors duration-300">
                      {machine.name}
                    </h3>
                    <div className="mt-auto">
                      <Link
                        href={`/machine/${machine.id}`}
                        className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors duration-300"
                      >
                        <span>{t("home.featuredMachines.hackNow")}</span>
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:ml-2 transition-all duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cybersecurity Domains Section */}
      <section className="relative z-10">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>
        <div className="relative z-10">
          <CyberSecurityDomains />
        </div>
      </section>

      {/* Certifications Section */}
      <section className="relative z-10 py-20 px-4 bg-black/30 backdrop-blur-md border-t border-b border-green-500/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white inline-block relative">
              {t("home.certifications.title")}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-transparent"></span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">{t("home.certifications.description")}</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certifications.map((cert, index) => (
              <motion.div key={cert.name} variants={itemVariants} whileHover={{ y: -10 }} className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-xl opacity-50"></div>
                <div className="relative bg-black/50 backdrop-filter backdrop-blur-md p-8 rounded-xl border border-green-500/20 text-center h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <cert.icon className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{cert.name}</h3>
                  <p className="text-gray-300">{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white inline-block relative">
              {t("home.events.title")}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-transparent"></span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">{t("home.events.description")}</p>
          </motion.div>

          <div className="relative h-[400px] overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-xl opacity-50"></div>
            <div className="relative h-full rounded-xl overflow-hidden border border-green-500/20">
              {carouselImages.map((image, index) => (
                <motion.div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentSlide ? 1 : 0 }}
                >
                  <Image src={image || "/placeholder.svg"} alt={`Slide ${index + 1}`} layout="fill" objectFit="cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                </motion.div>
              ))}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-colors z-10"
              >
                &#10094;
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-colors z-10"
              >
                &#10095;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Experts Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white inline-block relative">
              {t("home.experts.title")}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-transparent"></span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">{t("home.experts.description")}</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {(() => {
              const experts = t<
                Array<{
                  name: string
                  description: string
                  expertise: string
                }>
              >("home.experts.items", { returnObjects: true })

              if (Array.isArray(experts)) {
                return experts.map((expert, index) => (
                  <motion.div key={expert.name} variants={itemVariants} className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-xl opacity-50"></div>
                    <div className="relative bg-black/50 backdrop-filter backdrop-blur-md rounded-xl overflow-hidden border border-green-500/20 p-6 flex flex-col md:flex-row items-center gap-6">
                      <div className="relative h-40 w-40 flex-shrink-0">
                        <div className="absolute inset-0 rounded-full bg-green-500/20 animate-pulse"></div>
                        <div className="absolute inset-2 rounded-full border-2 border-green-500"></div>
                        <div className="absolute inset-4 overflow-hidden rounded-full">
                          <Image
                            src={index === 0 ? "/images/expert-1.png" : "/images/expert-2.png"}
                            alt={expert.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold mb-2 text-white">{expert.name}</h3>
                        <p className="text-gray-300 mb-4">{expert.description}</p>
                        <p className="text-green-400 font-medium">{expert.expertise}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              } else {
                return (
                  <div className="text-center text-gray-400 col-span-2">
                    <p>Expert information not available</p>
                  </div>
                )
              }
            })()}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-xl blur-xl"></div>
            <div className="relative bg-black/60 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden border border-green-500/30 p-12 text-center">
              <h2 className="text-4xl font-bold mb-4 text-white">{t("home.cta.title")}</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{t("home.cta.description")}</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/auth/register"
                  className="inline-flex items-center bg-green-500 text-black px-8 py-3 rounded-md font-semibold text-lg hover:bg-green-400 transition-colors duration-300"
                >
                  {t("home.cta.button")}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
