import React from 'react';
import { motion } from 'motion/react';
import { Zap, ShieldCheck, Theater, Flag } from 'lucide-react';

export default function About() {
  const standards = [
    {
      title: "Story & Gameplay First",
      description: "Every review I write starts in the same place how did the story land, and how did the game actually feel to play. Not the frame rate on a benchmark machine. Not the resolution on a spec sheet. How did it feel when I was in it. Those two things tell you more about a game than any technical breakdown ever will.",
      icon: <Zap className="text-brand-red" size={28} />
    },
    {
      title: "Finished, Not Skimmed",
      description: "I don't review games I haven't finished. Simple as that. You can't tell someone whether something is worth their time if you bailed at hour six. Every game on this site I played to the end good ending, bad ending, or painful drag to the credits.",
      icon: <ShieldCheck className="text-brand-red" size={28} />
    },
    {
      title: "Personal, Not Professional",
      description: "The moment a review starts sounding like it was written for a corporate quarterly report, it stops being useful. My reviews are based on my experience, my taste, and my honest reaction. I'm not calibrating my opinion to a metacritic aggregate. Take it or leave it but at least you know it's real.",
      icon: <Theater className="text-brand-red" size={28} />
    },
    {
      title: "Reviews Don't Expire, But I Might Revisit",
      description: "My review reflects how I felt about a game at the time I played it. That's the honest snapshot. I might go back to a game later after a big patch, after an expansion, after time changes how I see it and I'll write about that too. But the original score stays. That moment was real, and I'm not going to rewrite history.",
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
            src="/src/assets/images/abouthero.jpeg"
            className="w-full h-full object-cover opacity-90 brightness-80"
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
            WHAT'S GAMEX?
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gamex-neutral font-sans leading-relaxed max-w-2xl"
          >
            GAMEX is my personal space to talk about games I've actually played, finished, and formed a real opinion on. No press copies, no review embargoes, no word count to fill. Just me, the game, and however many hours it took to get to the credits. If I liked it, I'll tell you why. If it wasted my time, I'll tell you that too.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 px-6 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <h2 className="text-4xl font-display uppercase tracking-tight text-white">GAMEX Mission</h2>
            <div className="space-y-8 text-gamex-neutral leading-relaxed font-sans text-lg lg:text-xl">
              <p className="text-md">
                Most review sites sound like they're writing for an awards committee. I'm writing for people who actually play games or want to know if something is worth their weekend.
              </p>
              <p className="text-md">
                The mission here is simple: honest takes, finished games, zero glaze. I don't get paid to say something is good. So when I say it's good, I mean it.
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
          <h2 className="text-4xl font-display uppercase tracking-[0.2em] text-white">Review Standards</h2>
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
              className={`p-12 bg-[#111] border border-white/5 rounded-sm hover:border-brand-red/30 transition-all group flex flex-col ${i === 0 || i === 3 ? 'md:col-span-2' : 'md:col-span-1'
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
        <h2 className="text-4xl font-display uppercase tracking-tight text-white mb-20">Le Founder  </h2>
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
              src="/src/assets/images/me.jpg"
              className="w-full aspect-square object-cover rounded-sm border border-white/10"
              alt="Smoll Jester"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-6xl md:text-8xl font-display uppercase text-white leading-none">SMOLLJESTER</h3>
              <p className="text-brand-red text-sm font-bold uppercase tracking-[0.4em]">DEVELOPER & SOLE REVIEWER</p>
            </div>
            <div className="space-y-6 text-gamex-neutral leading-relaxed font-sans text-lg">
              <p>
                Muhammad Royhan Alfitra most people online know me as SmollJesteR.
                I've been gaming since I was seven years old. Fighting games, RPGs, action, FPS I don't lock into one genre. If it's good, I'll play it. If I finish it, I might write about it here. This site isn't a publication. There's no editorial team, no review committee, no sponsor to keep happy. It's just me documenting my honest experience with games I've spent real time on.
              </p>
              <p>
                If something on here helped you decide whether to play a game or saved you from wasting money on one then the site is doing its job. I ain't get paid enough to give you a false review.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

