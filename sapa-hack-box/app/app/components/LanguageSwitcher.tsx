"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "../context/language-context"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const changeLanguage = (lang: string) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 text-sm font-medium text-gray-300 hover:text-white transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{language === "en" ? "ENG" : "ESP"}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-32 bg-[#0A0C0F] rounded-md shadow-lg z-10 py-1 border border-gray-800">
          <button
            onClick={() => changeLanguage("en")}
            className={`block w-full text-left px-4 py-2 text-sm ${
              language === "en" ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            English
          </button>
          <button
            onClick={() => changeLanguage("es")}
            className={`block w-full text-left px-4 py-2 text-sm ${
              language === "es" ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800"
            }`}
          >
            Español
          </button>
        </div>
      )}
    </div>
  )
}
