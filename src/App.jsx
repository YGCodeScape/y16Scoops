import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import chocolateFlavor from './assets/chocolateFlavor.png'
import mangoFlavour from './assets/mangoFlavour.png'
import pistaFlavor from './assets/pistaFlavor.png'
import strawberryFlavour from './assets/strawberryFlavour.png'
import vanillaFlavour from './assets/vanillaFlavour.png'
import PromoSection from './components/PromoSection.jsx'

/* ─────────────────────────────────────────────
   FLAVOR DATA
───────────────────────────────────────────── */
const flavors = [
  {
    id: 0,
    name: 'Mango Tango',
    description:
      'Sun-ripened Alphonso mangoes churned into every scoop. Bursting with tropical sweetness and a vibrant golden glow.',
    image: mangoFlavour,
    bgColor: '#fde9c5',
    discColor: '#FBCF76',
    discStroke: '#E6A020',
    textColor: '#e85d04',
  },
  {
    id: 1,
    name: 'Chocolate Crème',
    description:
      'Rich Belgian dark chocolate folded into thick, velvety cream. Deep, indulgent and utterly irresistible.',
    image: chocolateFlavor,
    bgColor: '#e8d5c4',
    discColor: '#8B5E3C',
    discStroke: '#5C3317',
    textColor: '#3B1A0A',
  },
  {
    id: 2,
    name: 'Strawberry Fields',
    description:
    'Fresh-picked strawberries swirled into every bite. Bright, fruity and perfectly pink summer in a scoop.',
    image: strawberryFlavour,
    bgColor: '#f9d6df',
    discColor: '#F4829A',
    discStroke: '#C94070',
    textColor: '#7B1A35',
  },
  {
    id: 3,
    name: 'Pistachio Bliss',
    description:
      'Roasted Sicilian pistachios ground into a lush green cream. Nutty, smooth and elegantly sophisticated.',
      image: pistaFlavor,
      bgColor: '#d8ecd0',
      discColor: '#8DB87A',
      discStroke: '#4A7A36',
    textColor: '#2A4D1A',
  },
  {
    id: 4,
    name: 'Vanilla Bean',
    description:
      'Pure Madagascar vanilla beans slow-steeped in cream. A timeless classic with warm, floral undertones and a silky, dreamy finish.',
    image: vanillaFlavour,
    bgColor: '#faf6f6',
    discColor: '#F3E9C6',
    discStroke: '#D4C07A',
    textColor: '#7B2D5A',
  },
]

