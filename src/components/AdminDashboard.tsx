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
  Maximize2,
  Home
} from 'lucide-react';

type View = 'dashboard' | 'content' | 'editorial' | 'analytics' | 'settings';

const allGenres = [
  "Action",
  "Action-Adventure",
  "Role-Playing (RPG)",
  "Simulation",
  "Strategy",
  "Shooter",
  "Fighting",
  "Sports",
  "Puzzle",
  "Mobile"
];

const allSubGenres = [
  "Hack & Slash", "Beat 'em Up", "Stealth", "Survival", "Battle Royale", "Rhythm", "Open World", "Metroidvania", "Souls-like", "Narrative Adventure", "Sandbox",
  "JRPG", "WRPG", "MMORPG", "Tactical RPG", "Roguelike", "Roguelite", "Dungeon Crawler", "Action RPG",
  "Life Sim", "City Builder", "Farming Sim", "Flight Sim", "Business & Tycoon", "Vehicle Sim", "Social Sim",
  "Real-Time Strategy (RTS)", "Turn-Based Strategy (TBS)", "Tower Defense", "4X", "Grand Strategy", "Auto Chess",
  "First-Person Shooter (FPS)", "Third-Person Shooter (TPS)", "Top-Down Shooter", "Bullet Hell", "Tactical Shooter",
  "2D Fighter", "3D Fighter", "Arena Fighter", "Platform Fighter",
  "Football & Soccer", "Racing", "Basketball", "Baseball", "Combat Sports", "Extreme Sports", "Sports Management",
  "Logic", "Physics-Based", "Match-3", "Escape Room", "Hidden Object", "Word & Trivia",
  "Hyper-Casual", "Idle & Clicker", "Gacha", "Card & Collectible"
];

