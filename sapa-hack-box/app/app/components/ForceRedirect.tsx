"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface ForceRedirectProps {
  to: string
  delay?: number
}

export default function ForceRedirect({ to, delay = 1000 }: ForceRedirectProps) {
  const router = useRouter()
  const [redirectAttempted, setRedirectAttempted] = useState(false)

  useEffect(() => {
    // Evitar múltiples intentos de redirección
    if (redirectAttempted) return

    const timer = setTimeout(() => {
      console.log(`🚀 Redirigiendo a ${to} usando Next.js router`)
      setRedirectAttempted(true)

      // Usar window.location directamente para evitar problemas con Next.js router
      window.location.href = to
    }, delay)

    return () => clearTimeout(timer)
  }, [to, delay, redirectAttempted])

  return <div className="text-center py-2 text-green-400">Redirigiendo a {to}...</div>
}
