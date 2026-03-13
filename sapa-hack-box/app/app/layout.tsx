import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { LanguageProvider } from "./context/language-context"
import { AuthProvider } from "./context/auth-context"
import ActiveMachineIndicator from "./components/ActiveMachineIndicator"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ShadowBox - Cybersecurity Training Platform",
  description: "Enhance your cybersecurity skills with our advanced training platform.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <AuthProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 pt-16">{children}</main>
              <Footer />
              <ActiveMachineIndicator />
            </div>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
