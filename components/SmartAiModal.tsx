'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Zap,
  Image as ImageIcon,
  X,
  Send,
  Loader2,
  CheckCircle2,
  Command,
} from 'lucide-react';

interface SmartAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'coach' | 'image';
}

export default function SmartAiModal({ isOpen, onClose, defaultTab = 'coach' }: SmartAiModalProps) {
  const [activeTab, setActiveTab] = useState<'coach' | 'image'>(defaultTab);

  // Coach state
  const [coachPrompt, setCoachPrompt] = useState('');
  const [focusMode, setFocusMode] = useState<'deep_work' | 'circadian' | 'recovery'>('deep_work');
  const [coachResponse, setCoachResponse] = useState<string | null>(null);
  const [isCoachLoading, setIsCoachLoading] = useState(false);

  // Image state
  const [imagePrompt, setImagePrompt] = useState('Minimalist obsidian desktop widget wallpaper with subtle emerald commit nodes');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleCoachSubmit = async () => {
    if (!coachPrompt.trim()) return;
    setIsCoachLoading(true);
    setCoachResponse(null);
    try {
      const res = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: coachPrompt,
          mode: focusMode,
          currentHabits: [
            { name: 'Study DSA', time: '09:00 - 11:00', status: 'Completed' },
            { name: 'Core Project Work', time: '11:30 - 13:00', status: 'In Progress' },
            { name: 'Gym / Workout', time: '17:00 - 18:00', status: 'Scheduled' },
          ],
        }),
      });
      const data = await res.json();
      if (data.error) {
        setCoachResponse(`Error: ${data.error}`);
      } else {
        setCoachResponse(data.text);
      }
    } catch (e: any) {
      setCoachResponse(`Request failed: ${e.message}`);
    } finally {
      setIsCoachLoading(false);
    }
  };

  const handleImageSubmit = async () => {
    if (!imagePrompt.trim()) return;
    setIsImageLoading(true);
    setGeneratedImageUrl(null);
    try {
      const res = await fetch('/api/ai/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imagePrompt,
          aspectRatio,
        }),
      });
      const data = await res.json();
      if (data.imageUrl) {
        setGeneratedImageUrl(data.imageUrl);
      } else {
        setGeneratedImageUrl('https://picsum.photos/seed/lifecommit-desk/1200/800');
      }
    } catch (e) {
      setGeneratedImageUrl('https://picsum.photos/seed/lifecommit-desk/1200/800');
    } finally {
      setIsImageLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-xl rounded-[32px] bg-white border border-slate-200/90 shadow-[0_30px_90px_rgba(0,0,0,0.18)] overflow-hidden text-slate-900 flex flex-col font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 relative z-10 bg-slate-50/50 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-2xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-950 text-sm tracking-tight">LifeCommit Intelligence</h3>
                <p className="text-[11px] text-slate-500">Powered by Gemini 3.8 Flash &amp; 4 Argon</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Segmented Switcher & Mode Pills */}
          <div className="px-6 pt-4 pb-2 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex p-1 rounded-xl bg-slate-200/60 border border-slate-200 w-fit">
              <button
                onClick={() => setActiveTab('coach')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'coach'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Routine Coach
              </button>
              <button
                onClick={() => setActiveTab('image')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'image'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Habit Artwork
              </button>
            </div>

            {activeTab === 'coach' && (
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'deep_work', label: 'Deep Work' },
                  { id: 'circadian', label: 'Circadian' },
                  { id: 'recovery', label: 'Recovery' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setFocusMode(m.id as any)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all border cursor-pointer ${
                      focusMode === m.id
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-2xs'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Modal Content Body */}
          <div className="px-6 pb-6 pt-2 space-y-4 relative z-10 max-h-[65vh] overflow-y-auto">
            {activeTab === 'coach' ? (
              <div className="space-y-4">
                {/* Clean Framed Input Box */}
                <div className="relative rounded-2xl bg-slate-50 border border-slate-200 p-3.5 focus-within:bg-white focus-within:border-emerald-500/60 transition-all shadow-xs">
                  <textarea
                    value={coachPrompt}
                    onChange={(e) => setCoachPrompt(e.target.value)}
                    placeholder="Describe your current day, schedule block, or friction point..."
                    rows={3}
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none resize-none leading-relaxed"
                  />
                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-200/80 mt-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                      <Command className="w-3 h-3 text-emerald-600" />
                      <span>Press Return to query Gemini</span>
                    </div>
                    <button
                      onClick={handleCoachSubmit}
                      disabled={isCoachLoading || !coachPrompt.trim()}
                      className="px-4 py-2 rounded-full bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      {isCoachLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      <span>Optimize Now</span>
                    </button>
                  </div>
                </div>

                {/* AI Response Stream Container */}
                {coachResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2 shadow-xs"
                  >
                    <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold border-b border-emerald-200/60 pb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Gemini Live Response</span>
                    </div>
                    <div className="text-xs leading-relaxed text-slate-800 whitespace-pre-wrap font-sans">
                      {coachResponse}
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-2">Select Aspect Ratio:</label>
                  <div className="flex flex-wrap gap-2">
                    {['16:9', '9:16', '1:1', '21:9'].map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => setAspectRatio(ratio)}
                        className={`text-xs px-3 py-1 rounded-full font-medium transition-all cursor-pointer ${
                          aspectRatio === ratio
                            ? 'bg-slate-950 text-white font-bold shadow-sm'
                            : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative rounded-2xl bg-slate-50 border border-slate-200 p-3.5 focus-within:bg-white focus-within:border-emerald-500/60 transition-all shadow-xs">
                  <input
                    type="text"
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="Describe your wallpaper or habit badge..."
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                  />
                  <div className="flex justify-end pt-3 border-t border-slate-200/80 mt-3">
                    <button
                      onClick={handleImageSubmit}
                      disabled={isImageLoading || !imagePrompt.trim()}
                      className="px-4 py-2 rounded-full bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      {isImageLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                      <span>Generate Asset</span>
                    </button>
                  </div>
                </div>

                {generatedImageUrl && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={generatedImageUrl}
                      alt="LifeCommit Generated Asset"
                      className="max-h-52 rounded-xl object-contain shadow-md"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}