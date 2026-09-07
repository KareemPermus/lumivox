import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play, MessageSquare, Plug, ShieldCheck, Star } from 'lucide-react';
import apiClient from '@/api/client';
import type { Feature } from '@/types';

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Home() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/api/features').then(r => setFeatures(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    'message-square': <MessageSquare className="w-5 h-5 text-indigo-400" />,
    'plug': <Plug className="w-5 h-5 text-violet-400" />,
    'shield-check': <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  };
  const bgMap: Record<string, string> = {
    'message-square': 'bg-indigo-500/15',
    'plug': 'bg-violet-500/15',
    'shield-check': 'bg-emerald-500/15',
  };

  return (
    <div className="bg-slate-950 text-slate-200 -m-6 md:-m-8">
      {/* HERO */}
      <section style={{ background: 'radial-gradient(120% 120% at 80% 0%, #1e1b4b 0%, #0f172a 55%, #020617 100%)' }}>
        <motion.div className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center" initial="hidden" animate="show" variants={fade} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-400/20 px-3 py-1 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Now with AI-generated dashboards
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-[1.05] tracking-tight max-w-3xl mx-auto">
            Analytics that <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">ships itself.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto">
            Connect your data in minutes, ask questions in plain English, and get board-ready dashboards without waiting on the data team.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <button className="bg-gradient-to-r from-red-500 to-red-600 text-white font-medium px-6 py-3 rounded-xl hover:opacity-90 transition flex items-center gap-2">
              Get started free <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-white/10 text-slate-200 px-6 py-3 rounded-xl hover:bg-white/5 transition flex items-center gap-2">
              <Play className="w-4 h-4" /> Watch demo
            </button>
          </div>

          {/* Dashboard mockup */}
          <div className="mt-16 max-w-4xl mx-auto rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden" style={{ boxShadow: '0 0 80px -20px rgba(99,102,241,0.6)' }}>
            <div className="h-9 bg-slate-900 border-b border-white/5 flex items-center gap-1.5 px-4">
              <span className="w-3 h-3 rounded-full bg-red-400/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <span className="w-3 h-3 rounded-full bg-green-400/70" />
            </div>
            <div className="p-6 grid grid-cols-3 gap-4 text-left">
              <div className="col-span-2 bg-slate-950/60 rounded-xl p-5 border border-white/5">
                <p className="text-xs text-slate-500 mb-2">Monthly Recurring Revenue</p>
                <p className="text-2xl font-bold text-white">$482,910 <span className="text-green-400 text-sm font-medium">+12.4%</span></p>
                <div className="mt-4 flex items-end gap-1.5 h-24">
                  {[40,55,48,70,62,85,100].map((h,i) => (
                    <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i===6 ? '#a78bfa' : `rgba(99,102,241,${0.3+i*0.08})` }} />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {[['Active users','24,812'],['Churn','1.9%'],['NPS','67']].map(([l,v]) => (
                  <div key={l} className="bg-slate-950/60 rounded-xl p-4 border border-white/5">
                    <p className="text-xs text-slate-500">{l}</p>
                    <p className="text-xl font-bold text-white">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* LOGOS */}
      <section className="border-y border-white/5 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <p className="text-center text-xs uppercase tracking-widest text-slate-600 mb-6">Trusted by data teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-slate-500 font-semibold">
            {['Lattice','Ramp','Vercel','Retool','Notion','Linear'].map(n => <span key={n}>{n}</span>)}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-xl">
          <p className="text-sm font-medium text-indigo-400 mb-3">Why Lumivox</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Everything you need, nothing you don&apos;t.</h2>
        </div>
        {loading ? (
          <p className="mt-12 text-slate-500">Loading features…</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {(features.length > 0 ? features : [
              { id:1, title:'Ask in plain English', description:'Type "revenue by region last quarter" and get a chart.', icon:'message-square' },
              { id:2, title:'60+ integrations', description:'Postgres, Snowflake, Stripe, Salesforce and more.', icon:'plug' },
              { id:3, title:'Enterprise-grade security', description:'SOC 2 Type II, row-level permissions, and SSO.', icon:'shield-check' },
            ]).map((f, i) => (
              <motion.div key={f.id} className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-indigo-400/30 transition" initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.1 }}>
                <div className={`w-10 h-10 rounded-xl ${bgMap[f.icon||''] || 'bg-indigo-500/15'} grid place-items-center mb-4`}>
                  {iconMap[f.icon||''] || <MessageSquare className="w-5 h-5 text-indigo-400" />}
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400">{f.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* STATS */}
      <section className="bg-slate-900/40 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[['3,200+','Teams onboarded'],['18min','Avg. setup time'],['99.98%','Uptime SLA'],['4.9/5','G2 rating']].map(([v,l]) => (
            <div key={l}><p className="text-4xl font-extrabold text-white">{v}</p><p className="text-sm text-slate-500 mt-1">{l}</p></div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-6 text-amber-400">
            {[...Array(5)].map((_,i) => <Star key={i} className="w-5 h-5 fill-amber-400" />)}
          </div>
          <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed">&ldquo;We replaced three BI tools with Lumivox and cut our reporting time by 80%.&rdquo;</p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <img src="https://i.pravatar.cc/48?img=32" className="w-11 h-11 rounded-full" alt="avatar" />
            <div className="text-left">
              <p className="font-semibold text-white">Priya Nadella</p>
              <p className="text-sm text-slate-500">VP Analytics, Ramp</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'radial-gradient(120% 120% at 80% 0%, #1e1b4b 0%, #0f172a 55%, #020617 100%)' }}>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Start shipping dashboards today.</h2>
          <p className="mt-4 text-slate-400">Free for 14 days. No credit card required.</p>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <button className="bg-red-500 text-white font-medium px-6 py-3 rounded-xl hover:bg-red-600 transition">Create free account</button>
            <button className="border border-white/10 text-slate-200 px-6 py-3 rounded-xl hover:bg-white/5 transition">Talk to sales</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-8">
          <div>
            <p className="font-bold text-white mb-3">Lumivox</p>
            <p className="text-sm text-slate-500">Analytics that ships itself.</p>
          </div>
          {[['Product',['Features','Pricing','Demo']],['Company',['Customers','Blog','Contact']],['Account',['Sign in','Start free']]].map(([title, items]) => (
            <div key={title as string}>
              <p className="text-sm font-semibold text-white mb-3">{title as string}</p>
              <ul className="space-y-2 text-sm text-slate-500">
                {(items as string[]).map(i => <li key={i}><span className="hover:text-white cursor-pointer transition">{i}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 py-6 text-center text-xs text-slate-600">© 2024 Lumivox. All rights reserved.</div>
      </footer>
    </div>
  );
}