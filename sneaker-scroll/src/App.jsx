import { motion } from "framer-motion" // Added this missing import
import SneakerScroll from "./components/SneakerScroll"

export default function App() {
  return (
    <div className="bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-white selection:text-black">
      
      {/* 1. The Cinematic Scroll Engine */}
      <SneakerScroll />

      {/* 2. Product Intro - Modern Tech Typography */}
      <section className="relative z-20 bg-[#050505] px-6 md:px-12 xl:px-24 py-32 md:py-56 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <span className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase mb-4 block">
            // Core Philosophy
          </span>
          <h2 className="text-5xl md:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.85] italic uppercase italic-bold">
            Beyond the <br /> 
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>Curve.</span>
          </h2>

          <p className="mt-12 max-w-2xl text-white/50 text-lg md:text-xl xl:text-2xl leading-relaxed font-light">
            ULTRON X is engineered as a performance system—not just a sneaker. 
            Digital tailoring meets biomechanical precision to redefine the 
            physics of movement.
          </p>
        </motion.div>

        {/* Technical Feature Grid */}
        <div className="mt-32 md:mt-56 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16 md:gap-24">
          <Feature 
            number="01"
            title="Carbon Geometry" 
            desc="A sculpted carbon plate distributes energy across every stride, delivering explosive propulsion with surgical precision." 
          />
          <Feature 
            number="02"
            title="Adaptive Cushioning" 
            desc="Layered shock-absorption dynamically responds to impact, minimizing fatigue while maximizing rebound." 
          />
          <Feature 
            number="03"
            title="Kinetic Traction" 
            desc="Directional grip patterns adapt to motion, locking your foot to the surface at every angle." 
          />
        </div>
      </section>

      {/* 3. Studio Section */}
      <section className="bg-[#0b0b0b] px-6 md:px-12 xl:px-24 py-32 md:py-56">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-16 md:gap-32 items-center">
          <div className="order-2 xl:order-1">
            <span className="text-white/30 text-xs tracking-[0.5em] uppercase mb-6 block font-mono">Design Language</span>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase italic leading-none">
              Sculpted <br/> for Motion
            </h3>
            <p className="mt-8 text-white/50 text-lg md:text-xl leading-relaxed max-w-lg">
              Every surface of ULTRON X is digitally engineered for airflow, stability, 
              and kinetic response. The form is not decoration—it is performance.
            </p>
            <button className="mt-12 border border-white/20 px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300">
              Explore Design
            </button>
          </div>

          <div className="order-1 xl:order-2 relative group">
            <div className="absolute -inset-4 bg-blue-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1600"
              className="relative w-full rounded-lg grayscale hover:grayscale-0 transition-all duration-700 object-cover"
              alt="Sneaker studio"
            />
          </div>
        </div>
      </section>

      {/* 4. Brand Logos */}
      <section className="bg-[#050505] py-32 md:py-48 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-white/20 text-[10px] tracking-[0.8em] mb-24 text-center uppercase">
            Official Technical Partners:
          </p>

          <div className="grid invert grid-cols-2 md:grid-cols-4 gap-12 md:gap-24 opacity-30 hover:opacity-100 transition-opacity duration-1000">
            <Brand src="https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png" />
            <Brand src="https://logos-world.net/wp-content/uploads/2020/04/Under-Armour-Logo.png" />
            <Brand src="https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png" />
            <Brand src="https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png" />
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="bg-[#050505] px-6 md:px-12 xl:px-24 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.4em] text-white/20">
        <p>© 2026 ULTRON X / LABS</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition">Instagram</a>
          <a href="#" className="hover:text-white transition">Twitter</a>
          <a href="#" className="hover:text-white transition">Terms</a>
        </div>
        <p>Built for the New World</p>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .italic-bold { font-style: italic; }
      `}</style>
    </div>
  )
}

function Feature({ title, desc, number }) {
  return (
    <div className="group cursor-default">
      <span className="text-blue-500 font-mono text-xs mb-6 block tracking-widest">{number} //</span>
      <h4 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase italic mb-6 group-hover:text-blue-500 transition-colors duration-300">
        {title}
      </h4>
      <p className="text-white/40 leading-relaxed text-base font-light group-hover:text-white/70 transition-colors duration-500">
        {desc}
      </p>
      <div className="mt-10 h-[1px] w-full bg-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-0 bg-white/40 group-hover:w-full transition-all duration-700 ease-in-out" />
      </div>
    </div>
  )
}

function Brand({ src }) {
  return (
    <div className="flex justify-center items-center h-20 grayscale brightness-200">
      <img
        src={src}
        className="h-8 md:h-12 object-contain opacity-50 hover:opacity-100 transition-all duration-500"
        alt="brand"
      />
    </div>
  )
}