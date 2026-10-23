'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { QrCode } from 'lucide-react';
import { AppleLogo, WindowsLogo } from './PlatformIcons';

export default function OutroFooterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <footer id="outro" className="bg-[#070D1F] text-white relative pt-24 pb-12 border-t border-white/10">
      {/* Subtle top border glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-10" />
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-500/10 blur-[130px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-4 relative z-10"
      >
        {/* 3-Column Closing Hero Banner with whileInView and scale up */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[40px] bg-gradient-to-br from-[#0B152B] via-[#090D16] to-[#060B18] border border-white/10 p-8 sm:p-12 mb-20 shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: CTAs */}
            <div className="lg:col-span-5 text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                Build better habits with less effort.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-8">
                Join 12,000+ software engineers, students, and founders who replaced chaotic to-do lists with LifeCommit&apos;s ambient visual accountability.
              </p>

              {/* Download buttons with official vector logos */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/download"
                  className="px-6 py-3 rounded-full bg-white text-slate-950 font-bold text-xs sm:text-sm hover:bg-slate-200 transition-all flex items-center gap-2 shadow-lg hover:scale-105"
                >
                  <AppleLogo className="w-4 h-4 fill-current text-slate-950" />
                  <span>Mac OS</span>
                </Link>

                <Link
                  href="/download"
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 hover:scale-105"
                >
                  <WindowsLogo className="w-3.5 h-3.5 fill-current text-[#00A4EF]" />
                  <span>Windows</span>
                </Link>
              </div>
            </div>

            {/* Center Column: Realistic Hand Holding iPhone Mockup */}
            <div className="lg:col-span-4 flex items-center justify-center relative">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.8 }}
                className="relative w-64 sm:w-72 p-3 rounded-[40px] bg-slate-950 border-[5px] border-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-left text-white"
              >
                {/* Dynamic Island */}
                <div className="w-20 h-3 bg-black rounded-full mx-auto mb-3" />

                {/* Dashboard preview */}
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-white/10 mb-2.5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-bold text-white">Daily Overview</span>
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                      76% Done
                    </span>
                  </div>

                  {/* Circular progress in phone */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-3 border-emerald-400 flex items-center justify-center text-xs font-bold text-emerald-400">
                      76%
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">4/5 Tasks Done</span>
                      <span className="text-[9px] text-slate-400">3h 48m Deep Focus</span>
                    </div>
                  </div>
                </div>

                {/* Green Commit Matrix Inside */}
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/5">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block mb-1">
                    September Heatmap
                  </span>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 rounded-xs ${
                          i % 3 === 0 ? 'bg-emerald-400' : i % 2 === 0 ? 'bg-emerald-600' : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: QR Code Outro Card */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center text-center">
              <div className="p-5 rounded-3xl bg-white text-slate-900 shadow-2xl flex flex-col items-center">
                {/* Simulated Stylized QR Code with SVG */}
                <div className="w-32 h-32 p-2 bg-slate-950 rounded-2xl flex items-center justify-center mb-3">
                  <QrCode className="w-24 h-24 text-emerald-400" />
                </div>
                <span className="text-xs font-bold text-slate-900">Scan to get LifeCommit</span>
                <span className="text-[10px] text-slate-500 mt-0.5">iOS App Store & Android Play</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Top: Brand & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-5 text-left">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src="https://res.cloudinary.com/mhtmlnk8/image/upload/v1792139971/Life_Commit_logo_design_2K_20261015191119_copy1.png"
                alt="LifeCommit Logo"
                width={120}
                height={32}
                unoptimized
                referrerPolicy="no-referrer"
                className="h-7 sm:h-8 w-auto object-contain brightness-150 contrast-125 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
              />
              <span className="font-extrabold text-lg tracking-tight text-white">LifeCommit</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-6 max-w-sm">
              Build steady daily commits with a layout that keeps your mornings, deep work, and habits simple to follow.
            </p>

            {/* Newsletter Input Pill */}
            <form onSubmit={handleSubscribe} className="relative max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for product updates..."
                className="w-full pl-4 pr-28 py-3 rounded-full bg-slate-900 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-full bg-white text-slate-950 hover:bg-slate-200 font-bold text-xs transition-colors"
              >
                {subscribed ? 'Subscribed ✓' : 'Subscribe'}
              </button>
            </form>
          </div>

          {/* Footer Sitemap Links */}
          <div className="md:col-span-7 flex justify-start md:justify-end text-left">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Support</h5>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="mailto:support@lifecommit.app" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
                <li><a href="#outro" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#outro" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 LifeCommit Inc. All rights reserved.</p>
        </div>
      </motion.div>
    </footer>
  );
}
