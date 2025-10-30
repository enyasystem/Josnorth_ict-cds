"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { AnimatedParticles } from "@/components/animated-particles"
import HeroParticles from "@/components/hero/hero-particles"
import Reveal from "@/components/ui/reveal"
import Parallax from "@/components/ui/parallax"
import ScrollChoreographer from "@/components/ui/scroll-choreo"
import ProfileCard from "@/components/profile-card"
import { useState, useEffect } from "react"
import { Typewriter } from "@/components/typewriter"

export default function App() {
  const [view, setView] = useState("excos")
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

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
      scale: 1.08,
      rotateX: 5,
      rotateY: -5,
      y: -20,
      boxShadow: "0 30px 60px rgba(22, 163, 74, 0.3), 0 0 40px rgba(22, 163, 74, 0.2)",
      transition: {
        duration: 0.4,
      },
    },
  }

  const profileCardHoverVariants = {
    rest: {
      scale: 1,
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
        <Button className="bg-green-600 text-white font-bold px-5 py-2 rounded-full hover:bg-green-500 transition">
          Join Us
        </Button>
      </motion.nav>

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
            {[1, 2, 3].map((i) => (
              <div className="p-2" key={i}>
                <ProfileCard
                  name={view === "excos" ? `Exco Member ${i}` : `Developer ${i}`}
                  role={view === "excos" ? "Exco" : "Developer"}
                  img={`https://randomuser.me/api/portraits/${view === "excos" ? "women" : "men"}/${i + 10}.jpg`}
                  bio={view === "excos" ? "Leading community projects and events." : "Building digital solutions for impact."}
                />
              </div>
            ))}
          </motion.div>

          <div className="mt-8 flex justify-center">
            <Button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-500 transition">
              View all profiles
            </Button>
          </div>
        </Reveal>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 bg-white text-center relative">
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
          {[
            { title: "Tech Workshop", desc: "Learn cutting-edge technologies and best practices" },
            { title: "Networking Event", desc: "Connect with industry professionals and peers" },
            { title: "Hackathon 2025", desc: "Build innovative solutions and showcase your skills" },
          ].map((event, i) => (
            <Reveal key={i} variant="fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
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
                  src={
                    event.title === "Tech Workshop"
                      ? "/skills-training-workshop.jpg"
                      : event.title === "Networking Event"
                      ? "/community-engagement-event.jpg"
                      : "/software-development-innovation.jpg"
                  }
                  alt={event.title}
                  className="w-full h-56 object-cover"
                />
              </motion.div>
              <h3 className="text-2xl font-semibold text-green-800 mb-2 mt-4">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.desc}</p>
              </motion.div>
            </Reveal>
          ))}
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
          {[
            { title: "Learning Guides", desc: "Comprehensive tutorials and documentation for skill development" },
            { title: "Project Templates", desc: "Ready-to-use templates to kickstart your projects" },
            { title: "Community Forum", desc: "Connect, share ideas, and get support from members" },
          ].map((resource, i) => (
            <Reveal key={i} variant="fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
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
                  src={
                    resource.title === "Learning Guides"
                      ? "/digital-platform-interface-technology.jpg"
                      : resource.title === "Project Templates"
                      ? "/team-collaboration.png"
                      : "/community-development.png"
                  }
                  alt={resource.title}
                  className="w-full h-48 object-cover"
                />
              </motion.div>
              <h3 className="text-2xl font-semibold text-green-800 mb-3 mt-4">{resource.title}</h3>
              <p className="text-gray-600 mb-4">{resource.desc}</p>
              <Button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-500 transition">
                Access
              </Button>
              </motion.div>
            </Reveal>
          ))}
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
