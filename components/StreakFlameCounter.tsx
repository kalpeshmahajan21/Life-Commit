'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Sparkles, Trophy, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';

interface StreakFlameCounterProps {
  className?: string;
}

const MILESTONES = [7, 30, 100];

export default function StreakFlameCounter({ className = '' }: { className?: string }) {
  const [streakDays, setStreakDays] = useState<number>(12);
  const [showPopover, setShowPopover] = useState(false);
  const [animatingMilestone, setAnimatingMilestone] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Safely hydrate from sessionStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = sessionStorage.getItem('lifecommit_user_streak');
        if (stored) {
          setStreakDays(parseInt(stored, 10) || 12);
        }
      } catch {
        // Fallback
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const updateStreak = (newStreak: number) => {
    setStreakDays(newStreak);
    try {
      sessionStorage.setItem('lifecommit_user_streak', newStreak.toString());
    } catch {
      // Ignore
    }

    // Check if hit milestone
    if (MILESTONES.includes(newStreak)) {
      triggerMilestoneAnimation(newStreak);
    }
  };

  const triggerMilestoneAnimation = (milestone: number) => {
    setAnimatingMilestone(milestone);
    if (milestone === 7) {
      setToastMessage('🔥 7-Day Sprint Unlocked!');
    } else if (milestone === 30) {
      setToastMessage('🌟 30-Day Consistency Master!');
    } else if (milestone === 100) {
      setToastMessage('🏆 100-Day Centurion Streak Achieved!');
    }

    setTimeout(() => {
      setAnimatingMilestone(null);
    }, 2800);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const incrementCommit = () => {
    const nextVal = streakDays + 1;
    updateStreak(nextVal);
  };

  // Flame color based on streak length
  const getFlameStyles = () => {
    if (streakDays >= 100) {
      return {
        bg: 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-500',
        text: 'text-amber-300',
        glow: 'shadow-[0_0_16px_rgba(245,158,11,0.6)] border-amber-400/50',
        badge: '100d Centurion',
      };
    }
    if (streakDays >= 30) {
      return {
        bg: 'bg-gradient-to-r from-amber-500 to-emerald-500',
        text: 'text-amber-400',
        glow: 'shadow-[0_0_14px_rgba(245,158,11,0.5)] border-amber-500/40',
        badge: '30d Master',
      };
    }
    if (streakDays >= 7) {
      return {
        bg: 'bg-amber-500',
        text: 'text-amber-400',
        glow: 'shadow-[0_0_10px_rgba(245,158,11,0.4)] border-amber-500/30',
        badge: '7d Sprint',
      };
    }
    return {
      bg: 'bg-slate-700',
      text: 'text-slate-300',
      glow: 'border-slate-700',
      badge: 'Active',
    };
  };

  const flameStyle = getFlameStyles();

  // Next milestone calculation
  const nextMilestone = MILESTONES.find((m) => m > streakDays) || 100;
  const prevMilestone = [...MILESTONES].reverse().find((m) => m <= streakDays) || 0;
  const progressPercent = Math.min(
    100,
    Math.round(((streakDays - prevMilestone) / (nextMilestone - prevMilestone)) * 100)
  );

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Toast Popup Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute top-12 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap px-4 py-2 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-xs shadow-2xl border border-amber-300 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Flame Counter Pill Button */}
      <motion.button
        onClick={() => setShowPopover(!showPopover)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all cursor-pointer bg-slate-900/90 text-white ${flameStyle.glow}`}
        title="Click to view & increment daily commit streak"
      >
        {/* Animated Flame Graphic */}
        <motion.div
          animate={
            animatingMilestone
              ? {
                  scale: [1, 1.4, 1.1, 1.3, 1],
                  rotate: [0, -15, 15, -10, 0],
                }
              : {
                  scale: [1, 1.08, 1],
                }
          }
          transition={
            animatingMilestone
              ? { duration: 1.2, repeat: 2 }
              : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          }
          className="relative flex items-center justify-center"
        >
          <Flame
            className={`w-4 h-4 ${
              streakDays >= 100
                ? 'fill-purple-400 text-amber-300'
                : streakDays >= 30
                ? 'fill-amber-400 text-emerald-300'
                : streakDays >= 7
                ? 'fill-amber-500 text-amber-400'
                : 'fill-slate-500 text-slate-400'
            }`}
          />
          {animatingMilestone && (
            <motion.span
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-amber-400/40 blur-xs"
            />
          )}
        </motion.div>

        {/* Counter Number */}
        <div className="flex items-baseline gap-1 font-mono font-extrabold text-xs">
          <span className={flameStyle.text}>{streakDays}</span>
          <span className="text-[10px] text-slate-400 font-sans font-semibold">d</span>
        </div>
      </motion.button>

      {/* Interactive Streak Popover Modal */}
      <AnimatePresence>
        {showPopover && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 left-0 z-50 w-72 p-4 rounded-3xl bg-slate-900/95 border border-white/15 backdrop-blur-2xl shadow-2xl text-white text-left"
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 fill-amber-500 text-amber-400" />
                <div>
                  <h4 className="text-xs font-bold">Streak Milestones</h4>
                  <span className="text-[10px] text-slate-400">Session Saved</span>
                </div>
              </div>
              <button
                onClick={() => setShowPopover(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded-full hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            {/* Current Progress to Next Milestone */}
            <div className="py-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300 font-semibold">
                  Progress to {nextMilestone} Days:
                </span>
                <span className="font-mono font-bold text-emerald-400">
                  {streakDays} / {nextMilestone}d
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.6 }}
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full"
                />
              </div>

              {/* Milestone Preset Chips */}
              <div className="pt-2">
                <span className="text-[10px] text-slate-400 block mb-1.5 font-medium">
                  Jump to Milestone Animation:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[7, 30, 100].map((m) => (
                    <button
                      key={m}
                      onClick={() => updateStreak(m)}
                      className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all border cursor-pointer ${
                        streakDays === m
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-amber-500/50 hover:text-white'
                      }`}
                    >
                      {m} Days
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Commit Today Action Button */}
            <div className="pt-3 border-t border-white/10 flex items-center gap-2">
              <button
                onClick={incrementCommit}
                className="w-full py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                <span>Log Today&apos;s Commit (+1d)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
