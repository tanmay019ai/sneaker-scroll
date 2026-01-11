import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

export default function SneakerScroll() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  const frameCount = 240
  const images = useRef([])
  const [imagesLoaded, setImagesLoaded] = useState(0)
  const [currentFolder, setCurrentFolder] = useState(null)

  // 1. Scroll Control
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const rawFrame = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1])
  const frame = useSpring(rawFrame, { stiffness: 70, damping: 30, mass: 1 })
  const canvasOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0])

  // 2. FIXED PRELOADER (Detects PNG vs JPG)
  const loadImages = (folderName) => {
    if (currentFolder === folderName) return;
    
    setCurrentFolder(folderName);
    images.current = [];
    setImagesLoaded(0);

    // FIX: Your mobile frames are .png, desktop are .jpg
    const extension = folderName === "frames-mobile" ? "png" : "jpg";

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/${folderName}/ezgif-frame-${String(i).padStart(3, "0")}.${extension}`;
      
      img.onload = () => {
        images.current[i - 1] = img;
        setImagesLoaded(prev => prev + 1);
      };
      img.onerror = () => {
        // Fallback check: if png fails, try jpg
        if (img.src.endsWith(".png")) {
           img.src = img.src.replace(".png", ".jpg");
        }
      };
    }
  };

  useEffect(() => {
    const handleCheckMode = () => {
      const isMobile = window.innerWidth < 768;
      const targetFolder = isMobile ? "frames-mobile" : "frames";
      loadImages(targetFolder);
    };

    handleCheckMode();
    window.addEventListener("resize", handleCheckMode);
    return () => window.removeEventListener("resize", handleCheckMode);
  }, [currentFolder]);

  // 3. Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const render = () => {
      const index = Math.round(frame.get());
      const img = images.current[index];
      if (!img) return;

      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = canvas.width / 2 - (img.width * scale) / 2;
      const y = canvas.height / 2 - (img.height * scale) / 2;

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    if (imagesLoaded > 0) render();
    const unsub = frame.on("change", render);
    return () => unsub();
  }, [imagesLoaded, frame]);

  return (
    <div ref={containerRef} className="relative h-[450vh] bg-[#050505] text-white overflow-x-hidden font-sans">
      
      <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

      {imagesLoaded < frameCount && (
        <div className="fixed top-0 left-0 h-[2px] bg-white z-[60] transition-all duration-300 shadow-[0_0_10px_#fff]" 
             style={{ width: `${(imagesLoaded / frameCount) * 100}%` }} />
      )}

      <motion.canvas
        ref={canvasRef}
        style={{ opacity: canvasOpacity }}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      <div className="relative z-20">
        {/* Section 1: Hero */}
        <motion.section 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]), 
            scale: useTransform(scrollYProgress, [0, 0.15], [1, 0.9]) 
          }}
          className="h-screen flex flex-col items-center justify-center text-center px-6"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-white/40 mb-4 block">Engineered for Speed</span>
          <h1 className="text-[18vw] md:text-[12rem] font-black tracking-tighter leading-[0.8] italic uppercase italic-bold">
            ULTRON <span className="text-outline">X</span>
          </h1>
          <div className="mt-8 overflow-hidden">
             <p className="text-white/30 text-sm md:text-base tracking-widest uppercase italic">001 // Prototype Edition</p>
          </div>
        </motion.section>

        {/* Section 2: Detail 1 */}
        <motion.section 
          style={{ opacity: useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]) }}
          className="h-screen flex items-center px-8 md:px-32"
        >
          <div className="max-w-xl border-l-[1px] border-white/20 pl-8 md:pl-12 py-4">
            <span className="text-blue-500 font-mono text-xs mb-2 block tracking-widest">[ 01. SOLE ]</span>
            <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none italic">Carbon Fiber <br/> Matrix</h2>
            <p className="text-white/50 text-base md:text-lg mt-6 leading-relaxed max-w-sm">
              Ultra-responsive carbon structure that returns 98% of kinetic energy with every stride.
            </p>
          </div>
        </motion.section>

        {/* Section 3: Detail 2 */}
        <motion.section 
          style={{ opacity: useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]) }}
          className="h-screen flex items-center justify-end px-8 md:px-32"
        >
          <div className="max-w-xl border-r-[1px] border-white/20 pr-8 md:pl-12 py-4 text-right flex flex-col items-end">
            <span className="text-blue-500 font-mono text-xs mb-2 block tracking-widest">[ 02. CORE ]</span>
            <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter leading-none italic">Nitro-Infused <br/> Cushion</h2>
            <p className="text-white/50 text-base md:text-lg mt-6 leading-relaxed max-w-sm">
              Liquid nitrogen injected foam provides weightless stability for long-distance performance.
            </p>
          </div>
        </motion.section>

        {/* Section 4: Final CTA */}
        <motion.section 
          style={{ opacity: useTransform(scrollYProgress, [0.85, 0.95], [0, 1]) }}
          className="h-screen flex flex-col items-center justify-center text-center px-6"
        >
          <h2 className="text-7xl md:text-[10rem] font-black uppercase italic tracking-tighter mb-10 leading-none">Run Beyond <br/> Limits.</h2>
          <button className="group relative px-12 py-4 bg-white text-black font-bold uppercase tracking-tighter text-sm overflow-hidden rounded-full transition-all hover:scale-110 active:scale-95">
            <span className="relative z-10">Pre-Order the Prototype</span>
            <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </motion.section>
      </div>

      <style>{`
        .text-outline {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.6);
        }
        .italic-bold {
          font-style: italic;
          -webkit-font-smoothing: antialiased;
        }
        body { background-color: #050505; margin: 0; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}