'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  Laptop,
  BookOpen,
  Dumbbell,
  Coffee,
  Code,
  Droplets,
  Layers,
} from 'lucide-react';
import { TiltCard } from './TiltCard';

interface StatementSectionProps {
  onOpenAiStudio: () => void;
}

export default function StatementSection({ onOpenAiStudio }: StatementSectionProps) {
  const lifestyleCards = [
    { title: 'Study DSA', icon: Code, time: '2h Focus' },
    { title: 'Clean Workspace', icon: Coffee, time: '15m Habit' },
    { title: 'Morning Gym', icon: Dumbbell, time: '1h Session' },
    { title: 'Deep Coding', icon: Laptop, time: '3h Block' },
    { title: 'Track Hydration', icon: Droplets, time: '8 Glasses' },
    { title: 'Read 10 Pages', icon: BookOpen, time: '20m Daily' },
    { title: 'System Architecture', icon: Layers, time: '90m Commit' },
  ];

  const marqueeItems = [
    ...lifestyleCards,
    ...lifestyleCards,
    ...lifestyleCards,
    ...lifestyleCards,
  ];

  return (
    <section
      id="desktop-widget"
      className="relative w-full pt-32 pb-24 bg-white text-slate-900 overflow-hidden z-10"
      style={{ contain: 'paint', isolation: 'isolate' }}
    >
      {/* 1. Header */}
      <div className="w-full max-w-5xl mx-auto px-6 text-center relative z-20 mb-12">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
            hidden: {},
          }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.15]"
        >
          {['Stay', 'in', 'flow.'].map((word, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
            className="font-serif italic font-normal text-emerald-600 block sm:inline"
          >
            Never lose momentum.
          </motion.span>
        </motion.h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
          Build steady daily commits with a layout that keeps your mornings, deep work, and goals simple to follow.
        </p>
      </div>

      {/* 2. Marquee Stage */}
      <div className="relative w-full flex items-center justify-center min-h-[540px] md:min-h-[580px] overflow-hidden">
        {/* Full-width track with balanced edge masks */}
        <div
          className="absolute inset-x-0 w-full overflow-hidden pointer-events-none z-10 flex flex-col gap-6 py-4"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
        >
          {/* Row 1: Leftward continuous scroll (Pure CSS Keyframe) */}
          <div className="flex gap-5 w-max animate-marquee-left pointer-events-auto">
            {marqueeItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={`row1-${idx}`}
                  className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl min-w-[240px] text-white opacity-90 backdrop-blur-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-950 text-emerald-400 flex items-center justify-center border border-white/10 shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-white whitespace-nowrap">{item.title}</h4>
                    <span className="text-xs text-slate-400 font-medium">{item.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Row 2: Rightward continuous scroll (Pure CSS Keyframe) */}
          <div className="flex gap-5 w-max animate-marquee-right pointer-events-auto">
            {marqueeItems.slice().reverse().map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={`row2-${idx}`}
                  className="flex items-center gap-3.5 px-6 py-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl min-w-[240px] text-white opacity-90 backdrop-blur-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-950 text-indigo-400 flex items-center justify-center border border-white/10 shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-white whitespace-nowrap">{item.title}</h4>
                    <span className="text-xs text-slate-400 font-medium">{item.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Center Widescreen Showcase */}
        <div className="relative z-20 w-full max-w-[780px] px-4 sm:px-0">
          <TiltCard maxTilt={8}>
            <div className="w-full aspect-[16/9] rounded-[32px] overflow-hidden shadow-2xl border border-slate-800 bg-black flex items-center justify-center ring-1 ring-white/10">
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=mhtmlnk8&public_id=Dashboard_interface_animation_wi__1080p_20261015154346_gwr_video_mvp&autoplay=true&loop=true&muted=true&controls=false"
                className="w-full h-full border-0 object-cover scale-[1.01]"
                allow="autoplay; fullscreen"
                title="Dashboard Interface Animation"
              />
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}