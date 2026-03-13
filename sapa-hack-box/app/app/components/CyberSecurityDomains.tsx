"use client"

import { useState } from "react"
import Link from "next/link"
import { Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "../hooks/useTranslation"

export default function CyberSecurityDomains() {
  const [activeTeam, setActiveTeam] = useState<"red" | "blue" | "purple">("red")
  const { t, tString } = useTranslation()

  const teams = {
    red: {
      title: tString("cyberSecurityDomains.redTeam.title"),
      description: tString("cyberSecurityDomains.redTeam.description"),
      features: t<string[]>("cyberSecurityDomains.redTeam.features", { returnObjects: true }) || [],
      gradient: "from-red-900/50 via-red-800/30 to-transparent",
      hoverGradient: "from-red-800/60 via-red-700/40 to-transparent",
      href: "/content/teams/red-team",
    },
    blue: {
      title: tString("cyberSecurityDomains.blueTeam.title"),
      description: tString("cyberSecurityDomains.blueTeam.description"),
      features: t<string[]>("cyberSecurityDomains.blueTeam.features", { returnObjects: true }) || [],
      gradient: "from-blue-900/50 via-blue-800/30 to-transparent",
      hoverGradient: "from-blue-800/60 via-blue-700/40 to-transparent",
      href: "/content/teams/blue-team",
    },
    purple: {
      title: tString("cyberSecurityDomains.purpleTeam.title"),
      description: tString("cyberSecurityDomains.purpleTeam.description"),
      features: t<string[]>("cyberSecurityDomains.purpleTeam.features", { returnObjects: true }) || [],
      gradient: "from-purple-900/50 via-purple-800/30 to-transparent",
      hoverGradient: "from-purple-800/60 via-purple-700/40 to-transparent",
      href: "/content/teams/purple-team",
    },
  }

  return (
    <section className="bg-[#0A0C0F] py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-12 text-4xl font-bold text-white sm:text-5xl">{tString("cyberSecurityDomains.title")}</h2>
            <div className="space-y-4">
              {(Object.keys(teams) as Array<keyof typeof teams>).map((team) => (
                <button
                  key={team}
                  onClick={() => setActiveTeam(team)}
                  className={`w-full rounded-lg border border-gray-800 bg-gradient-to-r p-6 text-left transition-all duration-300 ${
                    activeTeam === team ? `${teams[team].gradient} border-transparent` : "hover:border-gray-700"
                  }`}
                >
                  <h3 className="text-2xl font-semibold text-white">{teams[team].title}</h3>
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTeam}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`rounded-xl bg-gradient-to-br p-8 ${teams[activeTeam].gradient}`}
              >
                <div className="mb-8">
                  <p className="text-lg text-gray-300">{teams[activeTeam].description}</p>
                </div>
                <div className="mb-8 grid gap-4 sm:grid-cols-2">
                  {Array.isArray(teams[activeTeam].features) &&
                    teams[activeTeam].features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-[#9eff00]" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                </div>
                <Link href={teams[activeTeam].href}>
                  <button className="rounded bg-[#9eff00] px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-[#8be000]">
                    {tString("cyberSecurityDomains.seeMore")}
                  </button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
