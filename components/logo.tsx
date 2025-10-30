export function Logo() {
  return (
    <div className="flex items-center gap-2">
      {/* Logo SVG */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-green-600"
      >
        {/* Circle background */}
        <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="2" />

        {/* Tech symbol - interconnected nodes */}
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        <circle cx="28" cy="12" r="2.5" fill="currentColor" />
        <circle cx="20" cy="28" r="2.5" fill="currentColor" />

        {/* Connection lines */}
        <line x1="12" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="1.5" />
        <line x1="12" y1="12" x2="20" y2="28" stroke="currentColor" strokeWidth="1.5" />
        <line x1="28" y1="12" x2="20" y2="28" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* Logo text */}
      <div className="flex flex-col leading-tight">
        <span className="font-extrabold text-sm text-green-700">JN ICT</span>
        <span className="text-xs font-semibold text-green-600">CDS</span>
      </div>
    </div>
  )
}
