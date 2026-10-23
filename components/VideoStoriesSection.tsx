'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Star, Quote, CheckCircle2 } from 'lucide-react';

interface VideoStoriesSectionProps {
  onOpenDemo: () => void;
}

export default function VideoStoriesSection({ onOpenDemo }: VideoStoriesSectionProps) {
  const [playingCard, setPlayingCard] = useState<number | null>(1);
  const [isMuted, setIsMuted] = useState(true);

  const videoStories = [
    {
      id: 0,
      user: 'Priya K.',
      title: 'How I balanced DSA prep & thesis writing',
      time: '0:14',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bgImg: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
      streak: '48 Days',
    },
    {
      id: 1,
      user: 'Marcus Chen',
      title: 'My dual-screen setup with LifeCommit Desktop',
      time: '0:14',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      bgImg: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80',
      streak: '72 Days',
    },
    {
      id: 2,
      user: 'Elena Rostova',
      title: 'Why I stopped using bloated Notion habit boards',
      time: '0:14',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      bgImg: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
      streak: '30 Days',
    },
  ];

  const testimonials = [
    {
      name: 'Alexander Vogt',
      role: 'Staff Infrastructure Engineer',
      quote:
        'The always-visible desktop widget replaced three different apps for me. My coding consistency hit 94% without feeling like a chore.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Sophia Patel',
      role: 'Mechanical Engineering Student',
      quote:
        'The GitHub-style heatmap is addictive in the best way. Getting all green boxes across my study blocks became my daily victory ritual.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Lucas Wright',
      role: 'Product Designer',
      quote:
        'The UI craftsmanship is out of this world. It looks like Apple designed a commit tracker. The Light/Dark theme transitions are buttery smooth.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Hana Takahashi',
      role: 'Full-Stack Developer & Freelancer',
      quote:
        'The smart conflict reminders saved me today when a standup dragged on. It shifted my gym block and kept my evening clean.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Devon Miller',
      role: 'Indie SaaS Founder',
      quote:
        'Sync between desktop and mobile is instantaneous. I tick off my morning walk on the street, and my desk display is already green.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Chloe Zhang',
      role: 'Data Scientist',
      quote:
        'The Contribution Gap detection is a game-changer. It caught my mid-week fatigue before I dropped my streak entirely.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <section className="py-24 bg-[#070D1F] text-slate-100 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-4 relative z-10"
      >
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            How people use LifeCommit every day.
          </h2>
        </div>

        {/* 3-Card Vertical Video Story Slider (Center card scaled larger) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-5xl mx-auto mb-20">
          {videoStories.map((story) => {
            const isCenter = story.id === 1;
            const isThisPlaying = playingCard === story.id;

            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 35, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.7, delay: story.id * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-3xl overflow-hidden shadow-2xl bg-slate-950 text-white flex flex-col justify-center transition-all ${
                  isCenter
                    ? 'h-[460px] md:scale-105 z-20 border-2 border-emerald-500/40 shadow-emerald-500/10'
                    : 'h-[400px] border border-white/10'
                }`}
              >
                {/* Background Simulation Image */}
                <Image
                  src={story.bgImg}
                  alt={story.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />

                {/* Center Big Play Button if paused */}
                <div className="relative z-10 flex items-center justify-center">
                  <button
                    onClick={() => {
                      setPlayingCard(isThisPlaying ? null : story.id);
                      if (!isThisPlaying) onOpenDemo();
                    }}
                    className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center pl-1 transition-transform hover:scale-110 shadow-xl cursor-pointer"
                  >
                    {isThisPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white" />}
                  </button>
                </div>

                {/* Bottom Story Title & Controls */}
                <div className="relative z-10 p-5">
                  <h4 className="text-sm font-bold text-white mb-2 leading-snug">{story.title}</h4>

                  {/* Playback bar & controls */}
                  <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/10">
                    <span className="font-mono text-[11px] text-emerald-400">
                      {isThisPlaying ? '0:06 / 0:14' : `0:00 / ${story.time}`}
                    </span>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Masonry Grid: 6 Translucent Frosted Glass Testimonial Cards */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
            Real Feedback
          </span>
          <h3 className="text-2xl font-bold text-white">Loved by high-output creators</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.4)] flex flex-col justify-between hover:border-emerald-500/40 transition-all text-left"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex text-amber-400 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/20">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={36}
                    height={36}
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{t.name}</h4>
                  <span className="text-[10px] text-slate-400">{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
