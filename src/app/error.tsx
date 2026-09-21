'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log exception for telemetry
    console.error('Unhandled UI Exception:', error);
  }, [error]);

  return (
    <div className="w-full min-h-screen bg-[#090d16] text-white flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/30 bg-rose-950/20 text-rose-300 text-xs tracking-wide uppercase mb-6 backdrop-blur-md">
        <span>Application Error</span>
      </div>
      <h1 className="text-4xl sm:text-6xl font-light text-white mb-4 tracking-tight">
        Something went wrong
      </h1>
      <p className="text-sm sm:text-base text-slate-400 font-light max-w-md mb-8 leading-relaxed">
        An unexpected error occurred while rendering this interface. You can try refreshing the view or returning to the laboratory home page.
      </p>
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#c5a880] hover:bg-white text-black rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-lg cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-white/10 rounded-xl text-xs font-mono uppercase tracking-wider transition-all"
        >
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
