"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 text-slate-300 text-xs tracking-wide uppercase mb-6 backdrop-blur-md">
        <span>Page Not Found</span>
      </div>
      <h1 className="text-6xl md:text-8xl font-extralight text-white mb-4 tracking-tight">
        404
      </h1>
      <p className="text-base sm:text-lg text-slate-400 font-light max-w-md mb-8">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#c5a880] hover:bg-white text-black rounded-xl text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-lg"
      >
        <Home className="w-4 h-4" /> Return to Home
      </Link>
    </div>
  );
}
