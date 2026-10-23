'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Clock, Check, ArrowRight, Brain, Zap, Shield, RotateCcw } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

interface AiSuggestionsSectionProps {
  onOpenAiStudio: () => void;
}

export default function AiSuggestionsSection({ onOpenAiStudio }: AiSuggestionsSectionProps) {
  const [suggestionState, setSuggestionState] = useState<'pending' | 'approved' | 'snoozed'>('pending');

  return (
    <section id="smart-assist" className="py-28 bg-white text-slate-900 overflow-hidden relative border-t border-slate-200">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-gradient-to-r from-emerald-500/10 to-indigo-500/10 blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-4 relative z-10"
      >
        {/* Top 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 mb-6 leading-tight">
              AI suggestions that adjust to your day.
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              LifeCommit analyzes your sleep schedule, meeting overload, and historical focus peaks to protect your deep work. When a morning meeting overruns, it automatically suggests the optimal slot shift without breaking your streak.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenAiStudio}
                className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>See how AI scheduling works</span>
              </button>

              <button
                onClick={onOpenAiStudio}
                className="px-5 py-3 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
              >
                Try Live Assist
              </button>
            </div>
          </div>

          {/* Right Column: Tilted Phone Mockup with Floating Action Cards */}
          <div className="relative flex items-center justify-center">
            {/* Tilted Smartphone Frame */}
            <motion.div
              initial={{ opacity: 0, rotate: 6, y: 20 }}
              whileInView={{ opacity: 1, rotate: 3, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.8 }}
              className="relative w-[300px] sm:w-[320px] p-4 rounded-[40px] bg-slate-950 border-[5px] border-slate-800 shadow-2xl text-left"
            >
              {/* Dynamic Island */}
              <div className="w-20 h-3.5 bg-black rounded-full mx-auto mb-4" />

              <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 mb-4">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                  Chronobiology Analysis
                </span>
                <h4 className="text-xs font-bold text-white mb-2">Today&apos;s Peak Energy: 09:30 - 12:30</h4>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-indigo-500 w-4/5" />
                </div>
              </div>

              {/* Task list preview */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <span className="font-semibold text-white">09:30 AM • Core Coding</span>
                  <span className="text-emerald-400 text-[10px] font-bold">Optimal</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                  <span className="font-semibold text-amber-200">17:00 PM • Gym Session</span>
                  <span className="text-amber-400 text-[10px] font-bold">Suggested</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Action Card 1: Top Right */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 sm:right-0 z-20 w-64 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xl text-left"
            >
              <div className="flex items-center gap-2 mb-1 text-[11px] font-bold text-emerald-600">
                <Clock className="w-3.5 h-3.5" />
                <span>Better Timing Found</span>
              </div>
              <p className="text-[11px] text-slate-600 mb-2.5">
                Move Gym session to 17:00 to avoid late commute friction?
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSuggestionState('approved')}
                  className={`text-[10px] px-3 py-1 rounded-full font-bold transition-all ${
                    suggestionState === 'approved'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-950 text-white hover:bg-slate-800'
                  }`}
                >
                  {suggestionState === 'approved' ? '✓ Moved' : 'Approve'}
                </button>
                <button
                  onClick={() => setSuggestionState('snoozed')}
                  className="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"
                >
                  Later
                </button>
              </div>
            </motion.div>

            {/* Floating Action Card 2: Bottom Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 -left-4 sm:left-0 z-20 w-64 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xl text-left"
            >
              <div className="flex items-center gap-2 mb-1 text-[11px] font-bold text-indigo-600">
                <Brain className="w-3.5 h-3.5" />
                <span>Cognitive Load Optimization</span>
              </div>
              <p className="text-[11px] text-slate-600 mb-2.5">
                Add 30m System Design review before evening rest?
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Added to tomorrow morning slot!')}
                  className="text-[10px] px-3 py-1 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold"
                >
                  Try Tomorrow
                </button>
                <button
                  onClick={onOpenAiStudio}
                  className="text-[10px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"
                >
                  Details
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom 4-Column Feature Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-slate-200">
          {/* Pillar 1: Smart Timing (Blue Ring) */}
          <SpotlightCard className="rounded-3xl" spotlightColor="rgba(37, 99, 235, 0.1)">
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-lg transition-all flex flex-col items-start text-left h-full"
            >
              <div className="relative w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-full h-full -rotate-90" suppressHydrationWarning>
                  <circle cx="24" cy="24" r="20" stroke="#E2E8F0" strokeWidth="4" fill="none" />
                  <motion.circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#2563EB"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="125"
                    initial={{ strokeDashoffset: 125 }}
                    whileInView={{ strokeDashoffset: 28 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    strokeLinecap="round"
                  />
                </svg>
                <Clock className="w-4 h-4 text-blue-600 absolute" />
              </div>
              <h4 className="text-base font-bold text-slate-950 mb-1.5">Smart Timing</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Suggests the best hour for deep work based on circadian patterns and previous commit streaks.
              </p>
            </motion.div>
          </SpotlightCard>

          {/* Pillar 2: Task Priorities (Emerald Ring) */}
          <SpotlightCard className="rounded-3xl" spotlightColor="rgba(5, 150, 105, 0.1)">
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-lg transition-all flex flex-col items-start text-left h-full"
            >
              <div className="relative w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-full h-full -rotate-90" suppressHydrationWarning>
                  <circle cx="24" cy="24" r="20" stroke="#E2E8F0" strokeWidth="4" fill="none" />
                  <motion.circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#059669"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="125"
                    initial={{ strokeDashoffset: 125 }}
                    whileInView={{ strokeDashoffset: 18 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                    strokeLinecap="round"
                  />
                </svg>
                <Zap className="w-4 h-4 text-emerald-600 absolute" />
              </div>
              <h4 className="text-base font-bold text-slate-950 mb-1.5">Task Priorities</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reorders your workflow automatically when unexpected calls crowd your calendar.
              </p>
            </motion.div>
          </SpotlightCard>

          {/* Pillar 3: Contribution Gap (Indigo Ring) */}
          <SpotlightCard className="rounded-3xl" spotlightColor="rgba(79, 70, 229, 0.1)">
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.19, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-lg transition-all flex flex-col items-start text-left h-full"
            >
              <div className="relative w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-full h-full -rotate-90" suppressHydrationWarning>
                  <circle cx="24" cy="24" r="20" stroke="#E2E8F0" strokeWidth="4" fill="none" />
                  <motion.circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#4F46E5"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="125"
                    initial={{ strokeDashoffset: 125 }}
                    whileInView={{ strokeDashoffset: 35 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                    strokeLinecap="round"
                  />
                </svg>
                <Shield className="w-4 h-4 text-indigo-600 absolute" />
              </div>
              <h4 className="text-base font-bold text-slate-950 mb-1.5">Contribution Gap</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Detects emerging gaps in your 14-day grid and nudges low-friction micro-habits.
              </p>
            </motion.div>
          </SpotlightCard>

          {/* Pillar 4: Streak Recovery (Amber Ring) */}
          <SpotlightCard className="rounded-3xl" spotlightColor="rgba(217, 119, 6, 0.1)">
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-lg transition-all flex flex-col items-start text-left h-full"
            >
              <div className="relative w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-full h-full -rotate-90" suppressHydrationWarning>
                  <circle cx="24" cy="24" r="20" stroke="#E2E8F0" strokeWidth="4" fill="none" />
                  <motion.circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#D97706"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="125"
                    initial={{ strokeDashoffset: 125 }}
                    whileInView={{ strokeDashoffset: 42 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                    strokeLinecap="round"
                  />
                </svg>
                <RotateCcw className="w-4 h-4 text-amber-600 absolute" />
              </div>
              <h4 className="text-base font-bold text-slate-950 mb-1.5">Streak Recovery</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Never get punished for unavoidable sick days. Provides a 24-hour sprint to repair streaks safely.
              </p>
            </motion.div>
          </SpotlightCard>
        </div>
      </motion.div>
    </section>
  );
}
