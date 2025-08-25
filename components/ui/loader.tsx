
"use client";
import { motion } from "framer-motion";

const Loader = () => (
  <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <motion.div
      className="w-16 h-16 rounded-full border-4 border-accent border-t-transparent animate-spin"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
    <span className="sr-only">Loading...</span>
  </div>
);

export default Loader;
