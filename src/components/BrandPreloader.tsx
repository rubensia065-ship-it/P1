import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import strolloLogo from '../assets/images/strollo_logo_1781364471188.jpg';

interface BrandPreloaderProps {
  onComplete: () => void;
}

export default function BrandPreloader({ onComplete }: BrandPreloaderProps) {
  const [startFadeOut, setStartFadeOut] = useState(false);

  useEffect(() => {
    // We want the preloader to run for about 2.6s, then start fading out
    const fadeTimer = setTimeout(() => {
      setStartFadeOut(true);
    }, 2500);

    // Complete the preloader entirely at 3.0s
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // "Welcome to Stollo Sneakers" letter-by-letter reveal
  const sentence = "Welcome to Stollo Sneakers";
  const words = sentence.split(" ");

  // Framer-motion variants for staggered letter-by-letter reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 14,
        stiffness: 180,
      },
    },
  };

  // Logo zoom & fade-in variants
  const logoVariants = {
    hidden: { scale: 0.7, opacity: 0, rotate: -6 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 120,
        delay: 0.6, // shows up halfway through letters reveal
      },
    },
  };

  // Floating animation container for logo and brand name
  const floatVariants = {
    animate: {
      y: [0, -6, 0],
      transition: {
        duration: 2.8,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  return (
    <motion.div
      id="brand-preloader"
      className="fixed inset-0 z-[99999] bg-zinc-950 flex flex-col items-center justify-center text-white select-none overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: startFadeOut ? 0 : 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Dynamic Animated Colorful Orbs (Mixed Fluid Aurora Background) */}
      <div className="absolute inset-0 overflow-hidden bg-zinc-950 pointer-events-none">
        {/* Orb 1: Neon Orange/Red */}
        <motion.div
          animate={{
            x: [-80, 120, -40],
            y: [-30, 100, -60],
            scale: [1, 1.25, 0.95],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-gradient-to-tr from-amber-500/25 via-red-650/30 to-rose-600/35 blur-[80px] md:blur-[120px] -top-20 -left-20"
        />

        {/* Orb 2: Vibrant Purple/Pink/Indigo */}
        <motion.div
          animate={{
            x: [120, -100, 60],
            y: [40, 160, -30],
            scale: [1.2, 0.85, 1.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute w-[400px] md:w-[650px] h-[400px] md:h-[650px] rounded-full bg-gradient-to-br from-indigo-500/25 via-purple-600/35 to-pink-500/30 blur-[90px] md:blur-[130px] -bottom-24 -right-16"
        />

        {/* Orb 3: Radiant Gold/Fuchsia Pop */}
        <motion.div
          animate={{
            x: [40, -60, 20],
            y: [150, -40, 80],
            scale: [0.9, 1.15, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-gradient-to-tr from-yellow-500/20 via-pink-600/25 to-red-500/25 blur-[70px] md:blur-[110px] top-1/4 left-1/4"
        />

        {/* Orb 4: Energetic Turquoise/Vivid Blue to add luxury contrast */}
        <motion.div
          animate={{
            x: [-100, 60, -20],
            y: [60, -80, 100],
            scale: [0.8, 1.1, 0.9],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute w-[250px] md:w-[450px] h-[250px] md:h-[450px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-teal-600/15 to-indigo-600/25 blur-[80px] md:blur-[110px] bottom-1/4 right-1/4"
        />
      </div>

      {/* Streetwear Product Collage (Shoes, Clothes, Bags) - Highly elegant & blended */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-10 md:opacity-15">
        {/* Jordan Sneaker (Top Left) */}
        <motion.div
          initial={{ y: 20, rotate: -8, scale: 0.95 }}
          animate={{ y: [0, -15, 0], rotate: [-8, -6, -10, -8] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-[4%] w-32 h-32 md:w-56 md:h-56 origin-center"
        >
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop"
            alt="Strollo Sneakers Jordan"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-2xl filter grayscale contrast-[1.1] brightness-[0.7]"
          />
        </motion.div>

        {/* Premium Hoodie (Top Right) */}
        <motion.div
          initial={{ y: -10, rotate: 6, scale: 0.98 }}
          animate={{ y: [0, 18, 0], rotate: [6, 9, 4, 6] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] right-[5%] w-28 h-36 md:w-48 md:h-64 origin-center"
        >
          <img
            src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop"
            alt="Strollo Hoodie"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-2xl filter grayscale contrast-[1.15] brightness-[0.65]"
          />
        </motion.div>

        {/* Nomad Backpack (Bottom Left) */}
        <motion.div
          initial={{ y: 15, rotate: 5, scale: 0.96 }}
          animate={{ y: [0, -20, 0], rotate: [5, 2, 7, 5] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[3%] w-32 h-40 md:w-48 md:h-60 origin-center"
        >
          <img
            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop"
            alt="Strollo Nomad Bag"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-2xl filter grayscale contrast-[1.1] brightness-[0.7]"
          />
        </motion.div>

        {/* Dunk Low Sneaker (Bottom Right) */}
        <motion.div
          initial={{ y: -15, rotate: -6, scale: 0.95 }}
          animate={{ y: [0, 16, 0], rotate: [-6, -3, -9, -6] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[12%] right-[4%] w-36 h-36 md:w-56 md:h-56 origin-center"
        >
          <img
            src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop"
            alt="Strollo Dunk Low"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-2xl filter grayscale contrast-[1.2] brightness-[0.68]"
          />
        </motion.div>

        {/* Varsity Retro Jacket (Middle Left - Desktop Only) */}
        <motion.div
          initial={{ y: 0, rotate: 11 }}
          animate={{ y: [0, 12, -12, 0], rotate: [11, 14, 8, 11] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] left-[2%] w-28 h-36 md:w-44 md:h-56 origin-center hidden md:block"
        >
          <img
            src="https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=600&auto=format&fit=crop"
            alt="Strollo Varsity Jacket"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-2xl filter grayscale contrast-[1.1] brightness-[0.65]"
          />
        </motion.div>

        {/* T-Shirt Oversize (Middle Right - Desktop Only) */}
        <motion.div
          initial={{ y: 10, rotate: -10 }}
          animate={{ y: [0, -14, 14, 0], rotate: [-10, -7, -13, -10] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[36%] right-[2%] w-28 h-36 md:w-44 md:h-56 origin-center hidden md:block"
        >
          <img
            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop"
            alt="Strollo Oversize Tee"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-2xl filter grayscale contrast-[1.1] brightness-[0.65]"
          />
        </motion.div>
      </div>

      {/* Grid pattern overlays for high-end aesthetic */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05] z-[1]" 
        style={{ 
          backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      {/* Main floating wrapper grouping logo and description */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="flex flex-col items-center text-center px-6 z-10"
      >
        {/* Animated Brand Logo */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden bg-black flex items-center justify-center p-0.5 border border-white/10 shadow-[0_20px_50px_rgba(239,68,68,0.15)] mb-8"
        >
          {/* Outer elegant ring glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-red-600 to-transparent opacity-60 animate-spin-slow" style={{ animationDuration: '8s' }} />
          
          <img 
            src={strolloLogo} 
            alt="Stollo Sneakers"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-2xl z-10"
          />
        </motion.div>

        {/* Welcome Text Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* "Welcome to" decorative top label */}
          <motion.span 
            variants={letterVariants}
            className="text-[10px] md:text-xs font-black uppercase tracking-[0.35em] text-red-500 mb-2 font-sans"
          >
            S E S S I O N  ✦  O N E
          </motion.span>

          {/* Letter by letter "Welcome to Stollo Sneakers" display heading */}
          <h1 className="text-xl md:text-3xl font-black uppercase tracking-wider font-sans mb-3 flex flex-wrap justify-center gap-x-2">
            {words.map((word, wordIdx) => (
              <span key={wordIdx} className="inline-flex overflow-hidden">
                {word.split("").map((letter, letterIdx) => (
                  <motion.span
                    key={letterIdx}
                    variants={letterVariants}
                    className={`inline-block ${
                      word === "Stollo" || word === "Sneakers" 
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-red-500 font-extrabold" 
                        : "text-zinc-300 font-normal"
                    }`}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Premium Sub-text details showing up elegantly */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-[8.5px] md:text-[10px] font-mono text-zinc-500 tracking-widest uppercase flex items-center justify-center gap-1.5"
          >
            <span>Karpala, Ouagadougou</span>
            <span className="text-red-500">•</span>
            <span>Burkina Faso</span>
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Decorative footer elements in the preloader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 text-[8px] font-mono text-zinc-650 text-zinc-600 uppercase tracking-[0.4em]"
      >
        Authentic Streetwear Culture
      </motion.div>
    </motion.div>
  );
}
