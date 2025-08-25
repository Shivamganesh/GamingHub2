"use client";

import { useEffect, useState, useRef } from "react";
import CarPreloader from "@/components/ui/car-preloader";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";


export default function PagePreloader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [split, setSplit] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // Show preloader for 3s
    return () => clearTimeout(timer);
  }, []);

  // When loading finishes, trigger split animation
  useEffect(() => {
    if (!loading) {
      setSplit(true);
      // Animate split with GSAP
      setTimeout(() => {
        if (topRef.current && bottomRef.current) {
          gsap.to(topRef.current, {
            y: "-100%",
            duration: 1,
            ease: "power3.inOut",
          });
          gsap.to(bottomRef.current, {
            y: "100%",
            duration: 1,
            ease: "power3.inOut",
          });
        }
      }, 50);
      const splitTimer = setTimeout(() => setSplit(false), 1200); // Split lasts 1.2s
      return () => clearTimeout(splitTimer);
    }
  }, [loading]);

  if (loading) return <CarPreloader />;

  return (
    <>
      <AnimatePresence>
        {split && (
          <div
            className="fixed inset-0 z-[9999] pointer-events-none flex flex-col"
            style={{}}
          >
            <div
              ref={topRef}
              className="bg-white dark:bg-neutral-900 w-full h-1/2"
              style={{ borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}
            />
            <div
              ref={bottomRef}
              className="bg-white dark:bg-neutral-900 w-full h-1/2"
              style={{ borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
            />
          </div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
