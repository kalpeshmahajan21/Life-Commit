import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LifeCommit - Daily Commit & Habit Tracking',
  description: 'Build steady daily commits, track your 30-day commit heatmap, always-visible desktop widgets, and AI scheduling assistance.',
  openGraph: {
    title: 'LifeCommit - Daily Commit & Habit Tracking',
    description: 'Build steady daily commits, track your 30-day commit heatmap, always-visible desktop widgets, and AI scheduling assistance.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LifeCommit - Daily Commit & Habit Tracking',
    description: 'Build steady daily commits, track your 30-day commit heatmap, always-visible desktop widgets, and AI scheduling assistance.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth antialiased" suppressHydrationWarning>
      <body className="font-sans bg-[#070D1F] text-slate-100 antialiased selection:bg-emerald-500/20 selection:text-emerald-300" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
