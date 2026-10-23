'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { Play, Flame, CheckCircle2, Sparkles, ArrowRight, Clock } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { SpotlightCard } from './SpotlightCard';

interface HeroSectionProps {
  onOpenDemo: () => void;
  onOpenAiStudio: () => void;
}

export default function HeroSection({ onOpenDemo, onOpenAiStudio }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const widgetScale = useTransform(scrollYProgress, [0, 0.45], [1, 1.05]);

  const wordsRow1 = [
    { text: 'Commitment', isGradient: true, isSerif: false },
    { text: 'is', isGradient: false, isSerif: false },
    { text: 'what', isGradient: false, isSerif: false },
    { text: 'transforms', isGradient: false, isSerif: false },
  ];

  const wordsRow2 = [
    { text: 'a', isGradient: false, isSerif: false },
    { text: 'promise', isGradient: false, isSerif: false },
    { text: 'into', isGradient: false, isSerif: false },
    { text: 'a', isGradient: false, isSerif: false },
    { text: 'reality.', isGradient: false, isSerif: true },
  ];

  const wordContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const wordItemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 220,
        damping: 20,
      },
    },
  };

  return (
    <section ref={sectionRef} id="overview" className="relative w-full min-h-screen pt-32 pb-44 overflow-hidden bg-[#070D1F] flex flex-col items-center justify-between text-white">
      {/* 1. Ambient Background Video Canvas (Cloudinary Embed with continuous autoplay & zero controls) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <iframe
          src="https://player.cloudinary.com/embed/?cloud_name=mhtmlnk8&public_id=Young_man_working_and_exercising_20261015162028_gwr_video_mvp&autoplay=true&loop=true&muted=true&controls=false"
          className="w-full h-full border-0 object-cover scale-[1.3] pointer-events-none"
          allow="autoplay; fullscreen"
          title="Young Man Working and Exercising"
        />
      </div>

      {/* 2. Rich Obsidian Overlay (55% Opacity for Crisp Text Legibility) */}
      <div className="absolute inset-0 bg-[#070D1F]/55 backdrop-blur-[0.5px] z-10 pointer-events-none" />

      {/* Vignette & soft top/bottom blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070D1F]/60 via-transparent to-[#070D1F]/70 z-10 pointer-events-none" />

      {/* Subtle brand glow accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-emerald-500/15 via-indigo-600/15 to-transparent blur-[120px] rounded-full pointer-events-none z-10" />

      {/* 3. Main Content Container (Bi-directional viewport trigger) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-20 w-full max-w-[1380px] mx-auto px-6 text-center flex flex-col items-center mt-6 sm:mt-10"
      >
        {/* Headline formatted into 2 clean lines with word stagger typing effect */}
        <motion.h1
          variants={wordContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          style={{ fontFamily: '"SF Pro Display", "SF Pro", -apple-system, BlinkMacSystemFont, sans-serif' }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.14] max-w-5xl mx-auto mb-5 text-center flex flex-col items-center gap-1.5"
        >
          {/* Row 1 */}
          <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            {wordsRow1.map((w, idx) => (
              <motion.span
                key={`r1-${idx}`}
                variants={wordItemVariants}
                className={
                  w.isGradient
                    ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent inline-block'
                    : 'inline-block text-white'
                }
              >
                {w.text}
              </motion.span>
            ))}
          </span>

          {/* Row 2 */}
          <span className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            {wordsRow2.map((w, idx) => (
              <motion.span
                key={`r2-${idx}`}
                variants={wordItemVariants}
                className={
                  w.isSerif
                    ? 'font-serif italic font-normal text-emerald-300 inline-block'
                    : 'inline-block text-white'
                }
              >
                {w.text}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        {/* Subtitle - Bi-directional reveal */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-3 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-9"
        >
          Your desktop widget and mobile companion that schedules your tasks, tracks your 30-day commit heatmap, and keeps your goals in sight.
        </motion.p>

        {/* Native Desktop Download CTA Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="flex flex-col items-center justify-center gap-4 mb-16 z-30 relative"
        >
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            {/* Primary Action: White Pill "Download Now" */}
            <Link
              href="/download"
              className="px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-base shadow-xl hover:bg-slate-100 transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
            >
              <span>Download Now</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </Link>

            {/* Watch Demo Button */}
            <button
              onClick={onOpenDemo}
              className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md text-white font-semibold text-base transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>Watch demo</span>
            </button>
          </div>
        </motion.div>

        {/* Hero Interactive Showcase (3-Part Wide Cluster with 3D Spring Tilt & Glare) */}
        <div className="relative w-full max-w-[1320px] mx-auto mt-12 sm:mt-16 pb-16 flex items-center justify-center">
          {/* Left Flank Card with 3D Tilt */}
          <div className="hidden lg:block absolute -left-8 xl:-left-16 bottom-12 z-20 w-72">
            <TiltCard maxTilt={10}>
              <SpotlightCard className="rounded-3xl">
                <motion.div
                  initial={{ opacity: 0, x: -40, rotate: -6 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -3 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                  whileHover={{ rotate: 0, scale: 1.04 }}
                  className="p-5 rounded-3xl backdrop-blur-3xl bg-slate-900/80 border border-white/25 shadow-[0_12px_40px_0_rgba(0,0,0,0.5),0_0_24px_rgba(255,255,255,0.08)] text-left transition-all duration-300 hover:border-emerald-500/50"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Flame className="w-5 h-5 fill-amber-400" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block">Consistency</span>
                      <h4 className="text-sm font-bold text-white">12-Day Streak</h4>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300">
                    Commitment unlocked 🔥 Full green row achieved across Morning & Deep Work.
                  </p>
                  <div className="mt-3 flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                      <span key={i} className="flex-1 h-1.5 rounded-full bg-emerald-500" />
                    ))}
                  </div>
                </motion.div>
              </SpotlightCard>
            </TiltCard>
          </div>

          {/* Center Main Card: Today's Workflow Desktop Widget with 3D Mouse Tilt and Apple-style Scroll Zoom */}
          <motion.div
            style={{ scale: widgetScale }}
            className="relative z-10 w-full max-w-2xl md:max-w-3xl flex justify-center"
          >
            <TiltCard className="w-full" maxTilt={12}>
              <SpotlightCard className="rounded-3xl w-full">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.9, delay: 0.25 }}
                  className="p-6 sm:p-8 rounded-3xl backdrop-blur-3xl bg-slate-900/80 border border-white/25 shadow-[0_16px_48px_0_rgba(0,0,0,0.6),0_0_30px_rgba(255,255,255,0.1)] text-left transition-all duration-300 hover:border-emerald-500/50"
                >
              {/* Widget Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  {/* Brand Bars Mini */}
                  <div className="flex items-end gap-1 h-4">
                    <span className="w-1 h-2 rounded-xs bg-indigo-500" />
                    <span className="w-1 h-3 rounded-xs bg-indigo-600" />
                    <span className="w-1 h-4 rounded-xs bg-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">Today&apos;s Workflow</h3>
                    <span className="text-[11px] sm:text-xs text-slate-400">Wednesday, 16 Sep • Always-On Desktop Widget</span>
                  </div>
                </div>

                {/* Progress Ring Badge */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold text-emerald-400">76% Today</span>
                </div>
              </div>

              {/* Task Rows */}
              <div className="py-4 space-y-2.5">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-white block">Study DSA (Graphs & Heap)</span>
                      <span className="text-[10px] sm:text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" /> 09:00 - 11:00 AM • Deep Work
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    Done
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-emerald-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-white block">Work on Project Commit</span>
                      <span className="text-[10px] sm:text-xs text-slate-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-400" /> 11:30 AM - 01:00 PM • Active
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-300 bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-emerald-400/30 animate-pulse">
                    Now
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5 opacity-80">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border border-slate-600" />
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-300 block">Gym & Evening Reset</span>
                      <span className="text-[10px] sm:text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" /> 05:00 - 06:00 PM • Planned
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] sm:text-xs text-slate-400">Scheduled</span>
                </div>
              </div>

              {/* Bottom Status bar */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <strong className="text-white">12 Day Streak</strong>
                </span>
                <button
                  onClick={onOpenAiStudio}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Smart Adjust</span>
                </button>
              </div>
            </motion.div>
          </SpotlightCard>
        </TiltCard>
      </motion.div>

          {/* Right Flank Card with 3D Tilt */}
          <div className="hidden lg:block absolute -right-8 xl:-right-16 bottom-8 z-20 w-72">
            <TiltCard maxTilt={10}>
              <SpotlightCard className="rounded-3xl">
                <motion.div
                  initial={{ opacity: 0, x: 40, rotate: 6 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                  whileHover={{ rotate: 0, scale: 1.04 }}
                  className="p-5 rounded-3xl backdrop-blur-3xl bg-slate-900/80 border border-white/25 shadow-[0_12px_40px_0_rgba(0,0,0,0.5),0_0_24px_rgba(255,255,255,0.08)] text-left transition-all duration-300 hover:border-emerald-500/50"
                >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white">Today&apos;s Goal</span>
                  <span className="text-[11px] font-semibold text-emerald-400">4/5 Tasks Done</span>
                </div>

                {/* 3 Mini Circular Progress Gauges */}
                <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs font-extrabold text-emerald-400">92%</span>
                    <span className="text-[9px] text-slate-400 block">Focus</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs font-extrabold text-indigo-400">76%</span>
                    <span className="text-[9px] text-slate-400 block">Today</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-xs font-extrabold text-teal-400">100%</span>
                    <span className="text-[9px] text-slate-400 block">Streak</span>
                  </div>
                </div>

                {/* Mini 5x7 Green GitHub-Style Commit Matrix */}
                <div className="pt-2 border-t border-white/10">
                  <span className="text-[10px] text-slate-400 block mb-1.5">30-Day Commit Grid</span>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 28 }).map((_, i) => {
                      const level = (i * 7 + 3) % 4;
                      const bg =
                        level === 3
                          ? 'bg-emerald-400'
                          : level === 2
                          ? 'bg-emerald-600'
                          : level === 1
                          ? 'bg-emerald-900/60'
                          : 'bg-slate-800';
                      return <div key={i} className={`w-full aspect-square rounded-xs ${bg}`} />;
                    })}
                  </div>
                </div>
              </motion.div>
            </SpotlightCard>
          </TiltCard>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
