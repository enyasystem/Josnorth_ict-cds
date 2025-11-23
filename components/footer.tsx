"use client";

import { TbBrandX } from "react-icons/tb";
import { SiTiktok } from "react-icons/si";

export function Footer() {
  return (
    <footer className="relative z-10 mt-auto px-6 py-16 border-t border-border bg-foreground text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-foreground font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-lg">NYSC Jos North</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Empowering corps members to make lasting impact in Jos North
              communities through skills development and collaborative
              initiatives.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a
                  href="/"
                  className="hover:text-accent transition-colors cursor-pointer"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="hover:text-accent transition-colors cursor-pointer"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="/resources"
                  className="hover:text-accent transition-colors cursor-pointer"
                >
                  Resources
                </a>
              </li>
              <li>
                <a
                  href="/team"
                  className="hover:text-accent transition-colors cursor-pointer"
                >
                  Team
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Contact</h4>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@nyscjosnorth.ng</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Jos North LGA, Plateau State</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <span>www.nyscjosnorth.ng</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            &copy; 2025 NYSC Jos North CDS. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-white/60 hover:text-accent transition-colors cursor-pointer"
              aria-label="X"
            >
              <TbBrandX className="w-5 h-5" />
            </a>

            <a
              href="#"
              className="text-white/60 hover:text-accent transition-colors cursor-pointer"
              aria-label="TikTok"
            >
              <SiTiktok className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
