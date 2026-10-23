'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Flame,
  Shield,
  Sliders,
} from 'lucide-react';
import { TiltCard } from './TiltCard';

interface BentoSectionProps {
  onOpenAiStudio: () => void;
}

export default function BentoSection(_props: BentoSectionProps) {
  const [gapTracking, setGapTracking] = useState(true);
  const [weekendFlex, setWeekendFlex] = useState(true);

  return (
    <section id="bento-grid" className="relative py-24 bg-[#F8FAFC] text-slate-900 overflow-hidden">
      {/* Soft gradient mesh to eliminate empty white space */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-gradient-to-br from-emerald-100/40 via-teal-50/20 to-transparent blur-3xl rounded-full pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-gradient-to-tr from-indigo-100/30 via-slate-100/40 to-transparent blur-3xl rounded-full pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header with Bi-directional Scroll Trigger & Word Stagger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18]"
            >
              Built around{' '}
              <span className="font-serif italic font-normal text-emerald-600">
                how you engineer
              </span>
              , not how apps want you to.
            </motion.h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-md leading-relaxed">
            LifeCommit brings clarity to your desktop and phone with live widgets, GitHub-style commit grids, and AI scheduling.
          </p>
        </motion.div>

        {/* 2-Column Responsive Bento Layout with 3D Tilt Physics */}
        <div id="desktop-widget-bento" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* ========================================================
              LEFT COLUMN (lg:col-span-5):
              Wider 12-Day Streak Card with Rich Internal Padding
          ======================================================== */}
          <TiltCard className="lg:col-span-5" maxTilt={10}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02, y: -4, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
              className="p-8 rounded-[32px] bg-white border border-slate-200/80 shadow-xl flex flex-col justify-between transition-all duration-300 h-full"
            >
              <div>
                {/* Flame Counter */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-inner shrink-0">
                    <Flame className="w-7 h-7 fill-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      12 Day Streak Active
                    </h3>
                    <p className="text-xs text-slate-500">
                      No harsh resets. Intelligent buffer allows 1 flex-day per sprint.
                    </p>
                  </div>
                </div>

                {/* Row of 5 Daily Circular Status Indicators */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 mb-4">
                  <span className="text-xs font-semibold text-slate-700 block mb-2.5">
                    This Week&apos;s Commitment States:
                  </span>
                  <div className="grid grid-cols-5 gap-1.5 text-center">
                    <div className="p-1.5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col items-center">
                      <span className="text-[10px] text-slate-500 font-semibold mb-1">Mon</span>
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </div>
                    </div>

                    <div className="p-1.5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col items-center">
                      <span className="text-[10px] text-slate-500 font-semibold mb-1">Tue</span>
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </div>
                    </div>

                    <div className="p-1.5 rounded-xl bg-amber-50 border border-amber-200 shadow-xs flex flex-col items-center">
                      <span className="text-[10px] text-amber-800 font-semibold mb-1">Wed</span>
                      <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">
                        ⟳
                      </div>
                    </div>

                    <div className="p-1.5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col items-center">
                      <span className="text-[10px] text-slate-500 font-semibold mb-1">Thu</span>
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </div>
                    </div>

                    <div className="p-1.5 rounded-xl bg-indigo-50 border border-indigo-200 shadow-xs flex flex-col items-center">
                      <span className="text-[10px] text-indigo-800 font-semibold mb-1">Fri</span>
                      <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                        ●
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Toggle Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setGapTracking(!gapTracking)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                    gapTracking
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-300'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Gap Tracking {gapTracking ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={() => setWeekendFlex(!weekendFlex)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                    weekendFlex
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-300'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Weekend Flex {weekendFlex ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </motion.div>
          </TiltCard>

          {/* ========================================================
              RIGHT COLUMN (lg:col-span-7):
              Frameless Curved Lifestyle Product Video
          ======================================================== */}
          <TiltCard className="lg:col-span-7 h-full" maxTilt={8}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.01, y: -4, boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.25)' }}
              className="relative rounded-[32px] overflow-hidden border border-slate-200 shadow-2xl bg-black min-h-[420px] h-full flex items-center justify-center group"
            >
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=mhtmlnk8&public_id=Young_man_working_and_exercising_20261015162028_gwr_video_mvp&autoplay=true&loop=true&muted=true&controls=false"
                className="w-full h-full min-h-[420px] object-cover border-0 pointer-events-none scale-[1.35]"
                allow="autoplay; fullscreen"
                title="LifeCommit Lifestyle Showcase"
              />
              {/* Subtle bottom-up ambient gradient overlay for aesthetic polish */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none flex items-end justify-between text-white w-full">
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight">Daily Sprint &amp; Deep Work Rhythm</h4>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">Synchronized between desktop widget and physical workout commitment.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-bold shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Always Live</span>
                </div>
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
