'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import VelocityComparisonSection from '@/components/VelocityComparisonSection';
import StatementSection from '@/components/StatementSection';
import BentoSection from '@/components/BentoSection';
import PersonaSection from '@/components/PersonaSection';
import SocialProofSection from '@/components/SocialProofSection';
import GlobalScaleSection from '@/components/GlobalScaleSection';
import AiSuggestionsSection from '@/components/AiSuggestionsSection';
import VideoStoriesSection from '@/components/VideoStoriesSection';
import FaqSection from '@/components/FaqSection';
import OutroFooterSection from '@/components/OutroFooterSection';
import CustomCursor from '@/components/CustomCursor';
import SmartAiModal from '@/components/SmartAiModal';
import DemoVideoModal from '@/components/DemoVideoModal';

const emptySubscribe = () => () => {};
const useIsMounted = () => React.useSyncExternalStore(emptySubscribe, () => true, () => false);

export default function HomePage() {
  const mounted = useIsMounted();
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [aiModalDefaultTab, setAiModalDefaultTab] = useState<'coach' | 'image'>('coach');

  const handleOpenAi = (tab: 'coach' | 'image' = 'coach') => {
    setAiModalDefaultTab(tab);
    setIsAiModalOpen(true);
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#070D1F] text-slate-100 font-sans antialiased" suppressHydrationWarning>
        <div className="w-full min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Loading LifeCommit...</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-[#070D1F] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans antialiased overflow-x-hidden w-full relative"
      suppressHydrationWarning
    >
      {/* Global Custom Cursor */}
      <CustomCursor />

      {/* 01. Sticky 3-Pill Floating Navbar */}
      <Navbar
        onOpenAiStudio={() => handleOpenAi('coach')}
        onOpenDemo={() => setIsDemoModalOpen(true)}
      />

      {/* 02. Full-Bleed Studio Hero */}
      <div className="w-full">
        <HeroSection
          onOpenDemo={() => setIsDemoModalOpen(true)}
          onOpenAiStudio={() => handleOpenAi('coach')}
        />
      </div>

      {/* 03. "The Speed of Commit" Comparative Velocity Section */}
      <div className="w-full">
        <VelocityComparisonSection />
      </div>

      {/* 04. Statement & Marquee (Solid Full-Bleed White Canvas — NO scale transforms) */}
      <div className="w-full bg-white">
        <StatementSection
          onOpenAiStudio={() => handleOpenAi('coach')}
        />
      </div>

      {/* 05. 2x2 Bento Grid (Clean White Canvas) */}
      <div className="w-full bg-[#F8FAFC]">
        <BentoSection
          onOpenAiStudio={() => handleOpenAi('coach')}
        />
      </div>

      {/* 06. Use-Case Persona Tabs (Clean White Canvas) */}
      <div className="w-full bg-white">
        <PersonaSection />
      </div>

      {/* 07. 5-Column User Achievement Portrait Cards (Obsidian Canvas) */}
      <div className="w-full bg-[#070D1F]">
        <SocialProofSection />
      </div>

      {/* 08. Global Scale Counter & 3D Globe (Obsidian Canvas) */}
      <div className="w-full bg-[#070D1F]">
        <GlobalScaleSection />
      </div>

      {/* 09. AI Suggestions Showcase (Clean White Canvas) */}
      <div className="w-full bg-white">
        <AiSuggestionsSection
          onOpenAiStudio={() => handleOpenAi('coach')}
        />
      </div>

      {/* 10. Video Stories Carousel (Obsidian Canvas) */}
      <div className="w-full bg-[#070D1F]">
        <VideoStoriesSection
          onOpenDemo={() => setIsDemoModalOpen(true)}
        />
      </div>

      {/* 11. FAQ Accordion (Clean White Canvas) */}
      <div className="w-full bg-white">
        <FaqSection />
      </div>

      {/* 12. Outro & Footer (Obsidian Canvas) */}
      <div className="w-full bg-[#070D1F]">
        <OutroFooterSection />
      </div>

      {/* Interactive Modals */}
      <SmartAiModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        defaultTab={aiModalDefaultTab}
      />
      <DemoVideoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </main>
  );
}