/* ─────────────────────────────────────────────
   FLAVOR DISC COMPONENT
───────────────────────────────────────────── */
function FlavorDisc({ flavor, isActive, index, onClick }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={`Select flavor ${flavor.name}`}
      className="relative rounded-full border-2 cursor-pointer focus:outline-none flex-shrink-0"
      style={{
        width: 36,
        height: 36,
        backgroundColor: flavor.discColor,
        borderColor: isActive ? flavor.discStroke : 'transparent',
      }}
      animate={{
        scale: isActive ? 1.25 : 1,
        borderColor: isActive ? flavor.discStroke : 'rgba(0,0,0,0)',
        boxShadow: isActive
          ? `0 0 0 3px ${flavor.discColor}55, 0 4px 16px ${flavor.discStroke}66`
          : '0 2px 6px rgba(0,0,0,0.1)',
      }}
      whileHover={{ scale: isActive ? 1.25 : 1.12 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {/* Stripe pattern inside disc */}
      <svg className="absolute inset-0 w-full h-full rounded-full" viewBox="0 0 42 42">
        <clipPath id={`clip-${index}`}>
          <circle cx="21" cy="21" r="19" />
        </clipPath>
        <g clipPath={`url(#clip-${index})`}>
          {[...Array(6)].map((_, i) => (
            <line
              key={i}
              x1={-5 + i * 10}
              y1="0"
              x2={-5 + i * 10 + 20}
              y2="42"
              stroke={flavor.discStroke}
              strokeWidth="4"
              strokeOpacity="0.35"
            />
          ))}
        </g>
      </svg>
    </motion.button>
  )
}

/* ─────────────────────────────────────────────
   PRODUCT IMAGE COMPONENT (center column)

   All tubs share the same absolute center point.
   • delta < 0  → prev items: fan top-left
   • delta = 0  → active: centered, upright, full visible size
   • delta > 0  → next items: fan bottom-right
───────────────────────────────────────────── */
function ProductTub({ flavor, index, activeIndex, isMobile }) {
  const delta = index - activeIndex

  const tubWidth = isMobile ? 240 : 300
  const PREV_STEP_Y = isMobile ? -28 : -62
  const PREV_STEP_X = isMobile ? -14 : -28
  const NEXT_STEP_Y = isMobile ? 32 : 70
  const NEXT_STEP_X = isMobile ? 22 : 55

  let x = 0, y = 0, rotate = 0
  const baseScale = isMobile ? 1.0 : 1.1
  let scale = baseScale
  const zIndex = 20 - Math.abs(delta)

  if (delta < 0) {
    const step = Math.abs(delta)
    x = PREV_STEP_X * step
    y = PREV_STEP_Y * step
    rotate = (isMobile ? -14 : -18) * Math.min(step, 2)
    scale = baseScale * Math.max(0.55, 1 - step * 0.18)
  } else if (delta > 0) {
    const step = delta
    x = NEXT_STEP_X * step
    y = NEXT_STEP_Y * step
    rotate = (isMobile ? 12 : 14) * Math.min(step, 2)
    scale = baseScale * Math.max(0.55, 1 - step * 0.18)
  }

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: tubWidth,
        zIndex,
        transformOrigin: '50% 95%',
        pointerEvents: 'none',
        willChange: 'transform',
      }}
      animate={{
        x: x - (isMobile ? tubWidth / 2 : 160),
        y: y - (isMobile ? tubWidth / 2 : 150),
        rotate,
        scale,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 26,
        mass: 0.8,
      }}
    >
      <img
        src={flavor.image}
        alt={flavor.name}
        style={{ width: tubWidth, height: 'auto' }}
        className="object-contain drop-shadow-2xl select-none"
        draggable={false}
      />
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App() {
  const [activeIndex, setActiveIndex]         = useState(0)
  const [showNextSection, setShowNextSection] = useState(false)
  const [isMobile, setIsMobile]               = useState(false)

  // Mobile swipe tracking
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)

  // Wheel transition cooldown tracking
  const isTransitioningRef = useRef(false)
  const transitionTimerRef = useRef(null)

  const activeFlavor = flavors[activeIndex]

  /* ── Responsive window size detection ── */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  /* ── Navigation Actions ── */
  const goToNext = () => {
    if (showNextSection) return
    if (activeIndex < flavors.length - 1) {
      setActiveIndex((prev) => prev + 1)
    } else {
      setShowNextSection(true)
    }
  }

  const goToPrev = () => {
    if (showNextSection) {
      setShowNextSection(false)
    } else if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1)
    }
  }

  const handleDiscClick = (index) => {
    setShowNextSection(false)
    setActiveIndex(index)
  }

  /* ── Smooth, Immediate Wheel / Trackpad Scroll Navigation ── */
  useEffect(() => {
    let accumulatedDelta = 0
    let resetTimer = null

    const handleWheel = (e) => {
      accumulatedDelta += e.deltaY

      if (isTransitioningRef.current) return

      // If user is inside promo section on mobile / scrollable view, allow natural scrolling
      if (showNextSection) {
        const mobileEl = document.querySelector('.promo-mobile-masonry')
        if (mobileEl && mobileEl.scrollHeight > mobileEl.clientHeight) {
          if (e.deltaY > 0) return
          if (e.deltaY < 0 && mobileEl.scrollTop > 15) return
        }
      }

      // Sensitive threshold (35px) for immediate, non-laggy response
      if (Math.abs(accumulatedDelta) >= 35) {
        if (accumulatedDelta > 0) {
          goToNext()
        } else {
          goToPrev()
        }

        accumulatedDelta = 0
        isTransitioningRef.current = true

        clearTimeout(transitionTimerRef.current)
        transitionTimerRef.current = setTimeout(() => {
          isTransitioningRef.current = false
          accumulatedDelta = 0
        }, 450) // Smooth pacing cooldown between transitions
      }

      clearTimeout(resetTimer)
      resetTimer = setTimeout(() => {
        accumulatedDelta = 0
      }, 150)
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      clearTimeout(transitionTimerRef.current)
      clearTimeout(resetTimer)
    }
  }, [activeIndex, showNextSection])

  /* ── Keyboard navigation ── */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        goToNext()
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrev()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIndex, showNextSection])

  /* ── Mobile Touch Swipe Gesture Support (Horizontal & Vertical) ── */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const diffX = touchStartX.current - e.changedTouches[0].clientX
    const diffY = touchStartY.current - e.changedTouches[0].clientY

    const SWIPE_THRESHOLD = 35

    // If inside promo section, allow natural touch scrolling
    if (showNextSection) {
      const mobileEl = document.querySelector('.promo-mobile-masonry')
      if (mobileEl && mobileEl.scrollTop > 15 && diffY < 0) {
        touchStartX.current = null
        touchStartY.current = null
        return
      }
      if (diffY < -55) {
        goToPrev() // swipe down at top returns to hero
      }
      touchStartX.current = null
      touchStartY.current = null
      return
    }

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (Math.abs(diffX) > SWIPE_THRESHOLD) {
        if (diffX > 0) {
          goToNext() // swipe left -> next flavor
        } else {
          goToPrev() // swipe right -> prev flavor
        }
      }
    } else {
      if (Math.abs(diffY) > SWIPE_THRESHOLD) {
        if (diffY > 0) {
          goToNext() // swipe up -> next flavor
        } else {
          goToPrev() // swipe down -> prev flavor / back to flavors
        }
      }
    }

    touchStartX.current = null
    touchStartY.current = null
  }

  return (
    <div className="app-container"
      style={{
        backgroundColor: showNextSection ? '#d9d9d9' : activeFlavor.bgColor,
        transition: 'background-color 0.8s ease',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd} >
      
        {/* ══════════════════════════════════
            HEADER (Top on all devices)
        ══════════════════════════════════ */}
        <motion.header
          className="app-header"
          animate={{
            opacity: showNextSection ? 0 : 1,
            y: showNextSection ? -45 : 0,
          }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{ pointerEvents: showNextSection ? 'none' : 'auto' }}
        >
          {/* Wordmark */}
          <div>
            <motion.div
              className="brand-title font-normal tracking-tight"
              style={{ color: activeFlavor.textColor }}
              animate={{ color: activeFlavor.textColor }}
              transition={{ duration: 0.6 }}
            >
              Y16Scoops
            </motion.div>
            <div
              className="brand-subtitle"
              style={{ color: activeFlavor.textColor }}
            >
              Creamery
            </div>
          </div>

          {/* Social icons */}
          <div className="social-links">
            {[
              { icon: <InstagramIcon />, href: '#' },
              { icon: <FacebookIcon />, href: '#' }
            ].map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                className="social-btn"
                style={{ color: activeFlavor.textColor, backgroundColor: `${activeFlavor.discColor}88` }}
                whileHover={{ scale: 1.15, backgroundColor: activeFlavor.discColor }}
                whileTap={{ scale: 0.95 }}
                animate={{ color: activeFlavor.textColor }}
                transition={{ duration: 0.4 }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.header>
      {/* ── Landing panel — slides UP when transitioning to next section ── */}
      <motion.div className="absolute inset-0 z-10 flex flex-col"
        animate={{ y: showNextSection ? '-100%' : '0%' }}
        transition={{ type: 'spring', stiffness: 140, damping: 26, mass: 0.9 }}
      >

        {/* ══════════════════════════════════
            MAIN CONTENT AREA
            Mobile: Stacked vertically (Top Info -> Center Tubs -> Bottom Discs)
            Desktop: 3-column Layout (Left Info | Center Tubs | Right Brand & Discs)
        ══════════════════════════════════ */}
        <main className="app-main">
          {/* ── 1. FLAVOUR TITLE, DESCRIPTION & CTA (Top on mobile, Left on desktop) ── */}
          <div className="flavor-info-column">
            {/* Flavor name */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={`name-${activeIndex}`}
                  className="flavor-title font-black uppercase"
                  style={{ color: activeFlavor.textColor }}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -25, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {activeFlavor.name}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Description */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${activeIndex}`}
                  className="flavor-description"
                  style={{ color: activeFlavor.textColor }}
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.8 }}
                  exit={{ y: -18, opacity: 0 }}
                  transition={{ duration: 0.28, delay: 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {activeFlavor.description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTA button */}
            <motion.button
              type="button"
              className="flavor-cta"
              style={{
                backgroundColor: activeFlavor.textColor,
                color: activeFlavor.bgColor,
              }}
              animate={{
                backgroundColor: activeFlavor.textColor,
                color: activeFlavor.bgColor,
              }}
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <span className="flavor-cta-icon">
                <CartIcon />
              </span>
              SHOP NOW
            </motion.button>
          </div>

          {/* ── 2. PRODUCT TUBS (Center column on desktop, Center area on mobile) ── */}
          <div className="tubs-column">
            <div className="tubs-stage">
              {flavors.map((flavor, i) => (
                <ProductTub
                  key={flavor.id}
                  flavor={flavor}
                  index={i}
                  activeIndex={activeIndex}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>

          {/* ── 3. BRAND TAGLINE & FLAVOR DISCS ── */}
          <div className="brand-column">
            {/* Brand tagline (visible on desktop, hidden on mobile via CSS media query) */}
            <div className="brand-tagline">
              <motion.div
                className="text-right"
                animate={{ color: activeFlavor.textColor }}
                transition={{ duration: 0.6 }}
              >
                <div className="tagline-line1" style={{ color: activeFlavor.textColor }}>
                  ICE CREAM
                </div>
                <div className="tagline-line2" style={{ color: activeFlavor.textColor }}>
                  JUST THE WAY
                </div>
                <div className="tagline-line3" style={{ color: activeFlavor.textColor }}>
                  YOU LIKE IT
                </div>
              </motion.div>
            </div>

            {/* Flavor discs (bottom-right on desktop, bottom-center on mobile) */}
            <div className="flavor-discs-container">
              <div
                className="flavor-discs-label"
                style={{ color: activeFlavor.textColor }}
              >
                Made With Love
              </div>
              <div className="flavor-discs-list">
                {flavors.map((flavor, i) => (
                  <FlavorDisc
                    key={flavor.id}
                    flavor={flavor}
                    isActive={i === activeIndex && !showNextSection}
                    index={i}
                    onClick={() => handleDiscClick(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* ── Scroll / Click indicator to discover promotions when on last flavor ── */}
        <AnimatePresence>
          {activeIndex === flavors.length - 1 && !showNextSection && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.35 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
            >
              <button
                onClick={() => setShowNextSection(true)}
                className="flex items-center gap-2 rounded-full bg-white/85 hover:bg-white text-stone-800 text-[9px] font-bold uppercase tracking-wider shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-white/70"
                style={{paddingInline: '16px', paddingBlock: '6px' }}
              >
                <span>Discover Promotions</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 animate-bounce">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── NEXT SECTION (PROMOTIONAL BANNERS & VIDEO MASONRY) ── */}
      <motion.div
        className="absolute inset-0 flex flex-col"
        style={{ zIndex: 20, backgroundColor: '#d9d9d9' }}
        animate={{ y: showNextSection ? '0%' : '100%' }}
        transition={{ type: 'spring', stiffness: 140, damping: 26, mass: 0.9 }}
      >
        <PromoSection
          isActive={showNextSection}
          onBackToHero={() => setShowNextSection(false)}
        />
      </motion.div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   ICONS (SVG inline)
───────────────────────────────────────────── */

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}