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
      {/* Background Decorative Glow Circles */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-red-650/10 blur-[120px] pointer-events-none -top-20 -left-20 animate-pulse duration-[4s]" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[150px] pointer-events-none -bottom-30 -right-30 animate-pulse duration-[6s]" />

      {/* Grid pattern overlays for high-end aesthetic */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
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
