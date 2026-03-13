"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Book,
  Users,
  Globe,
  Shield,
  Mail,
  Target,
  Crosshair,
  Zap,
  User,
  LogOut,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import LanguageSwitcher from "./LanguageSwitcher"
import { useTranslation } from "../hooks/useTranslation"
import { useAuth } from "../context/auth-context"

export default function Header() {
  const { t, tString } = useTranslation()
  const { user, loading, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  // NO verificamos la autenticación al montar el componente

  // Función para obtener productos con traducciones
  const getProducts = () => ({
    title: t("common.navigation.products"),
    sections: [
      {
        title: t("common.navigation.ourSolutions"),
        items: [
          {
            name: t("products.coursesAndCertifications.title"),
            href: "/content/products/courses-and-certifications",
            description: t("products.coursesDescription"),
            icon: Book,
          },
          {
            name: t("products.cyberRanges.title"),
            href: "/content/products/cyber-ranges",
            description: t("products.rangesDescription"),
            icon: Target,
          },
          {
            name: t("products.enterpriseAttackSimulations.title"),
            href: "/content/products/enterprise-attack-simulations",
            description: t("products.simulationsDescription"),
            icon: Crosshair,
          },
        ],
      },
      {
        title: t("common.navigation.featuredProduct"),
        content: (
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">{t("integratedSecurity.title")}</h3>
            <p className="text-sm mb-4">{t("products.integratedDescription")}</p>
            <Link href="/content/integrated-security-approach" className="text-sm text-[#9eff00] hover:underline">
              {t("common.learnMore")} →
            </Link>
          </div>
        ),
      },
    ],
    image: {
      src: "/placeholder.svg?height=300&width=400",
      alt: t("products.imageAlt"),
    },
  })

  // Función para obtener soluciones con traducciones
  const getSolutions = () => ({
    sections: [
      {
        title: t("common.navigation.cybersecurityTeams"),
        items: [
          {
            name: t("teams.redTeam.title"),
            href: "/content/teams/red-team",
            description: t("solutions.redTeamDescription"),
            icon: Zap,
          },
          {
            name: t("teams.blueTeam.title"),
            href: "/content/teams/blue-team",
            description: t("solutions.blueTeamDescription"),
            icon: Shield,
          },
          {
            name: t("teams.purpleTeam.title"),
            href: "/content/teams/purple-team",
            description: t("solutions.purpleTeamDescription"),
            icon: Users,
          },
        ],
      },
      {
        title: t("common.navigation.featuredSolution"),
        content: (
          <div className="bg-gradient-to-r from-red-900 via-blue-900 to-purple-900 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">{t("integratedSecurity.title")}</h3>
            <p className="text-sm mb-4">{t("solutions.integratedDescription")}</p>
            <Link href="/content/integrated-security-approach" className="text-sm text-[#9eff00] hover:underline">
              {t("common.learnMore")} →
            </Link>
          </div>
        ),
      },
    ],
    image: {
      src: "/placeholder.svg?height=300&width=400",
      alt: t("solutions.imageAlt"),
    },
  })

  const getResources = () => ({
    sections: [
      {
        title: t("common.navigation.knowledgeHub"),
        items: [
          {
            name: "Blog",
            href: "/content/blog",
            icon: Book,
            description: tString("resources.blogDescription"),
          },
          {
            name: tString("resources.contactSupport"),
            href: "/content/contact",
            icon: Mail,
            description: tString("resources.supportDescription"),
          },
        ],
      },
      {
        title: t("common.navigation.community"),
        content: (
          <div className="bg-gradient-to-br from-green-900 to-blue-900 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">{tString("resources.joinCommunity")}</h3>
            <p className="text-sm mb-4">{tString("resources.communityDescription")}</p>
            <Link href="#" className="text-sm text-[#9eff00] hover:underline">
              {tString("common.exploreMore")} →
            </Link>
          </div>
        ),
      },
    ],
  })

  const getCompany = () => ({
    sections: [
      {
        title: t("common.navigation.aboutShadowBox"),
        content: (
          <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-2">{tString("common.ourMission")}</h3>
            <p className="text-sm mb-4">{tString("company.missionDescription")}</p>
            <Link href="/content/info/about" className="text-sm text-[#9eff00] hover:underline">
              {tString("company.learnAboutStory")} →
            </Link>
          </div>
        ),
      },
      {
        title: t("common.navigation.company"),
        items: [
          {
            name: tString("company.leadership"),
            href: "/content/info/about#leadership",
            icon: Users,
            description: tString("company.leadershipDescription"),
          },
          {
            name: tString("info.careers.title"),
            href: "/content/info/careers",
            icon: Globe,
            description: tString("company.careersDescription"),
          },
          {
            name: tString("company.contact"),
            href: "/content/contact",
            icon: Mail,
            description: tString("company.contactDescription"),
          },
        ],
      },
      {
        title: t("common.navigation.legal"),
        content: (
          <div className="space-y-2">
            <Link href="/content/privacy-policy" className="block text-sm text-gray-300 hover:text-white">
              {tString("common.footer.privacyPolicy")}
            </Link>
          </div>
        ),
      },
    ],
  })

  const resourcesSection = {
    title: tString("common.navigation.resources"),
    items: [
      {
        title: tString("resources.knowledgeCenter"),
        items: [
          {
            title: tString("resources.blog"),
            href: "/content/blog",
            description: tString("resources.blogDescription"),
          },
          {
            title: tString("resources.contactSupport"),
            href: "/content/contact",
            description: tString("resources.supportDescription"),
          },
        ],
      },
      {
        title: tString("resources.community"),
        items: [
          {
            title: tString("resources.joinCommunity"),
            href: "#",
            description: tString("resources.communityDescription"),
            cta: tString("resources.exploreMore"),
          },
        ],
      },
    ],
  }

  // Obtener elementos del menú con traducciones
  const menuItems = [
    { title: t("common.navigation.products"), content: getProducts() },
    { title: t("common.navigation.solutions"), content: getSolutions() },
    { title: t("common.navigation.resources"), content: getResources() },
    { title: t("common.navigation.company"), content: getCompany() },
  ]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDesktopMenu(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      height: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (isMobileMenuOpen) {
      setExpandedItem(null)
    }
  }

  const toggleExpanded = (title: string) => {
    setExpandedItem(expandedItem === title ? null : title)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setExpandedItem(null)
  }

  const updatedMenuItems = menuItems.map((item) => {
    if (item.title === t("common.navigation.resources")) {
      return resourcesSection
    }
    return item
  })

  const handleLogout = () => {
    logout()
    closeMobileMenu()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0C0F] border-b border-gray-800">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3"
        ref={navRef}
        onMouseLeave={() => setOpenDesktopMenu(null)}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 overflow-hidden rounded-full">
            <Image
              src="/images/logo.png"
              alt="ShadowBox"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold text-white">ShadowBox</span>
          <div className="ml-2">
            <LanguageSwitcher />
          </div>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {menuItems.map((item) => (
            <div key={item.title} className="relative">
              <button
                className="flex items-center text-sm text-gray-300 hover:text-white"
                onMouseEnter={() => setOpenDesktopMenu(item.title)}
              >
                {item.title}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </div>
          ))}

          {/* Botones de autenticación condicionales */}
          {loading ? (
            <div className="text-sm text-gray-400">Loading...</div>
          ) : user ? (
            <>
              <Link href="/profile" className="flex items-center text-sm text-gray-300 hover:text-white">
                <User className="mr-1 h-4 w-4" />
                {user.username || "Profile"}
              </Link>
              <button
                onClick={logout}
                className="flex items-center rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                <LogOut className="mr-1 h-4 w-4" />
                {t("common.logout")}
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-sm text-gray-300 hover:text-white">
                {t("common.login")}
              </Link>
              <Link
                href="/auth/register"
                className="rounded bg-[#9eff00] px-4 py-2 text-sm font-semibold text-black hover:bg-[#8be000]"
              >
                {t("common.register")}
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="ml-4 text-white hover:text-gray-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {openDesktopMenu && (
            <motion.div
              className="fixed left-0 right-0 top-[60px] z-50 bg-[#0A0C0F] overflow-hidden shadow-lg"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onMouseLeave={() => setOpenDesktopMenu(null)}
            >
              <div className="mx-auto max-w-7xl p-8">
                <div className="grid grid-cols-3 gap-8">
                  {menuItems
                    .find((item) => item.title === openDesktopMenu)
                    ?.content?.sections.map((section, idx) => (
                      <div key={idx} className="space-y-4">
                        {section.title && <h3 className="text-sm font-medium text-gray-400">{section.title}</h3>}
                        {section.items && (
                          <ul className="space-y-4">
                            {section.items.map((subItem: any, subIdx: number) => (
                              <li key={subIdx}>
                                <Link
                                  href={subItem.href || "#"}
                                  className={`flex items-start text-sm ${
                                    subItem.highlight ? "text-[#9eff00]" : "text-gray-300"
                                  } hover:text-white group`}
                                >
                                  {subItem.icon && (
                                    <subItem.icon className="h-5 w-5 mr-3 mt-0.5 text-gray-400 group-hover:text-white" />
                                  )}
                                  <div>
                                    <span className="font-medium">{subItem.name}</span>
                                    {subItem.description && (
                                      <p className="text-xs text-gray-400 mt-0.5">{subItem.description}</p>
                                    )}
                                  </div>
                                  {subItem.hasArrow && (
                                    <ChevronRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1" />
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                        {section.content && section.content}
                      </div>
                    ))}
                  {(openDesktopMenu === t("common.navigation.solutions") ||
                    openDesktopMenu === t("common.navigation.products")) && (
                    <div className="col-span-1">
                      <Image
                        src={
                          openDesktopMenu === t("common.navigation.solutions")
                            ? getSolutions().image.src
                            : getProducts().image.src
                        }
                        alt={
                          openDesktopMenu === t("common.navigation.solutions")
                            ? getSolutions().image.alt
                            : getProducts().image.alt
                        }
                        width={400}
                        height={300}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 top-[60px] z-40 bg-[#0A0C0F] overflow-y-auto"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-6">
                {menuItems.map((item) => (
                  <div key={item.title} className="border-b border-gray-800 pb-4">
                    <button
                      className="flex w-full items-center justify-between text-gray-300 hover:text-white"
                      onClick={() => toggleExpanded(item.title)}
                    >
                      <span className="text-lg font-medium">{item.title}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${expandedItem === item.title ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {expandedItem === item.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-4 space-y-4 pl-4"
                        >
                          {item.content?.sections.map((section, idx) => (
                            <div key={idx} className="space-y-3">
                              {section.title && <h3 className="text-sm font-medium text-gray-400">{section.title}</h3>}

                              {section.items && (
                                <ul className="space-y-3">
                                  {section.items.map((subItem: any, subIdx: number) => (
                                    <li key={subIdx}>
                                      <Link
                                        href={subItem.href || "#"}
                                        className="flex items-center text-gray-300 hover:text-white"
                                        onClick={closeMobileMenu}
                                      >
                                        {subItem.icon && <subItem.icon className="mr-2 h-5 w-5 text-gray-400" />}
                                        <span>{subItem.name}</span>
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}

                              {section.content && <div className="mt-2">{section.content}</div>}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Botones de autenticación para móvil */}
                <div className="pt-4 space-y-4">
                  {loading ? (
                    <div className="text-gray-400">Loading...</div>
                  ) : user ? (
                    <>
                      <Link
                        href="/profile"
                        className="flex items-center text-gray-300 hover:text-white"
                        onClick={closeMobileMenu}
                      >
                        <User className="mr-2 h-5 w-5" />
                        {user.username || "Profile"}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-center rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                      >
                        <LogOut className="mr-2 h-5 w-5" />
                        {t("common.logout")}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/login"
                        className="block w-full text-center py-2 text-gray-300 hover:text-white"
                        onClick={closeMobileMenu}
                      >
                        {t("common.login")}
                      </Link>
                      <Link
                        href="/auth/register"
                        className="block w-full text-center rounded bg-[#9eff00] px-4 py-2 font-semibold text-black hover:bg-[#8be000]"
                        onClick={closeMobileMenu}
                      >
                        {t("common.register")}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
