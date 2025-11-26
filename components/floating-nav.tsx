"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function FloatingNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (window.scrollY / Math.max(windowHeight, 1)) * 100;
      setScrollProgress(scrolled);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function openMenu() {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMenuVisible(true);
    requestAnimationFrame(() => setMobileMenuOpen(true));
  }

  function closeMenu() {
    setMobileMenuOpen(false);
    closeTimerRef.current = window.setTimeout(() => {
      setMenuVisible(false);
      closeTimerRef.current = null;
    }, 300);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileMenuOpen(false);
    }

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-green-400 via-green-600 to-green-800 z-50"
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.3 }}
      />

      <motion.nav
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
        className={`fixed w-[90%] left-[5%] top-4 z-50 flex justify-between items-center px-8 py-4 transition-all duration-500 rounded-[35px] ${
          {
            true: "bg-white/80 backdrop-blur-2xl border border-green-200 shadow-2xl",
            false:
              "bg-white/30 backdrop-blur-xl border border-green-200 shadow-xl",
          }[String(isScrolled)]
        }`}
      >
        <Logo />

        <div className="hidden md:flex items-center space-x-8 font-semibold text-green-900">
          <Link
            href="/"
            className="hover:text-green-700 transition cursor-pointer"
          >
            Home
          </Link>
          <Link
            href="/team"
            className="hover:text-green-700 transition cursor-pointer"
          >
            Excos & Devs
          </Link>
          <Link
            href="/events"
            className="hover:text-green-700 transition cursor-pointer"
          >
            Events
          </Link>
          <Link
            href="/resources"
            className="hover:text-green-700 transition cursor-pointer"
          >
            Resources
          </Link>
        </div>

        {/* Mobile toggler */}
        <div className="md:hidden">
          <button
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => (menuVisible ? closeMenu() : openMenu())}
            className="p-2 rounded-md text-green-900 bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        <Link
          href="/login"
          className="hidden md:inline-flex bg-green-600 text-white font-bold px-5 py-2 rounded-full hover:bg-green-500 transition cursor-pointer"
        >
          Login
        </Link>
      </motion.nav>

      {menuVisible && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 md:hidden"
        >
          <div
            onClick={closeMenu}
            className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
              mobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          />

          <aside
            className={`absolute right-0 top-16 w-72 sm:w-80 bg-white shadow-2xl ring-1 ring-black/5 transform transition-transform duration-300 ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            } rounded-2xl overflow-hidden flex flex-col max-h-[72vh] pb-6`}
            style={{ right: "1rem" }}
          >
            <div className="p-3 flex items-center justify-end">
              <button
                aria-label="Close menu"
                onClick={closeMenu}
                className="p-2 rounded-md text-green-900 bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="px-6 pt-2">
              <nav className="flex flex-col items-start space-y-3 text-lg font-semibold text-green-900">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="hover:text-green-700 w-full text-right pr-2 cursor-pointer"
                >
                  Home
                </Link>
                <Link
                  href="/team"
                  onClick={closeMenu}
                  className="hover:text-green-700 w-full text-right pr-2 cursor-pointer"
                >
                  Team Profiles
                </Link>
                <Link
                  href="/events"
                  onClick={closeMenu}
                  className="hover:text-green-700 w-full text-right pr-2 cursor-pointer"
                >
                  Events
                </Link>
                <Link
                  href="/resources"
                  onClick={closeMenu}
                  className="hover:text-green-700 w-full text-right pr-2 cursor-pointer"
                >
                  Resources
                </Link>

                <div className="mt-3 w-full flex justify-center">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="cursor-pointer"
                  >
                    <Button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-500 transition">
                      Login
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
