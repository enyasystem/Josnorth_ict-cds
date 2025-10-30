"use client";

import React, { useEffect, useMemo, useState } from "react";

/**
 * Props for HeroParticles component.
 *
 * - count: number of particles to render
 * - color: RGB string (e.g. "255,255,255") used as `rgba(${color}, opacity)`
 * - sizeRange: [minPx, maxPx]
 * - durationRange: [minSec, maxSec]
 * - delayMax: maximum random delay in seconds
 * - reduceOnMobile: if true, reduces quantity on small viewports
 */
export type HeroParticlesProps = {
  count?: number;
  color?: string; // "r,g,b"
  sizeRange?: [number, number];
  durationRange?: [number, number];
  delayMax?: number;
  reduceOnMobile?: boolean;
};

const DEFAULTS = {
  count: 30,
  // default to a pleasant light green (RGB)
  color: "144,238,144",
  sizeRange: [2, 12] as [number, number],
  durationRange: [10, 30] as [number, number],
  delayMax: 8,
  reduceOnMobile: true,
};

function randBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

/**
 * HeroParticles
 *
 * Renders a set of absolutely-positioned, animated `div.particle` elements.
 * Each particle uses inline styles for position, size, opacity, animation duration and delay.
 * Container is aria-hidden and pointer-events are disabled so it's purely decorative.
 */
export default function HeroParticles({
  count = DEFAULTS.count,
  color = DEFAULTS.color,
  sizeRange = DEFAULTS.sizeRange,
  durationRange = DEFAULTS.durationRange,
  delayMax = DEFAULTS.delayMax,
  reduceOnMobile = DEFAULTS.reduceOnMobile,
}: HeroParticlesProps) {
  const [particles, setParticles] = useState<Array<Record<string, any>>>([]);

  // memoized values so SSR won't generate randomness. Client-only anyway.
  const isClient = typeof window !== "undefined";

  const effectiveCount = useMemo(() => {
    if (!isClient) return 0;
    if (reduceOnMobile && window.innerWidth < 640) {
      return Math.max(4, Math.floor(count / 3));
    }
    return count;
  }, [count, reduceOnMobile, isClient]);

  useEffect(() => {
    if (!isClient) return;

    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const generated: Array<Record<string, any>> = [];
    for (let i = 0; i < effectiveCount; i++) {
      const size = Math.round(randBetween(sizeRange[0], sizeRange[1]));
      const opacity = Number(randBetween(0.08, 0.6).toFixed(2));
      const duration = Number(randBetween(durationRange[0], durationRange[1]).toFixed(2));
      const delay = Number((Math.random() * delayMax).toFixed(2));
      const top = `${randBetween(0, 100).toFixed(2)}%`;
      const left = `${randBetween(0, 100).toFixed(2)}%`;
      const rotate = `${Math.round(randBetween(0, 360))}deg`;

      const style: Record<string, any> = {
        top,
        left,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "9999px",
        background: `rgba(${color}, ${opacity})`,
        opacity,
        transform: `translate3d(0,0,0) rotate(${rotate})`,
        animationDuration: reducedMotion ? "0s" : `${duration}s`,
        animationDelay: reducedMotion ? "0s" : `${delay}s`,
        // keep the animation linear and infinite via css class
      };

      generated.push(style);
    }

    setParticles(generated);
    if (process.env.NODE_ENV !== "production") {
      // small runtime debug to confirm the component generated particles
      // check browser console to see this message when the page loads
      // eslint-disable-next-line no-console
      console.debug("HeroParticles generated", generated.length, "particles");
    }
  }, [effectiveCount, color, sizeRange, durationRange, delayMax, isClient, reduceOnMobile]);

  // If rendering is disabled or no particles, render nothing
  if (!isClient || particles.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="hero-particles pointer-events-none absolute inset-0 overflow-hidden"
      style={{ position: "absolute", inset: 0 }}
    >
      {particles.map((s, i) => (
        <div
          key={i}
          className="particle pointer-events-none absolute"
          style={s}
        />
      ))}
    </div>
  );
}

/**
 * Example usage (drop into any client-side Hero component):
 *
 * import HeroParticles from "~/components/hero/hero-particles";
 *
 * function Hero() {
 *   return (
 *     <section className="relative overflow-hidden">
 *       <HeroParticles count={30} color="255,255,255" sizeRange={[2,12]} durationRange={[10,30]} delayMax={8} />
 *       <div className="relative z-10">Your hero content here</div>
 *     </section>
 *   )
 * }
 */
