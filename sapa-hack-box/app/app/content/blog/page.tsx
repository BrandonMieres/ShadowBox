"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, User, Search, Filter } from "lucide-react"
import { AnimatedSection } from "../../components/PageTransition"
import { useTranslation } from "../../hooks/useTranslation"

const carouselImages = [
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
]

const featuredPosts = [
  {
    title: "The Rise of AI-Powered Cyber Attacks",
    excerpt:
      "How artificial intelligence is changing the landscape of cyber threats and what organizations can do to prepare.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    category: "Threat Intelligence",
    author: "Sarah Chen",
    date: "May 15, 2025",
    readTime: "8 min read",
    link: "#",
    color: "from-red-500/20 to-red-600/20",
    borderColor: "border-red-500/30",
    hoverBorderColor: "group-hover:border-red-500/70",
  },
  {
    title: "Quantum Computing: The Next Frontier in Cryptography",
    excerpt:
      "Exploring how quantum computing will impact current encryption methods and the race to develop quantum-resistant algorithms.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
    category: "Cryptography",
    author: "Mark Rodriguez",
    date: "May 10, 2025",
    readTime: "6 min read",
    link: "#",
    color: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/30",
    hoverBorderColor: "group-hover:border-blue-500/70",
  },
]

const newsCards = [
  {
    title: "Major Data Breach Affects Millions",
    excerpt:
      "A recent cyberattack on a leading tech company has exposed sensitive data of millions of users worldwide.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    category: "Security Incidents",
    author: "John Doe",
    date: "May 5, 2025",
    readTime: "5 min read",
    link: "#",
    color: "from-purple-500/20 to-purple-600/20",
    borderColor: "border-purple-500/30",
    hoverBorderColor: "group-hover:border-purple-500/70",
  },
  {
    title: "New Ransomware Strain Targets Healthcare",
    excerpt:
      "Security researchers have identified a new ransomware variant specifically targeting healthcare institutions.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    category: "Malware Analysis",
    author: "Aisha Patel",
    date: "April 28, 2025",
    readTime: "7 min read",
    link: "#",
    color: "from-green-500/20 to-green-600/20",
    borderColor: "border-green-500/30",
    hoverBorderColor: "group-hover:border-green-500/70",
  },
  {
    title: "AI-Powered Phishing Attacks on the Rise",
    excerpt: "Cybercriminals are increasingly using AI to create more convincing and targeted phishing campaigns.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    category: "Social Engineering",
    author: "Michael Chang",
    date: "April 22, 2025",
    readTime: "4 min read",
    link: "#",
    color: "from-yellow-500/20 to-yellow-600/20",
    borderColor: "border-yellow-500/30",
    hoverBorderColor: "group-hover:border-yellow-500/70",
  },
  {
    title: "Critical Vulnerability Found in Popular Software",
    excerpt:
      "A zero-day vulnerability has been discovered in widely-used software, putting millions of systems at risk.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800",
    category: "Vulnerability Research",
    author: "Elena Rodriguez",
    date: "April 15, 2025",
    readTime: "6 min read",
    link: "#",
    color: "from-red-500/20 to-red-600/20",
    borderColor: "border-red-500/30",
    hoverBorderColor: "group-hover:border-red-500/70",
  },
]

const categories = [
  "All Categories",
  "Threat Intelligence",
  "Cryptography",
  "Security Incidents",
  "Malware Analysis",
  "Social Engineering",
  "Vulnerability Research",
]

