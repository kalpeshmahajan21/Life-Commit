'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, GraduationCap, Briefcase, Globe, CheckCircle2, TrendingUp } from 'lucide-react';

export default function PersonaSection() {
  const [activePersona, setActivePersona] = useState(0);

  const personas = [
    {
      id: 'swe',
      title: 'Software Engineers',
      icon: Code,
      headline: 'Keep GitHub commits and deep work aligned.',
      desc: 'Protect 3-hour blocks for hard engineering. Live desktop widget keeps sprint goals visible.',
      stat: '92% Strong Day Consistency',
      subStat: '4h 38m avg daily deep focus',
      habits: ['DSA Trees & Graphs', 'Pull Request Audits', 'Zero-Notification Sprints'],
      gradient: 'from-[#070D1F] via-[#0F1E3A] to-[#0A1A2F]',
    },
    {
      id: 'students',
      title: 'Students & Grads',
      icon: GraduationCap,
      headline: 'Master spaced repetition and exam schedules.',
      desc: 'Break semesters into daily commitments. Visualize study momentum to avoid all-nighter panic.',
      stat: '89% Study Completion Rate',
      subStat: '18 uninterrupted study blocks / week',
      habits: ['Active Recall Anki', 'Thesis Chapter Writing', 'Calculus Problem Sets'],
      gradient: 'from-[#0A1128] via-[#1E1B4B] to-[#0B0F19]',
    },
    {
      id: 'freelancers',
      title: 'Freelancers & Solo',
      icon: Briefcase,
      headline: 'Balance client milestones and wellness.',
      desc: 'Eliminate chaotic workdays. Stack deliverables into morning focus and admin tasks into afternoon.',
      stat: '3.4x Faster Turnaround',
      subStat: 'Zero missed sprint deadlines',
      habits: ['Client Delivery Sprints', 'Outreach & Invoicing', 'Gym & Walk Reset'],
      gradient: 'from-[#06141D] via-[#0D2833] to-[#070D1F]',
    },
    {
      id: 'remote',
      title: 'Remote Workers',
      icon: Globe,
      headline: 'Create boundaries between home and output.',
      desc: 'Establish frictionless shutdown routines, avoid Zoom fatigue, and keep streaks alive.',
      stat: '84% Reduced Burnout Index',
      subStat: 'Definite 6 PM evening cutoff',
      habits: ['Morning Coffee & Walk', 'Asynchronous Slack Block', 'Complete Shutdown'],
      gradient: 'from-[#0D182E] via-[#162A45] to-[#070D1F]',
    },
  ];

  // Automatically cycle active tab every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePersona((prev) => (prev + 1) % personas.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [personas.length]);

  const current = personas[activePersona];

  return (
    <section id="use-cases" className="py-24 bg-white text-slate-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Adapted for the way you live and work.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            LifeCommit adapts its widgets, reminders, and streak algorithms to match your actual career rhythm.
          </p>
        </motion.div>

        {/* Two-Column 50/50 Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-stretch">
          
          {/* Left Column: Compact Auto-Cycling Persona Card (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-[#090D16] border border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden text-white">
            
            {/* Top Persona Pills (Interactive + Auto-cycling) */}
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {personas.map((p, idx) => {
                  const Icon = p.icon;
                  const isActive = activePersona === idx;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActivePersona(idx)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                          : 'bg-white/10 text-slate-300 hover:bg-white/20'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{p.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Cross-fading Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                    {current.headline}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {current.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {current.habits.map((habit) => (
                      <span
                        key={habit}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-200 font-medium"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {habit}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Metric Badge docked securely at bottom-right inside card */}
            <div className="w-full p-4 rounded-2xl bg-slate-900/90 border border-white/15 shadow-xl">
              <div className="flex items-center gap-2 mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>Measured Outcome</span>
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 tracking-tight">
                {current.stat}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {current.subStat}
              </p>
            </div>

            {/* Subtle glow */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          </div>

          {/* Right Column: Cloudinary Smart Daily Planner Video Showcase (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-[#090D16] border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl flex items-center justify-center p-3 min-h-[460px]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black flex items-center justify-center aspect-video lg:aspect-auto">
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=mhtmlnk8&public_id=Smart_daily_planner_widget_anima__20261015154627_gwr_video_mvp&autoplay=true&loop=true&muted=true&controls=false"
                className="w-full h-full min-h-[380px] lg:min-h-[440px] border-0 object-cover"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Subtle 24px transition bleed from Light to Dark */}
      <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-b from-transparent to-[#070D1F] pointer-events-none z-10" />
    </section>
  );
}

