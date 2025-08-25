"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"
import { Sparkles } from "lucide-react"
import { useTheme } from "next-themes"

gsap.registerPlugin(ScrollTrigger)

const aboutText = `GamingHub is a modern game portal where gamers and users can play a curated collection of web-based games online or offline. To play offline, simply download the game folder and open index.html or the game file. Our mission is to make gaming accessible, social, and fun for everyone—whether you’re a casual player or a competitive gamer. Enjoy real-time leaderboards, track your progress, and connect with a vibrant gaming community. Celebrate your achievements, share your high scores with friends, and experience the future of online play. With a focus on user experience, we ensure smooth gameplay and regular updates to keep things fresh. At GamingHub, every player matters and every game is a new adventure waiting to be explored. Discover new favorites and unlock your potential with every game you play. Join us today and become part of a community that celebrates passion, skill and the joy of gaming and Explore, compete, connect.`

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;
    const currentTheme = theme === "system" ? resolvedTheme : theme;
    const initialColor = currentTheme === "dark" ? "#a1a1aa" : "#D6D6DA";
    const ctx = gsap.context(() => {
      // Split paragraph into chars for effect
      const split = new SplitType(".about-paragraph", { types: "lines,words,chars", charClass: "about-char" })
      gsap.set(".about-char", { color: initialColor });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1200",
          pin: true,
          scrub: 0.1,
        }
      });
      tl.to(".about-char", {
        color: "#22c55e",
        stagger: 1,
        ease: "none",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [theme, resolvedTheme, mounted]);

  if (!mounted) return null;
  return (
    <section ref={sectionRef} id="about" className="w-full min-h-screen py-20 px-4 md:px-8 lg:px-16 bg-white/10 backdrop-blur-md flex items-center justify-center">
      <div className="max-w-6xl w-full flex flex-col justify-center items-center mx-auto">
        <h2 className="text-5xl md:text-6xl font-anton text-center text-text-primary mb-12 tracking-tight">About GamingHub</h2>
        <p className="about-paragraph text-lg md:text-2xl leading-relaxed text-text-secondary text-justify [text-align-last:justify] max-w-6xl mx-auto">
          {aboutText}
        </p>
      </div>
    </section>
  )
}

export default AboutSection
