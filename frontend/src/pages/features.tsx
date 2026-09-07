import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Plug, ShieldCheck, Zap, BarChart3, Lock, Globe, Cpu, Layers } from 'lucide-react';
import apiClient from '@/api/client';
import { Feature } from '@/types';

const iconMap: Record<string, React.ReactNode> = {
  'message-square': <MessageSquare className="w-5 h-5 text-indigo-400" />,
  'plug': <Plug className="w-5 h-5 text-violet-400" />,
  'shield-check': <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  'zap': <Zap className="w-5 h-5 text-amber-400" />,
  'bar-chart': <BarChart3 className="w-5 h-5 text-indigo-400" />,
  'lock': <Lock className="w-5 h-5 text-red-400" />,
  'globe': <Globe className="w-5 h-5 text-cyan-400" />,
  'cpu': <Cpu className="w-5 h-5 text-violet-400" />,
  'layers': <Layers className="w-5 h-5 text-emerald-400" />,
};

const bgColors: string[] = [
  'bg-indigo-500/15',
  'bg-violet-500/15',
  'bg-emerald-500/15',
  'bg-amber-500/15',
  'bg-red-500/15',
  'bg-cyan-500/15',
];

export default function Features() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.get('/api/features')
      .then(res => setFeatures(res.data))
      .catch(() => setError('Failed to load features.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-sm font-medium text-indigo-400 mb-3">Why Lumivox</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Everything you need, nothing you don&apos;t.
          </h1>
          <p className="mt-4 text-slate-400 max-w-xl">
            Explore the full set of features that make Lumivox the best choice for your team.
          </p>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && features.length === 0 && (
          <p className="text-center text-slate-500 py-20">No features available yet.</p>
        )}

        {!loading && !error && features.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-indigo-400/30 transition"
              >
                <div className={`w-10 h-10 rounded-xl ${bgColors[i % bgColors.length]} grid place-items-center mb-4`}>
                  {f.icon && iconMap[f.icon] ? iconMap[f.icon] : <Zap className="w-5 h-5 text-indigo-400" />}
                </div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400">{f.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}