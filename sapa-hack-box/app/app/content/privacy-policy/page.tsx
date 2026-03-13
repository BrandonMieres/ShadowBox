"use client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useTranslation } from "../../hooks/useTranslation"

export default function PrivacyPolicy() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-[#0A0C0F] pt-20 pb-12">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-[#9eff00] hover:text-[#8be000] mb-8">
          <ArrowLeft className="mr-2" size={20} />
          {t("common.backToHome")}
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8">{t("privacy.title")}</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#9eff00] mb-4">{t("privacy.introduction.title")}</h2>
          <p className="text-gray-300 mb-4">{t("privacy.introduction.content")}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#9eff00] mb-4">{t("privacy.collect.title")}</h2>
          <p className="text-gray-300 mb-4">{t("privacy.collect.content")}</p>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            {(() => {
              const items = t<string[]>("privacy.collect.items", { returnObjects: true })
              if (Array.isArray(items)) {
                return items.map((item, index) => <li key={index}>{item}</li>)
              }
              return <li>Information collection details not available</li>
            })()}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#9eff00] mb-4">{t("privacy.use.title")}</h2>
          <p className="text-gray-300 mb-4">{t("privacy.use.content")}</p>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            {(() => {
              const items = t<string[]>("privacy.use.items", { returnObjects: true })
              if (Array.isArray(items)) {
                return items.map((item, index) => <li key={index}>{item}</li>)
              }
              return <li>Information usage details not available</li>
            })()}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#9eff00] mb-4">{t("privacy.cookies.title")}</h2>
          <p className="text-gray-300 mb-4">{t("privacy.cookies.content1")}</p>
          <p className="text-gray-300 mb-4">{t("privacy.cookies.content2")}</p>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            {(() => {
              const items = t<string[]>("privacy.cookies.items", { returnObjects: true })
              if (Array.isArray(items)) {
                return items.map((item, index) => <li key={index}>{item}</li>)
              }
              return <li>Cookie information not available</li>
            })()}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#9eff00] mb-4">{t("privacy.rights.title")}</h2>
          <p className="text-gray-300 mb-4">{t("privacy.rights.content")}</p>
          <ul className="list-disc list-inside text-gray-300 mb-4">
            {(() => {
              const items = t<string[]>("privacy.rights.items", { returnObjects: true })
              if (Array.isArray(items)) {
                return items.map((item, index) => <li key={index}>{item}</li>)
              }
              return <li>User rights information not available</li>
            })()}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#9eff00] mb-4">{t("privacy.security.title")}</h2>
          <p className="text-gray-300 mb-4">{t("privacy.security.content")}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#9eff00] mb-4">{t("privacy.updates.title")}</h2>
          <p className="text-gray-300 mb-4">{t("privacy.updates.content")}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[#9eff00] mb-4">{t("privacy.contact.title")}</h2>
          <p className="text-gray-300 mb-4">{t("privacy.contact.content")}</p>
          <p className="text-[#9eff00]">{t("privacy.contact.email")}</p>
        </section>
      </div>
    </div>
  )
}
