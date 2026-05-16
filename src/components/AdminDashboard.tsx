import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  FileText, 
  PenTool, 
  BarChart3, 
  Settings, 
  Plus, 
  Search,
  Star,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit3,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Type,
  List as ListIcon,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  UploadCloud,
  Save,
  Send,
  ArrowLeft,
  Users,
  TrendingUp,
  History,
  Layout,
  Maximize2
} from 'lucide-react';

type View = 'dashboard' | 'content' | 'editorial' | 'analytics' | 'settings';

export default function AdminDashboard(_props: { key?: string }) {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  return (
    <div className="fixed inset-0 z-[300] bg-gamex-black flex overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gamex-border flex flex-col bg-[#0d0d0d]">
        <div className="p-8 pb-12">
          <h1 className="text-xl font-display tracking-tighter text-brand-red uppercase leading-none">Admin Panel</h1>
          <p className="text-[10px] text-gamex-neutral uppercase tracking-widest font-bold mt-2">Editorial CMS</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={currentView === 'dashboard'} 
            onClick={() => setCurrentView('dashboard')}
          />
          <NavItem 
            icon={<FileText size={20} />} 
            label="Content Manager" 
            active={currentView === 'content'} 
            onClick={() => setCurrentView('content')}
          />
          <NavItem 
            icon={<PenTool size={20} />} 
            label="Editorial" 
            active={currentView === 'editorial'} 
            onClick={() => setCurrentView('editorial')}
          />
          <NavItem 
            icon={<BarChart3 size={20} />} 
            label="Analytics" 
            active={currentView === 'analytics'} 
            onClick={() => setCurrentView('analytics')}
          />
          <NavItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={currentView === 'settings'} 
            onClick={() => setCurrentView('settings')}
          />
        </nav>

        <div className="p-6 border-t border-gamex-border mt-auto">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-sm overflow-hidden grayscale">
                <img src="/src/assets/images/regenerated_image_1778829241997.png" className="w-full h-full object-cover" alt="Profile" />
             </div>
             <div>
                <p className="text-sm font-bold text-white leading-none">Sarah Connor</p>
                <p className="text-[10px] text-gamex-neutral font-medium mt-1.5">Lead Editor</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-black">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <DashboardView key="dashboard" onAction={(v) => setCurrentView(v)} />
          )}
          {currentView === 'content' && (
            <ContentManagerView key="content" onAction={(v) => setCurrentView(v)} />
          )}
          {currentView === 'editorial' && (
            <EditorialView key="editorial" onBack={() => setCurrentView('content')} />
          )}
          {currentView === 'analytics' && (
            <AnalyticsView key="analytics" />
          )}
          {currentView === 'settings' && (
            <SettingsView key="settings" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- SUB-VIEWS ---

function DashboardView({ onAction }: { onAction: (v: View) => void, key?: string }) {
  const reviews = [
    { title: "Neon Genesis: The Final Chapter Review", status: "Published", author: "Marcus Thorne", date: "Oct 24, 2023", rating: 4.5, image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=100&q=80" },
    { title: "Echoes of the Past: Director's Cut", status: "Draft", author: "Elena Rostova", date: "Oct 26, 2023", rating: null, image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=100&q=80" },
    { title: "Wasteland Drifter: A Masterclass in Tension", status: "Scheduled", author: "David Chen", date: "Nov 01, 2023", rating: 4.8, image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&q=80" },
    { title: "The Golden Age of Cinema: Part III", status: "Published", author: "Sarah Jenkins", date: "Oct 18, 2023", rating: 5.0, image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=100&q=80" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-12"
    >
      <div className="flex justify-between items-start mb-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-display text-white uppercase tracking-tight">Dashboard</h2>
          <p className="text-gamex-text-secondary">Welcome back, Sarah. Here's a brief overview of the editorial pipeline.</p>
        </div>
        <button onClick={() => onAction('editorial')} className="bg-brand-red hover:bg-brand-red-hover text-white px-6 py-3 rounded-sm font-bold text-sm tracking-widest uppercase flex items-center gap-3 transition-colors">
          <Plus size={18} />
          Create New Review
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <StatCard label="Live Reviews" value="124" trend="+8% vs last month" icon={<FileText size={20} className="text-brand-red" />} />
        <StatCard label="Monthly Views" value="2.4M" trend="+12.5% vs last month" icon={<BarChart3 size={20} className="text-brand-red" />} />
        <StatCard label="Active Contributors" value="16" trend="Stable" icon={<Users size={20} className="text-brand-red" />} />
      </div>

      <div className="bg-[#111] border border-gamex-border rounded-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-[#181818] border-b border-gamex-border text-[10px] font-bold text-gamex-neutral uppercase tracking-widest">
          <div className="col-span-5">Title / Meta</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-center">Author</div>
          <div className="col-span-1 text-center">Date</div>
          <div className="col-span-2 text-right">Rating</div>
        </div>

        <div className="divide-y divide-gamex-border">
          {reviews.map((review, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 px-8 py-6 items-center text-sm group hover:bg-[#151515] transition-colors cursor-pointer" onClick={() => onAction('content')}>
              <div className="col-span-5 flex items-center gap-4">
                <div className="w-16 h-10 rounded-sm overflow-hidden border border-white/5 bg-[#222]">
                  <img src={review.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={review.title} />
                </div>
                <h3 className="font-bold text-white line-clamp-1">{review.title}</h3>
              </div>
              <div className="col-span-2 flex justify-center">
                <StatusBadge status={review.status as any} />
              </div>
              <div className="col-span-2 flex justify-center text-gamex-text-secondary text-xs">{review.author}</div>
              <div className="col-span-1 flex justify-center text-[10px] text-gamex-neutral text-center leading-tight uppercase font-medium">{review.date}</div>
              <div className="col-span-2 flex justify-end gap-0.5 text-[#EAB308]">
                {review.rating ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={10} fill={i < Math.floor(review.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(review.rating) ? 0 : 2} />
                  ))
                ) : <span className="text-[10px] text-gamex-neutral font-medium uppercase italic">Pending</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ContentManagerView({ onAction }: { onAction: (v: View) => void, key?: string }) {
  const [reviewList, setReviewList] = React.useState<import('../lib/api').Review[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    import('../lib/api').then(({ reviews: reviewsApi }) => {
      reviewsApi.getAllAdmin()
        .then(setReviewList)
        .catch(console.error)
        .finally(() => setLoading(false));
    });
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-12"
    >
      <div className="flex justify-between items-end mb-12">
        <div className="space-y-4">
          <h2 className="text-5xl font-display text-white uppercase tracking-tight">Content Manager</h2>
          <p className="text-gamex-text-secondary">Manage reviews, database entries, and editorial content.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gamex-neutral" size={18} />
            <input 
              type="text" 
              placeholder="Search title or ID..."
              className="w-full bg-[#111] border border-gamex-border rounded-sm py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-red transition-colors"
            />
          </div>
          <button onClick={() => onAction('editorial')} className="bg-brand-red hover:bg-brand-red-hover text-white px-6 py-3 rounded-sm font-bold text-sm tracking-widest uppercase flex items-center gap-3 transition-colors">
            <Plus size={18} />
            New Review
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gamex-border">
        <div className="flex items-center gap-8">
          {['ALL REVIEWS', 'DRAFTS (12)', 'SCHEDULED (4)', 'PUBLISHED'].map((tab, i) => (
            <button key={tab} className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${i === 0 ? 'text-brand-red border-b-2 border-brand-red pb-4 -mb-[18px]' : 'text-gamex-neutral hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-gamex-neutral uppercase tracking-widest">
          Sort by: <span className="text-white flex items-center gap-1 cursor-pointer">Last Modified <ChevronDown size={14} /></span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-12 px-8 py-2 text-[9px] font-bold text-gamex-neutral uppercase tracking-[0.2em]">
          <div className="col-span-1">Art</div>
          <div className="col-span-5">Title / Metadata</div>
          <div className="col-span-2">Author</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        <div className="space-y-3">
          {loading && (
            <div className="py-24 text-center text-gamex-neutral text-sm uppercase tracking-widest">
              Loading reviews...
            </div>
          )}
          {reviewList.map((r, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 px-8 py-6 bg-[#111] border border-white/5 rounded-sm items-center group hover:border-white/20 transition-all">
              <div className="col-span-1">
                <div className="w-12 h-16 bg-[#222] rounded-[1px] border border-white/10 overflow-hidden">
                  <img src={r.game?.coverImage || ''} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-110" alt={r.game?.title ?? r.title} />
                </div>
              </div>
              <div className="col-span-5 space-y-1.5">
                <h3 className="text-white font-bold tracking-tight">{r.game?.title ?? r.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] px-1.5 py-0.5 bg-white/5 text-gamex-neutral rounded-[1px] font-bold uppercase tracking-widest">{r.game?.genre || 'Unknown'}</span>
                  <span className="text-[10px] text-gamex-neutral">• {r.game?.platforms?.join(', ') || ''}</span>
                </div>
              </div>
              <div className="col-span-2 flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-full bg-brand-red flex items-center justify-center text-[8px] font-bold text-white uppercase italic">
                  {r.authorName ? r.authorName.charAt(0) : '?'}
                </div>
                <span className="text-xs text-gamex-text-secondary">{r.authorName}</span>
              </div>
              <div className="col-span-1 text-[10px] text-gamex-neutral font-medium">{new Date(r.updatedAt as any).toLocaleDateString()}</div>
              <div className="col-span-2 flex justify-center">
                <StatusBadge status={r.status as any} />
              </div>
              <div className="col-span-1 flex justify-end gap-4 text-gamex-neutral">
                <Eye size={16} className="hover:text-white cursor-pointer transition-colors" />
                <Edit3 size={16} className="hover:text-white cursor-pointer transition-colors" />
                <Trash2 size={16} className="hover:text-brand-red cursor-pointer transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center text-[10px] text-gamex-neutral uppercase tracking-widest font-bold">
        <div>Showing 1 to 3 of 124 entries</div>
        <div className="flex gap-1">
          <button className="w-8 h-8 flex items-center justify-center border border-gamex-border opacity-50"><ChevronLeft size={16} /></button>
          <button className="w-8 h-8 flex items-center justify-center bg-white/10 text-white border border-white/10">1</button>
          <button className="w-8 h-8 flex items-center justify-center border border-gamex-border hover:bg-white/5">2</button>
          <button className="w-8 h-8 flex items-center justify-center border border-gamex-border hover:bg-white/5">3</button>
          <button className="w-8 h-8 flex items-center justify-center border border-gamex-border hover:bg-white/5"><ChevronRight size={16} /></button>
        </div>
      </div>
    </motion.div>
  );
}

function EditorialView({ onBack }: { onBack: () => void, key?: string }) {
  const [selectedGenres, setSelectedGenres] = useState(['Role-Playing (RPG)', 'Action RPG']);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['PC', 'PS5', 'Xbox Series X']);
  const [gameQuery, setGameQuery] = React.useState('');
  const [uploadedScreenshots, setUploadedScreenshots] = React.useState<string[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsUploading(true);
    try {
      const { media } = await import('../lib/api');
      const res = await media.upload(file);
      setUploadedScreenshots(prev => [...prev, res.url]);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Ensure backend is running and size < 50MB.');
    } finally {
      setIsUploading(false);
      e.target.value = ''; // reset input
    }
  };
  const [gameResults, setGameResults] = React.useState<import('../lib/api').RawgGameResult[]>([]);
  const [selectedGame, setSelectedGame] = React.useState<import('../lib/api').RawgGameResult | null>(null);
  const [searching, setSearching] = React.useState(false);

  const searchGames = async () => {
    if (gameQuery.length < 2) return;
    setSearching(true);
    try {
      const { rawg } = await import('../lib/api');
      const { results } = await rawg.search(gameQuery);
      setGameResults(results);
    } catch (e) {
      console.error(e);
    } finally {
      setSearching(false);
    }
  };

  const selectGame = (game: import('../lib/api').RawgGameResult) => {
    setSelectedGame(game);
    setGameResults([]);
    setGameQuery('');
  };

  const allGenres = [
    "Action",
    "Action-Adventure",
    "Role-Playing (RPG)",
    "Simulation",
    "Strategy",
    "Shooter",
    "Sports",
    "Puzzle",
    "Mobile"
  ];

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre) 
        : [...prev, genre]
    );
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform) 
        : [...prev, platform]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      className="p-12 pb-24"
    >
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3 text-[10px] font-bold text-gamex-neutral uppercase tracking-widest">
            Editing: <span className="text-white">Cyberpunk 2077: Phantom Liberty Review</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gamex-neutral uppercase tracking-widest mr-4">
             <Clock size={14} /> Saved 2 mins ago
          </div>
          <button className="px-6 py-2.5 bg-[#1a1a1a] border border-white/10 hover:bg-[#222] text-white rounded-sm font-bold text-[10px] tracking-widest uppercase transition-colors">Save Draft</button>
          <button className="px-6 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white rounded-sm font-bold text-[10px] tracking-widest uppercase flex items-center gap-2 transition-colors">
            <UploadCloud size={14} /> Publish
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-12">
        {/* Main Editor */}
        <div className="col-span-8 space-y-8">
          <div className="space-y-4 pb-8 border-b border-white/5">
            <label className="text-[10px] font-bold text-gamex-neutral uppercase tracking-[0.3em] block">
              Search Game Database (RAWG)
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={gameQuery}
                onChange={(e) => setGameQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && searchGames()}
                placeholder="Search by game title (e.g. Elden Ring)..."
                className="flex-1 bg-[#111] border border-white/5 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-brand-red transition-colors"
              />
              <button
                onClick={searchGames}
                disabled={searching}
                className="px-6 py-3 bg-brand-red hover:bg-brand-red-hover disabled:opacity-50 text-white rounded-sm font-bold text-[10px] tracking-widest uppercase transition-colors"
              >
                {searching ? 'Searching...' : 'Search'}
              </button>
            </div>

            {gameResults.length > 0 && (
              <div className="bg-[#111] border border-white/10 rounded-sm divide-y divide-white/5 max-h-72 overflow-y-auto">
                {gameResults.map((g) => (
                  <button
                    key={g.rawgId}
                    onClick={() => selectGame(g)}
                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors text-left"
                  >
                    {g.coverImage && (
                      <img src={g.coverImage} className="w-10 h-10 object-cover rounded-sm shrink-0" alt={g.title} />
                    )}
                    <div>
                      <p className="text-sm font-bold text-white">{g.title}</p>
                      <p className="text-[10px] text-gamex-neutral">
                        {g.developer || 'Unknown Developer'} · {g.releaseYear || 'TBA'} · {g.genres.slice(0, 2).join(', ')}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {selectedGame && (
              <div className="flex items-center gap-4 px-4 py-3 bg-brand-red/10 border border-brand-red/20 rounded-sm">
                <img src={selectedGame.coverImage} className="w-10 h-10 object-cover rounded-sm shrink-0" alt={selectedGame.title} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white">{selectedGame.title}</p>
                  <p className="text-[10px] text-gamex-neutral">{selectedGame.developer} · {selectedGame.releaseYear}</p>
                </div>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="text-gamex-neutral hover:text-brand-red transition-colors text-[10px] uppercase tracking-widest font-bold shrink-0"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <input 
            type="text" 
            placeholder="Review Title"
            defaultValue="CYBERPUNK 2077: PHANTOM LIBERTY"
            className="w-full bg-transparent border-none text-7xl font-display text-white uppercase tracking-tight focus:outline-none placeholder:text-white/10"
          />

          <div className="flex items-center gap-4 bg-[#111] p-2 border border-white/5 rounded-sm">
            <span className="text-[10px] font-bold text-gamex-neutral uppercase tracking-widest ml-2">gamex.com/reviews/</span>
            <input 
              type="text" 
              defaultValue="cyberpunk-2077-phantom-liberty"
              className="flex-1 bg-transparent border-none text-xs text-white focus:outline-none"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gamex-neutral uppercase tracking-[0.3em] block">Story Summary</label>
            <textarea 
              rows={4}
              placeholder="Brief summary of the story/premise..."
              className="w-full bg-[#111] border border-white/5 rounded-sm p-6 text-sm text-gamex-text-secondary focus:outline-none focus:border-brand-red/30 transition-colors"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-1 bg-[#111] border border-white/5 p-1 rounded-sm">
              <ToolbarBtn icon={<Bold size={16} />} />
              <ToolbarBtn icon={<Italic size={16} />} />
              <ToolbarBtn icon={<Underline size={16} />} />
              <div className="w-px h-5 bg-white/10 mx-1" />
              <ToolbarBtn icon={<Type size={16} />} label="H2" />
              <ToolbarBtn icon={<Type size={16} />} label="H3" />
              <div className="w-px h-5 bg-white/10 mx-1" />
              <ToolbarBtn icon={<Quote size={16} />} />
              <ToolbarBtn icon={<LinkIcon size={16} />} />
              <ToolbarBtn icon={<ImageIcon size={16} />} />
              <ToolbarBtn icon={<ImageIcon size={16} />} />
            </div>
            <div className="w-full min-h-[500px] bg-[#111] border border-white/5 rounded-sm p-10 text-lg leading-relaxed text-gamex-text-secondary font-sans space-y-6">
              <p>Dogtown is a dangerous place, and Phantom Liberty wastes no time throwing you into the deep end of its spy-thriller narrative. From the moment Songbird contacts V, the stakes feel significantly higher than the base game.</p>
              <p>The expansion overhauls many of the core systems, notably the cyberware and perk trees, creating a much more cohesive and rewarding progression loop...</p>
            </div>
          </div>

          {/* Media Assets */}
          <div className="space-y-6 pt-12 border-t border-white/5">
            <h3 className="text-[10px] font-bold text-gamex-neutral uppercase tracking-[0.3em]">Media Assets</h3>
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-3">
                  <span className="text-[9px] font-bold text-gamex-neutral uppercase tracking-widest">Hero Background (16:9)</span>
                  <div className="aspect-video bg-[#111] border border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center p-8 text-center group hover:border-brand-red/50 transition-colors cursor-pointer">
                    <UploadCloud size={32} className="text-gamex-neutral group-hover:text-brand-red transition-colors mb-4" />
                    <p className="text-xs text-gamex-text-secondary uppercase tracking-widest font-bold">Click or drag to replace Hero</p>
                  </div>
               </div>
               <div className="space-y-3">
                  <span className="text-[9px] font-bold text-gamex-neutral uppercase tracking-widest">Screenshot Gallery</span>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {uploadedScreenshots.map((url, i) => (
                      <div key={i} className="aspect-[4/3] relative bg-[#222] border border-white/5 rounded-sm overflow-hidden group">
                        {url.match(/\.(mp4|webm|ogg)$/) ? (
                          <video src={url} className="w-full h-full object-cover" muted loop />
                        ) : (
                          <img src={url} className="w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                           <button 
                             onClick={() => setUploadedScreenshots(prev => prev.filter((_, idx) => idx !== i))}
                             className="text-brand-red hover:text-white"
                           >
                             <Trash2 size={20} />
                           </button>
                        </div>
                      </div>
                    ))}
                    <label className={`aspect-[4/3] bg-[#111] border border-dashed border-white/10 rounded-sm flex items-center justify-center cursor-pointer hover:border-brand-red/50 transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                      <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                      {isUploading ? (
                         <div className="flex flex-col items-center">
                           <div className="w-6 h-6 border-2 border-brand-red border-t-transparent rounded-full animate-spin mb-2" />
                           <span className="text-[8px] uppercase tracking-widest text-gamex-neutral">Uploading...</span>
                         </div>
                      ) : (
                         <div className="flex flex-col items-center">
                           <ImageIcon size={20} className="text-white/30 mb-2" />
                           <span className="text-[8px] uppercase tracking-widest text-gamex-neutral">Add Media</span>
                         </div>
                      )}
                    </label>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="col-span-4 space-y-6">
          <div className="p-8 bg-[#111] border border-white/5 rounded-sm space-y-8">
            <div>
              <h3 className="text-[10px] font-bold text-gamex-neutral uppercase tracking-widest mb-6">Final Verdict</h3>
              <div className="flex items-center gap-6">
                <div className="space-y-2 flex-1">
                  <span className="text-[8px] font-bold text-gamex-neutral uppercase tracking-widest block">Score (0-10)</span>
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-sm p-4 text-center">
                    <span className="text-3xl font-display text-brand-red">9.5</span>
                    <span className="text-sm text-gamex-neutral ml-1">/ 10</span>
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <span className="text-[8px] font-bold text-gamex-neutral uppercase tracking-widest block">Verdict Badge</span>
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-sm p-4 flex items-center justify-between text-xs font-bold text-white uppercase tracking-widest cursor-pointer">
                    Essential <ChevronDown size={14} />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-gamex-neutral uppercase tracking-widest mb-6">Pros & Cons</h3>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#46D369] text-[9px] font-bold uppercase tracking-widest mb-2"><Plus size={14} /> Pros</div>
                    <textarea 
                      className="w-full bg-[#1a1a1a] border border-white/5 rounded-sm p-4 text-xs h-32 focus:outline-none"
                      placeholder="One pro per line..."
                      defaultValue={"Incredible narrative depth\nStunning visuals in Dogtown\nRevolutionary perk system"}
                    />
                 </div>
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 text-brand-red text-[9px] font-bold uppercase tracking-widest mb-2"><AlertCircle size={14} /> Cons</div>
                    <textarea 
                      className="w-full bg-[#1a1a1a] border border-white/5 rounded-sm p-4 text-xs h-32 focus:outline-none"
                      placeholder="One con per line..."
                      defaultValue={"Occasional visual bugs\nSteep hardware requirements"}
                    />
                 </div>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-gamex-neutral uppercase tracking-widest mb-6">Taxonomy</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[8px] font-bold text-gamex-neutral uppercase tracking-widest block">Platforms</span>
                  <div className="flex flex-wrap gap-2">
                    {['PC', 'PS5', 'Xbox Series X', 'Switch', 'PS4', 'Xbox One'].map(p => (
                      <button 
                        key={p} 
                        onClick={() => togglePlatform(p)}
                        className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-[1px] transition-all border ${
                          selectedPlatforms.includes(p) 
                            ? 'bg-brand-red border-brand-red text-white' 
                            : 'bg-white/5 border-white/5 text-gamex-neutral hover:text-white'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <span className="text-[8px] font-bold text-gamex-neutral uppercase tracking-widest block">Genres</span>
                  <div className="flex flex-wrap gap-2">
                    {allGenres.map(g => (
                      <button 
                        key={g} 
                        onClick={() => toggleGenre(g)}
                        className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-[1px] transition-all border ${
                          selectedGenres.includes(g) 
                            ? 'bg-brand-red border-brand-red text-white' 
                            : 'bg-white/5 border-white/5 text-gamex-neutral hover:text-white'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AnalyticsView(_props: { key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-12 pb-24"
    >
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCardLarge label="Total Views" value="2.4M" trend="+12.5%" icon={<Eye size={20} />} />
        <StatCardLarge label="Avg Read Time" value="4M 12S" trend="+0.8%" icon={<Clock size={20} />} />
        <StatCardLarge label="Active Readers" value="84.2K" trend="-2.1%" icon={<Users size={20} />} />
        <StatCardLarge label="Engagement Rate" value="6.8%" trend="+1.2%" icon={<TrendingUp size={20} />} />
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 bg-[#111] border border-white/5 rounded-sm p-10 flex flex-col h-[500px]">
          <div className="flex items-center justify-between mb-16">
            <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em]">Traffic Trends</h3>
            <button className="text-gamex-neutral hover:text-white"><MoreHorizontal size={20} /></button>
          </div>
          <div className="flex-1 relative">
             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-12">
               {[1,2,3,4].map(i => <div key={i} className="w-full h-px bg-white/5" />)}
             </div>
             <svg className="absolute inset-0 w-full h-full pb-12 overflow-visible" preserveAspectRatio="none">
               <motion.path 
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 d="M 0 160 C 150 160, 250 180, 350 140 S 550 40, 650 80 S 750 120, 850 100"
                 fill="none" 
                 stroke="#FF0000" 
                 strokeWidth="2"
               />
               <path 
                 d="M 0 160 C 150 160, 250 180, 350 140 S 550 40, 650 80 S 750 120, 850 100 L 850 200 L 0 200 Z"
                 fill="url(#trendGradient)"
                 className="opacity-10"
               />
               <defs>
                 <linearGradient id="trendGradient" x1="0" x2="0" y1="0" y2="1">
                   <stop offset="0%" stopColor="#FF0000" />
                   <stop offset="100%" stopColor="transparent" />
                 </linearGradient>
               </defs>
             </svg>
             <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[9px] font-bold text-gamex-neutral uppercase tracking-widest mt-auto">
               {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
             </div>
          </div>
        </div>

        <div className="col-span-4 bg-[#111] border border-white/5 rounded-sm p-10 h-[500px]">
          <div className="flex items-center justify-between mb-16">
             <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em]">Top Genres</h3>
             <button className="text-gamex-neutral hover:text-white"><BarChart3 size={18} /></button>
          </div>
          <div className="space-y-10">
            <GenreStat label="RPG" value="85%" />
            <GenreStat label="Shooter" value="65%" />
            <GenreStat label="Action" value="50%" />
            <GenreStat label="Strategy" value="35%" />
            <GenreStat label="Sports" value="20%" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SettingsView(_props: { key?: string }) {
  const [layout, setLayout] = useState('poster');
  const [density, setDensity] = useState('comfortable');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-16 max-w-6xl"
    >
      <div className="space-y-6 mb-16">
        <h2 className="text-8xl font-display text-white uppercase tracking-tight leading-none">SETTINGS</h2>
        <p className="text-gamex-neutral text-lg">Manage your account, editorial preferences, and platform configurations.</p>
      </div>

      <div className="space-y-12">
        <section className="bg-[#151515] border border-white/5 rounded-sm p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-red" />
          <h3 className="text-[14px] font-bold text-white uppercase tracking-[0.2em] mb-10">PROFILE SETTINGS</h3>
          
          <div className="flex gap-12">
            <div className="space-y-4 flex flex-col items-start">
               <div className="w-28 h-28 bg-[#222] border border-white/10 rounded-sm overflow-hidden grayscale">
                  <img src="/src/assets/images/regenerated_image_1778829241997.png" className="w-full h-full object-cover" alt="Avatar" />
               </div>
               <button className="text-[11px] font-bold text-brand-red uppercase tracking-widest hover:underline text-left">Change Avatar</button>
            </div>
            
            <div className="flex-1 space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gamex-neutral uppercase tracking-widest block">Display Name</label>
                <input type="text" defaultValue="Sarah Connor" className="w-full bg-[#1e1e1e] border-none rounded-sm p-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red/50 transition-all font-medium" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gamex-neutral uppercase tracking-widest block">Email Address</label>
                <input type="email" defaultValue="sarah.connor@gamex.com" className="w-full bg-[#1e1e1e] border-none rounded-sm p-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red/50 transition-all font-medium" />
              </div>
              <div className="pt-4 flex justify-end">
                <button className="px-10 py-4 bg-brand-red hover:bg-brand-red-hover text-white text-[11px] font-bold uppercase tracking-widest rounded-sm transition-all active:scale-95 shadow-lg shadow-brand-red/20">SAVE PROFILE</button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#151515] border border-white/5 rounded-sm p-12 space-y-12">
          <h3 className="text-[14px] font-bold text-white uppercase tracking-[0.2em]">EDITORIAL PREFERENCES</h3>
          
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white leading-none">Default Review Grid Layout</h4>
                <p className="text-xs text-gamex-neutral mt-2">Choose how content is displayed in the Editorial tab.</p>
              </div>
              <div className="grid grid-cols-2 gap-6 max-w-2xl">
                <PreferenceOption 
                  label="Poster" 
                  icon={<Layout size={32} />} 
                  active={layout === 'poster'} 
                  onClick={() => setLayout('poster')} 
                />
                <PreferenceOption 
                  label="Landscape" 
                  icon={<FileText size={32} />} 
                  active={layout === 'landscape'} 
                  onClick={() => setLayout('landscape')} 
                />
              </div>
            </div>

            <div className="space-y-6 pt-12 border-t border-white/5">
              <h4 className="text-base font-bold text-white leading-none">Content Density</h4>
              <div className="flex gap-1 bg-[#111] p-1.5 rounded-sm border border-white/5 w-fit">
                {['Compact', 'Comfortable'].map(d => (
                  <button 
                    key={d}
                    onClick={() => setDensity(d.toLowerCase())}
                    className={`px-10 py-3 text-[11px] font-bold uppercase tracking-widest rounded-sm transition-all ${density === d.toLowerCase() ? 'bg-white text-black' : 'text-gamex-neutral hover:text-white'}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

// --- SHARED COMPONENTS ---

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-4 py-3 rounded-sm text-sm font-bold transition-all ${
      active 
        ? 'bg-white/5 text-brand-red shadow-[inset_4px_0_0_0_currentColor]' 
        : 'text-gamex-text-secondary hover:text-white hover:bg-white/5'
    }`}>
      <span className={active ? 'text-brand-red' : 'text-gamex-neutral group-hover:text-white'}>{icon}</span>
      {label}
    </button>
  );
}

function StatCard({ label, value, trend, icon }: { label: string, value: string, trend: string, icon: React.ReactNode }) {
  return (
    <div className="bg-[#111] border border-gamex-border p-8 rounded-sm hover:bg-[#151515] transition-colors group">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold text-gamex-neutral uppercase tracking-widest">{label}</span>
        <div className="p-2 bg-white/5 rounded-sm">{icon}</div>
      </div>
      <div className="text-3xl font-display text-white mb-2">{value}</div>
      <div className="text-[10px] font-bold text-[#46D369] uppercase tracking-widest">{trend}</div>
    </div>
  );
}

function StatCardLarge({ label, value, trend, icon }: { label: string, value: string, trend: string, icon: React.ReactNode }) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="bg-[#111] border border-white/5 p-8 rounded-sm group hover:border-white/20 transition-all flex flex-col h-full">
      <div className="flex justify-between items-start mb-12">
         <span className="text-[10px] font-bold text-gamex-neutral uppercase tracking-[0.2em]">{label}</span>
         <div className="text-brand-red opacity-30 group-hover:opacity-100 transition-opacity">{icon}</div>
      </div>
      <div className="text-7xl font-display text-white mb-6 tracking-tighter leading-none">{value}</div>
      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
        <div className={`text-[9px] font-bold flex items-center gap-1.5 uppercase tracking-widest ${isPositive ? 'text-[#46D369]' : 'text-brand-red'}`}>
           {isPositive ? <TrendingUp size={12} /> : <AlertCircle size={12} />}
           {trend} <span className="text-gamex-neutral ml-2">VS LAST PERIOD</span>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: 'Published' | 'Draft' | 'Scheduled' }) {
  const colors = {
    Published: 'text-[#46D369] border-[#46D369]/20 bg-[#46D369]/5',
    Draft: 'text-[#EAB308] border-[#EAB308]/20 bg-[#EAB308]/5',
    Scheduled: 'text-[#3B82F6] border-[#3B82F6]/20 bg-[#3B82F6]/5'
  };
  const Icon = status === 'Published' ? CheckCircle2 : status === 'Draft' ? AlertCircle : Clock;
  
  return (
    <span className={`flex items-center gap-2 px-3 py-1 rounded-[1px] text-[9px] font-bold uppercase tracking-widest border ${colors[status]}`}>
      <Icon size={12} />
      {status}
    </span>
  );
}

function GenreStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest">
        <span className="text-gamex-neutral">{label}</span>
        <span className="text-white">{value}</span>
      </div>
      <div className="h-6 bg-white/5 rounded-[1px] overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: value }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-brand-red"
        />
      </div>
    </div>
  );
}

function ToolbarBtn({ icon, label }: { icon: React.ReactNode, label?: string }) {
  return (
    <button className="p-2.5 text-gamex-neutral hover:text-white hover:bg-white/5 rounded-sm transition-all flex items-center gap-1 text-[10px] font-bold">
      {icon} {label}
    </button>
  );
}

function PreferenceOption({ label, icon, active, onClick }: { label: string, icon: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`p-10 flex flex-col items-center justify-center gap-4 border rounded-sm transition-all ${
        active 
          ? 'bg-white/5 border-brand-red text-white' 
          : 'bg-[#1a1a1a] border-white/5 text-gamex-neutral hover:border-white/20 hover:text-white'
      }`}
    >
      <div className={active ? 'text-brand-red' : ''}>{icon}</div>
      <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}
