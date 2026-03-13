"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Award, Clock, Users, Shield } from "lucide-react"
import { useTranslation } from "../../../hooks/useTranslation"

const courses = [
  {
    title: "Certified Ethical Hacker (CEH)",
    description: "Learn to think like a hacker and develop ethical hacking skills.",
    duration: "40 hours",
    level: "Intermediate",
    image: "/images/machines/CyberNexus.webp",
    icon: Shield,
    color: "from-red-500/20 to-red-600/20",
    borderColor: "border-red-500/30",
    hoverBorderColor: "group-hover:border-red-500/70",
  },
  {
    title: "CompTIA Security+",
    description: "Gain foundational IT security knowledge and skills.",
    duration: "35 hours",
    level: "Beginner",
    image: "/images/security-trends.png",
    icon: Award,
    color: "from-green-500/20 to-green-600/20",
    borderColor: "border-green-500/30",
    hoverBorderColor: "group-hover:border-green-500/70",
  },
  {
    title: "Certified Information Systems Security Professional (CISSP)",
    description: "Advanced certification for experienced security professionals.",
    duration: "60 hours",
    level: "Advanced",
    image: "/images/cyber-conference.png",
    icon: Users,
    color: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/30",
    hoverBorderColor: "group-hover:border-blue-500/70",
  },
  {
    title: "Offensive Security Certified Professional (OSCP)",
    description: "Hands-on penetration testing certification.",
    duration: "80 hours",
    level: "Advanced",
    image: "/images/machines/Quantum Breach.webp",
    icon: Shield,
    color: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-500/30",
    hoverBorderColor: "group-hover:border-purple-500/70",
  },
]

// Particle animation component
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-black to-emerald-900/20 opacity-80"></div>
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

export default function CoursesAndCertifications() {
  const { t } = useTranslation()
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
    <div className="min-h-screen relative bg-gradient-to-br from-green-900 via-black to-emerald-900 pt-20">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-6">{t("products.coursesAndCertifications.title")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("products.coursesAndCertifications.subtitle")}</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {courses.map((course, index) => {
            const Icon = course.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${course.color} rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div
                  className={`relative bg-black/50 backdrop-filter backdrop-blur-md rounded-xl overflow-hidden border ${course.borderColor} ${course.hoverBorderColor} transition-all duration-300 h-full flex flex-col`}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
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
                      {course.title}
                    </h2>
                    <p className="text-gray-300 mb-4">{course.description}</p>
                    <div className="flex justify-between text-sm text-gray-400 mb-4 mt-auto">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-[#9eff00]" />
                        <span>
                          {t("products.coursesAndCertifications.duration")}: {course.duration}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1 text-[#9eff00]" />
                        <span>
                          {t("products.coursesAndCertifications.level")}: {course.level}
                        </span>
                      </div>
                    </div>
                    <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="#"
                        className="inline-flex items-center text-[#9eff00] hover:text-white transition-colors duration-300"
                      >
                        <span>{t("products.coursesAndCertifications.learnMore")}</span>
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:ml-2 transition-all duration-300" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-green-900 to-black rounded-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Advance Your Career?</h2>
              <p className="text-gray-300 mb-6">
                Our certifications are recognized worldwide and will help you stand out in the competitive cybersecurity
                job market.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/content/contact"
                  className="inline-flex items-center bg-[#9eff00] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#8be000] transition-colors"
                >
                  Get Started Today
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
            <div className="relative h-64 lg:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"
                alt="Cybersecurity Training"
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
