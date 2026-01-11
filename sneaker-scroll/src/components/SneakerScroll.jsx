import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

export default function SneakerScroll() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  const frameCount = 240
  const images = useRef([])
  const [ready, setReady] = useState(false)

  // Scroll → frame mapping
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const rawFrame = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1])
  const frame = useSpring(rawFrame, { stiffness: 60, damping: 30, mass: 1.2 })

  // Preload frames
  useEffect(() => {
    let loaded = 0
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image()
      img.src = `/frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`
      img.onload = () => {
        loaded++

        // draw first frame immediately
        if (loaded === 1) {
          const canvas = canvasRef.current
          const ctx = canvas.getContext("2d")
            canvas.width = window.innerWidth
  canvas.height = window.innerHeight
          const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
          const x = canvas.width / 2 - (img.width * scale) / 2
          const y = canvas.height / 2 - (img.height * scale) / 2

          ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
        }

        if (loaded === frameCount) setReady(true)
      }
      images.current.push(img)
    }
  }, [])

  // Draw frames
  useEffect(() => {
    if (!ready) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = (v) => {
  const img = images.current[Math.round(v)]
  if (!img) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"

  const scale = Math.max(canvas.width / img.width, canvas.height / img.height)
  const x = canvas.width / 2 - (img.width * scale) / 2
  const y = canvas.height / 2 - (img.height * scale) / 2

  ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
}

// 🔥 draw frame 0 immediately
draw(0)

// then listen for scroll updates
const unsubscribe = frame.on("change", draw)


    return () => {
      unsubscribe()
      window.removeEventListener("resize", resize)
    }
  }, [ready])

  return (
    <section ref={containerRef} className="relative h-[400vh] z-10">

      {/* Background video canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full bg-[#050505] pointer-events-none -z-10"
      />

      {/* Text overlays */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
        className="relative z-10 h-screen flex flex-col items-center justify-center text-center"
      >
        <h1 className="text-8xl font-medium tracking-[-0.04em] leading-none">
          ULTRON X
        </h1>
        <p className="mt-6 text-lg tracking-wide text-white/60">
          Precision performance sneakers
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0.25, 0.4], [0, 1]) }}
        className="relative z-10 h-screen flex items-center pl-24 text-4xl font-light tracking-wide text-white/70"
      >
        Carbon Sole
      </motion.div>

      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0.55, 0.7], [0, 1]) }}
        className="relative z-10 h-screen flex items-center justify-end pr-24 text-4xl font-light tracking-wide text-white/70"
      >
        Shock Absorption
      </motion.div>

      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0.85, 1], [0, 1]) }}
        className="relative z-10 h-screen flex items-center justify-center text-5xl font-light tracking-wide"
      >
        Run Beyond Limits
      </motion.div>

    </section>
  )
}
