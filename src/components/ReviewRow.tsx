import React, { useRef } from 'react';
import type { Review, Game } from '../types';
import ReviewCard from './ReviewCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReviewRowProps {
  key?: string;
  title: string;
  items: Array<{ review: Review; game: Game }>;
  onItemClick: (gameId: string) => void;
}

export default function ReviewRow({ title, items, onItemClick }: ReviewRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth * 0.8
        : scrollLeft + clientWidth * 0.8;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="space-y-4 group/row">
      <div className="flex items-center justify-between px-6 md:px-12">
        <h2 className="text-xl md:text-2xl font-display uppercase tracking-[0.05em] text-white">
          {title}
        </h2>
        <a href="#" className="text-xs font-bold text-gamex-text-secondary hover:text-white transition-colors uppercase tracking-[0.2em]">
          Explore All &gt;
        </a>
      </div>

      <div className="relative group">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-40 w-12 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
        >
          <ChevronLeft size={40} />
        </button>

        <div
          ref={rowRef}
          className="flex gap-2 px-6 md:px-12 overflow-x-auto no-scrollbar scroll-smooth pb-20 -mb-20"
        >
          {items.map((item) => (
            <ReviewCard
              key={item.review.id}
              review={item.review}
              game={item.game}
              onClick={onItemClick}
            />
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-40 w-12 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
        >
          <ChevronRight size={40} />
        </button>
      </div>
    </section>
  );
}
