'use client';

import React, { useState, useEffect } from 'react';
import { Bell, BellOff, CheckCircle2, Clock, Sparkles, ShieldCheck } from 'lucide-react';

export interface ReminderPreferences {
  enabled: boolean;
  time: string;
  habitTypes: string[];
  soundEnabled: boolean;
}

const DEFAULT_PREFERENCES: ReminderPreferences = {
  enabled: true,
  time: '09:00 AM',
  habitTypes: ['DSA Study', 'Morning Gym', 'Deep Work'],
  soundEnabled: true,
};

export default function NotificationToggle({ className = '' }: { className?: string }) {
  const [prefs, setPrefs] = useState<ReminderPreferences>(DEFAULT_PREFERENCES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  // Safely hydrate sessionStorage preferences asynchronously after mount to prevent hydration mismatch
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const stored = sessionStorage.getItem('lifecommit_reminder_prefs');
        if (stored) {
          setPrefs(JSON.parse(stored));
        }
      } catch {
        // Fallback
      }

      if (typeof window !== 'undefined' && 'Notification' in window) {
        setIsPermissionGranted(Notification.permission === 'granted');
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Save to sessionStorage whenever preferences change
  const updatePreferences = (newPrefs: ReminderPreferences) => {
    setPrefs(newPrefs);
    try {
      sessionStorage.setItem('lifecommit_reminder_prefs', JSON.stringify(newPrefs));
    } catch {
      // Ignore storage errors
    }
  };

  const toggleNotifications = async () => {
    const nextState = !prefs.enabled;
    const updated = { ...prefs, enabled: nextState };
    updatePreferences(updated);

    if (nextState) {
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission !== 'granted') {
        try {
          const perm = await Notification.requestPermission();
          setIsPermissionGranted(perm === 'granted');
        } catch {
          // Handled
        }
      }

      triggerToast(`Daily reminders active at ${prefs.time}! 🔔 Saved to session.`);
    } else {
      triggerToast('Daily reminders paused for this session.');
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTime = e.target.value;
    const updated = { ...prefs, time: newTime };
    updatePreferences(updated);
    if (prefs.enabled) {
      triggerToast(`Reminder time updated to ${newTime}`);
    }
  };

  const toggleHabit = (habit: string) => {
    const habitTypes = prefs.habitTypes.includes(habit)
      ? prefs.habitTypes.filter((h) => h !== habit)
      : [...prefs.habitTypes, habit];
    const updated = { ...prefs, habitTypes };
    updatePreferences(updated);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  return (
    <div
      className={`p-5 rounded-3xl bg-slate-900/90 border border-white/10 backdrop-blur-xl shadow-2xl text-white max-w-md w-full relative overflow-hidden transition-all ${className}`}
    >
      {/* Toast Notification Bar */}
      {toastMessage && (
        <div className="absolute top-2 left-2 right-2 bg-emerald-500 text-slate-950 px-3.5 py-2 rounded-2xl font-bold text-xs flex items-center justify-between shadow-lg z-30 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 fill-slate-950 text-emerald-400" />
            <span>{toastMessage}</span>
          </span>
        </div>
      )}

      {/* Main Toggle Header */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
              prefs.enabled
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {prefs.enabled ? (
              <Bell className="w-5 h-5 text-emerald-400 animate-bounce" />
            ) : (
              <BellOff className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold">Daily Habit Reminders</h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Session Storage
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {prefs.enabled ? `Reminding you daily at ${prefs.time}` : 'Notifications currently paused'}
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={toggleNotifications}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
            prefs.enabled ? 'bg-emerald-500' : 'bg-slate-700'
          }`}
          role="switch"
          aria-checked={prefs.enabled}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              prefs.enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Detailed Reminder Controls */}
      {prefs.enabled && (
        <div className="pt-3.5 space-y-3">
          {/* Time Selector */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>Reminder Schedule:</span>
            </span>
            <select
              value={prefs.time}
              onChange={handleTimeChange}
              className="bg-slate-800 text-emerald-400 font-mono font-bold px-3 py-1 rounded-xl border border-slate-700 text-xs focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="07:00 AM">07:00 AM (Early Bird)</option>
              <option value="08:00 AM">08:00 AM (Morning Sync)</option>
              <option value="09:00 AM">09:00 AM (Standard)</option>
              <option value="01:00 PM">01:00 PM (Midday Focus)</option>
              <option value="08:00 PM">08:00 PM (Evening Review)</option>
              <option value="10:00 PM">10:00 PM (Night Audit)</option>
            </select>
          </div>

          {/* Habit Categories Chips */}
          <div>
            <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">
              Tracked Habits in Reminder:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['DSA Study', 'Morning Gym', 'Deep Work', 'Hydration', 'Book Reading'].map((habit) => {
                const selected = prefs.habitTypes.includes(habit);
                return (
                  <button
                    key={habit}
                    onClick={() => toggleHabit(habit)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all border cursor-pointer ${
                      selected
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    {selected ? '✓ ' : '+ '}
                    {habit}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Note */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Browser Permissions: {isPermissionGranted ? 'Granted' : 'Session Active'}</span>
            </span>
            <span className="flex items-center gap-1 text-indigo-300">
              <Sparkles className="w-3 h-3" />
              <span>Session Saved</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
