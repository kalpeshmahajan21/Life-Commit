'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { Flame, Clock, CheckCircle2, Sparkles, TrendingUp, Calendar } from 'lucide-react';

export interface DayCommitData {
  dayNumber: number;
  dayLabel: string;
  dateStr: string;
  weekday: string;
  commits: number;
  tasksDone: number;
  totalTasks: number;
  focusMinutes: number;
  focusTime: string;
  scorePercent: number;
  statusLabel: string;
  isStrongDay: boolean;
  level: number; // 0, 1, 2, 3
  category: string;
}

export const THIRTY_DAYS_DATA: DayCommitData[] = [
  { dayNumber: 1, dayLabel: 'D1', dateStr: 'Mon, 1 Sep', weekday: 'Mon', commits: 4, tasksDone: 4, totalTasks: 5, focusMinutes: 210, focusTime: '3h 30m', scorePercent: 80, statusLabel: 'Solid Day', isStrongDay: false, level: 2, category: 'DSA Practice' },
  { dayNumber: 2, dayLabel: 'D2', dateStr: 'Tue, 2 Sep', weekday: 'Tue', commits: 5, tasksDone: 5, totalTasks: 5, focusMinutes: 310, focusTime: '5h 10m', scorePercent: 100, statusLabel: 'Perfect Day', isStrongDay: true, level: 3, category: 'System Architecture' },
  { dayNumber: 3, dayLabel: 'D3', dateStr: 'Wed, 3 Sep', weekday: 'Wed', commits: 5, tasksDone: 5, totalTasks: 5, focusMinutes: 278, focusTime: '4h 38m', scorePercent: 92, statusLabel: 'Strong Day', isStrongDay: true, level: 3, category: 'Frontend Engine' },
  { dayNumber: 4, dayLabel: 'D4', dateStr: 'Thu, 4 Sep', weekday: 'Thu', commits: 3, tasksDone: 3, totalTasks: 5, focusMinutes: 165, focusTime: '2h 45m', scorePercent: 60, statusLabel: 'Steady Day', isStrongDay: false, level: 1, category: 'Code Review' },
  { dayNumber: 5, dayLabel: 'D5', dateStr: 'Fri, 5 Sep', weekday: 'Fri', commits: 4, tasksDone: 4, totalTasks: 5, focusMinutes: 240, focusTime: '4h 00m', scorePercent: 88, statusLabel: 'Strong Day', isStrongDay: true, level: 2, category: 'Full-Stack Sync' },
  { dayNumber: 6, dayLabel: 'D6', dateStr: 'Sat, 6 Sep', weekday: 'Sat', commits: 2, tasksDone: 2, totalTasks: 2, focusMinutes: 75, focusTime: '1h 15m', scorePercent: 75, statusLabel: 'Weekend Sprint', isStrongDay: false, level: 1, category: 'Reading & Stretches' },
  { dayNumber: 7, dayLabel: 'D7', dateStr: 'Sun, 7 Sep', weekday: 'Sun', commits: 3, tasksDone: 3, totalTasks: 3, focusMinutes: 120, focusTime: '2h 00m', scorePercent: 85, statusLabel: 'Planning Day', isStrongDay: true, level: 2, category: 'Weekly Roadmap' },
  { dayNumber: 8, dayLabel: 'D8', dateStr: 'Mon, 8 Sep', weekday: 'Mon', commits: 5, tasksDone: 5, totalTasks: 5, focusMinutes: 290, focusTime: '4h 50m', scorePercent: 95, statusLabel: 'Strong Day', isStrongDay: true, level: 3, category: 'API Refactor' },
  { dayNumber: 9, dayLabel: 'D9', dateStr: 'Tue, 9 Sep', weekday: 'Tue', commits: 4, tasksDone: 4, totalTasks: 5, focusMinutes: 200, focusTime: '3h 20m', scorePercent: 75, statusLabel: 'Active Day', isStrongDay: false, level: 2, category: 'DB Migrations' },
  { dayNumber: 10, dayLabel: 'D10', dateStr: 'Wed, 10 Sep', weekday: 'Wed', commits: 6, tasksDone: 5, totalTasks: 5, focusMinutes: 330, focusTime: '5h 30m', scorePercent: 100, statusLabel: 'Perfect Day', isStrongDay: true, level: 3, category: 'Microservices & Queues' },
  { dayNumber: 11, dayLabel: 'D11', dateStr: 'Thu, 11 Sep', weekday: 'Thu', commits: 4, tasksDone: 4, totalTasks: 5, focusMinutes: 220, focusTime: '3h 40m', scorePercent: 80, statusLabel: 'Solid Day', isStrongDay: false, level: 2, category: 'Component Testing' },
  { dayNumber: 12, dayLabel: 'D12', dateStr: 'Fri, 12 Sep', weekday: 'Fri', commits: 5, tasksDone: 5, totalTasks: 5, focusMinutes: 270, focusTime: '4h 30m', scorePercent: 92, statusLabel: 'Strong Day', isStrongDay: true, level: 3, category: 'Performance Tuning' },
  { dayNumber: 13, dayLabel: 'D13', dateStr: 'Sat, 13 Sep', weekday: 'Sat', commits: 2, tasksDone: 2, totalTasks: 2, focusMinutes: 90, focusTime: '1h 30m', scorePercent: 70, statusLabel: 'Light Habits', isStrongDay: false, level: 1, category: 'Outdoor Reset' },
  { dayNumber: 14, dayLabel: 'D14', dateStr: 'Sun, 14 Sep', weekday: 'Sun', commits: 2, tasksDone: 2, totalTasks: 2, focusMinutes: 60, focusTime: '1h 00m', scorePercent: 65, statusLabel: 'Rest & Recover', isStrongDay: false, level: 1, category: 'Mental Reset' },
  { dayNumber: 15, dayLabel: 'D15', dateStr: 'Mon, 15 Sep', weekday: 'Mon', commits: 5, tasksDone: 5, totalTasks: 5, focusMinutes: 300, focusTime: '5h 00m', scorePercent: 100, statusLabel: 'Strong Day', isStrongDay: true, level: 3, category: 'Graph Algorithms' },
  { dayNumber: 16, dayLabel: 'D16', dateStr: 'Wed, 16 Sep', weekday: 'Wed', commits: 5, tasksDone: 5, totalTasks: 5, focusMinutes: 278, focusTime: '4h 38m', scorePercent: 92, statusLabel: 'Strong Day', isStrongDay: true, level: 3, category: 'Framer Motion Canvas' },
  { dayNumber: 17, dayLabel: 'D17', dateStr: 'Thu, 17 Sep', weekday: 'Thu', commits: 4, tasksDone: 4, totalTasks: 5, focusMinutes: 195, focusTime: '3h 15m', scorePercent: 78, statusLabel: 'Active Day', isStrongDay: false, level: 2, category: 'Tailwind V4 Styling' },
  { dayNumber: 18, dayLabel: 'D18', dateStr: 'Fri, 18 Sep', weekday: 'Fri', commits: 4, tasksDone: 4, totalTasks: 5, focusMinutes: 230, focusTime: '3h 50m', scorePercent: 85, statusLabel: 'Solid Day', isStrongDay: true, level: 2, category: 'Responsive Layouts' },
  { dayNumber: 19, dayLabel: 'D19', dateStr: 'Sat, 19 Sep', weekday: 'Sat', commits: 2, tasksDone: 2, totalTasks: 2, focusMinutes: 70, focusTime: '1h 10m', scorePercent: 68, statusLabel: 'Active Reset', isStrongDay: false, level: 1, category: 'Book Reading' },
  { dayNumber: 20, dayLabel: 'D20', dateStr: 'Sun, 20 Sep', weekday: 'Sun', commits: 3, tasksDone: 3, totalTasks: 3, focusMinutes: 135, focusTime: '2h 15m', scorePercent: 85, statusLabel: 'Sprint Review', isStrongDay: true, level: 2, category: 'Habit Analytics' },
  { dayNumber: 21, dayLabel: 'D21', dateStr: 'Mon, 21 Sep', weekday: 'Mon', commits: 5, tasksDone: 5, totalTasks: 5, focusMinutes: 285, focusTime: '4h 45m', scorePercent: 94, statusLabel: 'Strong Day', isStrongDay: true, level: 3, category: 'Three.js 3D View' },
  { dayNumber: 22, dayLabel: 'D22', dateStr: 'Tue, 22 Sep', weekday: 'Tue', commits: 6, tasksDone: 5, totalTasks: 5, focusMinutes: 320, focusTime: '5h 20m', scorePercent: 100, statusLabel: 'Perfect Day', isStrongDay: true, level: 3, category: 'Next.js App Router' },
  { dayNumber: 23, dayLabel: 'D23', dateStr: 'Wed, 23 Sep', weekday: 'Wed', commits: 4, tasksDone: 4, totalTasks: 5, focusMinutes: 220, focusTime: '3h 40m', scorePercent: 82, statusLabel: 'Solid Day', isStrongDay: false, level: 2, category: 'API Security Rules' },
  { dayNumber: 24, dayLabel: 'D24', dateStr: 'Thu, 24 Sep', weekday: 'Thu', commits: 5, tasksDone: 5, totalTasks: 5, focusMinutes: 265, focusTime: '4h 25m', scorePercent: 90, statusLabel: 'Strong Day', isStrongDay: true, level: 3, category: 'Async Hydration' },
  { dayNumber: 25, dayLabel: 'D25', dateStr: 'Fri, 25 Sep', weekday: 'Fri', commits: 4, tasksDone: 4, totalTasks: 5, focusMinutes: 235, focusTime: '3h 55m', scorePercent: 86, statusLabel: 'Solid Day', isStrongDay: true, level: 2, category: 'Performance Profiling' },
  { dayNumber: 26, dayLabel: 'D26', dateStr: 'Sat, 26 Sep', weekday: 'Sat', commits: 2, tasksDone: 2, totalTasks: 2, focusMinutes: 80, focusTime: '1h 20m', scorePercent: 72, statusLabel: 'Outdoor Run', isStrongDay: false, level: 1, category: 'Endurance Cardio' },
  { dayNumber: 27, dayLabel: 'D27', dateStr: 'Sun, 27 Sep', weekday: 'Sun', commits: 3, tasksDone: 3, totalTasks: 3, focusMinutes: 120, focusTime: '2h 00m', scorePercent: 86, statusLabel: 'Weekly Sync', isStrongDay: true, level: 2, category: 'Weekly Review' },
  { dayNumber: 28, dayLabel: 'D28', dateStr: 'Mon, 28 Sep', weekday: 'Mon', commits: 5, tasksDone: 5, totalTasks: 5, focusMinutes: 290, focusTime: '4h 50m', scorePercent: 96, statusLabel: 'Strong Day', isStrongDay: true, level: 3, category: 'Deep Work: Core Engine' },
  { dayNumber: 29, dayLabel: 'D29', dateStr: 'Tue, 29 Sep', weekday: 'Tue', commits: 5, tasksDone: 5, totalTasks: 5, focusMinutes: 255, focusTime: '4h 15m', scorePercent: 91, statusLabel: 'Strong Day', isStrongDay: true, level: 3, category: 'E2E Testing' },
  { dayNumber: 30, dayLabel: 'D30', dateStr: 'Wed, 30 Sep', weekday: 'Wed', commits: 6, tasksDone: 5, totalTasks: 5, focusMinutes: 305, focusTime: '5h 05m', scorePercent: 98, statusLabel: 'Strong Day', isStrongDay: true, level: 3, category: 'Final Polish & Deploy' },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: DayCommitData }>;
}

const CustomRechartsTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;

  return (
    <div className="p-3.5 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-emerald-500/40 shadow-2xl text-white text-xs max-w-xs z-50 pointer-events-none">
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5 font-bold text-slate-200">
          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
          <span>{data.dateStr}</span>
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
            data.isStrongDay
              ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
              : 'bg-slate-800 text-slate-300 border border-slate-700'
          }`}
        >
          {data.isStrongDay ? '🔥 Strong Day' : '⚡ Solid Day'}
        </span>
      </div>

      <div className="pt-2 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Score & Completion:</span>
          <span className="font-extrabold text-emerald-400">{data.scorePercent}% • {data.statusLabel}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400">Focus Time:</span>
          <span className="font-mono font-bold text-teal-300 flex items-center gap-1">
            <Clock className="w-3 h-3 text-teal-400" />
            {data.focusTime}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-400">Tasks Completed:</span>
          <span className="font-semibold text-slate-200 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            {data.tasksDone}/{data.totalTasks} ({data.commits} commits)
          </span>
        </div>

        <div className="pt-1 text-[11px] text-slate-400 truncate">
          <span className="text-slate-500 font-medium">Focus Area: </span>
          <span className="text-indigo-300 font-semibold">{data.category}</span>
        </div>
      </div>
    </div>
  );
};

interface HeatmapWidgetProps {
  theme?: 'dark' | 'light';
  onDaySelect?: (day: DayCommitData) => void;
  className?: string;
}

export default function HeatmapWidget({
  theme = 'dark',
  onDaySelect,
  className = '',
}: HeatmapWidgetProps) {
  const [selectedDay, setSelectedDay] = useState<DayCommitData>(THIRTY_DAYS_DATA[15]);
  const [viewMode, setViewMode] = useState<'both' | 'chart' | 'matrix'>('both');

  const isDark = theme === 'dark';

  const strongDaysCount = THIRTY_DAYS_DATA.filter((d) => d.isStrongDay).length;
  const avgFocusHours = (
    THIRTY_DAYS_DATA.reduce((acc, d) => acc + d.focusMinutes, 0) /
    (30 * 60)
  ).toFixed(1);
  const totalCommits = THIRTY_DAYS_DATA.reduce((acc, d) => acc + d.commits, 0);

  return (
    <div
      className={`rounded-3xl transition-colors duration-300 ${
        isDark
          ? 'bg-slate-950/80 text-white border border-white/10'
          : 'bg-white text-slate-900 border border-slate-200 shadow-md'
      } ${className}`}
    >
      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-black/5 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.9)] animate-pulse" />
            <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
              30-Day Commit Frequency Grid
            </h4>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Hover or tap any day to inspect &apos;Strong Day&apos; metrics & focus hours
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-black/10 dark:bg-white/5 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setViewMode('both')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              viewMode === 'both'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Combined
          </button>
          <button
            onClick={() => setViewMode('chart')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              viewMode === 'chart'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Recharts Bar
          </button>
          <button
            onClick={() => setViewMode('matrix')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              viewMode === 'matrix'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Commit Heatmap
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-2 px-4 sm:px-5 py-3 border-b border-black/5 dark:border-white/10 text-center">
        <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5">
          <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs font-bold mb-0.5">
            <Flame className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
            <span>{strongDaysCount}/30 Days</span>
          </div>
          <span className="text-[10px] text-slate-400">Strong Days (≥85%)</span>
        </div>

        <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5">
          <div className="flex items-center justify-center gap-1 text-teal-300 text-xs font-bold mb-0.5">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>{avgFocusHours}h / day</span>
          </div>
          <span className="text-[10px] text-slate-400">Avg Focus Time</span>
        </div>

        <div className="p-2 rounded-xl bg-black/5 dark:bg-white/5">
          <div className="flex items-center justify-center gap-1 text-indigo-400 text-xs font-bold mb-0.5">
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
            <span>{totalCommits} Commits</span>
          </div>
          <span className="text-[10px] text-slate-400">Total Volume</span>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        {/* Recharts BarChart Component */}
        {(viewMode === 'both' || viewMode === 'chart') && (
          <div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
              <span className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Daily Commit Volume & Frequency (Recharts)
              </span>
              <span className="text-emerald-400 font-mono text-[10px]">
                Level 3 = Strong Day (Glowing Emerald)
              </span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={THIRTY_DAYS_DATA}
                  margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                  onClick={(state: unknown) => {
                    const s = state as { activePayload?: Array<{ payload: DayCommitData }> } | null;
                    if (s?.activePayload && s.activePayload.length) {
                      const day = s.activePayload[0].payload as DayCommitData;
                      setSelectedDay(day);
                      if (onDaySelect) onDaySelect(day);
                    }
                  }}
                >
                  <XAxis
                    dataKey="dayNumber"
                    stroke={isDark ? '#64748B' : '#94A3B8'}
                    fontSize={10}
                    tickLine={false}
                    interval={2}
                    tickFormatter={(v) => `D${v}`}
                  />
                  <YAxis
                    stroke={isDark ? '#64748B' : '#94A3B8'}
                    fontSize={10}
                    tickLine={false}
                    domain={[0, 6]}
                    ticks={[0, 2, 4, 6]}
                  />
                  <Tooltip
                    content={<CustomRechartsTooltip />}
                    cursor={{
                      fill: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.12)',
                    }}
                  />
                  <Bar
                    dataKey="commits"
                    radius={[4, 4, 0, 0]}
                    animationDuration={800}
                  >
                    {THIRTY_DAYS_DATA.map((entry, index) => {
                      const isHovered = selectedDay.dayNumber === entry.dayNumber;
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.isStrongDay
                              ? isHovered
                                ? '#34D399'
                                : '#10B981'
                              : entry.level === 2
                              ? '#059669'
                              : isDark
                              ? '#064E3B'
                              : '#A7F3D0'
                          }
                          stroke={isHovered ? '#FFFFFF' : 'transparent'}
                          strokeWidth={isHovered ? 1.5 : 0}
                          className="cursor-pointer transition-all duration-150"
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 30-Day Calendar Matrix View */}
        {(viewMode === 'both' || viewMode === 'matrix') && (
          <div className="pt-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
              <span className="font-semibold">30-Day GitHub Heatmap Matrix (Hover to inspect)</span>
              <div className="flex items-center gap-1 text-[10px]">
                <span className="text-slate-500">Less</span>
                <span className="w-2.5 h-2.5 rounded-xs bg-slate-800" />
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-900" />
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" />
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
                <span className="text-emerald-400 font-bold">More</span>
              </div>
            </div>

            <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
              {THIRTY_DAYS_DATA.map((day) => {
                const isSelected = selectedDay.dayNumber === day.dayNumber;
                const bgStyle =
                  day.level === 3
                    ? 'bg-emerald-500 hover:bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.4)]'
                    : day.level === 2
                    ? 'bg-emerald-600 hover:bg-emerald-500'
                    : day.level === 1
                    ? isDark
                      ? 'bg-emerald-900/60 hover:bg-emerald-800'
                      : 'bg-emerald-200 hover:bg-emerald-300'
                    : isDark
                    ? 'bg-slate-800 hover:bg-slate-700'
                    : 'bg-slate-200 hover:bg-slate-300';

                return (
                  <button
                    key={day.dayNumber}
                    onClick={() => {
                      setSelectedDay(day);
                      if (onDaySelect) onDaySelect(day);
                    }}
                    onMouseEnter={() => setSelectedDay(day)}
                    className={`h-6 rounded-md transition-all duration-150 relative cursor-pointer group flex items-center justify-center text-[10px] font-bold ${bgStyle} ${
                      isSelected
                        ? 'ring-2 ring-white scale-110 z-10'
                        : 'hover:scale-105'
                    }`}
                    title={`${day.dateStr}: ${day.scorePercent}% (${day.focusTime})`}
                  >
                    <span
                      className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                        day.level >= 2 ? 'text-slate-950 font-black' : 'text-white'
                      }`}
                    >
                      {day.dayNumber}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected Day Quick Card with 'Strong Day' Metrics & Focus Time */}
        <div
          className={`p-3.5 rounded-2xl border transition-all ${
            selectedDay.isStrongDay
              ? 'bg-emerald-950/40 border-emerald-500/40'
              : isDark
              ? 'bg-black/30 border-white/10'
              : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                  selectedDay.isStrongDay
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                    : 'bg-slate-800 text-white'
                }`}
              >
                D{selectedDay.dayNumber}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm">{selectedDay.dateStr}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      selectedDay.isStrongDay
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {selectedDay.statusLabel}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">
                  {selectedDay.tasksDone}/{selectedDay.totalTasks} completed • {selectedDay.category}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Focus Time</span>
                <span className="font-mono font-bold text-teal-300 text-xs">
                  {selectedDay.focusTime}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Score</span>
                <span className="font-extrabold text-emerald-400 text-sm">
                  {selectedDay.scorePercent}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
