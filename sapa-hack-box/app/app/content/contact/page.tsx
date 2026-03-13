"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, User, MessageSquare, Send, Phone, MapPin, Clock } from "lucide-react"
import { useTranslation } from "../../hooks/useTranslation"

export default function ContactPage() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Este useEffect garantiza que el componente solo se renderice en el cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  // Particle animation component
  const ParticleBackground = () => {
    // Solo renderizar las partículas en el cliente
    if (!isClient)
      return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-green-900/30 via-black to-emerald-900/20 opacity-80"></div>
      )

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

  // El resto del código permanece igual...

  // Get contact info from translations with proper type checking
  const getContactInfo = () => {
    const contactDetails = t<Array<{ title: string; details: string; link?: string }>>("info.contact.contactDetails", {
      returnObjects: true,
    })

    // Default contact info if translation is not available or not an array
    if (!Array.isArray(contactDetails)) {
      return [
        {
          icon: Mail,
          title: "Email",
          details: "info@shadowbox.com",
          link: "mailto:info@shadowbox.com",
        },
        {
          icon: Phone,
          title: "Phone",
          details: "+1 (555) 123-4567",
          link: "tel:+15551234567",
        },
        {
          icon: MapPin,
          title: "Location",
          details: "123 Cyber Street, Tech City, TC 12345",
          link: "https://maps.google.com",
        },
        {
          icon: Clock,
          title: "Business Hours",
          details: "Monday - Friday: 9AM - 5PM",
          link: null,
        },
      ]
    }

    // Map the translation data to include icons
    const icons = [Mail, Phone, MapPin, Clock]
    return contactDetails.map((item, index) => {
      const links = [
        `mailto:${item.details}`,
        `tel:${item.details.replace(/\D/g, "")}`,
        "https://maps.google.com",
        null,
      ]

      return {
        ...item,
        icon: icons[index % icons.length],
        link: links[index % links.length],
      }
    })
  }

  const contactInfo = getContactInfo()

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-green-900 via-black to-emerald-900 pt-20">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold text-white mb-6">{t("info.contact.title")}</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">{t("info.contact.description")}</p>
        </motion.div>

        {/* El resto del código permanece igual... */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-8 border border-green-500/20 h-full">
              <h2 className="text-2xl font-bold text-white mb-8">{t("info.contact.getInTouch")}</h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/20 rounded-lg p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                    <Send className="h-8 w-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{t("info.contact.messageSent")}</h3>
                  <p className="text-gray-300">{t("info.contact.thankYou")}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">
                      {t("info.contact.nameLabel")}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-black/70 border border-green-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <User className="absolute left-3 top-3.5 h-5 w-5 text-green-400" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
                      {t("info.contact.emailLabel")}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-black/70 border border-green-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <Mail className="absolute left-3 top-3.5 h-5 w-5 text-green-400" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-300">
                      {t("info.contact.subjectLabel")}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-black/70 border border-green-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <MessageSquare className="absolute left-3 top-3.5 h-5 w-5 text-green-400" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">
                      {t("info.contact.messageLabel")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-black/70 border border-green-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center px-6 py-3 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("info.contact.sending")}
                      </>
                    ) : (
                      <>
                        {t("info.contact.sendMessage")}
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-8 border border-green-500/20">
              <h2 className="text-2xl font-bold text-white mb-6">{t("info.contact.contactInfo")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 255, 0, 0.1)" }}
                    className="bg-black/70 rounded-lg p-4 border border-green-500/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-green-500/20 p-2 rounded-full">
                        <item.icon className="h-6 w-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">{item.title}</h3>
                        {item.link ? (
                          <a href={item.link} className="text-gray-300 hover:text-green-400 transition-colors">
                            {item.details}
                          </a>
                        ) : (
                          <p className="text-gray-300">{item.details}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-8 border border-green-500/20">
              <h2 className="text-2xl font-bold text-white mb-6">{t("info.contact.frequentlyAskedQuestions")}</h2>
              <div className="space-y-4">
                {(() => {
                  const faqData = t<Array<{ question: string; answer: string }>>("info.contact.faq", {
                    returnObjects: true,
                  })

                  if (Array.isArray(faqData)) {
                    return faqData.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                        className="bg-black/70 rounded-lg p-4 border border-green-500/30"
                      >
                        <h3 className="text-white font-medium mb-2">{faq.question}</h3>
                        <p className="text-gray-300 text-sm">{faq.answer}</p>
                      </motion.div>
                    ))
                  } else {
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                        className="bg-black/70 rounded-lg p-4 border border-green-500/30"
                      >
                        <p className="text-gray-300 text-sm">Frequently asked questions will be available soon.</p>
                      </motion.div>
                    )
                  }
                })()}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
