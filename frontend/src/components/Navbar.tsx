import Link from 'next/link';
import { Wind } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/80 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-400 to-red-600 grid place-items-center">
            <Wind className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white tracking-tight">Lumivox</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-300">
          <Link href="/features" className="hover:text-white transition">Features</Link>
        </nav>
        <div className="flex items-center gap-3">
          <button className="text-sm font-medium bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">Start free</button>
        </div>
      </div>
    </header>
  );
}