import { motion } from 'framer-motion';
import { MessageSquare, Plug, ShieldCheck } from 'lucide-react';
import { Feature } from '@/types';

const fallbackIcons: Record<string, React.ReactNode> = {
  'message-square': <MessageSquare className="w-5 h-5 text-red-400" />,
  'plug': <Plug className="w-5 h-5 text-violet-400" />,
  'shield-check': <ShieldCheck className="w-5 h-5 text-emerald-400" />,
};

const iconColors = ['bg-red-500/15', 'bg-violet-500/15', 'bg-emerald-500/15'];

interface Props {
  features: Feature[];
  loading: boolean;
  error: string;
}

export default function FeaturesShowcase({ features, loading, error }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="max-w-xl">
        <p className="text-sm font-medium text-red-400 mb-3">Why Lumivox</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Everything you need, nothing you don&apos;t.</h2>
      </div>
      {loading && <p className="mt-12 text-slate-500">Loading features…</p>}
      {error && <p className="mt-12 text-red-400">{error}</p>}
      {!loading && !error && (
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {features.map((f, i) => (
            <motion.div key={f.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-red-400/30 transition">
              <div className={`w-10 h-10 rounded-xl ${iconColors[i % iconColors.length]} grid place-items-center mb-4`}>
                {f.icon && fallbackIcons[f.icon] ? fallbackIcons[f.icon] : <MessageSquare className="w-5 h-5 text-red-400" />}
              </div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400">{f.description}</p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}