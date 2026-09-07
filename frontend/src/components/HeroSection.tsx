import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section style={{ background: 'radial-gradient(120% 120% at 80% 0%, #1e1b4b 0%, #0f172a 55%, #020617 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-xs font-medium text-red-300 bg-red-500/10 border border-red-400/20 px-3 py-1 rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Now with AI-generated dashboards
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight max-w-3xl mx-auto">
          Analytics that <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">ships itself.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-6 text-lg text-slate-400 max-w-xl mx-auto">
          Connect your data in minutes, ask questions in plain English, and get board-ready dashboards without waiting on the data team.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <button className="bg-gradient-to-r from-red-500 to-red-600 text-white font-medium px-6 py-3 rounded-xl hover:opacity-90 transition flex items-center gap-2">
            Get started free <ArrowRight className="w-4 h-4" />
          </button>
          <button className="border border-white/10 text-slate-200 px-6 py-3 rounded-xl hover:bg-white/5 transition flex items-center gap-2">
            <Play className="w-4 h-4" /> Watch demo
          </button>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-16 max-w-4xl mx-auto rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden"
          style={{ boxShadow: '0 0 80px -20px rgba(239,68,68,0.4)' }}>
          <div className="h-9 bg-slate-900 border-b border-white/5 flex items-center gap-1.5 px-4">
            <span className="w-3 h-3 rounded-full bg-red-400/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
            <span className="w-3 h-3 rounded-full bg-green-400/70" />
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="md:col-span-2 bg-slate-950/60 rounded-xl p-5 border border-white/5">
              <p className="text-xs text-slate-500 mb-2">Monthly Recurring Revenue</p>
              <p className="text-2xl font-bold text-white">$482,910 <span className="text-green-400 text-sm font-medium">+12.4%</span></p>
              <div className="mt-4 flex items-end gap-1.5 h-24">
                {[40,55,48,70,62,85,100].map((h,i) => (
                  <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: `rgba(239,68,68,${0.3 + i * 0.1})` }} />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[{ l: 'Active users', v: '24,812' }, { l: 'Churn', v: '1.9%' }, { l: 'NPS', v: '67' }].map(c => (
                <div key={c.l} className="bg-slate-950/60 rounded-xl p-4 border border-white/5">
                  <p className="text-xs text-slate-500">{c.l}</p>
                  <p className="text-xl font-bold text-white">{c.v}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}