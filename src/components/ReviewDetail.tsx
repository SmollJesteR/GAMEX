import React from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { ArrowLeft, Play, Plus, Check, X, Search, Bell, Monitor, Gamepad2, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Review, Game } from '../types';
import Footer from './Footer';

interface ReviewDetailProps {
  review: Review;
  game: Game;
  onBack: () => void;
  similarGames: Array<{ review: Review; game: Game }>;
  onGameSelect: (gameId: string) => void;
  onAdminAccess?: () => void;
  onNavigate?: (view: 'home' | 'about' | 'genres' | 'admin-login') => void;
}

export default function ReviewDetail({ review, game, onBack, similarGames, onGameSelect, onAdminAccess, onNavigate }: ReviewDetailProps) {
  const [activeChapter, setActiveChapter] = React.useState('Story & Summary');
  const [screenshotIndex, setScreenshotIndex] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Navbar scroll — hide on scroll down, show on scroll up
  const { scrollY } = useScroll({ container: scrollRef });
  const [navHidden, setNavHidden] = React.useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (latest > prev && latest > 100) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
  });

  const screenshots = review.screenshots && review.screenshots.length > 0
    ? review.screenshots
    : [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80",
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&q=80",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=1200&q=80"
    ];

  const nextScreenshot = () => {
    setScreenshotIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevScreenshot = () => {
    setScreenshotIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const chapters = [
    'Story & Summary',
    'Gameplay & Visual',
    'The Review',
    'Performance ',
    'The Verdict'
  ];

  const platforms = [
    { id: 'ps5', name: 'PS5', icon: <Gamepad2 size={12} /> },
    { id: 'ps4', name: 'PS4', icon: <Gamepad2 size={12} /> },
    { id: 'pc', name: 'PC', icon: <Monitor size={12} /> },
    { id: 'xbox', name: 'Xbox Series X|S', icon: <Gamepad2 size={12} /> },
  ];

  const highs = review.highs || [
    "Unparalleled open-world design that rewards genuine exploration.",
    "Incredible variety in combat builds and approaches.",
    "Art direction that consistently drops jaws.",
    "Some of the most memorable boss encounters in gaming history."
  ];

  const lows = review.lows || [
    "Occasional performance hiccups on PC.",
    "Some repeated minor boss encounters in optional dungeons.",
    "Co-op mechanics feel archaic compared to the rest of the game."
  ];

  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] bg-gamex-black overflow-y-auto"
    >
      {/* Top Navigation */}
      <motion.header
        animate={{ y: navHidden ? -68 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="sticky top-0 z-[100] bg-gamex-black border-b border-gamex-border h-[68px] px-6 md:px-12 flex items-center justify-between"
      >
        <div className="flex items-center gap-10">
          <span className="font-display text-4xl tracking-tighter text-brand-red cursor-pointer" onClick={onBack}>GAMEX</span>
          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => onNavigate?.('home')} className="text-[20px] font-display uppercase tracking-tighter text-white/60 hover:text-white transition-colors">Home</button>
            <button onClick={() => onNavigate?.('genres')} className="text-[20px] font-display uppercase tracking-tighter text-white/60 hover:text-white transition-colors">Genres</button>
            <button onClick={() => onNavigate?.('about')} className="text-[20px] font-display uppercase tracking-tighter text-white/60 hover:text-white transition-colors">About</button>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gamex-neutral" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-gamex-black border border-gamex-border rounded-sm pl-10 pr-4 py-1.5 text-xs focus:outline-none focus:border-brand-red w-64"
            />
          </div>
          <button className="text-white hover:text-brand-red transition-colors">
            <Bell size={20} />
          </button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        <img
          src={game.heroImage}
          alt={game.title}
          className="absolute inset-0 h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gamex-black via-gamex-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-gamex-black/60 via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 md:pb-24 max-w-[100%] mx-auto w-full">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-12"
          >
            <div className="space-y-6 max-w-3xl">
              <div className="flex flex-wrap gap-2">
                {game.genre.split(', ').map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-white/10 backdrop-blur-md rounded-[2px] text-[9px] font-bold uppercase tracking-widest text-white border border-white/10">
                    {tag}
                  </span>
                ))}
                {(game as any).subGenres?.map((tag: string) => (
                  <span key={tag} className="px-2 py-0.5 bg-white/10 backdrop-blur-md rounded-[2px] text-[9px] font-bold uppercase tracking-widest text-white border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-6xl md:text-9xl tracking-tight leading-none uppercase font-display">
                {game.title}
              </h1>

              <p className="text-lg md:text-xl text-gamex-text-secondary font-sans font-light max-w-2xl">
                {(review as any).heroSummary || review.subtitle}
              </p>

              <div className="flex items-center gap-4 pt-4">
                <button className="flex items-center gap-2 bg-brand-red text-white px-8 py-3 rounded-sm font-bold text-sm hover:bg-brand-red-hover transition-all group">
                  <Play size={18} fill="currentColor" />
                  Watch Video Review
                </button>
                <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-sm font-bold text-sm hover:bg-white/20 transition-all">
                  <Plus size={18} />
                  My List
                </button>
              </div>
            </div>

            {/* Score Card */}
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-sm w-44 text-center shrink-0">
              <div className="text-[10px] font-bold text-gamex-neutral uppercase tracking-[0.3em] mb-2">GAMEX SCORE</div>
              <div className="text-8xl font-display text-brand-red leading-none mb-1">{game.rating / 10}</div>
              <div className="text-[11px] font-bold text-gamex-text-secondary uppercase tracking-widest">Masterpiece</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[100%] px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-12">
          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gamex-neutral border-b border-gamex-border pb-4">Review Chapters</h4>
            <nav className="flex flex-col gap-4">
              {chapters.map((chapter) => (
                <button
                  key={chapter}
                  onClick={() => setActiveChapter(chapter)}
                  className={`text-left text-sm font-semibold transition-colors duration-300 ${activeChapter === chapter ? 'text-brand-red' : 'text-gamex-text-secondary hover:text-white'
                    }`}
                >
                  {chapter}
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gamex-neutral border-b border-gamex-border pb-4">Available On</h4>
            <div className="flex flex-col gap-3">
              {platforms.map(p => (
                <div key={p.id} className="flex items-center gap-3 px-4 py-2 bg-gamex-surface border border-gamex-border rounded-sm group hover:border-gamex-neutral transition-colors">
                  <span className="text-gamex-text-secondary group-hover:text-white">{p.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gamex-text-secondary group-hover:text-white">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Article Body */}
        <div className="lg:col-span-9 space-y-16">
          <div className="space-y-12">
            <h2 className="text-4xl text-white font-display uppercase tracking-widest">{review.title}</h2>
            <div className="font-sans text-base leading-relaxed text-gamex-text-secondary space-y-6 max-w-4xl">
              {review.subtitle ? (
                review.subtitle.split('\n').filter(p => p.trim()).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))
              ) : (
                <p className="text-gamex-neutral italic">No story summary yet.</p>
              )}
            </div>

            <div className="space-y-6 !mt-12">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl text-white font-display uppercase tracking-widest">Visual Spectacle</h3>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-gamex-neutral">
                    {String(screenshotIndex + 1).padStart(2, '0')} / {String(screenshots.length).padStart(2, '0')}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={prevScreenshot}
                      className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-sm transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={nextScreenshot}
                      className="p-2 bg-white/5 hover:bg-white/10 text-white rounded-sm transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[21/9] overflow-hidden rounded-sm border border-gamex-border group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={screenshotIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {screenshots[screenshotIndex].match(/\.(mp4|webm|ogg)$/) || screenshots[screenshotIndex].includes('youtube.com') || screenshots[screenshotIndex].includes('vimeo.com') ? (
                      <div className="w-full h-full bg-black flex items-center justify-center relative">
                        {screenshots[screenshotIndex].match(/\.(mp4|webm|ogg)$/) ? (
                          <video
                            src={screenshots[screenshotIndex]}
                            autoPlay
                            muted
                            loop
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <iframe
                            src={screenshots[screenshotIndex].includes('youtube.com')
                              ? screenshots[screenshotIndex].replace('watch?v=', 'embed/')
                              : screenshots[screenshotIndex]}
                            className="w-full h-full border-none"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        )}
                        <div className="absolute top-4 left-4 px-2 py-1 bg-brand-red text-white text-[8px] font-bold uppercase tracking-widest rounded-sm">
                          Video Concept
                        </div>
                      </div>
                    ) : (
                      <img
                        src={screenshots[screenshotIndex]}
                        className="w-full h-full object-cover"
                        alt={`Screenshot ${screenshotIndex + 1}`}
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gamex-black/40 to-transparent pointer-events-none" />

                {/* Large Navigation Arrows (visible on hover) */}
                <button
                  onClick={prevScreenshot}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/40 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-red"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextScreenshot}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/40 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-red"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {screenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setScreenshotIndex(i)}
                      className={`h-1 transition-all duration-300 ${screenshotIndex === i ? 'w-8 bg-brand-red' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Review Section */}
            <div className="space-y-6 !mt-24">
              <h3 className="text-2xl text-white font-display uppercase tracking-widest">Review</h3>
              <div className="font-sans text-base leading-relaxed text-gamex-text-secondary space-y-6 max-w-4xl">
                {review.content ? (
                  review.content.split('\n').filter(p => p.trim()).map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))
                ) : (
                  <p className="text-gamex-neutral italic">No review content yet.</p>
                )}
              </div>
            </div>

            <div className="space-y-6 !mt-24">
              <h3 className="text-2xl text-white font-display uppercase tracking-widest">Performance Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Gameplay & Mechanics */}
                {(() => {
                  const depth = (review as any).gameplayDepth ?? 8;
                  const balance = (review as any).gameplayBalance ?? 8;
                  const innovation = (review as any).gameplayInnovation ?? 8;
                  const avg = (depth + balance + innovation) / 3;
                  const avgNorm = avg / 10;
                  return (
                    <div className="p-8 bg-gamex-surface border border-gamex-border rounded-sm space-y-8 flex flex-col items-center">
                      <h4 className="text-[10px] font-bold text-white uppercase tracking-widest text-center">Gameplay & Mechanics</h4>
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                          <circle cx="64" cy="64" r="58" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                          <circle cx="64" cy="64" r="58" fill="transparent" stroke="#FF0000" strokeWidth="8"
                            strokeDasharray={2 * Math.PI * 58}
                            strokeDashoffset={2 * Math.PI * 58 * (1 - avgNorm)}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-display text-white">{avg.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="w-full space-y-2">
                        <div className="flex justify-between text-[9px] uppercase tracking-wider font-bold">
                          <span className="text-gamex-neutral">Depth</span>
                          <span className="text-brand-red">{depth}</span>
                        </div>
                        <div className="flex justify-between text-[9px] uppercase tracking-wider font-bold">
                          <span className="text-gamex-neutral">Balance</span>
                          <span className="text-brand-red">{balance}</span>
                        </div>
                        <div className="flex justify-between text-[9px] uppercase tracking-wider font-bold">
                          <span className="text-gamex-neutral">Innovation</span>
                          <span className="text-brand-red">{innovation}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* World Design */}
                {(() => {
                  const scale = (review as any).worldScale ?? 8;
                  const atmosphere = (review as any).worldAtmosphere ?? 8;
                  const detail = (review as any).worldDetail ?? 8;
                  return (
                    <div className="p-8 bg-gamex-surface border border-gamex-border rounded-sm space-y-8">
                      <h4 className="text-[10px] font-bold text-white uppercase tracking-widest text-center">World Design</h4>
                      <div className="space-y-6 pt-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-[9px] uppercase tracking-wider font-bold">
                            <span className="text-gamex-neutral">Scale</span>
                            <span className="text-white/60">{scale}/10</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-red" style={{ width: `${scale * 10}%` }} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[9px] uppercase tracking-wider font-bold">
                            <span className="text-gamex-neutral">Atmosphere</span>
                            <span className="text-white/60">{atmosphere}/10</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-red" style={{ width: `${atmosphere * 10}%` }} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[9px] uppercase tracking-wider font-bold">
                            <span className="text-gamex-neutral">Detail</span>
                            <span className="text-white/60">{detail}/10</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-red" style={{ width: `${detail * 10}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Performance */}
                {(() => {
                  const lowest = (review as any).perfLowestFps ?? 30;
                  const average = (review as any).perfAverageFps ?? 60;
                  const highest = (review as any).perfHighestFps ?? 120;
                  const maxFps = Math.max(lowest, average, highest, 1);
                  const bars = [
                    { label: 'Low', value: lowest },
                    { label: 'Avg', value: average },
                    { label: 'High', value: highest },
                  ];
                  return (
                    <div className="p-8 bg-gamex-surface border border-gamex-border rounded-sm space-y-8 flex flex-col">
                      <h4 className="text-[10px] font-bold text-white uppercase tracking-widest text-center">Performance</h4>
                      <div className="flex-1 flex items-end gap-3 h-32 pt-4">
                        {bars.map((bar) => (
                          <div key={bar.label} className="flex-1 flex flex-col items-center gap-2">
                            <span className="text-[10px] font-bold text-brand-red">{bar.value}</span>
                            <div className="w-full bg-brand-red/10 rounded-t-[2px] relative" style={{ height: '100px' }}>
                              <div
                                className="absolute bottom-0 left-0 right-0 bg-brand-red/30 border-t-2 border-brand-red rounded-t-[1px]"
                                style={{ height: `${(bar.value / maxFps) * 100}%` }}
                              />
                            </div>
                            <span className="text-[8px] text-gamex-neutral uppercase tracking-widest font-bold">{bar.label}</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-[9px] text-center text-gamex-neutral font-medium italic">
                        Frame Rate: {lowest}–{highest} FPS (Avg {average})
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Highs & Lows */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 !mt-16">
              <div className="p-8 bg-[#151515] border border-white/5 rounded-sm space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#46D369]" />
                <div className="flex items-center gap-3 text-[#46D369]">
                  <Check size={18} className="stroke-[3]" />
                  <h4 className="text-[24px] tracking-[0.2em] uppercase font-display">The Highs</h4>
                </div>
                <ul className="space-y-4">
                  {highs.map((high, i) => (
                    <li key={i} className="flex gap-4 text-xs text-gamex-text-secondary leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#46D369] shrink-0 mt-1.5" />
                      {high}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-[#151515] border border-white/5 rounded-sm space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-red" />
                <div className="flex items-center gap-3 text-brand-red">
                  <X size={18} className="stroke-[3]" />
                  <h4 className="text-[24px] tracking-[0.2em] uppercase font-display">The Lows</h4>
                </div>
                <ul className="space-y-4">
                  {lows.map((low, i) => (
                    <li key={i} className="flex gap-4 text-xs text-gamex-text-secondary leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0 mt-1.5" />
                      {low}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Verdict Card */}
            <div className="!mt-16 bg-[#181818] border border-white/5 rounded-sm p-10 md:p-14 space-y-10 relative overflow-hidden">
              <h3 className="text-[24px] font-bold uppercase tracking-[0.4em] text-gamex-neutral">The Verdict</h3>
              <p className="text-2xl md:text-3xl font-sans font-medium text-white leading-tight max-w-5xl">
                {review.verdict || "Elden Ring is a stunning achievement. It manages to translate the grueling, satisfying formula of Dark Souls into an expansive, awe-inspiring open world. It is a game that demands your attention, punishes your mistakes, and rewards your curiosity like nothing else before it."}
              </p>

              <div className="flex items-center justify-between pt-10 border-t border-white/5">
                <div className="flex items-center gap-5">
                  <img src={review.authorAvatar || "https://i.pravatar.cc/100?u=sarah"} className="w-14 h-14 rounded-sm object-cover grayscale" alt="Reviewer" />
                  <div>
                    <div className="text-sm font-bold text-white uppercase tracking-widest leading-none">Reviewed by {review.authorName || "Sarah Jenkins"}</div>
                    <div className="text-[10px] text-gamex-neutral uppercase font-medium mt-2">{review.authorRole || "Senior RPG Editor"}</div>
                  </div>
                </div>
                <div className="text-8xl md:text-[120px] font-display text-brand-red leading-none opacity-90">{game.rating / 10}</div>
              </div>
            </div>
          </div>

          {/* More Like This Section */}
          <section className="!mt-24 space-y-8">
            <h2 className="text-2xl text-white border-b border-gamex-border pb-4 font-display uppercase tracking-widest">More Like This</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4">
              {similarGames.slice(0, 5).map(({ game: g }) => (
                <div
                  key={g.id}
                  className="group cursor-pointer space-y-3"
                  onClick={() => onGameSelect(g.id)}
                >
                  <div className="aspect-[2/3] overflow-hidden rounded-sm relative">
                    <img src={g.gridImage || g.coverImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={g.title} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  </div>
                  <h4 className="text-xs font-bold text-gamex-text-secondary group-hover:text-white transition-colors uppercase tracking-tight">{g.title}</h4>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mt-20">
        <Footer onNavigate={onNavigate || (() => { })} />
      </div>
    </motion.div>
  );
}
