"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";



function CarPreloader() {
  const carRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [percent, setPercent] = useState(0);
  const [show, setShow] = useState(true);
  const percentRef = useRef(0);
  percentRef.current = percent;

  useEffect(() => {
    // Animate car and progress bar together (no bounce)
    const car = carRef.current;
    const progressBar = progressRef.current;
    let animationFrame: number;
    if (car && progressBar) {
      const fill = progressBar.querySelector('.bar-fill') as HTMLDivElement;
      const carWidth = 64;
      let barWidth = 0;
      requestAnimationFrame(() => {
        barWidth = progressBar.clientWidth;
        let start = performance.now();
  const duration = 2700;
        function animate(now: number) {
          const elapsed = now - start;
          let progress = Math.min(elapsed / duration, 1);
          // Move car and fill bar up to car's front
          let x = (barWidth - carWidth) * progress;
          if (car) {
            car.style.transform = `translateX(${x}px)`;
          }
          if (fill) {
            let fillWidth = x + carWidth;
            fill.style.width = `${fillWidth}px`;
          }
          const nextPercent = Math.round(progress * 100);
          if (nextPercent !== percentRef.current) setPercent(nextPercent);
          if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
          } else {
            // Force a final update after the animation loop to guarantee 100%
            setTimeout(() => {
              if (fill) fill.style.width = `${barWidth}px`;
              setPercent(100);
              setShow(false);
            }, 10);
          }
        }
        animationFrame = requestAnimationFrame(animate);
      });
    }

    // Particle Trail Animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = 150;

    let particles: any[] = [];

    function createParticle(x: number, y: number) {
      particles.push({
        x,
        y,
        alpha: 0.7,
        radius: Math.random() * 8 + 6,
        dx: Math.random() * -2 - 1,
        dy: Math.random() * -1 - 0.5,
        blur: Math.random() * 2 + 1,
      });
    }

    function animateParticles() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.filter = `blur(${p.blur}px)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `#bbb`;
        ctx.fill();
        ctx.restore();
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.018;
        if (p.alpha <= 0) particles.splice(i, 1);
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Emit smoke behind car
    const carEl = carRef.current;
    const emitSmoke = setInterval(() => {
      if (!carEl) return;
      const rect = carEl.getBoundingClientRect();
      createParticle(rect.left, rect.top + 30);
    }, 100);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearInterval(emitSmoke);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex flex-col justify-end bg-white/80 dark:bg-[var(--primary-bg)] z-50 text-neutral-900 dark:text-white overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Fullscreen background car image */}
          <Image
            src="/car.jpg"
            alt="Background Car"
            fill
            className="object-cover object-center absolute inset-0 w-full h-full z-0 opacity-40 dark:opacity-30 pointer-events-none select-none"
            priority
          />

          {/* Centered Loading Text and Percent */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center select-none z-10">
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold tracking-widest mb-2"
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{ scale: 1.08, opacity: 1, color: '#00b894' }}
              transition={{ duration: 0.7, type: 'spring' }}
            >
              Loading <span className="text-accent">GamingHub</span>
            </motion.h1>
            <motion.div
              className="text-2xl md:text-4xl font-bold mb-2"
              initial={{ scale: 0.8, opacity: 0.7 }}
              animate={{ scale: 1.1, opacity: 1, color: '#222' }}
              transition={{ duration: 0.7, type: 'spring', delay: 0.2 }}
              key={percent}
            >
              {percent}%
            </motion.div>
          </div>

          {/* Bottom progress bar and car with smoke */}
          <div className="relative w-full h-36 flex flex-col justify-end z-10">
            {/* Progress Bar */}
            <div
              ref={progressRef}
              className="absolute left-0 bottom-8 h-2 w-full rounded-full overflow-hidden"
            >
              {/* Background bar (always full width, more visible) */}
              <div className="absolute left-0 top-0 h-full w-full bg-neutral-200 dark:bg-neutral-700/60 rounded-full pointer-events-none" />
              {/* Animated fill bar */}
              <div className="bar-fill h-full bg-accent rounded-full transition-all duration-100 relative" style={{ width: '0%' }} />
            </div>

            {/* Car and SVG Smoke */}
            <div
              ref={carRef}
              className="absolute left-0 bottom-14 flex flex-col items-center"
              style={{ zIndex: 2, transform: 'translateX(0px)' }}
            >
              {/* SVG Smoke */}
              <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute left-[-50px] top-6 opacity-70">
                <ellipse cx="10" cy="12" rx="10" ry="6" fill="#bbb" fillOpacity="0.5">
                  <animate attributeName="cx" values="10;20;10" dur="1.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0.2;0.5" dur="1.2s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="30" cy="14" rx="8" ry="4" fill="#ccc" fillOpacity="0.4">
                  <animate attributeName="cx" values="30;40;30" dur="1.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.2s" repeatCount="indefinite" />
                </ellipse>
                <ellipse cx="50" cy="16" rx="6" ry="3" fill="#eee" fillOpacity="0.3">
                  <animate attributeName="cx" values="50;60;50" dur="1.2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.05;0.3" dur="1.2s" repeatCount="indefinite" />
                </ellipse>
              </svg>
              {/* Car shadow */}
              <div className="w-16 h-4 bg-black/40 dark:bg-black/60 rounded-full blur-sm mb-[-8px]" />
              {/* SVG Car */}
              <svg width="64" height="32" viewBox="0 0 64 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="12" width="48" height="12" rx="6" fill="#e53e3e" />
                <rect x="16" y="8" width="32" height="10" rx="5" fill="#fff" />
                <circle cx="18" cy="26" r="5" fill="#222" />
                <circle cx="46" cy="26" r="5" fill="#222" />
                <circle cx="18" cy="26" r="2" fill="#bbb" />
                <circle cx="46" cy="26" r="2" fill="#bbb" />
                <rect x="40" y="10" width="8" height="4" rx="2" fill="#3182ce" />
              </svg>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CarPreloader;
