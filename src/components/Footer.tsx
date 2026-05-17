import React from 'react';

interface FooterProps {
  onNavigate: (view: 'home' | 'about' | 'genres' | 'admin-login') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-black text-white pt-32 pb-12 px-6 md:px-24 overflow-hidden border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-16 mb-32">
          {/* Left Column: Logo & Tagline */}
          <div className="md:col-span-1 space-y-8">
            <div className="flex flex-col gap-4">
              <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center">
                <span className="font-display text-3xl font-bold text-white">GX</span>
              </div>
              <div>
                <h4 className="text-brand-red font-display text-2xl font-bold tracking-tight mb-1">GAMEX</h4>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold leading-tight">
                  Make Things<br />You Love
                </p>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          <div className="space-y-8">
            <h6 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Navigation</h6>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
              <li><button onClick={() => onNavigate('home')} className="hover:text-brand-red transition-colors">Reviews</button></li>
              <li><button onClick={() => onNavigate('genres')} className="hover:text-brand-red transition-colors">Genres</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-brand-red transition-colors">About Us</button></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h6 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Social</h6>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-wider">
              <li><a href="https://smolljester-portofolio.framer.website/" className="hover:text-brand-red transition-colors" target="_blank" rel="noopener noreferrer">SmollJester</a></li>
              <li><a href="https://www.instagram.com/mroyhaf/" className="hover:text-brand-red transition-colors" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://github.com/SmollJester" className="hover:text-brand-red transition-colors" target="_blank" rel="noopener noreferrer">Github</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Pinterest</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h6 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Information</h6>
            <p className="text-sm italic text-white/60 leading-relaxed font-serif">
              GAMEX is a modern gaming platform that offers high-quality game reviews, news, and articles. It is a platform for gamers to find their next favorite game and for developers to showcase their work.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-white/20 font-mono tracking-[0.4em] uppercase pt-12 border-t border-white/5">
          <span>© 2026 GAMEX | DEVELOPED BY SMOLLJESTER</span>
          <div className="flex gap-8 mt-6 md:mt-0">
            <span onClick={() => onNavigate('admin-login')} className="cursor-pointer hover:text-brand-red transition-colors">Admin</span>
            <a href="#" className="hover:text-brand-red transition-colors">Twitter</a>
            <a href="#" className="hover:text-brand-red transition-colors">Instagram</a>
          </div>
        </div>
      </div >
    </footer >
  );
}
