import React, { useState } from 'react';
import { Search, Bell } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';

interface NavigationProps {
  onNavigate?: (view: 'home' | 'about' | 'genres') => void;
  currentView?: 'home' | 'about' | 'genres';
  isDetailOpen?: boolean;
}

export default function Navigation({ onNavigate, currentView = 'home', isDetailOpen = false }: NavigationProps) {
  const { scrollY } = useScroll();
  const [navHidden, setNavHidden] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (latest > prev && latest > 100) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
  });

  if (isDetailOpen) return null;

  const items = ['Home', 'Genres', 'About'];

  return (
    <motion.nav 
      animate={{ y: navHidden ? -68 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-[68px] bg-gamex-black border-b border-gamex-border"
    >
      <div className="flex items-center gap-8 md:gap-12">
        <button 
          onClick={() => onNavigate?.('home')}
          className="flex items-center gap-2"
        >
          <span className="font-display text-4xl tracking-tighter text-brand-red">GAMEX</span>
        </button>
        
        <div className="hidden lg:flex items-center gap-8">
          {items.map((item) => (
            <button 
              key={item} 
              onClick={() => {
                if (item === 'About') onNavigate?.('about');
                if (item === 'Genres') onNavigate?.('genres');
                if (item === 'Home') onNavigate?.('home');
              }}
              className={`text-[20px] font-display uppercase tracking-tighter transition-colors hover:text-gamex-text-secondary ${
                (item === 'Home' && currentView === 'home') || 
                (item === 'About' && currentView === 'about') ||
                (item === 'Genres' && currentView === 'genres')
                  ? 'text-white' 
                  : 'text-white/60'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-white hover:text-gamex-text-secondary transition-colors">
          <Search size={20} />
        </button>
        <button className="hidden md:block text-white hover:text-gamex-text-secondary transition-colors">
          <Bell size={20} />
        </button>
      </div>
    </motion.nav>
  );
}