export default function AdminDashboard({ onGoHome }: { key?: string; onGoHome?: () => void }) {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [admin, setAdmin] = useState<import('../lib/api').AdminUser | null>(null);

  React.useEffect(() => {
    import('../lib/api').then(({ auth }) => {
      auth.me().then(res => setAdmin(res.admin)).catch(console.error);
    });
  }, []);

  const handleEditReview = (reviewId: string) => {
    setEditingReviewId(reviewId);
    setCurrentView('editorial');
  };

  const handleNewReview = () => {
    setEditingReviewId(null);
    setCurrentView('editorial');
  };

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

        <div className="px-4 pb-4">
          <button
            onClick={onGoHome}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-gamex-neutral hover:text-white hover:bg-white/5 transition-colors"
          >
            <Home size={20} />
            <span className="text-sm font-medium">Back to Home</span>
          </button>
        </div>

        <div className="p-6 border-t border-gamex-border mt-auto">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-sm overflow-hidden grayscale bg-[#222]">
                <img src={admin?.avatarUrl || "/src/assets/images/regenerated_image_1778829241997.png"} className="w-full h-full object-cover" alt="Profile" />
             </div>
             <div>
                <p className="text-sm font-bold text-white leading-none">{admin?.name || "Sarah Connor"}</p>
                <p className="text-[10px] text-gamex-neutral font-medium mt-1.5">{admin?.role || "Lead Editor"}</p>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-black">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <DashboardView key="dashboard" onAction={(v) => setCurrentView(v)} onNewReview={handleNewReview} />
          )}
          {currentView === 'content' && (
            <ContentManagerView key="content" onAction={(v) => setCurrentView(v)} onEditReview={handleEditReview} onNewReview={handleNewReview} />
          )}
          {currentView === 'editorial' && (
            <EditorialView key={`editorial-${editingReviewId || 'new'}`} onBack={() => { setEditingReviewId(null); setCurrentView('content'); }} editingReviewId={editingReviewId} admin={admin} />
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

function DashboardView({ onAction, onNewReview }: { onAction: (v: View) => void, onNewReview: () => void, key?: string }) {
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

  const publishedCount = reviewList.filter(r => r.status === 'PUBLISHED').length;

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
          <p className="text-gamex-text-secondary">Welcome back. Here's a brief overview of your editorial pipeline.</p>
        </div>
        <button onClick={onNewReview} className="bg-brand-red hover:bg-brand-red-hover text-white px-6 py-3 rounded-sm font-bold text-sm tracking-widest uppercase flex items-center gap-3 transition-colors">
          <Plus size={18} />
          Create New Review
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <StatCard label="Live Reviews" value={String(publishedCount)} trend={`${reviewList.length} total`} icon={<FileText size={20} className="text-brand-red" />} />
        <StatCard label="Drafts" value={String(reviewList.filter(r => r.status === 'DRAFT').length)} trend="In progress" icon={<Edit3 size={20} className="text-brand-red" />} />
        <StatCard label="Total Entries" value={String(reviewList.length)} trend="All statuses" icon={<BarChart3 size={20} className="text-brand-red" />} />
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
          {loading && (
            <div className="py-16 text-center text-gamex-neutral text-sm uppercase tracking-widest">Loading reviews...</div>
          )}
          {!loading && reviewList.length === 0 && (
            <div className="py-16 text-center text-gamex-neutral text-sm uppercase tracking-widest">No reviews yet. Click "Create New Review" to get started.</div>
          )}
          {reviewList.map((r) => (
            <div key={r.id} className="grid grid-cols-12 gap-4 px-8 py-6 items-center text-sm group hover:bg-[#151515] transition-colors cursor-pointer" onClick={() => onAction('content')}>
              <div className="col-span-5 flex items-center gap-4">
                <div className="w-16 h-10 rounded-sm overflow-hidden border border-white/5 bg-[#222]">
                  {(r.game?.coverImage || r.game?.gridImage || r.game?.heroImage) && <img src={r.game.coverImage || r.game.gridImage || r.game.heroImage || ''} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={r.title} />}
                </div>
                <h3 className="font-bold text-white line-clamp-1">{r.game?.title || r.title}</h3>
              </div>
              <div className="col-span-2 flex justify-center">
                <StatusBadge status={r.status === 'PUBLISHED' ? 'Published' : r.status === 'DRAFT' ? 'Draft' : 'Scheduled'} />
              </div>
              <div className="col-span-2 flex justify-center text-gamex-text-secondary text-xs">{r.authorName || 'Unknown'}</div>
              <div className="col-span-1 flex justify-center text-[10px] text-gamex-neutral text-center leading-tight uppercase font-medium">{r.publishedAt ? new Date(r.publishedAt).toLocaleDateString() : '—'}</div>
              <div className="col-span-2 flex justify-end gap-0.5 text-[#EAB308]">
                {r.game?.rating ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={10} fill={i < Math.floor(r.game!.rating / 20) ? "currentColor" : "none"} strokeWidth={i < Math.floor(r.game!.rating / 20) ? 0 : 2} />
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

function ContentManagerView({ onAction, onEditReview, onNewReview }: { onAction: (v: View) => void, onEditReview: (reviewId: string) => void, onNewReview: () => void, key?: string }) {
  const [reviewList, setReviewList] = React.useState<import('../lib/api').Review[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [actionMsg, setActionMsg] = React.useState('');
  const [confirmingDelete, setConfirmingDelete] = React.useState<string | null>(null);

  const fetchReviews = () => {
    import('../lib/api').then(({ reviews: reviewsApi }) => {
      reviewsApi.getAllAdmin()
        .then(setReviewList)
        .catch(console.error)
        .finally(() => setLoading(false));
    });
  };

  React.useEffect(() => {
    fetchReviews();
  }, []);

  const showMsg = (msg: string) => {
    setActionMsg(msg);
    setTimeout(() => setActionMsg(''), 3000);
  };

  const handlePublish = async (e: React.MouseEvent, reviewId: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const { reviews: reviewsApi } = await import('../lib/api');
      await reviewsApi.publish(reviewId);
      showMsg('✅ Review published successfully!');
      fetchReviews();
    } catch (err: any) {
      showMsg('❌ Publish failed: ' + (err.message || 'Unknown error'));
    }
  };

  const handleDelete = async (e: React.MouseEvent, reviewId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirmingDelete !== reviewId) {
      // First click — show "click again to confirm"
      setConfirmingDelete(reviewId);
      setTimeout(() => setConfirmingDelete(null), 3000); // reset after 3s
      return;
    }
    // Second click — actually delete
    setConfirmingDelete(null);
    try {
      const { reviews: reviewsApi } = await import('../lib/api');
      await reviewsApi.delete(reviewId);
      showMsg('🗑️ Review deleted.');
      fetchReviews();
    } catch (err: any) {
      showMsg('❌ Delete failed: ' + (err.message || 'Unknown error'));
    }
  };

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
          <button onClick={onNewReview} className="bg-brand-red hover:bg-brand-red-hover text-white px-6 py-3 rounded-sm font-bold text-sm tracking-widest uppercase flex items-center gap-3 transition-colors">
            <Plus size={18} />
            New Review
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gamex-border">
        <div className="flex items-center gap-8">
          {[
            `ALL REVIEWS (${reviewList.length})`,
            `DRAFTS (${reviewList.filter(r => r.status === 'DRAFT').length})`,
            `SCHEDULED (${reviewList.filter(r => r.status === 'SCHEDULED').length})`,
            `PUBLISHED (${reviewList.filter(r => r.status === 'PUBLISHED').length})`
          ].map((tab, i) => (
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
          {!loading && reviewList.length === 0 && (
            <div className="py-24 text-center text-gamex-neutral text-sm uppercase tracking-widest">
              No reviews yet. Click "New Review" to get started.
            </div>
          )}
          {reviewList.map((r) => (
            <div key={r.id} className="grid grid-cols-12 gap-4 px-8 py-6 bg-[#111] border border-white/5 rounded-sm items-center group hover:border-white/20 transition-all">
              <div className="col-span-1">
                <div className="w-12 h-16 bg-[#222] rounded-[1px] border border-white/10 overflow-hidden">
                  <img src={r.game?.coverImage || r.game?.gridImage || r.game?.heroImage || ''} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-transform duration-500 group-hover:scale-110" alt={r.game?.title ?? r.title} />
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
              <div className="col-span-1 flex justify-end gap-2 text-gamex-neutral">
                <button 
                  onClick={(e) => handlePublish(e, r.id)} 
                  title={r.status === 'PUBLISHED' ? 'Already published' : 'Publish this review'}
                  className={`p-2 rounded-sm transition-colors ${r.status === 'PUBLISHED' ? 'text-[#46D369] cursor-default' : 'hover:text-[#46D369] hover:bg-white/5 cursor-pointer'}`}
                >
                  <Eye size={16} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onEditReview(r.id); }} 
                  title="Edit review"
                  className="p-2 rounded-sm hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <Edit3 size={16} />
                </button>
                <button 
                  onClick={(e) => handleDelete(e, r.id)} 
                  title={confirmingDelete === r.id ? 'Click again to confirm delete!' : 'Delete review'}
                  className={`p-2 rounded-sm cursor-pointer transition-all ${confirmingDelete === r.id ? 'text-white bg-brand-red animate-pulse' : 'hover:text-brand-red hover:bg-red-500/10'}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action feedback toast */}
      {actionMsg && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[999] bg-[#1a1a1a] border border-white/10 rounded-sm px-8 py-4 text-sm font-bold text-white shadow-2xl">
          {actionMsg}
        </div>
      )}

      <div className="mt-12 flex justify-between items-center text-[10px] text-gamex-neutral uppercase tracking-widest font-bold">
        <div>Showing {reviewList.length} {reviewList.length === 1 ? 'entry' : 'entries'}</div>
      </div>
    </motion.div>
  );
}

function EditorialView({ onBack, editingReviewId, admin }: { onBack: () => void, editingReviewId?: string | null, admin?: import('../lib/api').AdminUser | null, key?: string }) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['PC', 'PS5', 'Xbox Series X']);
  const [selectedSubGenres, setSelectedSubGenres] = useState<string[]>([]);
  const [gameQuery, setGameQuery] = React.useState('');
  const [uploadedScreenshots, setUploadedScreenshots] = React.useState<string[]>([]);
  const [isUploading, setIsUploading] = React.useState(false);
  const [isUploadingHero, setIsUploadingHero] = React.useState(false);
  const [isUploadingGrid, setIsUploadingGrid] = React.useState(false);

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
  const [saving, setSaving] = React.useState(false);
  const [loadingReview, setLoadingReview] = React.useState(!!editingReviewId);
  const [manualEntry, setManualEntry] = React.useState(false);
  const [manualGameTitle, setManualGameTitle] = React.useState('');
  const [manualGameDeveloper, setManualGameDeveloper] = React.useState('');
  const [manualGameYear, setManualGameYear] = React.useState(new Date().getFullYear());

  // Form State
  const [reviewTitle, setReviewTitle] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [summary, setSummary] = React.useState('');
  const [heroSummary, setHeroSummary] = React.useState('');
  const [content, setContent] = React.useState('');
  const [score, setScore] = React.useState<number>(0);
  const [verdictBadge, setVerdictBadge] = React.useState('Essential');
  const [prosText, setProsText] = React.useState('');
  const [consText, setConsText] = React.useState('');
  const [heroImage, setHeroImage] = React.useState('');
  const [gridImage, setGridImage] = React.useState('');

  // Performance Breakdown state
  const [gameplayDepth, setGameplayDepth] = React.useState(5);
  const [gameplayBalance, setGameplayBalance] = React.useState(5);
  const [gameplayInnovation, setGameplayInnovation] = React.useState(5);
  const [worldScale, setWorldScale] = React.useState(5);
  const [worldAtmosphere, setWorldAtmosphere] = React.useState(5);
  const [worldDetail, setWorldDetail] = React.useState(5);
  const [perfLowestFps, setPerfLowestFps] = React.useState(30);
  const [perfAverageFps, setPerfAverageFps] = React.useState(60);
  const [perfHighestFps, setPerfHighestFps] = React.useState(120);

  // Existing review ID for update tracking
  const [existingReviewDbId, setExistingReviewDbId] = React.useState<string | null>(null);
  const [existingGameDbId, setExistingGameDbId] = React.useState<string | null>(null);

  // Load existing review data when editing
  React.useEffect(() => {
    if (!editingReviewId) return;
    setLoadingReview(true);
    import('../lib/api').then(async ({ reviews: reviewsApi }) => {
      try {
        const review = await reviewsApi.getOne(editingReviewId);
        const game = review.game;
        // Populate form fields
        setReviewTitle(review.title);
        setSlug(review.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
        setSummary(review.subtitle || '');
        setHeroSummary(review.heroSummary || '');
        setContent(review.content || '');
        setScore(game ? game.rating / 10 : 0);
        setVerdictBadge(review.verdict || 'Essential');
        setProsText((review.highs || []).join('\n'));
        setConsText((review.lows || []).join('\n'));
        setUploadedScreenshots(review.screenshots || []);
        // Performance breakdown
        setGameplayDepth(review.gameplayDepth ?? 5);
        setGameplayBalance(review.gameplayBalance ?? 5);
        setGameplayInnovation(review.gameplayInnovation ?? 5);
        setWorldScale(review.worldScale ?? 5);
        setWorldAtmosphere(review.worldAtmosphere ?? 5);
        setWorldDetail(review.worldDetail ?? 5);
        setPerfLowestFps(review.perfLowestFps ?? 30);
        setPerfAverageFps(review.perfAverageFps ?? 60);
        setPerfHighestFps(review.perfHighestFps ?? 120);
        // Game data
        if (game) {
          setSelectedGame({
            rawgId: game.rawgId || '',
            title: game.title,
            coverImage: game.coverImage,
            heroImage: game.heroImage,
            developer: game.developer,
            releaseYear: game.releaseYear,
            platforms: game.platforms || [],
            genres: game.genre ? game.genre.split(', ') : [],
          } as any);
          setHeroImage(game.heroImage || '');
          setGridImage(game.gridImage || '');
          setSelectedPlatforms(game.platforms || ['PC', 'PS5', 'Xbox Series X']);
          setSelectedGenres(game.genre ? game.genre.split(', ').filter(g => allGenres.includes(g)) : []);
          setSelectedSubGenres(game.subGenres || []);
          setExistingGameDbId(game.id);
        }
        setExistingReviewDbId(review.id);
      } catch (err) {
        console.error('Failed to load review:', err);
      } finally {
        setLoadingReview(false);
      }
    });
  }, [editingReviewId]);

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
    setReviewTitle(game.title + ' Review');
    setSlug(game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
    setSelectedPlatforms(game.platforms && game.platforms.length > 0 ? game.platforms : ['PC', 'PS5', 'Xbox Series X']);
    setSelectedGenres(game.genres && game.genres.length > 0 ? game.genres.filter(g => allGenres.includes(g)) : []);
    setHeroImage(game.heroImage || '');
  };

  const handleSave = async (status: 'DRAFT' | 'PUBLISHED') => {
    if (!selectedGame && !manualGameTitle && !existingGameDbId) return alert('Please select a game from RAWG or enter a game title manually');
    if (!reviewTitle) return alert('Please enter a review title');

    const gameTitle = selectedGame?.title || manualGameTitle;
    const gameDeveloper = selectedGame?.developer || manualGameDeveloper || 'Unknown';
    const gameYear = selectedGame?.releaseYear || manualGameYear;
    const gameCover = selectedGame?.coverImage || '';
    const gameRawgId = selectedGame?.rawgId || undefined;
    
    setSaving(true);
    try {
      const { games, reviews } = await import('../lib/api');
      
      // 1. Check if game exists or create it
      let dbGame: import('../lib/api').Game | undefined;
      
      if (existingGameDbId) {
        // Editing existing review — update the game
        dbGame = await games.update(existingGameDbId, {
          rating: score * 10,
          genre: selectedGenres.join(', '),
          platforms: selectedPlatforms,
          subGenres: selectedSubGenres,
          heroImage: heroImage || selectedGame?.heroImage || '',
          gridImage: gridImage || undefined,
          coverImage: gameCover || gridImage || heroImage || undefined,
        });
      } else {
        const allGames = await games.getAllAdmin();
        dbGame = allGames.find(g => (gameRawgId && g.rawgId === gameRawgId) || g.title === gameTitle);
        
        if (!dbGame) {
          dbGame = await games.create({
            title: gameTitle,
            developer: gameDeveloper,
            releaseYear: gameYear || new Date().getFullYear(),
            genre: selectedGenres.join(', '),
            rating: score * 10,
            coverImage: gameCover || gridImage || heroImage || '',
            heroImage: heroImage || gameCover || '',
            gridImage: gridImage || null,
            rawgId: gameRawgId,
            platforms: selectedPlatforms,
            subGenres: selectedSubGenres
          });
        } else {
          dbGame = await games.update(dbGame.id, {
            rating: score * 10,
            genre: selectedGenres.join(', '),
            platforms: selectedPlatforms,
            subGenres: selectedSubGenres,
            heroImage: heroImage || dbGame.heroImage,
            gridImage: gridImage || dbGame.gridImage,
            coverImage: gameCover || gridImage || heroImage || dbGame.coverImage
          });
        }
      }

      // 2. Create or Update Review
      const highs = prosText.split('\n').filter(s => s.trim() !== '');
      const lows = consText.split('\n').filter(s => s.trim() !== '');

      const reviewPayload = {
        title: reviewTitle,
        subtitle: summary,
        heroSummary,
        content: content,
        screenshots: uploadedScreenshots,
        highs,
        lows,
        verdict: verdictBadge,
        status,
        gameplayDepth,
        gameplayBalance,
        gameplayInnovation,
        worldScale,
        worldAtmosphere,
        worldDetail,
        perfLowestFps,
        perfAverageFps,
        perfHighestFps,
        authorName: admin?.name || 'GAMEX Editorial',
        authorRole: admin?.role || 'Staff Critic',
        authorAvatar: admin?.avatarUrl || '',
      };

      if (existingReviewDbId) {
        await reviews.update(existingReviewDbId, reviewPayload);
      } else {
        const allReviews = await reviews.getAllAdmin();
        const existingReview = allReviews.find(r => r.gameId === dbGame!.id);
        if (existingReview) {
          await reviews.update(existingReview.id, reviewPayload);
        } else {
          await reviews.create({ gameId: dbGame!.id, ...reviewPayload });
        }
      }

      alert('Review ' + status + ' successfully!');
      onBack();
    } catch (err: any) {
      console.error(err);
      alert('Error saving review: ' + (err.message || 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };



  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre) 
        : [...prev, genre]
    );
  };

  const toggleSubGenre = (subGenre: string) => {
    setSelectedSubGenres(prev =>
      prev.includes(subGenre)
        ? prev.filter(s => s !== subGenre)
        : [...prev, subGenre]
    );
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform) 
        : [...prev, platform]
    );
  };

  if (loadingReview) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="p-12 flex flex-col items-center justify-center h-full gap-4"
      >
        <div className="w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
        <span className="text-[10px] uppercase tracking-widest text-gamex-neutral font-bold">Loading review data...</span>
      </motion.div>
    );
  }

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
            Editing: <span className="text-white">{reviewTitle || 'New Review'}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleSave('DRAFT')}
            disabled={saving}
            className="px-6 py-2.5 bg-[#1a1a1a] border border-white/10 hover:bg-[#222] text-white rounded-sm font-bold text-[10px] tracking-widest uppercase transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Draft'}
          </button>
          <button 
            onClick={() => handleSave('PUBLISHED')}
            disabled={saving}
            className="px-6 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white rounded-sm font-bold text-[10px] tracking-widest uppercase flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <UploadCloud size={14} /> {saving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-12">
        {/* Main Editor */}
        <div className="col-span-8 space-y-8">
          <div className="space-y-4 pb-8 border-b border-white/5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-gamex-neutral uppercase tracking-[0.3em] block">
                {manualEntry ? 'Manual Game Entry' : 'Search Game Database (RAWG)'}
              </label>
              <button
                onClick={() => { setManualEntry(!manualEntry); setSelectedGame(null); setGameResults([]); setGameQuery(''); }}
                className="text-[9px] font-bold uppercase tracking-widest text-brand-red hover:text-white transition-colors"
              >
                {manualEntry ? '← Back to RAWG Search' : "Can't find it? Add Manually"}
              </button>
            </div>

            {manualEntry ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={manualGameTitle}
                  onChange={(e) => {
                    setManualGameTitle(e.target.value);
                    if (!reviewTitle || reviewTitle === '') {
                      setReviewTitle(e.target.value + ' Review');
                      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }
                  }}
                  placeholder="Game Title (e.g. Tekken 8)..."
                  className="w-full bg-[#111] border border-white/5 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-brand-red transition-colors"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={manualGameDeveloper}
                    onChange={(e) => setManualGameDeveloper(e.target.value)}
                    placeholder="Developer (e.g. Bandai Namco)..."
                    className="bg-[#111] border border-white/5 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-brand-red transition-colors"
                  />
                  <input
                    type="number"
                    value={manualGameYear}
                    onChange={(e) => setManualGameYear(Number(e.target.value))}
                    placeholder="Release Year"
                    className="bg-[#111] border border-white/5 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>
                {manualGameTitle && (
                  <div className="flex items-center gap-4 px-4 py-3 bg-white/5 border border-white/10 rounded-sm">
                    <div className="w-10 h-10 bg-[#222] rounded-sm flex items-center justify-center text-gamex-neutral text-[10px] font-bold uppercase shrink-0">?</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white">{manualGameTitle}</p>
                      <p className="text-[10px] text-gamex-neutral">{manualGameDeveloper || 'Unknown'} · {manualGameYear} · Manual Entry</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
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
                    {selectedGame.coverImage && <img src={selectedGame.coverImage} className="w-10 h-10 object-cover rounded-sm shrink-0" alt={selectedGame.title} />}
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
              </>
            )}
          </div>

          <input 
            type="text" 
            placeholder="Review Title"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            className="w-full bg-transparent border-none text-7xl font-display text-white uppercase tracking-tight focus:outline-none placeholder:text-white/10"
          />

          <div className="flex items-center gap-4 bg-[#111] p-2 border border-white/5 rounded-sm">
            <span className="text-[10px] font-bold text-gamex-neutral uppercase tracking-widest ml-2">gamex.com/reviews/</span>
            <input 
              type="text" 
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="flex-1 bg-transparent border-none text-xs text-white focus:outline-none"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gamex-neutral uppercase tracking-[0.3em] block">
              Hero Summary <span className="text-brand-red/60 normal-case tracking-normal">(displayed on homepage hero section)</span>
            </label>
            <textarea 
              rows={3}
              value={heroSummary}
              onChange={(e) => setHeroSummary(e.target.value)}
              placeholder="Short teaser text shown on the homepage hero banner..."
              className="w-full bg-[#111] border border-white/5 rounded-sm p-6 text-sm text-gamex-text-secondary focus:outline-none focus:border-brand-red/30 transition-colors"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gamex-neutral uppercase tracking-[0.3em] block">Story Summary</label>
            <textarea 
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary of the story/premise..."
              className="w-full bg-[#111] border border-white/5 rounded-sm p-6 text-sm text-gamex-text-secondary focus:outline-none focus:border-brand-red/30 transition-colors"
            />
          </div>

          <div className="space-y-4 pt-8 border-t border-white/5">
            <label className="text-[10px] font-bold text-gamex-neutral uppercase tracking-[0.3em] block">
              Review <span className="text-brand-red/60 normal-case tracking-normal">(displayed below Visual Spectacle section)</span>
            </label>
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
            <textarea
              className="w-full min-h-[500px] bg-[#111] border border-white/5 rounded-sm p-10 text-lg leading-relaxed text-gamex-text-secondary font-sans focus:outline-none focus:border-brand-red/30 transition-colors"
              placeholder="Write your review content here. Use newlines to separate paragraphs..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* Media Assets */}
          <div className="space-y-6 pt-12 border-t border-white/5">
            <h3 className="text-[10px] font-bold text-gamex-neutral uppercase tracking-[0.3em]">Media Assets</h3>
            <div className="grid grid-cols-3 gap-6">
               <div className="col-span-2 space-y-3">
                  <span className="text-[9px] font-bold text-gamex-neutral uppercase tracking-widest">Hero Background (16:9)</span>
                  <label className={`aspect-video relative overflow-hidden bg-[#111] border border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center p-8 text-center group hover:border-brand-red/50 transition-colors cursor-pointer ${isUploadingHero ? 'opacity-50 pointer-events-none' : ''}`}>
                    <input type="file" accept="image/webp,image/png,image/jpeg,image/*" className="hidden" disabled={isUploadingHero} onChange={async (e) => {
                      if (!e.target.files || e.target.files.length === 0) return;
                      const file = e.target.files[0];
                      setIsUploadingHero(true);
                      try {
                        const { media } = await import('../lib/api');
                        const res = await media.upload(file);
                        setHeroImage(res.url);
                      } catch (error) {
                        alert('Upload failed');
                      } finally {
                        setIsUploadingHero(false);
                        e.target.value = '';
                      }
                    }} />
                    {isUploadingHero ? (
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 border-2 border-brand-red border-t-transparent rounded-full animate-spin mb-2" />
                        <span className="text-[8px] uppercase tracking-widest text-gamex-neutral">Uploading...</span>
                      </div>
                    ) : heroImage ? (
                      <>
                        <img 
                          src={heroImage} 
                          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src.includes('.webp')) console.error('Hero preview WebP failed');
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-[9px] font-bold text-white uppercase tracking-widest bg-black/60 px-3 py-1.5 rounded-sm">Change Image</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <UploadCloud size={32} className="text-gamex-neutral group-hover:text-brand-red transition-colors mb-4" />
                        <p className="text-xs text-gamex-text-secondary uppercase tracking-widest font-bold">Click to upload Hero</p>
                        <p className="text-[9px] text-gamex-neutral mt-1">Recommended: 1920 × 1080</p>
                      </>
                    )}
                  </label>
               </div>

               {/* Grid Image (2:3) */}
               <div className="col-span-1 space-y-3">
                  <span className="text-[9px] font-bold text-gamex-neutral uppercase tracking-widest">Grid Cover (2:3)</span>
                  <label className={`aspect-[2/3] relative overflow-hidden bg-[#111] border border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center p-6 text-center group hover:border-brand-red/50 transition-colors cursor-pointer ${isUploadingGrid ? 'opacity-50 pointer-events-none' : ''}`}>
                    <input type="file" accept="image/webp,image/png,image/jpeg,image/*" className="hidden" disabled={isUploadingGrid} onChange={async (e) => {
                      if (!e.target.files || e.target.files.length === 0) return;
                      const file = e.target.files[0];
                      setIsUploadingGrid(true);
                      try {
                        const { media } = await import('../lib/api');
                        const res = await media.upload(file);
                        setGridImage(res.url);
                      } catch (error) {
                        alert('Upload failed');
                      } finally {
                        setIsUploadingGrid(false);
                        e.target.value = '';
                      }
                    }} />
                    {isUploadingGrid ? (
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 border-2 border-brand-red border-t-transparent rounded-full animate-spin mb-2" />
                        <span className="text-[8px] uppercase tracking-widest text-gamex-neutral">Uploading...</span>
                      </div>
                    ) : gridImage ? (
                      <>
                        <img 
                          src={gridImage} 
                          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src.includes('.webp')) console.error('Grid preview WebP failed');
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-[9px] font-bold text-white uppercase tracking-widest bg-black/60 px-3 py-1.5 rounded-sm">Change Image</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <UploadCloud size={28} className="text-gamex-neutral group-hover:text-brand-red transition-colors mb-3" />
                        <p className="text-[10px] text-gamex-text-secondary uppercase tracking-widest font-bold">Upload Grid</p>
                        <p className="text-[9px] text-gamex-neutral mt-1">600 × 900</p>
                      </>
                    )}
                  </label>
               </div>
            </div>

            {/* Screenshots - full width below */}
            <div className="space-y-3 pt-4">
               <span className="text-[9px] font-bold text-gamex-neutral uppercase tracking-widest">Screenshot Gallery</span>
               <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
                 {uploadedScreenshots.map((url, i) => (
                   <div key={i} className="aspect-video relative bg-[#222] border border-white/5 rounded-sm overflow-hidden group">
                     {url.match(/\.(mp4|webm|ogg)$/) ? (
                       <video src={url} className="w-full h-full object-cover" muted loop />
                     ) : (
                       <img 
                        src={url} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src.includes('.webp')) console.error('Screenshot preview WebP failed');
                        }}
                       />
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
                 <label className={`aspect-video bg-[#111] border border-dashed border-white/10 rounded-sm flex items-center justify-center cursor-pointer hover:border-brand-red/50 transition-colors ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                   <input type="file" accept="image/webp,image/png,image/jpeg,image/*,video/*" className="hidden" onChange={handleFileUpload} disabled={isUploading} />
                   {isUploading ? (
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 border-2 border-brand-red border-t-transparent rounded-full animate-spin mb-2" />
                        <span className="text-[8px] uppercase tracking-widest text-gamex-neutral">Uploading...</span>
                      </div>
                   ) : (
                      <div className="flex flex-col items-center">
                        <ImageIcon size={20} className="text-white/30 mb-2" />
                        <span className="text-[8px] uppercase tracking-widest text-gamex-neutral">Add Screenshot</span>
                      </div>
                   )}
                 </label>
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
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-sm p-4 flex items-center">
                    <input type="number" min="0" max="10" step="0.1" value={score} onChange={(e) => setScore(parseFloat(e.target.value))} className="w-full bg-transparent text-center text-3xl font-display text-brand-red focus:outline-none" />
                    <span className="text-sm text-gamex-neutral ml-1">/ 10</span>
                  </div>
                </div>
                <div className="space-y-2 flex-1">
                  <span className="text-[8px] font-bold text-gamex-neutral uppercase tracking-widest block">Verdict Badge</span>
                  <select value={verdictBadge} onChange={(e) => setVerdictBadge(e.target.value)} className="w-full bg-[#1a1a1a] border border-white/5 rounded-sm p-5 text-xs font-bold text-white uppercase tracking-widest cursor-pointer focus:outline-none appearance-none text-center">
                    <option value="Essential">Essential</option>
                    <option value="Recommended">Recommended</option>
                    <option value="Wait for Sale">Wait for Sale</option>
                    <option value="Skip">Skip</option>
                  </select>
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
                      value={prosText}
                      onChange={(e) => setProsText(e.target.value)}
                    />
                 </div>
                 <div className="space-y-2">
                    <div className="flex items-center gap-2 text-brand-red text-[9px] font-bold uppercase tracking-widest mb-2"><AlertCircle size={14} /> Cons</div>
                    <textarea 
                      className="w-full bg-[#1a1a1a] border border-white/5 rounded-sm p-4 text-xs h-32 focus:outline-none"
                      placeholder="One con per line..."
                      value={consText}
                      onChange={(e) => setConsText(e.target.value)}
                    />
                 </div>
              </div>
            </div>

            {/* Performance Breakdown */}
            <div>
              <h3 className="text-[10px] font-bold text-gamex-neutral uppercase tracking-widest mb-6">Performance Breakdown</h3>
              <div className="space-y-6">
                {/* Gameplay & Mechanics */}
                <div className="space-y-3 p-4 bg-[#1a1a1a] border border-white/5 rounded-sm">
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest block">Gameplay & Mechanics</span>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-gamex-neutral uppercase tracking-widest font-bold">Depth</span>
                      <select value={gameplayDepth} onChange={(e) => setGameplayDepth(Number(e.target.value))} className="bg-[#111] border border-white/10 rounded-sm px-2 py-1 text-xs text-white focus:outline-none focus:border-brand-red w-16 text-center appearance-none cursor-pointer">
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-gamex-neutral uppercase tracking-widest font-bold">Balance</span>
                      <select value={gameplayBalance} onChange={(e) => setGameplayBalance(Number(e.target.value))} className="bg-[#111] border border-white/10 rounded-sm px-2 py-1 text-xs text-white focus:outline-none focus:border-brand-red w-16 text-center appearance-none cursor-pointer">
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-gamex-neutral uppercase tracking-widest font-bold">Innovation</span>
                      <select value={gameplayInnovation} onChange={(e) => setGameplayInnovation(Number(e.target.value))} className="bg-[#111] border border-white/10 rounded-sm px-2 py-1 text-xs text-white focus:outline-none focus:border-brand-red w-16 text-center appearance-none cursor-pointer">
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-[8px] text-brand-red uppercase tracking-widest font-bold">Average</span>
                      <span className="text-sm font-display text-brand-red">{((gameplayDepth + gameplayBalance + gameplayInnovation) / 3).toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                {/* World Design */}
                <div className="space-y-3 p-4 bg-[#1a1a1a] border border-white/5 rounded-sm">
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest block">World Design</span>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-gamex-neutral uppercase tracking-widest font-bold">Scale</span>
                      <select value={worldScale} onChange={(e) => setWorldScale(Number(e.target.value))} className="bg-[#111] border border-white/10 rounded-sm px-2 py-1 text-xs text-white focus:outline-none focus:border-brand-red w-16 text-center appearance-none cursor-pointer">
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-gamex-neutral uppercase tracking-widest font-bold">Atmosphere</span>
                      <select value={worldAtmosphere} onChange={(e) => setWorldAtmosphere(Number(e.target.value))} className="bg-[#111] border border-white/10 rounded-sm px-2 py-1 text-xs text-white focus:outline-none focus:border-brand-red w-16 text-center appearance-none cursor-pointer">
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-gamex-neutral uppercase tracking-widest font-bold">Detail</span>
                      <select value={worldDetail} onChange={(e) => setWorldDetail(Number(e.target.value))} className="bg-[#111] border border-white/10 rounded-sm px-2 py-1 text-xs text-white focus:outline-none focus:border-brand-red w-16 text-center appearance-none cursor-pointer">
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Performance FPS */}
                <div className="space-y-3 p-4 bg-[#1a1a1a] border border-white/5 rounded-sm">
                  <span className="text-[9px] font-bold text-white uppercase tracking-widest block">Performance (FPS)</span>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-gamex-neutral uppercase tracking-widest font-bold">Lowest FPS</span>
                      <input type="number" min="0" max="999" value={perfLowestFps} onChange={(e) => setPerfLowestFps(Number(e.target.value))} className="bg-[#111] border border-white/10 rounded-sm px-2 py-1 text-xs text-white focus:outline-none focus:border-brand-red w-20 text-center" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-gamex-neutral uppercase tracking-widest font-bold">Average FPS</span>
                      <input type="number" min="0" max="999" value={perfAverageFps} onChange={(e) => setPerfAverageFps(Number(e.target.value))} className="bg-[#111] border border-white/10 rounded-sm px-2 py-1 text-xs text-white focus:outline-none focus:border-brand-red w-20 text-center" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-gamex-neutral uppercase tracking-widest font-bold">Highest FPS</span>
                      <input type="number" min="0" max="999" value={perfHighestFps} onChange={(e) => setPerfHighestFps(Number(e.target.value))} className="bg-[#111] border border-white/10 rounded-sm px-2 py-1 text-xs text-white focus:outline-none focus:border-brand-red w-20 text-center" />
                    </div>
                  </div>
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
                <div className="space-y-3">
                  <span className="text-[8px] font-bold text-gamex-neutral uppercase tracking-widest block">Sub-Genres <span className="text-brand-red/60 normal-case tracking-normal">(shown as tags on review detail hero)</span></span>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                    {allSubGenres.map(sg => (
                      <button 
                        key={sg} 
                        onClick={() => toggleSubGenre(sg)}
                        className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-[1px] transition-all border ${
                          selectedSubGenres.includes(sg) 
                            ? 'bg-white/20 border-white/40 text-white' 
                            : 'bg-white/5 border-white/5 text-gamex-neutral hover:text-white'
                        }`}
                      >
                        {sg}
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
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [avatarUrl, setAvatarUrl] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    async function loadProfile() {
      try {
        const { auth } = await import('../lib/api');
        const res = await auth.me();
        if (res.admin) {
          setName(res.admin.name || '');
          setEmail(res.admin.email || '');
          setAvatarUrl(res.admin.avatarUrl || '');
        }
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { auth } = await import('../lib/api');
      const data: any = { name, email, avatarUrl };
      if (password) data.password = password;
      await auth.updateProfile(data);
      alert('Profile updated successfully');
      setPassword(''); // Clear password field after save
    } catch (err) {
      alert('Failed to update profile');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    try {
      const { media } = await import('../lib/api');
      const res = await media.upload(file);
      setAvatarUrl(res.url);
    } catch (error) {
      alert('Upload failed');
    }
  };

  if (loading) {
    return (
      <div className="p-16 max-w-6xl flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-16 max-w-6xl"
    >
      <div className="space-y-6 mb-16">
        <h2 className="text-8xl font-display text-white uppercase tracking-tight leading-none">SETTINGS</h2>
        <p className="text-gamex-neutral text-lg">Manage your account and profile settings.</p>
      </div>

      <div className="space-y-12">
        <section className="bg-[#151515] border border-white/5 rounded-sm p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-red" />
          <h3 className="text-[14px] font-bold text-white uppercase tracking-[0.2em] mb-10">PROFILE SETTINGS</h3>
          
          <div className="flex gap-12">
            <div className="space-y-4 flex flex-col items-start">
               <label className="w-28 h-28 bg-[#222] border border-white/10 rounded-sm overflow-hidden grayscale cursor-pointer group relative flex flex-col items-center justify-center">
                  <input type="file" accept="image/webp,image/png,image/jpeg,image/*" className="hidden" onChange={handleAvatarUpload} />
                  {avatarUrl ? (
                    <img src={avatarUrl} className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" alt="Avatar" />
                  ) : (
                    <div className="text-gamex-neutral group-hover:text-white transition-colors flex flex-col items-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Upload</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-[9px] font-bold text-white uppercase tracking-widest bg-black/60 px-2 py-1 rounded-sm">Change</span>
                  </div>
               </label>
            </div>
            
            <div className="flex-1 space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gamex-neutral uppercase tracking-widest block">Display Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1e1e1e] border-none rounded-sm p-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red/50 transition-all font-medium" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gamex-neutral uppercase tracking-widest block">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1e1e1e] border-none rounded-sm p-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red/50 transition-all font-medium" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gamex-neutral uppercase tracking-widest block">New Password (leave blank to keep current)</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1e1e1e] border-none rounded-sm p-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-red/50 transition-all font-medium" 
                />
              </div>
              <div className="pt-4 flex justify-end">
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="px-10 py-4 bg-brand-red hover:bg-brand-red-hover text-white text-[11px] font-bold uppercase tracking-widest rounded-sm transition-all active:scale-95 shadow-lg shadow-brand-red/20 disabled:opacity-50"
                >
                  {saving ? 'SAVING...' : 'SAVE PROFILE'}
                </button>
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
