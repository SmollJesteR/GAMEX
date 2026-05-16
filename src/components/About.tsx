import React from 'react';
import { motion } from 'motion/react';
import { Zap, ShieldCheck, Theater, Flag } from 'lucide-react';

export default function About() {
  const standards = [
    {
      title: "Uncompromising Critique",
      description: "We do not aggregate scores. Every review is a deep, singular editorial stance. We analyze mechanics, narrative ambition, and artistic merit without bowing to hype or consensus. If a masterpiece demands patience, we say so; if a blockbuster falters, we break down why.",
      icon: <Zap className="text-brand-red" size={28} />
    },
    {
      title: "Verified Expertise",
      description: "Our authors aren't just writers; they are veterans of the industry, competitive players, and narrative theorists.",
      icon: <ShieldCheck className="text-brand-red" size={28} />
    },
    {
      title: "Cinematic Presentation",
      description: "Text is treated as visual art. We pair high-impact typography with carefully curated, artifact-free imagery.",
      icon: <Theater className="text-brand-red" size={28} />
    },
    {
      title: "The Long View",
      description: "While others chase the news cycle, we invest in retrospectives. We revisit titles years after launch to evaluate their lasting cultural impact, examining how patches, expansions, and shifting community sentiment have altered the original experience.",
      icon: <Flag className="text-brand-red" size={28} />
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black"
    >
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center px-6 md:px-24 overflow-hidden pt-[68px]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-40 brightness-50"
            alt="Hero Background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-8">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-display uppercase tracking-tight leading-none text-white"
          >
            The Vision Behind GAMEX
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gamex-neutral font-sans leading-relaxed max-w-2xl"
          >
            We aren't just curating games; we are defining the culture. GAMEX is built on the philosophy that interactive entertainment deserves the same critical reverence, immersive presentation, and editorial depth as high cinema. This is where the art of play takes center stage.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 px-6 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <h2 className="text-4xl font-display uppercase tracking-tight text-white">Our Mission</h2>
            <div className="space-y-8 text-gamex-neutral leading-relaxed font-sans text-lg lg:text-xl">
              <p>
                To cut through the noise of an oversaturated market by delivering uncompromising, authoritative perspectives on the medium. We strip away the superficial metrics and focus on narratives, mechanics, and the raw emotional impact of interactive art.
              </p>
              <p>
                Our platform is engineered for focus. The theater-dark aesthetic isn't just a stylistic choice; it's a functional environment designed to let the content breathe, command attention, and pull you directly into the worlds these creators have meticulously built.
              </p>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-brand-red/5 blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1592155931584-901ac15763e3?q=80&w=2075&auto=format&fit=crop" 
              className="relative w-full aspect-[4/3] object-cover rounded-sm border border-white/5 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
              alt="Controller"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Editorial Standards */}
      <section className="py-24 px-6 md:px-24 bg-[#0a0a0a]">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-display uppercase tracking-[0.2em] text-white">Editorial Standards</h2>
          <div className="w-16 h-0.5 bg-brand-red mx-auto mt-6"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {standards.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-12 bg-[#111] border border-white/5 rounded-sm hover:border-brand-red/30 transition-all group flex flex-col ${
                i === 0 || i === 3 ? 'md:col-span-2' : 'md:col-span-1'
              }`}
            >
              <div className="mb-10 w-12 h-12 flex items-start justify-start group-hover:scale-110 transition-transform duration-300">
                {s.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-display uppercase tracking-wider text-white">{s.title}</h3>
                <p className="text-gamex-neutral leading-relaxed font-sans text-sm md:text-base opacity-70 group-hover:opacity-100 transition-opacity">{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-32 px-6 md:px-24 bg-black overflow-hidden">
        <h2 className="text-4xl font-display uppercase tracking-tight text-white mb-20">Leadership</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative grayscale hover:grayscale-0 transition-all duration-1000"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <img 
              src="/src/assets/images/regenerated_image_1778829241997.png" 
              className="w-full aspect-square object-cover rounded-sm border border-white/10"
              alt="Elias Vance"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-6xl md:text-8xl font-display uppercase text-white leading-none">Elias Vance</h3>
              <p className="text-brand-red text-sm font-bold uppercase tracking-[0.4em]">Editor in Chief</p>
            </div>
            <div className="space-y-6 text-gamex-neutral leading-relaxed font-sans text-lg">
              <p>
                Elias Vance brings over two decades of critical gaming journalism to GAMEX. With a background in film theory and interactive media, he has spent his career dismantling the barrier between games and traditional art forms. His editorial vision is defined by a ruthless demand for quality and a deep appreciation for auteur-driven narratives.
              </p>
              <p>
                Before founding GAMEX, Elias served as the lead cultural critic at several premier digital publications, where he pioneered long-form analytical reviews that treated game mechanics as storytelling devices. At GAMEX, he oversees all editorial direction, ensuring that every piece of content meets our uncompromising standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

