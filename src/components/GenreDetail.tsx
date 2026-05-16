import React from 'react';
import { motion } from 'motion/react';
import { Star, Filter } from 'lucide-react';
import regeneratedRPGImage from '../assets/images/regenerated_image_1778851080258.png';

interface GameCardProps {
  id?: string;
  title: string;
  score: string;
  image: string;
  genre?: string;
  tag?: string;
  isLarge?: boolean;
  isTall?: boolean;
  description?: string;
  onClick?: (id: string) => void;
}

const GameCard = ({ id, title, score, image, genre, tag, isLarge, isTall, description, onClick }: GameCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    onClick={() => id && onClick?.(id)}
    className={`relative group cursor-pointer overflow-hidden rounded-sm ${isLarge ? 'md:col-span-2 md:row-span-2 aspect-[16/10]' : isTall ? 'md:row-span-2 aspect-[3/4]' : 'aspect-video'}`}
  >
    <img 
      src={image} 
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
      alt={title}
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
    
    <div className="absolute inset-x-0 bottom-0 p-6 space-y-2">
      <div className="flex items-center gap-3">
        {tag && (
          <span className="bg-brand-red text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
            {tag}
          </span>
        )}
        <div className="flex items-center gap-1 text-xs font-bold text-brand-red">
          <Star size={12} fill="currentColor" /> {score}
        </div>
      </div>
      <h3 className={`${isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'} font-display font-bold uppercase tracking-tight text-white group-hover:text-brand-red transition-colors`}>
        {title}
      </h3>
      {genre && <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium">{genre}</p>}
      {description && <p className="text-xs text-white/60 line-clamp-2 max-w-md">{description}</p>}
    </div>
  </motion.div>
);

const genreData: Record<string, any> = {
  "Role-Playing (RPG)": {
    heroImage: regeneratedRPGImage,
    description: "Immerse yourself in sprawling worlds, complex character progression, and epic narratives. From deep tactical turn-based combat to fast-paced action RPGs.",
    subGenres: ["All RPGs", "Action RPG", "JRPG", "CRPG", "Open World"],
    games: [
      { id: "rpg-1", title: "ELDEN RING: SHADOW OF THE ERDTREE", score: "9.8", image: regeneratedRPGImage, tag: "EDITOR'S PICK", isLarge: true },
      { id: "rpg-4", title: "Cyberpunk 2077: Phantom Liberty", score: "9.2", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop", genre: "Action RPG" },
      { id: "rpg-2", title: "BALDUR'S GATE 3", score: "10/10", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop", tag: "DEEP DIVE", isTall: true, description: "The pinnacle of CRPG design. A staggering achievement in player agency." },
      { id: "rpg-3", title: "Starfield", score: "8.9", image: "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=2070&auto=format&fit=crop", genre: "Action RPG" },
      { id: "rpg-6", title: "The Witcher 3: Wild Hunt", score: "9.7", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop", description: "A landmark in open-world storytelling and character development." },
      { id: "rpg-7", title: "Persona 5 Royal", score: "9.5", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop", genre: "JRPG" }
    ]
  },
  "Action": {
    heroImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop",
    description: "High-octane excitement and reflexive gameplay. Test your skills in fast-paced combat, platforming, and intense encounters.",
    subGenres: ["All Action", "Hack & Slash", "Beat 'em up", "Platformer", "Fighting"],
    games: [
      { id: "sho-8", title: "DOOM ETERNAL", score: "9.5", image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop", tag: "MUST PLAY", isLarge: true },
      { id: "adv-1", title: "God of War Ragnarök", score: "9.7", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=2070&auto=format&fit=crop", genre: "Action Adventure" },
      { id: "act-2", title: "DEVIL MAY CRY 5", score: "9.0", image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2070&auto=format&fit=crop", tag: "STYLISH", isTall: true },
      { id: "act-8", title: "Hades", score: "9.8", image: "https://images.unsplash.com/photo-1629752187622-c2c974534946?q=80&w=2070&auto=format&fit=crop", genre: "Roguelike Action" },
      { id: "act-4", title: "Sekiro: Shadows Die Twice", score: "9.6", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop" },
      { id: "act-3", title: "Bayonetta 3", score: "8.8", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" }
    ]
  },
  "Shooter": {
    heroImage: "https://images.unsplash.com/photo-1629752187622-c2c974534946?q=80&w=2070&auto=format&fit=crop",
    description: "Precision, strategy, and rapid response. From tactical military sims to chaotic arena shooters, find your target.",
    subGenres: ["All Shooters", "FPS", "TPS", "Battle Royale", "Tactical"],
    games: [
      { id: "sho-6", title: "VALORANT", score: "8.9", image: "https://images.unsplash.com/photo-1629752187622-c2c974534946?q=80&w=2070&auto=format&fit=crop", tag: "ESPORTS", isLarge: true },
      { id: "sho-1", title: "Call of Duty: Modern Warfare III", score: "7.5", image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop", genre: "FPS" },
      { id: "sho-3", title: "DESTINY 2", score: "8.4", image: "https://images.unsplash.com/photo-1624396972331-5079822aef91?q=80&w=2070&auto=format&fit=crop", isTall: true },
      { id: "sho-5", title: "Apex Legends", score: "9.1", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=2070&auto=format&fit=crop" },
      { id: "sho-7", title: "Counter-Strike 2", score: "9.0", image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=2070&auto=format&fit=crop" }
    ]
  },
  "Action-Adventure": {
    heroImage: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=2070&auto=format&fit=crop",
    description: "The best of both worlds. Explore rich environments, solve clever puzzles, and engage in thrilling combat in epic journeys.",
    subGenres: ["All Adventure", "Open World", "Metroidvania", "Stealth", "Survival"],
    games: [
      { id: "adv-3", title: "MARVEL'S SPIDER-MAN 2", score: "9.3", image: "https://images.unsplash.com/photo-1624396972331-5079822aef91?q=80&w=2070&auto=format&fit=crop", tag: "HEROIC", isLarge: true },
      { id: "adv-1", title: "God of War Ragnarök", score: "9.7", image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=2070&auto=format&fit=crop", genre: "Action Adventure" },
      { id: "adv-4", title: "UNCHARTED 4: A THIEF'S END", score: "9.4", image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=2070&auto=format&fit=crop", tag: "CLASSIC", isTall: true },
      { id: "adv-2", title: "Horizon Forbidden West", score: "9.0", image: "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=2070&auto=format&fit=crop" },
      { id: "adv-7", title: "Control", score: "9.1", image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070&auto=format&fit=crop" }
    ]
  },
  "Strategy": {
    heroImage: "https://images.unsplash.com/photo-1560416313-414b33c856a9?q=80&w=2070&auto=format&fit=crop",
    description: "Outsmart your opponents with superior planning and execution. Command armies, build civilizations, or manage resources in complex simulations.",
    subGenres: ["All Strategy", "RTS", "Turn-Based", "Grand Strategy", "Tower Defense"],
    games: [
      { id: "str-1", title: "CIVILIZATION VI", score: "9.0", image: "https://images.unsplash.com/photo-1560416313-414b33c856a9?q=80&w=2070&auto=format&fit=crop", tag: "JUST ONE MORE TURN", isLarge: true },
      { id: "str-2", title: "StarCraft II", score: "9.5", image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop", genre: "RTS" },
      { id: "str-4", title: "TOTAL WAR: WARHAMMER III", score: "8.7", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop", isTall: true },
      { id: "str-3", title: "XCOM 2", score: "9.2", image: "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=2070&auto=format&fit=crop" }
    ]
  },
  "Sports": {
    heroImage: "https://images.unsplash.com/photo-1552072805-2a9039d00e57?q=80&w=2070&auto=format&fit=crop",
    description: "Experience the thrill of competition. From realistic athletic sims to high-speed racing, take your place on the podium.",
    subGenres: ["All Sports", "Football", "Basketball", "Racing", "Extreme Sports"],
    games: [
      { id: "spo-1", title: "FC 24", score: "7.8", image: "https://images.unsplash.com/photo-1552072805-2a9039d00e57?q=80&w=2070&auto=format&fit=crop", tag: "COMPETITIVE", isLarge: true },
      { id: "spo-2", title: "NBA 2K24", score: "7.2", image: "https://images.unsplash.com/photo-1518091044133-aa24e12e1ec7?q=80&w=2070&auto=format&fit=crop", genre: "Sports" },
      { id: "spo-5", title: "F1 23", score: "9.2", image: "https://images.unsplash.com/photo-1614027164847-1b2809eb18e4?q=80&w=2070&auto=format&fit=crop", tag: "GORGEOUS", isTall: true },
      { id: "spo-6", title: "Gran Turismo 7", score: "8.8", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop" }
    ]
  }
};

export default function GenreDetail({ genre, onBack, onGameSelect }: { genre: string, onBack: () => void, onGameSelect: (id: string) => void, key?: string }) {
  const data = genreData[genre] || {
    heroImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070&auto=format&fit=crop",
    description: `Exploring the world of ${genre}. Discover the top-rated titles, latest releases, and community favorites in this category.`,
    subGenres: ["All", "Award Winning", "New Releases", "Community Choice"],
    games: [
      { id: "rpg-1", title: `${genre} Masterpiece`, score: "9.5", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop", isLarge: true },
      { id: "act-1", title: "Related Title 1", score: "8.8", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop" },
      { id: "adv-1", title: "Hidden Gem", score: "9.0", image: "https://images.unsplash.com/photo-1614728263952-84ea206f99b6?q=80&w=2070&auto=format&fit=crop", isTall: true },
      { id: "sho-1", title: "Community Pick", score: "8.4", image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=2070&auto=format&fit=crop" }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black text-white min-h-screen pb-32"
    >
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center px-6 md:px-24 pt-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src={data.heroImage} 
            className="w-full h-full object-cover opacity-60 brightness-50"
            alt={genre}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="space-y-1">
            <button 
              onClick={onBack}
              className="text-[10px] text-brand-red uppercase tracking-[0.3em] font-bold mb-4 hover:underline"
            >
              GENRE EXPLORE
            </button>
            <motion.h1 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tight leading-none text-white italic"
            >
              {genre}
            </motion.h1>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm md:text-base text-white/60 font-sans leading-relaxed max-w-2xl font-medium"
          >
            {data.description}
          </motion.p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-20 z-40 bg-black/80 backdrop-blur-md border-b border-white/5 px-6 md:px-24 py-4 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-2">
            <button className="bg-white text-black px-6 py-2 text-[10px] font-bold uppercase tracking-widest">Newest</button>
            <button className="bg-[#1a1a1a] text-white px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#222] transition-colors border border-white/5">Highest Rated</button>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Sub-genres:</span>
            <div className="relative">
              <select className="bg-[#1a1a1a] text-white px-4 py-2 pr-10 text-[10px] font-bold uppercase tracking-widest border border-white/5 appearance-none focus:outline-none focus:border-brand-red cursor-pointer">
                {data.subGenres.map((sub: string) => (
                  <option key={sub}>{sub}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                <Filter size={12} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <section className="px-6 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {data.games.map((game: any, idx: number) => {
            if (game.isLarge) {
              return (
                <div key={idx} className="md:col-span-2 md:row-span-2">
                  <GameCard {...game} onClick={onGameSelect} />
                </div>
              );
            }
            if (game.isTall) {
              return (
                <div key={idx} className="md:row-span-2">
                  <GameCard {...game} onClick={onGameSelect} />
                </div>
              );
            }
            return <GameCard key={idx} {...game} onClick={onGameSelect} />;
          })}
        </div>
      </section>
    </motion.div>
  );
}
