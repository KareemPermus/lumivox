import { Feature } from '@/types';
import { Zap } from 'lucide-react';

interface FeaturesListProps {
  features: Feature[];
}

export default function FeaturesList({ features }: FeaturesListProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {features.map((f) => (
        <div
          key={f.id}
          className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-indigo-400/30 transition"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/15 grid place-items-center mb-4">
            <Zap className="w-5 h-5 text-indigo-400" />
          </div>
          <h3 className="font-semibold text-white mb-2">{f.title}</h3>
          <p className="text-sm text-slate-400">{f.description}</p>
        </div>
      ))}
    </div>
  );
}