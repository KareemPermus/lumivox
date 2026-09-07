import { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Feature } from '@/types';
import apiClient from '@/api/client';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesShowcase from '@/components/FeaturesShowcase';
import Footer from '@/components/Footer';

export default function Home() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.get('/api/features')
      .then(res => setFeatures(res.data))
      .catch(() => setError('Failed to load features'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Head>
        <title>Lumivox — Voice that illuminates</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div className="min-h-screen bg-slate-950 text-slate-200" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <Navbar />
        <HeroSection />

        {/* Logos */}
        <section className="border-y border-white/5 bg-slate-950">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <p className="text-center text-xs uppercase tracking-widest text-slate-600 mb-6">Trusted by teams at</p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-slate-500 font-semibold">
              {['Lattice','Ramp','Vercel','Retool','Notion','Linear'].map(n => <span key={n}>{n}</span>)}
            </div>
          </div>
        </section>

        <FeaturesShowcase features={features} loading={loading} error={error} />

        {/* Stats */}
        <section className="bg-slate-900/40 border-y border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: '3,200+', label: 'Teams onboarded' },
              { val: '18min', label: 'Avg. setup time' },
              { val: '99.98%', label: 'Uptime SLA' },
              { val: '4.9/5', label: 'G2 rating' },
            ].map(s => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-4xl font-extrabold text-white">{s.val}</p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-6 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z"/></svg>
              ))}
            </div>
            <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed">
              &ldquo;We replaced three tools with Lumivox and cut our reporting time by 80%. Our PMs finally answer their own questions.&rdquo;
            </p>
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
              <button className="bg-red-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-red-700 transition">Create free account</button>
              <button className="border border-white/10 text-slate-200 px-6 py-3 rounded-xl hover:bg-white/5 transition">Talk to sales</button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}