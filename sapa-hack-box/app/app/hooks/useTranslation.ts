"use client"

import { useLanguage } from "../context/language-context"
import en from "../locales/en"
import es from "../locales/es"

// Simplificamos los tipos para evitar conflictos
type TranslationObject = Record<string, any>

export function useTranslation() {
  const { language } = useLanguage()

  const translations = {
    en,
    es,
  }

  /**
   * Función para obtener traducciones basadas en una clave
   */
  const t = <T = any>(key: string, options?: { returnObjects?: boolean }): T => {
    // Dividir la clave por puntos para acceder a propiedades anidadas
    const keys = key.split(".")

    // Comenzar con el objeto de traducciones
    let value: any = translations[language as keyof typeof translations]

    // Navegar a través de las propiedades anidadas
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k as keyof typeof value]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key as unknown as T
      }
    }

    // Devolver objetos si se solicita
    if (options?.returnObjects && typeof value === "object") {
      return value as T
    }

    return value as T
  }

  /**
   * Function to get translations as string
   */
  const tString = (key: string): string => {
    const value = t(key)
    if (typeof value === "string") {
      return value
    }
    // Si no es un string, devolver la clave
    console.warn(`Translation key not found or not a string: ${key}`)
    return key
  }

  return { t, tString }
}
