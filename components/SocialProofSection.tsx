'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Flame, CheckCircle, TrendingUp, Users } from 'lucide-react';

export default function SocialProofSection() {
  const builders = [
    {
      name: 'Daniel Gray',
      role: 'Staff Engineer at Stripe',
      metric: '87% Improved coding & study consistency',
      sub: 'Maintained 32 days of daily LeetCode & system design without burnout.',
      tag: '32-Day Streak',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Aaron Lee',
      role: 'Full-Stack Developer',
      metric: 'Stopped breaking habits on busy sprint weeks',
      sub: 'The desktop widget keeps my priority 1 task pinned right above my IDE.',
      tag: 'Zero Missed Tasks',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Priya Sharma',
      role: 'AI Researcher & PhD',
      metric: 'Logged 40+ deep focus sessions this month',
      sub: 'The automatic schedule conflict alert has saved my thesis review hours.',
      tag: '42 Focus Sprints',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Leo Vance',
      role: 'Indie Hacker & Founder',
      metric: '30 Days full green commit grid streak',
      sub: 'Seeing the commit squares fill up gave me the exact push to ship my SaaS.',
      tag: '100% Heatmap',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Ramya Krishnan',
      role: 'Product Engineer',
      metric: 'Finally keeps my desktop and mobile tasks synced',
      sub: 'I tick off my gym on my iPhone and my MacBook widget updates instantly.',
      tag: 'Live Sync Fan',
      img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="py-24 bg-[#070D1F] text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-4"
      >
        {/* Header with Avatar Stack */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              What builders are achieving with LifeCommit.
            </h2>
          </div>

          {/* Right-aligned avatar stack */}
          <div className="flex items-center gap-3 self-start md:self-auto p-2 px-3 rounded-full bg-slate-900/80 border border-white/10">
            <div className="flex -space-x-2">
              {builders.slice(0, 4).map((b, i) => (
                <div key={i} className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-slate-950">
                  <Image
                    src={b.img}
                    alt={b.name}
                    width={28}
                    height={28}
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
            <div className="text-xs">
              <span className="font-bold text-white block">Trusted Worldwide</span>
              <span className="text-[10px] text-slate-400">12,000+ daily active builders</span>
            </div>
          </div>
        </div>

        {/* 5-Column Vertical Portrait Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {builders.map((card, idx) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.02, boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.3)' }}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-xl bg-slate-900 flex flex-col justify-end transition-shadow duration-300"
            >
              {/* Background Portrait Photo */}
              <Image
                src={card.img}
                alt={card.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Navy Blue Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D1F] via-[#070D1F]/70 to-transparent" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md border border-white/15 text-emerald-400">
                  {card.tag}
                </span>
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 p-5 text-left">
                <h4 className="text-sm font-bold text-white leading-snug mb-1 group-hover:text-emerald-300 transition-colors">
                  &ldquo;{card.metric}&rdquo;
                </h4>
                <p className="text-[11px] text-slate-300 line-clamp-2 mb-3">
                  {card.sub}
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white block">{card.name}</span>
                    <span className="text-[10px] text-slate-400">{card.role}</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