export default function BlogPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { t } = useTranslation()
  const carouselRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: carouselRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Particle animation component
  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-black to-purple-900/20 opacity-80"></div>
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500"
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

  const filteredPosts = [...featuredPosts, ...newsCards].filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-900 via-black to-purple-900 pt-20">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Carousel */}
        <motion.div
          ref={carouselRef}
          style={{ opacity, scale }}
          className="relative h-[500px] overflow-hidden rounded-2xl mb-16 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50"></div>
          <div className="relative h-full rounded-2xl overflow-hidden border border-blue-500/30">
            {carouselImages.map((image, index) => (
              <motion.div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentSlide ? 1 : 0 }}
              >
                <Image src={image || "/placeholder.svg"} alt={`Slide ${index + 1}`} layout="fill" objectFit="cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="inline-block bg-[#9eff00] text-black text-xs font-bold px-2 py-1 rounded mb-4">
                      FEATURED
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                      {index === 0
                        ? "Cybersecurity Trends to Watch in 2025"
                        : index === 1
                          ? "The Growing Threat of Zero-Day Vulnerabilities"
                          : "How AI is Revolutionizing Cybersecurity"}
                    </h2>
                    <p className="text-lg text-gray-300 mb-6 max-w-2xl">
                      {index === 0
                        ? "Stay ahead of emerging threats with our comprehensive analysis of cybersecurity trends for 2025."
                        : index === 1
                          ? "Understanding zero-day vulnerabilities and how organizations can protect themselves."
                          : "Exploring the dual role of artificial intelligence in both cyber attacks and defense."}
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href="#"
                        className="inline-flex items-center bg-[#9eff00] text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#8be000] transition-colors"
                      >
                        Read Article
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-colors z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-colors z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-[#9eff00]" : "bg-white/50"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-6 border border-blue-500/20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-3xl font-bold text-white">{t("blog.title")}</h1>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search articles..."
                    className="pl-10 pr-4 py-2 bg-black/50 backdrop-blur-sm border border-blue-500/30 rounded-lg text-white w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm border border-blue-500/30 rounded-lg text-white hover:bg-black/70 transition-colors"
                >
                  <Filter size={18} />
                  Filters
                </button>
              </div>
            </div>

            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-gray-700"
              >
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        selectedCategory === category
                          ? "bg-[#9eff00] text-black"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      } transition-colors`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Featured Posts */}
        <AnimatedSection>
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-2 h-8 bg-[#9eff00] rounded-full mr-3"></span>
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${post.color} rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>
                  <div
                    className={`relative bg-black/50 backdrop-filter backdrop-blur-md rounded-xl overflow-hidden border ${post.borderColor} ${post.hoverBorderColor} transition-all duration-300 h-full flex flex-col`}
                  >
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-xs font-medium text-[#9eff00] px-2 py-1 rounded">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#9eff00] transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="mt-auto">
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{post.date}</span>
                          </div>
                          <span>{post.readTime}</span>
                        </div>
                        <Link
                          href={post.link}
                          className="inline-flex items-center text-[#9eff00] hover:text-white transition-colors duration-300"
                        >
                          <span>Read Full Article</span>
                          <ArrowRight className="ml-1 h-4 w-4 group-hover:ml-2 transition-all duration-300" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Latest Articles */}
        <AnimatedSection direction="right">
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="w-2 h-8 bg-[#9eff00] rounded-full mr-3"></span>
              Latest Articles
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {newsCards.map((post, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${post.color} rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>
                  <div
                    className={`relative bg-black/50 backdrop-filter backdrop-blur-md rounded-xl overflow-hidden border ${post.borderColor} ${post.hoverBorderColor} transition-all duration-300 h-full flex flex-col`}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-xs font-medium text-[#9eff00] px-2 py-1 rounded">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#9eff00] transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="mt-auto">
                        <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                          <span>{post.date}</span>
                          <span>{post.readTime}</span>
                        </div>
                        <Link
                          href={post.link}
                          className="inline-flex items-center text-[#9eff00] text-sm hover:text-white transition-colors duration-300"
                        >
                          <span>Read More</span>
                          <ArrowRight className="ml-1 h-3 w-3 group-hover:ml-2 transition-all duration-300" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Newsletter Subscription */}
        <AnimatedSection>
          <div className="mb-16">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-lg blur-xl opacity-75"></div>
              <div className="relative bg-black/60 backdrop-filter backdrop-blur-lg rounded-xl overflow-hidden border border-blue-500/20 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Stay Updated on Cybersecurity Trends</h2>
                    <p className="text-gray-300 mb-6">
                      Subscribe to our newsletter to receive the latest cybersecurity news, insights, and updates
                      directly to your inbox.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-grow px-4 py-3 bg-black/70 border border-blue-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-[#9eff00] text-black rounded-lg font-semibold hover:bg-[#8be000] transition-colors whitespace-nowrap"
                      >
                        Subscribe
                      </motion.button>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                      By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                    </p>
                  </div>
                  <div className="relative h-64 lg:h-auto overflow-hidden rounded-lg hidden lg:block">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
                    <Image
                      src="/images/cyber-conference.png"
                      alt="Cybersecurity Newsletter"
                      width={500}
                      height={300}
                      className="rounded-lg object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Search Results (if any) */}
        {searchTerm && (
          <AnimatedSection>
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-2 h-8 bg-[#9eff00] rounded-full mr-3"></span>
                Search Results for "{searchTerm}"
              </h2>
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -10, transition: { duration: 0.3 } }}
                      className="group relative"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${post.color} rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                      ></div>
                      <div
                        className={`relative bg-black/50 backdrop-filter backdrop-blur-md rounded-xl overflow-hidden border ${post.borderColor} ${post.hoverBorderColor} transition-all duration-300 h-full flex flex-col`}
                      >
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            layout="fill"
                            objectFit="cover"
                            className="group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-xs font-medium text-[#9eff00] px-2 py-1 rounded">
                            {post.category}
                          </div>
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#9eff00] transition-colors duration-300">
                            {post.title}
                          </h3>
                          <p className="text-gray-300 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                          <div className="mt-auto">
                            <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                              <span>{post.date}</span>
                              <span>{post.readTime}</span>
                            </div>
                            <Link
                              href={post.link}
                              className="inline-flex items-center text-[#9eff00] text-sm hover:text-white transition-colors duration-300"
                            >
                              <span>Read More</span>
                              <ArrowRight className="ml-1 h-3 w-3 group-hover:ml-2 transition-all duration-300" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-black/50 backdrop-filter backdrop-blur-md rounded-xl p-8 border border-blue-500/20 text-center">
                  <p className="text-gray-300 text-lg">No articles found matching your search criteria.</p>
                </div>
              )}
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  )
}
