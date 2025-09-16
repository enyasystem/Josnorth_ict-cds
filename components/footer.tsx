import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-10 mt-auto px-6 py-12 border-t border-emerald-700/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">NYSC Jos North</h3>
                <p className="text-emerald-200 text-sm">Official Biodata Platform</p>
              </div>
            </div>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Empowering corps members with a modern, secure biodata platform and strong community engagement in Jos
              North LGA.
            </p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 text-emerald-200 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-emerald-200 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-emerald-200 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-emerald-200 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-emerald-200 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/events" className="block text-emerald-200 hover:text-white transition-colors">
                Events
              </Link>
              <Link href="/resources" className="block text-emerald-200 hover:text-white transition-colors">
                Resources
              </Link>
             
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-200 text-sm">Jos North LGA, Plateau State</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-200 text-sm">+234 803 XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-200 text-sm">info@nyscjosnorth.gov.ng</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-emerald-700/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-emerald-300 text-sm">© 2024 NYSC Jos North. All rights reserved.</p>
          <p className="text-emerald-300 text-sm">Powered by Jos North ICT CDS</p>
        </div>
      </div>
    </footer>
  )
}
