'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

// Deterministic number formatter
function formatCommas(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Custom fast snappy count-up ticker
function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const startCount = () => {
    if (hasStarted) return;
    setHasStarted(true);
    let startTime: number | null = null;
    const duration = 550; // 550ms snappy duration

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic curve
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(step);
  };

  return (
    <motion.span
      onViewportEnter={startCount}
      viewport={{ once: false, amount: 0.2 }}
    >
      {prefix}
      {target > 999 ? formatCommas(count) : count}
      {suffix}
    </motion.span>
  );
}

export default function GlobalScaleSection() {
  const headlineWords = "How people stay consistent over time.".split(" ");

  return (
    <section id="metrics" className="py-24 bg-[#070D1F] text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-500/10 blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-4 text-center relative z-10"
      >
        {/* Header with Word Typing / Stagger Reveal Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
              hidden: {},
            }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
          >
            {headlineWords.map((word, i) => (
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
          </motion.h2>
        </motion.div>

        {/* Giant Animated Gradient Counter (0 -> 62,840+) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          whileInView={{ scale: 1, opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-500 bg-clip-text text-transparent">
            <AnimatedCounter target={62840} suffix="+" />
          </div>
        </motion.div>

        {/* Badge below counter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-white/10 text-xs sm:text-sm font-semibold text-slate-300 mb-12"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>commits logged last month</span>
        </motion.div>

        {/* Photorealistic Earth Rotation Video Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-4xl mx-auto mb-14"
        >
          <div className="relative w-full h-[540px] sm:h-[580px] rounded-[36px] overflow-hidden bg-black border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.8)] flex items-center justify-center">
            <iframe
              src="https://player.cloudinary.com/embed/?cloud_name=mhtmlnk8&public_id=Planet_Earth_rotating_in_space_20261016224402_gwr_video_mvp&autoplay=true&loop=true&muted=true&controls=false"
              className="w-full h-full border-0 object-cover scale-[1.08] pointer-events-none"
              allow="autoplay; fullscreen"
              title="Planet Earth Rotating in Space"
            />
          </div>
        </motion.div>

        {/* 3-Column Stat Ticker Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8 border-t border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 text-left"
          >
            <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 mb-2">
              <AnimatedCounter target={87} suffix="%" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Faster Daily Task Execution</h4>
            <p className="text-xs text-slate-400">
              Users cut morning setup delay from 45m down to 6m using pinned widgets.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 text-left"
          >
            <div className="text-4xl sm:text-5xl font-extrabold text-indigo-400 mb-2">
              <AnimatedCounter target={46} />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Focus Sessions / User / Month</h4>
            <p className="text-xs text-slate-400">
              An average of 46 deep 45-minute focus sprints logged per active subscriber.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 text-left"
          >
            <div className="text-4xl sm:text-5xl font-extrabold text-teal-400 mb-2">
              <AnimatedCounter target={32} suffix="+" />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">Countries with Active Builders</h4>
            <p className="text-xs text-slate-400">
              From San Francisco to Tokyo, syncing tasks seamlessly across timezones.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
