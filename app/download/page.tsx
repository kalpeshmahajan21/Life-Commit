'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  Terminal,
  Zap,
  CheckCircle2,
  Lock,
  MessageSquare,
  Mail,
  ExternalLink,
  Laptop,
  Smartphone,
  Cpu,
} from 'lucide-react';
import { AppleLogo, WindowsLogo } from '@/components/PlatformIcons';

export default function DownloadPage() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(label);
    setTimeout(() => setCopiedCmd(null), 2500);
  };

  const handleDownload = (fileName: string) => {
    setDownloadToast(`Starting download for ${fileName}...`);
    setTimeout(() => setDownloadToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-slate-900 font-sans selection:bg-slate-200 selection:text-slate-900 pb-24">
      {/* Download Toast Notification */}
      {downloadToast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 right-6 z-50 px-5 py-3.5 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700 flex items-center gap-3 text-sm font-medium"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Download className="w-4 h-4 animate-bounce" />
          </div>
          <span>{downloadToast}</span>
        </motion.div>
      )}

      {/* Top Minimal Sticky Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FBFBFD]/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors group px-3.5 py-1.5 rounded-full hover:bg-slate-200/50"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back</span>
          </Link>

          {/* Logo with Original Color Icon + Black Text */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 sm:w-9 h-8 sm:h-9 relative shrink-0 overflow-hidden flex items-center justify-start">
              <Image
                src="https://res.cloudinary.com/mhtmlnk8/image/upload/v1792139971/Life_Commit_logo_design_2K_20261015191119_copy1.png"
                alt="LifeCommit Icon"
                width={160}
                height={40}
                priority
                unoptimized
                referrerPolicy="no-referrer"
                className="h-8 sm:h-9 w-auto max-w-none object-cover object-left group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-950 font-sans group-hover:text-black transition-colors">
              LifeCommit
            </span>
          </Link>

          {/* Need Help Link */}
          <a
            href="mailto:support@lifecommit.app"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3.5 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 bg-white shadow-xs"
          >
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Need Help?</span>
            <span className="sm:hidden">Support</span>
          </a>
        </div>
      </header>

      {/* Main Download Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-12 sm:pt-16">
        {/* Page Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold mb-6 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Native Desktop Release v2.4 • C++ & Swift Engine</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.15]"
          >
            Get LifeCommit for Desktop.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
          >
            Experience seamless habit tracking, 30-day commit heatmaps, and ambient flow natively on your operating system.
          </motion.p>
        </div>

        {/* Section 1: Dual-Platform Architectural Download Cards (Grid 2-Col) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* LEFT CARD: Windows Download Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="rounded-[32px] bg-white border border-slate-200/90 shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-8 sm:p-10 flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] transition-all relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-50/60 rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Header: Platform Icon + Badge */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-xs">
                  <WindowsLogo className="w-6 h-6 text-[#0078D4] fill-current" />
                </div>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">
                  Windows 10 / 11
                </span>
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-2">
                Windows
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-8">
                Native C++ desktop widget with hardware-accelerated fluid acrylic rendering and system tray hotkey sync.
              </p>

              {/* Primary Download Button */}
              <button
                onClick={() => handleDownload('LifeCommit-Setup-x64.exe')}
                className="w-full bg-[#4338CA] hover:bg-[#3730A3] text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99] mb-4"
              >
                <Download className="w-4 h-4" />
                <span>Download x64 (.exe)</span>
                <span className="text-xs font-normal text-indigo-200 bg-indigo-900/40 px-2 py-0.5 rounded-md ml-1">
                  Recommended
                </span>
              </button>

              {/* Secondary Download Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <button
                  onClick={() => handleDownload('LifeCommit-Setup-x86.exe')}
                  className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Cpu className="w-3.5 h-3.5 text-slate-500" />
                  <span>32-bit (.exe)</span>
                </button>

                <button
                  onClick={() => handleDownload('LifeCommit-Setup-arm64.exe')}
                  className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Laptop className="w-3.5 h-3.5 text-slate-500" />
                  <span>ARM64 (.exe)</span>
                </button>
              </div>
            </div>

            {/* Winget Terminal Command Box */}
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                  Package Manager (winget)
                </span>
                {copiedCmd === 'winget' && (
                  <span className="text-[11px] font-bold text-indigo-600">Copied to clipboard!</span>
                )}
              </div>
              <div className="flex items-center justify-between bg-slate-900 rounded-xl p-3 text-slate-200 font-mono text-xs border border-slate-800">
                <code className="text-indigo-300">winget install LifeCommit.Desktop</code>
                <button
                  onClick={() => handleCopy('winget install LifeCommit.Desktop', 'winget')}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer ml-2"
                  title="Copy command"
                >
                  {copiedCmd === 'winget' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>

          {/* RIGHT CARD: Apple macOS & iOS Download Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="rounded-[32px] bg-white border border-slate-200/90 shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-8 sm:p-10 flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] transition-all relative overflow-hidden"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-50/60 rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Header: Platform Icon + Badge */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-slate-950 shadow-xs shrink-0">
                  <AppleLogo className="w-6 h-6 fill-current text-slate-950" />
                </div>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-3 py-1 rounded-full text-xs font-semibold">
                  macOS 13+ & iOS
                </span>
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-2">
                Apple Silicon & Mac
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-8">
                SwiftUI menu bar & desktop widget optimized for M1/M2/M3/M4 chips with background iCloud Sync.
              </p>

              {/* Primary Download Button */}
              <button
                onClick={() => handleDownload('LifeCommit-AppleSilicon.dmg')}
                className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99] mb-3"
              >
                <AppleLogo className="w-4 h-4 fill-current text-white" />
                <span>Download Apple Silicon (.dmg)</span>
              </button>

              {/* Secondary Download Button */}
              <button
                onClick={() => handleDownload('LifeCommit-IntelMac.dmg')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mb-5"
              >
                <Cpu className="w-3.5 h-3.5 text-slate-500" />
                <span>Download Intel Mac (.dmg x86_64)</span>
              </button>

              {/* iOS Companion Pill */}
              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-center justify-between gap-3 mb-8">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-xs font-bold text-emerald-900">
                    iOS Companion App
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  Syncs with iCloud
                </span>
              </div>
            </div>

            {/* Homebrew Terminal Command Box */}
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                  Homebrew Cask
                </span>
                {copiedCmd === 'brew' && (
                  <span className="text-[11px] font-bold text-emerald-600">Copied to clipboard!</span>
                )}
              </div>
              <div className="flex items-center justify-between bg-slate-900 rounded-xl p-3 text-slate-200 font-mono text-xs border border-slate-800">
                <code className="text-emerald-300">brew install --cask lifecommit</code>
                <button
                  onClick={() => handleCopy('brew install --cask lifecommit', 'brew')}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer ml-2"
                  title="Copy command"
                >
                  {copiedCmd === 'brew' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section 2: 3-Step 60-Second Installation Guide */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-2">
              60-Second Setup Guide
            </h2>
            <p className="text-sm text-slate-600">
              Get up and running with your ambient flow widget in three easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-950 font-extrabold text-sm flex items-center justify-center mb-5">
                  01
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">Run Installer</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Open the downloaded <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">.exe</code> or drag the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">.dmg</code> into your Applications folder.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Zero background telemetry</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-950 font-extrabold text-sm flex items-center justify-center mb-5">
                  02
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">Set Hotkey & Pin</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Use default shortcut <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-800 font-mono text-[10px]">⌥ Space</kbd> or <kbd className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 text-slate-800 font-mono text-[10px]">Alt Space</kbd> to summon the widget anywhere.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-500" />
                <span>Custom hotkey mapping</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-950 font-extrabold text-sm flex items-center justify-center mb-5">
                  03
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">Commit First Habit</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Initialize your 30-day commit grid and start recording deep work blocks and daily habits instantly.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Instant visual feedback</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Enterprise & Security Banner */}
        <div className="p-8 sm:p-10 rounded-[32px] bg-slate-900 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Security Status */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-4">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified & Digitally Signed</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                Built with Privacy & Security First.
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                LifeCommit desktop binary releases are notarized by Apple and signed with Windows Authenticode certificates. Local storage is encrypted and offline-first.
              </p>
            </div>

            {/* Right Column: Contact & Community Links */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <a
                href="mailto:support@lifecommit.app"
                className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Engineering</span>
              </a>

              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700/80 border border-white/10 text-white font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>Join Community Discord</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 ml-auto" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
