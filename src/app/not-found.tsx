"use client";

import Link from "next/link";
import { Sparkles, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-screen min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs tracking-wide uppercase mb-6 backdrop-blur-md">
        <Sparkles className="w-3.5 h-3.5" /> 404 - Spatial Node Not Found
      </div>
      <h1 className="text-6xl md:text-8xl font-extralight text-white mb-4 tracking-tight">
        404
      </h1>
      <p className="text-lg text-white/60 font-light max-w-md mb-8">
        The requested page or spatial coordinate could not be located on the HCI Lab node network.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-2xl text-sm font-light text-white shadow-lg shadow-purple-500/25 border border-purple-400/30 transition-all"
      >
        <Home className="w-4 h-4" /> Return to HCI Home
      </Link>
    </div>
  );
}
