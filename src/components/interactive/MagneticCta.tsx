import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface MagneticCtaProps {
  href?: string;
  label?: string;
  className?: string;
  secondaryText?: string;
}

export default function MagneticCta({
  href = '/contact?teardown=true',
  label = 'Get a Free 2-Minute Video Teardown',
  className = ''
}: MagneticCtaProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(
      window.matchMedia('(hover: hover)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  const x = useSpring(0, { stiffness: 350, damping: 20 });
  const y = useSpring(0, { stiffness: 350, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!canHover || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Calculate distance from center, capped to 10px
    const deltaX = Math.max(-12, Math.min(12, (e.clientX - centerX) * 0.28));
    const deltaY = Math.max(-10, Math.min(10, (e.clientY - centerY) * 0.28));
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`cta-shine-btn relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-sans font-bold tracking-tight bg-[#1C1B19] text-[#FDFBF7] hover:bg-[#322F2B] shadow-paper-md hover:shadow-paper-lg transition-all focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#1C1B19] focus-visible:ring-offset-2 cursor-pointer ${className}`}
    >
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </motion.a>
  );
}
