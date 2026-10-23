import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070D1F] text-white px-4">
      <h2 className="text-4xl font-extrabold mb-4">Page Not Found</h2>
      <p className="text-slate-400 mb-8 text-center max-w-md">
        Could not find the requested resource. Head back home to continue building your daily commitments.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-white transition-all shadow-lg shadow-indigo-600/30"
      >
        Return Home
      </Link>
    </div>
  );
}
