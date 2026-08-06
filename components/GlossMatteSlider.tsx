'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

interface GlossMatteSliderProps {
  glossSrc: string
  matteSrc: string
  alt: string
}

export default function GlossMatteSlider({ glossSrc, matteSrc, alt }: GlossMatteSliderProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromClientX(e.clientX)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return
    updateFromClientX(e.clientX)
  }

  const handlePointerUp = () => {
    draggingRef.current = false
  }

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative w-full aspect-[1900/564] overflow-hidden rounded-2xl border border-white/10 select-none touch-none cursor-ew-resize"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <Image
          src={matteSrc}
          alt={`${alt} — stealth matte PPF finish`}
          fill
          sizes="(min-width: 1024px) 896px, 100vw"
          priority
          className="object-cover pointer-events-none"
        />

        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={glossSrc}
            alt={`${alt} — ultra-gloss PPF finish`}
            fill
            sizes="(min-width: 1024px) 896px, 100vw"
            priority
            className="object-cover"
          />
        </div>

        <div
          className="absolute inset-y-0 w-0.5 bg-[#9FFE0A] pointer-events-none"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#9FFE0A] flex items-center justify-center shadow-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A292E" strokeWidth="2.5" strokeLinecap="round">
              <path d="M8 6L2 12L8 18" />
              <path d="M16 6L22 12L16 18" />
            </svg>
          </div>
        </div>

        <span className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-white font-roboto text-xs tracking-widest uppercase pointer-events-none">
          Gloss
        </span>
        <span className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-white font-roboto text-xs tracking-widest uppercase pointer-events-none">
          Matte
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="w-full mt-4 accent-[#9FFE0A]"
        aria-label="Drag to compare gloss and stealth matte PPF finish"
      />
    </div>
  )
}
