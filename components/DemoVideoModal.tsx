'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, CheckCircle2 } from 'lucide-react';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoVideoModal({ isOpen, onClose }: DemoVideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(30);

  const steps = [
    {
      title: '1. Pinning the Always-On Desktop Widget',
      desc: 'Floating seamlessly in the corner of macOS or Windows. Never alt-tab to check today’s goals.',
      highlight: 'Widget Mode: Compact Glass',
    },
    {
      title: '2. GitHub-Style 30-Day Commit Heatmap',
      desc: 'Every task done lights up emerald squares. 4+ tasks qualifies as a Strong Day.',
      highlight: 'Streak: 12 Days 🔥 • 92% Focus',
    },
    {
      title: '3. Real-Time Conflict Alerts & AI Rescheduling',
      desc: 'Meeting runs late? AI automatically shifts your Gym or Deep Work slot with one tap.',
      highlight: 'Schedule Conflict Solved',
    },
    {
      title: '4. Instant Mobile Sync with Offline Cache',
      desc: 'Check off tasks on your iPhone or Android on the commute; desktop updates within 300ms.',
      highlight: 'Zero Latency P2P Sync',
    },
  ];

  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentStep((s) => (s + 1) % steps.length);
          return 0;
        }
        return prev + 2;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, steps.length]);

  if (!isOpen) return null;

  const current = steps[currentStep];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.93 }}
          className="relative w-full max-w-3xl rounded-3xl bg-[#090D16] border border-white/15 shadow-2xl overflow-hidden flex flex-col text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">LifeCommit Walkthrough Demo</span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Player Screen */}
          <div className="relative aspect-video w-full bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
            <video
              src="https://res.cloudinary.com/mhtmlnk8/video/upload/v1792070180/Life_Commit.mp4"
              autoPlay
              loop
              controls
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://res.cloudinary.com/mhtmlnk8/video/upload/v1792070180/Life_Commit.mp4" type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </div>

          {/* Controls Bar */}
          <div className="p-4 bg-slate-900 border-t border-white/10 space-y-3">
            {/* Scrub bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 transition-all duration-150"
                style={{ width: `${((currentStep * 100) + progress) / steps.length}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <span className="text-slate-400 font-mono text-[11px]">0:{currentStep * 5 + Math.floor(progress / 20)} / 0:20</span>
              </div>

              {/* Step indicator pills */}
              <div className="flex items-center gap-1.5">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentStep(i);
                      setProgress(0);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentStep === i ? 'w-5 bg-emerald-400' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
