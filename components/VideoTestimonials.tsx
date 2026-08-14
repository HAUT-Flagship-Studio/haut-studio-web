'use client'

import { useRef, useState, type ReactNode } from 'react'
import { VIDEO_TESTIMONIALS, type VideoTestimonialItem } from '@/lib/data'

function VideoCard({ item }: { item: VideoTestimonialItem }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handlePlay = () => {
    setPlaying(true)
    videoRef.current?.play()
  }

  return (
    <div
      className={`card-folded relative overflow-hidden border border-slate-800 bg-black ${
        item.orientation === 'portrait' ? 'aspect-[9/16]' : 'aspect-video'
      }`}
    >
      <video
        ref={videoRef}
        src={item.video}
        poster={item.poster}
        controls={playing}
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onPause={() => setPlaying(false)}
      />

      {!playing && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 group"
          aria-label={`Play video review — ${item.name}, ${item.vehicle}`}
        >
          <span className="absolute inset-0 bg-gradient-to-t from-[#1A292E]/90 via-transparent to-[#1A292E]/40" />
          <span className="relative w-16 h-16 rounded-full bg-[#9FFE0A] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <svg className="w-6 h-6 text-[#1A292E] translate-x-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 4.5a1 1 0 011.5-.87l9 5.5a1 1 0 010 1.74l-9 5.5A1 1 0 016.3 15.5v-11z" />
            </svg>
          </span>
          <span className="relative px-4 text-center">
            <span className="block text-white font-bold text-sm">{item.name}</span>
            <span className="block text-[#9FFE0A] text-xs font-roboto uppercase tracking-wide">
              {item.vehicle} · {item.service}
            </span>
          </span>
        </button>
      )}
    </div>
  )
}

export default function VideoTestimonials({
  ids,
  eyebrow = '✦ In Their Own Words',
  title = (
    <>
      Hear It
      <br />
      <span className="text-[#9FFE0A]">Straight From Clients.</span>
    </>
  ),
}: {
  ids?: string[]
  eyebrow?: string
  title?: ReactNode
}) {
  const items = ids ? VIDEO_TESTIMONIALS.filter((item) => ids.includes(item.id)) : VIDEO_TESTIMONIALS
  if (items.length === 0) return null

  return (
    <section
      className="bg-[#1A292E] precision-grid py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      aria-label="Video testimonials"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12 text-left">
          <p className="text-xs md:text-sm font-mono font-bold tracking-widest text-[#9FFE0A] uppercase mb-2 flex items-center gap-2">
            {eyebrow}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {title}
          </h2>
        </div>

        <div className={`grid grid-cols-1 gap-6 items-start ${items.length > 1 ? 'md:grid-cols-5' : 'max-w-sm'}`}>
          {items.map((item) => (
            <div
              key={item.id}
              className={item.orientation === 'portrait' ? 'md:col-span-2' : 'md:col-span-3'}
            >
              <VideoCard item={item} />
              <p className="text-[#DADADA]/60 text-sm font-roboto mt-3 leading-relaxed">{item.hook}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
