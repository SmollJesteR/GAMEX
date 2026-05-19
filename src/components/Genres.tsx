import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';


import type { Review, Game } from '../types';

export default function Genres({ onGenreSelect, onGameSelect, reviewItems = [] }: { onGenreSelect?: (genre: string) => void, onGameSelect?: (gameId: string) => void, reviewItems?: Array<{review: Review; game: Game}>, key?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recommendationIndex, setRecommendationIndex] = useState(0);

  const categories = [
    { name: "Action", image: "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg" },
    { name: "Action-Adventure", image: "https://media.rawg.io/media/games/baf/baf9905270314e07e6850cffdb51df41.jpg" },
    { name: "Role-Playing (RPG)", image: "https://media.rawg.io/media/games/da1/da1b267764d77221f07a4386b6548e5a.jpg" },
    { name: "Simulation", image: "https://media.rawg.io/media/games/08b/08b2eee52a9876a48b955e5149affe5b.jpg" },
    { name: "Strategy", image: "https://media.rawg.io/media/games/054/0549f1a0a5e782d4e81cdf8d022073fa.jpg" },
    { name: "Shooter", image: "https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg" },
    { name: "Fighting", image: "https://media.rawg.io/media/screenshots/ad1/ad15e71b0a3d431ce0a59bcd783efa88.jpg" },
    { name: "Sports", image: "https://media.rawg.io/media/screenshots/f5a/f5abab52c4d606551cd5ec3ab709e501.jpg" },
    { name: "Puzzle", image: "https://media.rawg.io/media/games/948/948fe7f00b6cba8472f5ecd07a455077.jpg" },
    { name: "Mobile", image: "https://media.rawg.io/media/screenshots/5a7/5a72aed79451d8fbd6a7b82f784002bd.jpg" }
  ];

  const defaultRecommendations = [
    {
      title: "SUBNAUTICA 2",
      score: "9.5/10",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
      review: "Subnautica 2 is like Subnautica 1 but if Subnautica 1 was a cheese pizza and you finally added all the toppings. Both are objectively good but Subnautica 2 also gave you double bacon and cheese for free. TL;DR Played for 90 hours (Had super fun)",
      userName: "Anthomnia",
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
      helpfulCount: "211",
      gameId: ""
    },
    {
      title: "ELDEN RING",
      score: "9.8/10",
      image: "https://images.unsplash.com/photo-1627389955805-7287714fac92?q=80&w=2070&auto=format&fit=crop",
      review: "Rise, Tarnished, and be led by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. A masterpiece of world design and discovery. One of the best games ever made.",
      userName: "GamerPro99",
      userAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop",
      helpfulCount: "1.2k",
      gameId: ""
    },
    {
      title: "DOOM ETERNAL",
      score: "9.2/10",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop",
      review: "Hell's armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons across dimensions and stop the final destruction of humanity. The only thing they fear is you.",
      userName: "SlayerFan",
      userAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100&auto=format&fit=crop",
      helpfulCount: "450",
      gameId: ""
    }
  ];

  // Map dynamic reviews to the recommendation format. We show up to 5 recommendations.
  const dynamicRecommendations = reviewItems.filter(item => item.review && item.game).slice(0, 5).map(item => ({
    title: item.game.title,
    score: `${item.game.rating / 10}/10`,
    image: item.game.heroImage || item.game.coverImage,
    review: item.review.content?.split('\\n').filter(p => p.trim())[0] || item.review.subtitle || "No review content yet.",
    userName: item.review.authorName || "Editorial Staff",
    userAvatar: item.review.authorAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
    helpfulCount: Math.floor(Math.random() * 500) + 50,
    gameId: item.game.id
  }));

  const recommendations = dynamicRecommendations.length > 0 ? dynamicRecommendations : defaultRecommendations;

  const itemsPerView = 4;
  const categoriesCount = categories.length;
  // Duplicate the first few items at the end for a seamless loop
  const extendedCategories = [...categories, ...categories.slice(0, itemsPerView)];
  const [isJumping, setIsJumping] = useState(false);

  const nextSlide = () => {
    if (isJumping) return;
    
    if (currentIndex >= categoriesCount) {
      // If we are at the end clones, jump back to start first (handled by useEffect)
      // For now just increment and let useEffect jump
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (isJumping) return;
    
    if (currentIndex <= 0) {
      // Jump to end first (handled by useEffect)
      setCurrentIndex(-1);
    } else {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Seamless jump logic
  React.useEffect(() => {
    let timeout: any;
    if (currentIndex >= categoriesCount) {
      timeout = setTimeout(() => {
        setIsJumping(true);
        setCurrentIndex(0);
        setTimeout(() => setIsJumping(false), 50);
      }, 500); // Matches transition duration roughly
    } else if (currentIndex < 0) {
      timeout = setTimeout(() => {
        setIsJumping(true);
        setCurrentIndex(categoriesCount - 1);
        setTimeout(() => setIsJumping(false), 50);
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [currentIndex, categoriesCount]);

  const nextRecommendation = () => {
    setRecommendationIndex((prev) => (prev >= recommendations.length - 1 ? 0 : prev + 1));
  };

  const prevRecommendation = () => {
    setRecommendationIndex((prev) => (prev <= 0 ? recommendations.length - 1 : prev - 1));
  };

  const currentRec = recommendations[recommendationIndex];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black text-white"
    >
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center px-6 md:px-24 pt-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-40 brightness-50"
            alt="Genres Background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1180px] h-[443px] flex flex-col justify-center space-y-8 border border-white/0">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-display uppercase tracking-tight leading-none text-white"
          >
            EXPLORE GENRES
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gamex-neutral font-sans leading-relaxed max-w-2xl"
          >
            Dive into the vast multiverse of gaming. Discover high-octane action, deep strategic narratives, and the next indie masterpiece waiting to be uncovered in our cinematic library.
          </motion.p>
        </div>
      </section>

      {/* Categories Slider */}
      <section className="py-24 px-6 md:px-24">
        <h2 className="text-3xl font-display uppercase tracking-wider text-white mb-12">Browse by Category</h2>
        <div className="relative group overflow-hidden">
          <motion.div 
            className="flex gap-5"
            animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
            transition={isJumping ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
          >
            {extendedCategories.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                onClick={() => onGenreSelect?.(cat.name)}
                className="relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer group shrink-0 w-[calc(25%-15px)]"
              >
                <img src={cat.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={cat.name} referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="bg-white text-black px-6 py-2 text-[14px] font-display uppercase tracking-widest text-center min-w-[140px]">
                    {cat.name}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 backdrop-blur-md text-white hover:text-brand-red rounded-full opacity-0 group-hover:opacity-100 transition-all border border-white/10 z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 backdrop-blur-md text-white hover:text-brand-red rounded-full opacity-0 group-hover:opacity-100 transition-all border border-white/10 z-10"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center gap-3 mt-12">
           {categories.map((_, i) => (
             <button
               key={i}
               onClick={() => setCurrentIndex(i)}
               className={`h-1 transition-all duration-300 ${currentIndex % categoriesCount === i ? 'w-12 bg-brand-red' : 'w-6 bg-white/20 hover:bg-white/40'}`}
             />
           ))}
        </div>
      </section>

      {/* Community Recommendations Section */}
      <section className="py-20 bg-black px-6 md:px-24">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-display uppercase tracking-widest text-white leading-none italic">THE COMMUNITY RECOMMENDS</h2>
            <p className="text-xs text-brand-red uppercase tracking-widest font-bold">THESE GAMES TODAY</p>
          </div>
          <button className="text-[10px] border border-white/10 px-4 py-2 hover:bg-white/5 transition-colors uppercase tracking-widest text-white font-bold">
            CUSTOMIZE, EXPLORE BY TAG, & MORE
          </button>
        </div>

        <div className="relative group flex items-center justify-center">
           {/* Section Carousel Arrows */}
          <button 
            onClick={prevRecommendation}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 backdrop-blur-md text-white hover:text-brand-red rounded-full transition-all border border-white/10 hidden xl:block z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextRecommendation}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 backdrop-blur-md text-white hover:text-brand-red rounded-full transition-all border border-white/10 hidden xl:block z-20"
          >
            <ChevronRight size={24} />
          </button>

          {/* Main Carousel Card */}
          <div className="mx-auto w-full max-w-[1180px] h-[443px] flex bg-[#0a0a0a] border border-white/5 shadow-2xl rounded-sm overflow-hidden">
            {/* Game Artwork */}
            <div className="relative w-[65%] hidden md:block h-full">
              <motion.img 
                key={`${recommendationIndex}-img`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={currentRec.image} 
                className="w-full h-full object-cover"
                alt="Community Recommend"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-[#0a0a0a]" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
                <motion.h3 
                  key={`${recommendationIndex}-title`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-5xl font-display font-bold uppercase tracking-widest text-white text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
                >
                  {currentRec.title}
                </motion.h3>
              </div>

              <motion.div 
                key={`${recommendationIndex}-score`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute bottom-6 right-6 bg-brand-red px-6 py-2 text-white font-mono text-xl border border-white/5 font-bold shadow-lg"
              >
                {currentRec.score}
              </motion.div>
            </div>

            {/* Review Box */}
            <div className="w-full md:w-[35%] p-10 flex flex-col justify-between bg-[#111] text-white">
              <div className="space-y-6">
                <motion.p 
                  key={`${recommendationIndex}-review`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  className="text-lg leading-relaxed text-white font-sans line-clamp-8"
                >
                  "{currentRec.review}"
                </motion.p>
                <div className="text-center">
                  <button 
                    onClick={() => {
                      if (currentRec.gameId && onGameSelect) {
                        onGameSelect(currentRec.gameId);
                      }
                    }}
                    className="text-[10px] text-brand-red hover:text-white underline uppercase tracking-widest transition-colors font-bold"
                  >
                    Read Entire Review
                  </button>
                </div>
              </div>

              <div className="space-y-8 mt-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-sm bg-[#222] overflow-hidden border border-white/10 shrink-0">
                    <motion.img 
                      key={`${recommendationIndex}-avatar`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={currentRec.userAvatar} 
                      className="w-full h-full object-cover grayscale opacity-80" 
                      alt="User" 
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate uppercase tracking-wider">{currentRec.userName}</h4>
                    <p className="text-[9px] text-brand-red/60 mt-0.5 truncate">{currentRec.helpfulCount} people found this review helpful</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex rounded-sm overflow-hidden border border-white/10">
                    <button 
                      onClick={prevRecommendation}
                      className="bg-black p-2 hover:bg-[#222] transition-colors border-r border-white/10 text-white"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      onClick={nextRecommendation}
                      className="bg-black p-2 hover:bg-[#222] transition-colors text-white"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold grow text-center">
                    {recommendationIndex + 1} of {recommendations.length} reviews
                  </span>
                  <div className="w-[44px]" /> {/* Spacer to center pagination text */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Pagination Bottom */}
        <div className="flex justify-center gap-1.5 mt-8">
           {recommendations.map((_, i) => (
             <button 
               key={i} 
               onClick={() => setRecommendationIndex(i)}
               className={`h-1.5 transition-all rounded-full ${recommendationIndex === i ? 'w-6 bg-brand-red' : 'w-2 bg-white/10'}`}
             />
           ))}
        </div>
      </section>
    </motion.div>
  );
}
