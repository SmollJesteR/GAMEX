import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Play, Plus, ChevronDown } from 'lucide-react';
import type { Review, Game } from '../types';

interface ReviewCardProps {
  review: Review;
  game: Game;
  onClick: (gameId: string) => void;
  key?: React.Key;
}

export default function ReviewCard({ review, game, onClick }: ReviewCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="relative flex-none w-[150px] md:w-[220px] aspect-[2/3] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(game.id)}
    >
      <motion.div
        animate={isHovered ? {
          scale: 1.02,
          zIndex: 20,
          y: -10,
          transition: { duration: 0.3, ease: "easeOut" }
        } : {
          scale: 1,
          zIndex: 10,
          y: 0,
          transition: { duration: 0.3 }
        }}
        className="absolute inset-0 bg-gamex-surface rounded-[4px] shadow-2xl overflow-hidden"
      >
        {/* Card Artwork */}
        <div className="relative w-full h-full">
          <img
            src={game.gridImage || game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-gamex-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Overlay info always visible if desired, but user specifically asked for title ON hover */}
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Hover Content - Simplified and focused on title */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="px-1.5 py-0.5 bg-brand-red text-white text-[9px] font-bold uppercase rounded-[2px]">
                    {(game.rating / 10)}/10
                  </div>
                  <span className="text-[10px] text-white/60 font-medium uppercase tracking-widest">
                    {game.genre?.split(', ').filter(g => g && g !== 'Action RPG').join(', ')}
                  </span>
                </div>

                <h4 className="text-base md:text-xl font-display text-white leading-tight uppercase tracking-tight">
                  {game.title}
                </h4>

                <div className="flex items-center gap-3 pt-2">
                  <button className="flex-1 bg-white text-black py-2 rounded-sm font-bold text-[10px] uppercase hover:bg-brand-red hover:text-white transition-colors">
                    Read Review
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-black transition-colors rounded-sm">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
