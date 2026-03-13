"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Twitch,
  Rss,
  DiscIcon as Discord,
  InstagramIcon as Tiktok,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "../hooks/useTranslation"

// Actualizar las rutas en footerSections
const footerSections = [
  {
    title: "Products",
    items: [
      { name: "Courses & Certifications", href: "/content/products/courses-and-certifications" },
      { name: "Cyber Ranges", href: "/content/products/cyber-ranges" },
      { name: "Enterprise Attack Simulations", href: "/content/products/enterprise-attack-simulations" },
      "Workforce Exercises",
    ],
  },
  {
    title: "Solutions",
    items: [
      { name: "Red Teams", href: "/content/teams/red-team" },
      { name: "Blue Teams", href: "/content/teams/blue-team" },
      { name: "Purple Teams", href: "/content/teams/purple-team" },
    ],
  },
  {
    title: "Resources",
    items: [
      { name: "Blog", href: "/content/blog" },
      { name: "Community", href: "#" },
      { name: "Support", href: "/content/contact" },
    ],
  },
  {
    title: "Company",
    items: [
      { name: "About", href: "/content/info/about" },
      { name: "Careers", href: "/content/info/careers" },
      { name: "Contact", href: "/content/contact" },
    ],
  },
]

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Tiktok, href: "#" },
  { icon: Youtube, href: "#" },
  { icon: Twitch, href: "#" },
  { icon: Discord, href: "#" },
  { icon: Rss, href: "#" },
]

export default function Footer() {
  const { t } = useTranslation()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title)
  }

  return (
    <footer className="bg-[#0A0C0F] pt-16">
      <div className="container mx-auto px-4">
        {/* Desktop Footer */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-4 text-lg font-semibold text-white">{section.title}</h2>
              <ul className="space-y-2">
                {section.items.map((item, index) => (
                  <li key={typeof item === "string" ? item : item.name}>
                    <Link
                      href={typeof item === "string" ? "#" : item.href}
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      {typeof item === "string" ? item : item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden">
          {footerSections.map((section) => (
            <div key={section.title} className="border-b border-gray-800">
              <button
                className="flex w-full items-center justify-between py-4 text-lg text-white"
                onClick={() => toggleSection(section.title)}
              >
                {section.title}
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${expandedSection === section.title ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {expandedSection === section.title && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2 pb-4">
                      {section.items.map((item, index) => (
                        <li key={typeof item === "string" ? item : item.name}>
                          <Link
                            href={typeof item === "string" ? "#" : item.href}
                            className="block py-2 text-sm text-gray-400 hover:text-white"
                          >
                            {typeof item === "string" ? item : item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="mt-12 grid grid-cols-3 gap-8 py-8 sm:grid-cols-3">
          {socialLinks.map((social, index) => {
            const Icon = social.icon
            return (
              <Link
                key={index}
                href={social.href}
                className="flex justify-center text-gray-400 hover:text-white"
                aria-label={`Visit our ${social.icon.name}`}
              >
                <Icon className="h-6 w-6" />
              </Link>
            )
          })}
        </div>

        {/* Bottom Links */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col items-center space-y-2 text-sm text-gray-400">
            {/* Actualizar la ruta de la política de privacidad en el fondo del footer */}
            <Link href="/content/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <span>{t("common.footer.copyright")}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
