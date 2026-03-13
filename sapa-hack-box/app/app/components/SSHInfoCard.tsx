"use client"

import { Server, Copy, CheckCircle } from "lucide-react"
import { useState } from "react"

interface SSHInfoCardProps {
  host?: string
  port: string | number
}

export default function SSHInfoCard({ port, host = "13.51.146.239" }: SSHInfoCardProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-blue-500/30">
      <div className="flex items-center mb-3">
        <Server className="h-5 w-5 text-blue-400 mr-2" />
        <h3 className="text-lg font-medium text-white">Información de conexión</h3>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-sm text-gray-400 mb-1">Host:</div>
            <div className="flex items-center">
              <code className="bg-gray-900 px-3 py-2 rounded text-blue-400 flex-grow font-mono text-sm">{host}</code>
              <button
                onClick={() => copyToClipboard(host, "host")}
                className="ml-2 p-2 rounded hover:bg-gray-700 transition-colors"
                aria-label="Copiar host"
              >
                {copied === "host" ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400 mb-1">Puerto:</div>
            <div className="flex items-center">
              <code className="bg-gray-900 px-3 py-2 rounded text-blue-400 flex-grow font-mono text-sm">{port}</code>
              <button
                onClick={() => copyToClipboard(port.toString(), "port")}
                className="ml-2 p-2 rounded hover:bg-gray-700 transition-colors"
                aria-label="Copiar puerto"
              >
                {copied === "port" ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <p>Usa estos datos para conectarte a la máquina desde tu navegador.</p>
      </div>
    </div>
  )
}
