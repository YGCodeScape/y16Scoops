import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import banner1 from '../assets/banners/banner1.png'
import banner2 from '../assets/banners/banner2.png'
import banner3 from '../assets/banners/banner3.png'
import banner4 from '../assets/banners/banner4.png'
import banner5 from '../assets/banners/banner5.png'
import banner6 from '../assets/banners/banner6.jpg'
import videoAD from '../assets/banners/videoAD.mp4'

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
   Cascading staggered reveal + alive floating hover
───────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
    },
  },
}

const frameVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 32 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 240,
      damping: 24,
      mass: 0.85,
    },
  },
}

export default function PromoSection({ isActive }) {
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const desktopVideoRef = useRef(null)
  const mobileVideoRef = useRef(null)
  const promoContainerRef = useRef(null)

  // Autoplay video when active - avoid calling setState synchronously in effect
  useEffect(() => {
    const video = window.innerWidth >= 768 ? desktopVideoRef.current : mobileVideoRef.current
    if (video) {
      if (isActive) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    }
  }, [isActive])

  const toggleSound = (e) => {
    e.stopPropagation()
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    if (desktopVideoRef.current) desktopVideoRef.current.muted = nextMuted
    if (mobileVideoRef.current) mobileVideoRef.current.muted = nextMuted
  }

  const togglePlay = () => {
    const video = window.innerWidth >= 768 ? desktopVideoRef.current : mobileVideoRef.current
    if (video) {
      if (video.paused) {
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    }
  }

  return (
    <section ref={promoContainerRef}
      className="promo-section-container w-full h-full relative overflow-hidden select-none"
      style={{ backgroundColor: '#faf6f6', padding: '20px'}}
    >

      {/* ── DESKTOP & TABLET MASONRY LAYOUT ── */}
      <motion.div
        className="promo-desktop-masonry hidden md:flex w-full h-full max-w-[1720px] mx-auto gap-3 lg:gap-3.5 box-border"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        {/* ── COLUMN 1: LEFT (banner1 top, banner3 bottom) ── */}
        <div className="flex flex-col w-[20%] lg:w-[20.2%] h-full gap-3 lg:gap-3.5">
          {/* Frame 1: Taste the Fun */}
          <motion.div
            variants={frameVariants}
            whileHover={{ scale: 1.018, y: -2 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="group relative flex-[1.0] rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <img
              src={banner1}
              alt="Taste the fun"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              draggable={false}
            />
          </motion.div>

          {/* Frame 2: Girl with chocolate tub */}
          <motion.div
            variants={frameVariants}
            whileHover={{ scale: 1.018, y: -2 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="group relative flex-[1.0] rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <img
              src={banner3}
              alt="Playful chocolate flavor"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              draggable={false}
            />
          </motion.div>
        </div>

        {/* ── COLUMN 2: CENTER (banner2 wide top, banner5 + banner4 bottom) ── */}
        <div className="flex flex-col flex-1 h-full gap-3 lg:gap-3.5">
          {/* Frame 3: Ice Cream Just The Way You Like It */}
          <motion.div
            variants={frameVariants}
            whileHover={{ scale: 1.012, y: -2 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="group relative flex-[1.20] rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          >
            <img
              src={banner2}
              alt="Ice cream just the way you like it"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              draggable={false}
            />
          </motion.div>

          {/* Bottom Row: 2 square banners */}
          <div className="flex flex-row flex-1 gap-3 lg:gap-3.5">
            {/* Frame 4: Scoop happiness everyday */}
            <motion.div
              variants={frameVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="group relative flex-[0.4] rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={banner5}
                alt="Scoop happiness everyday"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                draggable={false}
              />
            </motion.div>

            {/* Frame 5: Strawberry puff with custard cream */}
            <motion.div
              variants={frameVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="group relative flex-[0.4] rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={banner4}
                alt="Strawberry puff with custard cream"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                draggable={false}
              />
            </motion.div>
            <motion.div
              variants={frameVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="group relative flex-[0.4] rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <img
                src={banner6}
                alt="Strawberry puff with custard cream"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                draggable={false}
              />
            </motion.div>
          </div>
        </div>

        {/* ── COLUMN 3: RIGHT (videoAD top tall, banner6 bottom) ── */}
        <div className="flex flex-col w-[22%] lg:w-[22.2%] h-full gap-3 lg:gap-3.5">
          {/* Frame 6: Video Banner */}
          <motion.div
            variants={frameVariants}
            whileHover={{ scale: 1.018, y: -2 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={togglePlay}
            className="group relative flex-[1.68] rounded-2xl lg:rounded-3xl overflow-hidden bg-stone-900 shadow-sm hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
          >
            <video
              ref={desktopVideoRef}
              src={videoAD}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />

            {/* Live Reel Glass Badge */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full bg-black/45 backdrop-blur-md text-white text-[8px] font-bold tracking-wider uppercase border border-white/15 pointer-events-none"
               style={{paddingBlock: '3px', paddingInline: '8px' }} >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>Promo Reel</span>
            </div>

            {/* Sound Toggle Button */}
            <button
              onClick={toggleSound}
              className="absolute bottom-3.5 right-3.5 flex items-center justify-center w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 backdrop-blur-md text-white transition-all duration-200 hover:scale-110 active:scale-90 border border-white/15 shadow-md cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="1" y1="1" x2="23" y2="23" />
                  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>

            {/* Pause indicator overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-black/35 flex items-center justify-center pointer-events-none backdrop-blur-[2px]">
                <div className="w-12 h-12 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-0.5">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* ── MOBILE RESPONSIVE MASONRY/BENTO LAYOUT (< 768px) ── */}
      <motion.div
        className="promo-mobile-masonry md:hidden w-full h-full overflow-y-auto flex flex-col gap-2.5 box-border"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? 'visible' : 'hidden'}
      >
        {/* Frame 3: Wide Hero Banner */}
        <motion.div
          variants={frameVariants}
          className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-sm"
        >
          <img
            src={banner2}
            alt="Ice cream just the way you like it"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* 2-Column Row 1: Taste the Fun + Video */}
        <div className="grid grid-cols-2 gap-2.5 w-full">
          {/* Frame 1: Taste the Fun */}
          <motion.div
            variants={frameVariants}
            className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-sm"
          >
            <img
              src={banner1}
              alt="Taste the fun"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Frame 6: Video Reel */}
          <motion.div
            variants={frameVariants}
            onClick={togglePlay}
            className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-stone-900 shadow-sm"
          >
            <video
              ref={mobileVideoRef}
              src={videoAD}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />
            <button
              onClick={toggleSound}
              className="absolute bottom-2 right-2 flex items-center justify-center w-7 h-7 rounded-full bg-black/60 text-white"
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <line x1="1" y1="1" x2="23" y2="23" />
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
          </motion.div>
        </div>

        {/* 2-Column Row 2: Scoop Happiness + Strawberry Puff */}
        <div className="grid grid-cols-2 gap-2.5 w-full">
          <motion.div
            variants={frameVariants}
            className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm"
          >
            <img
              src={banner5}
              alt="Scoop happiness"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            variants={frameVariants}
            className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm"
          >
            <img
              src={banner4}
              alt="Strawberry puff"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* 2-Column Row 3: Playground + Scoops Line */}
        <div className="grid grid-cols-2 gap-2.5 w-full">
          <motion.div
            variants={frameVariants}
            className="relative w-full aspect-[1/1] rounded-2xl overflow-hidden shadow-sm"
          >
            <img
              src={banner3}
              alt="Playful chocolate"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            variants={frameVariants}
            className="relative w-full aspect-[1/1] rounded-2xl overflow-hidden shadow-sm"
          >
            <img
              src={banner6}
              alt="Scoops variety"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
