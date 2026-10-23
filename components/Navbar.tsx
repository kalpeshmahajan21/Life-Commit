'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { AppleLogo, WindowsLogo } from './PlatformIcons';

interface NavbarProps {
  onOpenAiStudio: () => void;
  onOpenDemo?: () => void;
}

const NAV_ITEMS = [
  { id: 'overview', label: "What's inside" },
  { id: 'desktop-widget', label: 'Desktop Widget' },
  { id: 'use-cases', label: 'Use Cases' },
  { id: 'metrics', label: 'Metrics' },
];

export default function Navbar({ onOpenAiStudio }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: '-15% 0px -40% 0px' }
    );

    const sectionIds = ['overview', 'desktop-widget', 'use-cases', 'metrics', 'smart-assist'];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-5 inset-x-0 z-50 pointer-events-none px-4 sm:px-8 flex justify-center">
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Island 1: Left Logo Island */}
        <div className="pointer-events-auto px-8 py-4 rounded-full bg-[#090D16]/95 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center">
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('overview');
            }}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
          >
            <Image
              src="https://res.cloudinary.com/mhtmlnk8/image/upload/v1792139971/Life_Commit_logo_design_2K_20261015191119_copy1.png"
              alt="LifeCommit Logo"
              width={200}
              height={52}
              priority
              unoptimized
              referrerPolicy="no-referrer"
              className="h-9 sm:h-10 w-auto object-contain brightness-150 contrast-125 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] opacity-100 transition-transform group-hover:scale-105"
            />
          </a>
        </div>

        {/* Island 2: Center Navigation Links Island */}
        <div className="pointer-events-auto hidden md:flex items-center gap-1.5 px-7 py-3.5 rounded-full bg-[#090D16]/95 backdrop-blur-xl border border-white/20 shadow-2xl text-sm sm:text-base font-semibold">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer rounded-full z-10 ${
                  isActive ? 'text-slate-950 font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-white -z-10 shadow-md"
                  />
                )}
                {item.label}
              </button>
            );
          })}

          <button
            onClick={() => {
              scrollToSection('smart-assist');
              onOpenAiStudio();
            }}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center gap-1.5 rounded-full ${
              activeSection === 'smart-assist'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-amber-400 hover:text-amber-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Smart Assist</span>
          </button>
        </div>

        {/* Island 3: Right Download CTA Island */}
        <div className="pointer-events-auto px-7 py-3.5 rounded-full bg-[#090D16]/95 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-3.5">
          <div className="hidden sm:flex items-center gap-2 text-slate-400">
            <span title="macOS Compatible" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-colors">
              <AppleLogo className="w-4 h-4 fill-current text-white" />
            </span>
            <span title="Windows 11 Compatible" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center transition-colors">
              <WindowsLogo className="w-3.5 h-3.5 fill-current text-[#00A4EF]" />
            </span>
          </div>

          <Link
            href="/download"
            className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            Download Now
          </Link>
        </div>
      </nav>
    </header>
  );
}