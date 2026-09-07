import type { NextApiRequest, NextApiResponse } from 'next';
import { getDb } from '@/lib/db';
import type { Feature } from '@/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const db = getDb();

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { data, error } = await db.from('features').select('id, title, description, icon').order('id');
      if (error) throw error;
      return res.status(200).json(data as Feature[]);
    }

    const rows = db.prepare('SELECT id, title, description, icon FROM features ORDER BY id').all();
    return res.status(200).json(rows as Feature[]);
  } catch (err: any) {
    console.error('GET /api/features error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}