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
import { games as mockGames, reviews as mockReviews } from './mockData';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  useEffect(() => {
    gamesApi.getAll().then(setGames).catch(console.error);
    reviewsApi.getAll().then(setReviews).catch(console.error);
  }, []);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'about' | 'genres' | 'admin-login' | 'admin-dashboard' | 'genre-detail'>('home');
  
  const handleGameSelect = (gameId: string) => {
    setSelectedGameId(gameId);
    setCurrentView('home'); // Switch back to home view if we were on about but somehow triggered a select
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: 'home' | 'about' | 'genres' | 'admin-login' | 'admin-dashboard' | 'genre-detail') => {
    setCurrentView(view);
    setSelectedGameId(null);
    if (view !== 'genre-detail') {
      setSelectedGenre(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    handleNavigate('genre-detail');
  };

  const displayGames = games.length > 0 ? games : mockGames;
  const displayReviews = reviews.length > 0 ? reviews : mockReviews;

  const featuredGame = displayGames[0];
  const gridItems = displayReviews.map(review => ({
    review,
    game: displayGames.find(g => g.id === review.gameId)!
  }));

  const selectedReview = selectedGameId 
    ? displayReviews.find(r => r.gameId === selectedGameId) 
    : null;
  const selectedGame = selectedGameId 
    ? displayGames.find(g => g.id === selectedGameId) 
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
            <AdminDashboard key="dashboard" />
          ) : (
            <motion.section 
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pb-24"
            >
              <Hero game={featuredGame} onReadLongForm={handleGameSelect} />
              
                <div className="relative z-10 space-y-12 -mt-16 md:-mt-24">
                {[
                  "Action",
                  "Action-Adventure",
                  "Role-Playing (RPG)",
                  "Simulation",
                  "Strategy",
                  "Shooter",
                  "Sports",
                  "Puzzle",
                  "Mobile"
                ].map((genreName) => (
                  <ReviewRow 
                    key={genreName}
                    title={genreName} 
                    items={gridItems.filter(item => item.game.genre === genreName)} 
                    onItemClick={handleGameSelect}
                  />
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate as any} />
    </div>
  );
}
