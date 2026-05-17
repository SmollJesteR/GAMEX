import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ReviewRow from './components/ReviewRow';
import ReviewDetail from './components/ReviewDetail';
import About from './components/About';
import Genres from './components/Genres';
import GenreDetail from './components/GenreDetail';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import { games as gamesApi, reviews as reviewsApi } from './lib/api';
import type { Game, Review } from './lib/api';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'genres' | 'admin-login' | 'admin-dashboard' | 'genre-detail'>('home');

  const fetchData = () => {
    gamesApi.getAll().then(setGames).catch(console.error);
    reviewsApi.getAll().then(setReviews).catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGameSelect = (gameId: string) => {
    setSelectedGameId(gameId);
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: 'home' | 'about' | 'genres' | 'admin-login' | 'admin-dashboard' | 'genre-detail') => {
    setCurrentView(view);
    setSelectedGameId(null);
    if (view !== 'genre-detail') {
      setSelectedGenre(null);
    }
    // Refetch data when navigating to home so new reviews appear
    if (view === 'home') {
      fetchData();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    handleNavigate('genre-detail');
  };

  const featuredGame = games[0];
  const gridItems = reviews.map(review => ({
    review,
    game: games.find(g => g.id === review.gameId)!
  })).filter(item => item.game);

  const selectedReview = selectedGameId 
    ? reviews.find(r => r.gameId === selectedGameId) 
    : null;
  const selectedGame = selectedGameId 
    ? games.find(g => g.id === selectedGameId) 
    : null;

  return (
    <div className="min-h-screen bg-gamex-black text-white selection:bg-brand-red selection:text-white">
      <Navigation onNavigate={handleNavigate} currentView={currentView} isDetailOpen={!!selectedGameId} />
      
      <main>
        <AnimatePresence mode="wait">
          {selectedGameId && selectedReview && selectedGame ? (
            <motion.div
              key="detail-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ReviewDetail 
                review={selectedReview}
                game={selectedGame}
                onBack={() => setSelectedGameId(null)}
                similarGames={gridItems.filter(item => item.game.id !== selectedGameId)}
                onGameSelect={handleGameSelect}
                onAdminAccess={() => handleNavigate('admin-login')}
                onNavigate={handleNavigate as any}
              />
            </motion.div>
          ) : currentView === 'about' ? (
            <About key="about" />
          ) : currentView === 'genres' ? (
            <Genres key="genres" onGenreSelect={handleGenreSelect} />
          ) : currentView === 'genre-detail' ? (
            <GenreDetail 
              key="genre-detail" 
              genre={selectedGenre || ''} 
              onBack={() => handleNavigate('genres')} 
              onGameSelect={handleGameSelect}
            />
          ) : currentView === 'admin-login' ? (
            <AdminLogin key="login" onLoginSuccess={() => setCurrentView('admin-dashboard')} />
          ) : currentView === 'admin-dashboard' ? (
            <AdminDashboard key="dashboard" onGoHome={() => handleNavigate('home')} />
          ) : (
              <motion.section 
                key="landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pb-24"
              >
                {featuredGame ? (
                  <>
                    <Hero game={featuredGame} review={reviews.find(r => r.gameId === featuredGame.id)} onReadLongForm={handleGameSelect} />
                    <div className="relative z-10 space-y-16 mt-8 md:mt-12">
                      {[
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
                      ].map((genreName) => (
                        <ReviewRow 
                          key={genreName}
                          title={genreName} 
                          items={gridItems.filter(item => item.game.genre?.split(', ').some(g => g === genreName) || item.game.genre === genreName)} 
                          onItemClick={handleGameSelect}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="h-[80vh] flex flex-col items-center justify-center text-center p-12">
                    <h1 className="text-6xl font-display text-white uppercase tracking-widest mb-6">Welcome to GAMEX</h1>
                    <p className="text-gamex-text-secondary max-w-lg mb-12 text-lg">Your database is empty. Head over to the Admin Dashboard to write your first review!</p>
                    <button onClick={() => handleNavigate('admin-login')} className="bg-brand-red text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-brand-red-hover transition-colors">
                      Go to Admin
                    </button>
                  </div>
                )}
              </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate as any} />
    </div>
  );
}
