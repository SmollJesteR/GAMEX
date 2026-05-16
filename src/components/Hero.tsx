import React from 'react';
import { motion } from 'motion/react';
import { Play, Info } from 'lucide-react';
import type { Game } from '../types';

interface HeroProps {
  game: Game;
  review?: { heroSummary?: string; subtitle?: string } | null;
  onReadLongForm: (gameId: string) => void;
}

export default function Hero({ game, review, onReadLongForm }: HeroProps) {
  const heroText = review?.heroSummary || review?.subtitle || 'Explore the definitive review. Discover what makes this title essential.';
  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${game.heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent" />
      </div>
      
      {/* Overlays */}
      <div className="absolute inset-0 cinematic-vignette" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-6 md:px-12 max-w-[100%] mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 max-w-2xl"
        >
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 bg-brand-red text-white text-[10px] font-bold uppercase tracking-wider rounded-[2px]">Masterpiece Review</span>
          </div>

          <h1 className="text-5xl md:text-[72px] leading-[1.1] font-display uppercase tracking-[0.04em]">
            {game.title}
          </h1>

          <p className="text-sm md:text-base text-white max-w-md leading-[1.5] font-sans">
            {heroText}
          </p>

          <div className="flex items-center gap-3 pt-6">
            <button 
              onClick={() => onReadLongForm(game.id)}
              className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-[4px] font-bold text-sm hover:bg-white/80 transition-all"
            >
              <Play size={20} fill="currentColor" />
              Video Review
            </button>
            <button className="flex items-center gap-2 bg-[#564D4D]/60 backdrop-blur-md text-white px-6 py-2.5 rounded-[4px] font-bold text-sm hover:bg-[#564D4D]/80 transition-all">
              <Info size={20} />
              Read Review
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
