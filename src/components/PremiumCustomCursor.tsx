import React, { useState, useEffect, useRef } from 'react';

export default function PremiumCustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<'normal' | 'clickable' | 'product' | 'image'>('normal');
  const [isClicked, setIsClicked] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });

  // Refs for positions (prevents React re-renders on mousemove)
  const cursorPos = useRef({ x: 0, y: 0 });
  const mainDotPos = useRef({ x: 0, y: 0 });
  const outerRingPos = useRef({ x: 0, y: 0 });

  // Refs for elements to modify styling with maximum performance
  const mainDotRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Media query to check if the device supports a precise pointing device (desktop)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    
    // Check if device supports touch to double check
    const isTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      );
    };

    if (!mediaQuery.matches || isTouchDevice()) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    // Initial position in the center so it doesn't jump
    cursorPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    mainDotPos.current = { ...cursorPos.current };
    outerRingPos.current = { ...cursorPos.current };

    const handleMouseMove = (e: MouseEvent) => {
      cursorPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      setRippleActive(false); // Reset
      setTimeout(() => {
        setRipplePos({ x: e.clientX, y: e.clientY });
        setRippleActive(true);
      }, 0);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    // Use event delegation to dynamically detect hovers on buttons, links, product cards, product images
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Clickable elements (Buttons, input controls, custom actions)
      const clickable = target.closest('button, a, [role="button"], input, select, textarea, .cursor-pointer, [onclick]');
      // Product image specific highlights
      const isProductImg = target.closest('img, .story-image, [class*="product"] img, [class*="active-slide"] img');
      // Product cards/containers
      const isProductCard = target.closest('[id*="product-card"], .product-card, [id*="card"]');

      if (clickable) {
        setCursorState('clickable');
      } else if (isProductImg) {
        setCursorState('image');
      } else if (isProductCard) {
        setCursorState('product');
      } else {
        setCursorState('normal');
      }
    };

    const handleMouseLeaveWindow = () => {
      if (mainDotRef.current) mainDotRef.current.style.opacity = '0';
      if (outerRingRef.current) outerRingRef.current.style.opacity = '0';
    };

    const handleMouseEnterWindow = () => {
      if (mainDotRef.current) mainDotRef.current.style.opacity = '1';
      if (outerRingRef.current) outerRingRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnterWindow, { passive: true });

    let animationFrameId: number;

    const updatePosition = () => {
      // Linear interpolation to create inertia / lag effects
      // Main Dot: Super-fast, highly direct tracker
      mainDotPos.current.x += (cursorPos.current.x - mainDotPos.current.x) * 0.45;
      mainDotPos.current.y += (cursorPos.current.y - mainDotPos.current.y) * 0.45;

      // Outer Ring: Slower trailer to generate elegant spring delay (inertie premium)
      outerRingPos.current.x += (cursorPos.current.x - outerRingPos.current.x) * 0.16;
      outerRingPos.current.y += (cursorPos.current.y - outerRingPos.current.y) * 0.16;

      // Apply coordinates using translate3d for hardware acceleration
      if (mainDotRef.current) {
        mainDotRef.current.style.transform = `translate3d(${mainDotPos.current.x}px, ${mainDotPos.current.y}px, 0)`;
      }
      if (outerRingRef.current) {
        outerRingRef.current.style.transform = `translate3d(${outerRingPos.current.x}px, ${outerRingPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    // Disable standard cursor on the page if premium cursor is active
    const styleElement = document.createElement('style');
    styleElement.id = 'premium-cursor-invisible-override';
    styleElement.innerHTML = `
      @media (pointer: fine) {
        body, a, button, input, select, textarea, [role="button"], .cursor-pointer {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      cancelAnimationFrame(animationFrameId);

      const styleOverride = document.getElementById('premium-cursor-invisible-override');
      if (styleOverride) {
        styleOverride.remove();
      }
    };
  }, []);

  // Remove elements on mobile
  if (!isVisible) return null;

  // Visual state definitions
  const getOuterRingClasses = () => {
    let classes = 'fixed top-[-16px] left-[-16px] w-[32px] h-[32px] rounded-full border pointer-events-none z-[99999] transition-all duration-300 ease-out ';
    
    if (isClicked) {
      classes += 'scale-75 border-red-600 bg-red-600/10';
    } else {
      switch (cursorState) {
        case 'clickable':
          // Scaled down & filled accent color
          classes += 'scale-110 border-red-600 bg-red-600/5 shadow-[0_0_12px_rgba(239,68,68,0.2)]';
          break;
        case 'image':
          // Expanding classy dashed luxury target
          classes += 'scale-150 border-double border-2 border-red-500 bg-black/5 animate-[spin_12s_linear_infinite]';
          break;
        case 'product':
          // Elegant glow surrounding
          classes += 'scale-[1.3] border-zinc-900 bg-zinc-900/5';
          break;
        case 'normal':
        default:
          classes += 'border-zinc-800/40 bg-transparent';
          break;
      }
    }
    return classes;
  };

  const getMainDotClasses = () => {
    let classes = 'fixed top-[-4px] left-[-4px] w-[8px] h-[8px] rounded-full pointer-events-none z-[100000] mix-blend-normal transition-all duration-300 ease-out ';
    
    if (isClicked) {
      classes += 'scale-[1.8] bg-red-600 shadow-md';
    } else {
      switch (cursorState) {
        case 'clickable':
          classes += 'scale-0 bg-red-600'; // custom sleek touch: hiding inner dot when clicking
          break;
        case 'image':
          classes += 'scale-125 bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.6)]';
          break;
        case 'product':
          classes += 'scale-[1.1] bg-zinc-900';
          break;
        case 'normal':
        default:
          classes += 'bg-red-600 shadow-sm';
          break;
      }
    }
    return classes;
  };

  return (
    <>
      {/* Small main center dot */}
      <div 
        ref={mainDotRef} 
        className={getMainDotClasses()}
        style={{ willChange: 'transform' }}
      />

      {/* Larger outer smooth trailing ring */}
      <div 
        ref={outerRingRef} 
        className={getOuterRingClasses()}
        style={{ willChange: 'transform' }}
      />

      {/* Click ripple animation helper to give standard feedback */}
      {rippleActive && (
        <div 
          className="fixed pointer-events-none z-[100001] w-12 h-12 rounded-full border-2 border-red-600 animate-[ping_0.5s_cubic-bezier(0,0,0.2,1)_1] opacity-0"
          style={{
            left: ripplePos.x - 24,
            top: ripplePos.y - 24,
          }}
          onAnimationEnd={() => setRippleActive(false)}
        />
      )}
    </>
  );
}
