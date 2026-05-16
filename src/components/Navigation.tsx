import React, { useState, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

interface NavigationProps {
  onNavigate?: (view: 'home' | 'about' | 'genres') => void;
  currentView?: 'home' | 'about' | 'genres';
  isDetailOpen?: boolean;
}

export default function Navigation({ onNavigate, currentView = 'home', isDetailOpen = false }: NavigationProps) {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(20, 20, 20, 0)', 'rgba(20, 20, 20, 1)']
  );

  if (isDetailOpen) return null;

  const items = ['Home', 'Genres', 'About'];

  return (
    <motion.nav 
      style={{ backgroundColor }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-[68px] transition-colors duration-300"
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
