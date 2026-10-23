'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, MessageSquare, HelpCircle, Mail, Sparkles } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the desktop widget work?',
      a: 'LifeCommit runs natively on macOS (menu bar and floating desktop canvas) and Windows 11. It stays pinned on top or blends into your wallpaper with low CPU overhead (< 0.2%). You can check off tasks directly without switching workspaces.',
    },
    {
      q: 'Do my tasks sync between laptop and mobile?',
      a: 'Yes, full bidirectional synchronization occurs within 300ms using local encrypted WebSockets and offline-first cache. If you check off a task on your iPhone while walking, your desktop widget reflects the update instantly.',
    },
    {
      q: 'How does the 30-day commit grid calculate a Strong Day?',
      a: 'A Strong Day is earned when you complete at least 4 priority tasks or log 3+ hours of focused deep work. Unlike GitHub where 1 commit lights up a square, LifeCommit rewards genuine cognitive depth and habit consistency.',
    },
    {
      q: 'Can I switch between Light and Dark mode?',
      a: 'Absolutely. LifeCommit features both Obsidian Dark (crafted for OLED screens and nighttime coding sessions) and Crisp Frosted Light (ideal for bright sunlit offices). You can toggle modes manually or follow your system clock automatically.',
    },
    {
      q: 'Is LifeCommit free to use?',
      a: 'LifeCommit offers a generous free tier that includes full desktop widget access, mobile sync, and 30-day commit history. LifeCommit Pro unlocks AI scheduling suggestions, deep thinking circadian adjustments, and unlimited custom routine stacks.',
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-28 bg-white text-slate-900 overflow-hidden border-t border-slate-200">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Sticky */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
                Frequently asked questions.
              </h2>
            </div>

            {/* Help Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-sm text-left hover:border-emerald-500/40 transition-all">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mb-4">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Can&apos;t find your answer?</h4>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Our engineering team is active on Discord and responds to support inquiries within 2 hours.
              </p>
              <a
                href="mailto:support@lifecommit.app"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-white" />
                <span>Contact us</span>
              </a>
            </div>
          </div>

          {/* Right Column: Expandable Accordion Rows */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl bg-slate-50 border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-emerald-500/40"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-950">
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-200/80 text-slate-700'
                      }`}
                    >
                      {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/80 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
