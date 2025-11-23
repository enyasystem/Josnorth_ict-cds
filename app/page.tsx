"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import ProfileCard from "@/components/profile-card"
import ScrollChoreographer from "@/components/ui/scroll-choreo"
import Parallax from "@/components/ui/parallax"
import { AnimatedParticles } from "@/components/animated-particles"
import HeroParticles from "@/components/hero/hero-particles"
import { Reveal } from "@/components/reveal"
import { Typewriter } from "@/components/typewriter"
import { useDevelopers, useExcos } from "@/lib/hooks/useTeam"
import { useEvents } from "@/lib/hooks/useEvents"
import { useResources } from "@/lib/hooks/useResources"
import type { TeamMember, Event as EventType, Resource as ResourceType } from "@/lib/types/api"
export default function App() {
  const [view, setView] = useState("excos")
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { data: developersData, isLoading: devLoading } = useDevelopers()
  const { data: excosData, isLoading: excosLoading } = useExcos()
  const { data: eventsData, isLoading: eventsLoading } = useEvents({ limit: 3, status: "published" })
  const { data: resourcesData, isLoading: resourcesLoading } = useResources({ limit: 3 })

  const developers: TeamMember[] = developersData?.data ?? []
  const excos: TeamMember[] = excosData?.data ?? []
  const events: EventType[] = eventsData?.data ?? []
  const resources: ResourceType[] = resourcesData?.data ?? []

  const currentList = view === "excos" ? excos : developers
  const currentLoading = view === "excos" ? excosLoading : devLoading

  useEffect(() => {
    window.scrollTo(0, 0)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (window.scrollY / windowHeight) * 100
      setScrollProgress(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Data is fetched via React Query hooks above (useDevelopers, useExcos, useEvents, useResources)
  // These provide caching, loading and error states. No manual fetch required here.

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
  }

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  const gradientTextVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  }

  const cardHoverVariants = {
    rest: {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      y: 0,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    },
    
    hover: {
      scale: 1.12,
      y: -25,
      boxShadow: "0 40px 80px rgba(22, 163, 74, 0.35), 0 0 50px rgba(22, 163, 74, 0.25)",
      transition: {
        duration: 0.4,
      },
    },
  }

  const imageHoverVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.4 } },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  // Mobile menu state & behaviors
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // menuVisible keeps the menu mounted while exit animation plays
  const [menuVisible, setMenuVisible] = useState(false)
  const closeTimerRef = useRef<number | null>(null)

  function openMenu() {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setMenuVisible(true)
    // small delay to allow mount before transition if needed
    requestAnimationFrame(() => setMobileMenuOpen(true))
  }

  function closeMenu() {
    setMobileMenuOpen(false)
    // wait for animation to finish before unmounting
    closeTimerRef.current = window.setTimeout(() => {
      setMenuVisible(false)
      closeTimerRef.current = null
    }, 300)
  }

  // Close mobile menu on Escape and lock body scroll when open
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileMenuOpen(false)
    }

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", onKey)
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [mobileMenuOpen])

  // cleanup any pending timers on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current)
        closeTimerRef.current = null
      }
    }
  }, [])

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const subtextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
      },
    },
  }

  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
      },
    }),
  }

  return (
    <div className="bg-white text-gray-900 font-sans overflow-x-hidden scroll-smooth">
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-green-400 via-green-600 to-green-800 z-50"
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.3 }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
        className={`fixed w-[90%] left-[5%] top-4 z-50 flex justify-between items-center px-8 py-4 transition-all duration-500 rounded-[35px] ${
          isScrolled
            ? "bg-white/80 backdrop-blur-2xl border border-green-200 shadow-2xl"
            : "bg-white/30 backdrop-blur-xl border border-green-200 shadow-xl"
        }`}
      >
        <Logo />

        <div className="hidden md:flex space-x-8 font-semibold text-green-900">
          <a href="#home" className="hover:text-green-700 transition">
            Home
          </a>
          <a href="#profiles" className="hover:text-green-700 transition">
            Excos & Devs
          </a>
          <a href="#events" className="hover:text-green-700 transition">
            Events
          </a>
          <a href="#resources" className="hover:text-green-700 transition">
            Resources
          </a>
        </div>

        {/* Mobile toggler */}
        <div className="md:hidden">
          <button
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => (menuVisible ? closeMenu() : openMenu())}
            className="p-2 rounded-md text-green-900 bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <Button className="hidden md:inline-flex bg-green-600 text-white font-bold px-5 py-2 rounded-full hover:bg-green-500 transition">
          Join Us
        </Button>
      </motion.nav>

      {/* Mobile menu overlay (backdrop + right panel) */}
      {menuVisible && (
        <div id="mobile-menu" role="dialog" aria-modal="true" className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            onClick={closeMenu}
            className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          />

          {/* Right slide-in panel */}
              <aside
                className={`absolute right-0 top-16 w-72 sm:w-80 bg-white shadow-2xl ring-1 ring-black/5 transform transition-transform duration-300 ${
                  mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                } rounded-2xl overflow-hidden flex flex-col max-h-[72vh] pb-6`}
                style={{ right: '1rem' }}
              >
                <div className="p-3 flex items-center justify-end">
              <button
                aria-label="Close menu"
                onClick={closeMenu}
                className="p-2 rounded-md text-green-900 bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 pt-2">
              <nav className="flex flex-col items-start space-y-3 text-lg font-semibold text-green-900">
                <a href="#home" onClick={closeMenu} className="hover:text-green-700 w-full text-right pr-2">Home</a>
                <a href="#profiles" onClick={closeMenu} className="hover:text-green-700 w-full text-right pr-2">Excos & Devs</a>
                <a href="#events" onClick={closeMenu} className="hover:text-green-700 w-full text-right pr-2">Events</a>
                <a href="#resources" onClick={closeMenu} className="hover:text-green-700 w-full text-right pr-2">Resources</a>

                <div className="mt-3 w-full flex justify-center">
                  <a href="/join" onClick={closeMenu}>
                    <Button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-500 transition">Join Us</Button>
                  </a>
                </div>
              </nav>
            </div>

          </aside>
        </div>
      )}

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden pt-20"
      >
        <ScrollChoreographer />

        <Parallax speed={-0.08} className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
          <AnimatedParticles />
        </Parallax>

        {/* Decorative Lottie removed per request */}

        {/* Background Animation */}
        <motion.div
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-tr from-green-50 via-white to-green-100 bg-[length:200%_200%]"
        />

        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "url('/professional-team-collaboration-technology-innovat.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60 z-0" />

        {/* Decorative particles (client-only) - placed after background layers so they are visible */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
          <HeroParticles count={30} color="144,238,144" sizeRange={[2, 12]} durationRange={[10, 30]} delayMax={8} reduceOnMobile />
        </div>

        <Reveal variant="fade-up">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative text-5xl md:text-7xl font-extrabold mb-6 text-green-900 max-w-4xl leading-tight drop-shadow-sm z-10"
          >
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {['Empowering', 'Corps', 'Members', 'Through....'].map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={charVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-500 to-green-600 bg-[length:200%_200%] block mt-3"
              variants={gradientTextVariants}
              animate="animate"
            >
              <Typewriter
                words={["innovation", "collaboration", "continuous"]}
                className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-500 to-green-600"
              />
            </motion.span>
          </motion.div>
        </Reveal>

        <motion.div
          variants={subtextVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative max-w-2xl mb-8 z-10"
        >
          <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Inspiring innovation, collaboration, and continuous learning
            </motion.span>
            {" in "}
            <motion.span
              className="inline-block text-green-600 font-bold"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Jos North
            </motion.span>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
            >
              .
            </motion.span>
          </p>
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative flex flex-wrap justify-center gap-4 mt-4 z-10"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
            <Button className="bg-green-600 text-white font-semibold px-8 py-3 text-lg rounded-[35px] shadow-xl hover:bg-green-500 transition transform relative overflow-hidden group">
              <span className="relative z-10">Explore Programs</span>
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-[35px]"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="border-2 border-green-600 text-green-800 font-semibold px-8 py-3 text-lg rounded-[35px] hover:bg-green-100 transition">
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Profiles Section */}
      <section id="profiles" className="py-24 bg-green-50 text-center relative">
        <Reveal variant="fade-up">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl font-bold text-green-800 mb-12"
          >
            Meet Our Team
          </motion.h2>
        </Reveal>
        <div className="flex justify-center mb-6 space-x-4">
          <Button
            onClick={() => setView("excos")}
            className={`${view === "excos" ? "bg-green-600 text-white" : "bg-green-100 text-green-700"} px-6 py-2 rounded-full transition`}
          >
            Excos
          </Button>
          <Button
            onClick={() => setView("devs")}
            className={`${view === "devs" ? "bg-green-600 text-white" : "bg-green-100 text-green-700"} px-6 py-2 rounded-full transition`}
          >
            Developers
          </Button>
        </div>

        <Reveal variant="fade-up" stagger={80} className="px-8 max-w-6xl mx-auto">
          <motion.div
            key={view}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {currentLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div className="p-2" key={`skeleton-${i}`}>
                  <Skeleton className="h-44 rounded-lg" />
                </div>
              ))
            ) : currentList.length > 0 ? (
              currentList.slice(0, 6).map((member) => (
                <div className="p-2" key={member.id}>
                  <ProfileCard
                    name={member.name}
                    role={member.role}
                    img={member.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}`}
                    bio={member.bio}
                    socials={{ github: member.social?.github, linkedin: member.social?.linkedin, x: member.social?.twitter }}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center">
                <p className="text-gray-600">No profiles available.</p>
              </div>
            )}
          </motion.div>
        </Reveal>

        <Reveal variant="fade-up">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl font-bold text-green-800 mb-12"
          >
            Upcoming Events & News
          </motion.h2>
        </Reveal>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-8"
        >
          {eventsLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Reveal key={`event-skel-${i}`} variant="fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
                <Skeleton className="h-56 rounded-2xl" />
              </Reveal>
            ))
          ) : events.length > 0 ? (
            events.map((ev, i) => (
              <Reveal key={ev.id || i} variant="fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
                <motion.div
                  variants={itemVariants}
                  initial="rest"
                  whileHover={{
                    scale: 1.08,
                    rotateX: 5,
                    rotateY: -5,
                    y: -20,
                    boxShadow: "0 30px 60px rgba(22, 163, 74, 0.3), 0 0 40px rgba(22, 163, 74, 0.2)",
                    transition: { duration: 0.4, ease: "easeInOut" },
                  }}
                  className="bg-green-50 p-6 rounded-3xl overflow-hidden cursor-pointer relative"
                  style={{ perspective: "1000px" }}
                >
                <motion.div
                  variants={imageHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  className="overflow-hidden rounded-2xl"
                >
                  <img
                    src={ev.image || "/skills-training-workshop.jpg"}
                    alt={ev.title}
                    className="w-full h-56 object-cover"
                  />
                </motion.div>
                <h3 className="text-2xl font-semibold text-green-800 mb-2 mt-4">{ev.title}</h3>
                <p className="text-gray-600 mb-4">{ev.excerpt ?? ev.description ?? "Event details coming soon."}</p>
                </motion.div>
              </Reveal>
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="text-gray-600">No upcoming events available.</p>
            </div>
          )}
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12"
        >
          <motion.a href="#events" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-green-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-green-500 transition">
              View All Events
            </Button>
          </motion.a>
        </motion.div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-24 bg-green-50 text-center relative">
        <Reveal variant="fade-up">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl font-bold text-green-800 mb-12"
          >
            Resources
          </motion.h2>
        </Reveal>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-8"
        >
          {resourcesLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Reveal key={`res-skel-${i}`} variant="fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
                <Skeleton className="h-48 rounded-2xl" />
              </Reveal>
            ))
          ) : resources.length > 0 ? (
            resources.map((res, i) => (
              <Reveal key={res.id || i} variant="fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
                <motion.div
                  variants={itemVariants}
                  initial="rest"
                  whileHover={{
                    scale: 1.08,
                    rotateX: 5,
                    rotateY: -5,
                    y: -20,
                    boxShadow: "0 30px 60px rgba(22, 163, 74, 0.3), 0 0 40px rgba(22, 163, 74, 0.2)",
                    transition: { duration: 0.4, ease: "easeInOut" },
                  }}
                  className="bg-white p-8 rounded-3xl overflow-hidden cursor-pointer relative"
                  style={{ perspective: "1000px" }}
                >
                <motion.div
                  variants={imageHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  className="overflow-hidden rounded-2xl"
                >
                  <img
                    src={res.thumbnail || res.fileUrl || res.url || "/digital-platform-interface-technology.jpg"}
                    alt={res.title}
                    className="w-full h-48 object-cover"
                  />
                </motion.div>
                <h3 className="text-2xl font-semibold text-green-800 mb-3 mt-4">{res.title}</h3>
                <p className="text-gray-600 mb-4">{res.description}</p>
                <a href={res.url ?? res.fileUrl ?? "#"} target="_blank" rel="noreferrer">
                  <Button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-500 transition">Access</Button>
                </a>
                </motion.div>
              </Reveal>
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="text-gray-600">No resources available.</p>
            </div>
          )}
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12"
        >
          <motion.a href="#resources" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-green-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-green-500 transition">
              View All Resources
            </Button>
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-gray-200 py-10 text-center">
        <p className="text-lg">© {new Date().getFullYear()} Jos North ICT CDS. All rights reserved.</p>
      </footer>
    </div>
  )
}
