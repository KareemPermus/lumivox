import Link from 'next/link';
import { Wind } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-400 to-red-600 grid place-items-center">
              <Wind className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white">Lumivox</span>
          </Link>
          <p className="text-sm text-slate-500 max-w-xs">Voice that illuminates. Built for modern teams.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-3">Product</p>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><Link href="/features" className="hover:text-white">Features</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-3">Company</p>
          <ul className="space-y-2 text-sm text-slate-500">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-slate-600">© 2024 Lumivox, Inc. All rights reserved.</div>
    </footer>
  );
}