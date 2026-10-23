'use client';

import React from 'react';
import { motion } from 'motion/react';
import { XCircle, CheckCircle2, Zap, Hourglass } from 'lucide-react';
import { TiltCard } from './TiltCard';

export default function VelocityComparisonSection() {
  return (
    <section className="relative w-full py-20 bg-[#070D1F] text-white overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Designed for velocity.{' '}
            <span className="font-serif italic font-normal text-emerald-300">
              Zero context churn.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
            Habit apps that require opening a browser tab fail under real sprint pressure. LifeCommit stays pinned right where you work.
          </p>
        </motion.div>

        {/* 2-Card Comparative Velocity Grid (Wispr Flow 45 WPM vs 220 WPM Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-stretch">
          {/* Card 1: Traditional Notion / Web Trackers */}
          <TiltCard maxTilt={8}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 sm:p-10 rounded-[32px] bg-slate-900/60 border border-white/5 opacity-70 hover:opacity-90 transition-opacity flex flex-col justify-between h-full text-left backdrop-blur-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-400" />
                    Traditional Web &amp; Notion Boards
                  </span>
                </div>

                <div className="mb-2">
                  <h3 className="text-xl font-bold text-slate-200 mb-1">Context Churn</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-5xl sm:text-6xl font-black text-slate-400 tracking-tight font-mono">
                      42 min
                    </span>
                    <span className="text-xs text-slate-400 font-medium">avg delay to first deep work block</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-4 border-t border-white/5">
                  Tab overload, manual habit entry, forgotten browser tabs, and broken streaks during sprint crunches.
                </p>
              </div>

              {/* Friction metrics breakdown */}
              <div className="pt-6 mt-6 border-t border-white/5 grid grid-cols-2 gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Hourglass className="w-3.5 h-3.5 text-slate-400" />
                  <span>14+ clicks per day</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>Lost behind browser tabs</span>
                </div>
              </div>
            </motion.div>
          </TiltCard>

          {/* Card 2: LifeCommit Native Desktop Widget */}
          <TiltCard maxTilt={10}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 sm:p-10 rounded-[32px] bg-[#090D16] border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col justify-between h-full text-left relative overflow-hidden ring-1 ring-white/10"
            >
              {/* Subtle emerald top corner flare */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    LifeCommit Native Desktop Engine
                  </span>
                </div>

                <div className="mb-2 relative z-10">
                  <h3 className="text-xl font-bold text-white mb-1">Pinned Desktop Velocity</h3>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-5xl sm:text-6xl font-black text-emerald-400 tracking-tight font-mono">
                      3.5x
                    </span>
                    <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                      Faster daily start (&lt; 4m startup)
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-4 border-t border-white/10 relative z-10">
                  Always floating on macOS menu bar or Windows desktop. Zero alt-tabbing, instantaneous check-off, and hardware-accelerated local persistence.
                </p>
              </div>

              {/* Velocity advantages */}
              <div className="pt-6 mt-6 border-t border-white/10 grid grid-cols-2 gap-3 text-xs text-slate-300 relative z-10">
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">1 global hotkey</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Sub-20ms instant sync</span>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
