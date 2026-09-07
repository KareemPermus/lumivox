import path from 'path';

let db: any = null;

export function getDb() {
  if (db) return db;

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { createClient } = require('@supabase/supabase-js');
    db = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    return db;
  }

  const Database = require('better-sqlite3');
  db = new Database(path.join('/tmp', 'app.db'));
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS features (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT
    );
  `);

  const count = db.prepare('SELECT COUNT(*) as c FROM features').get();
  if ((count as any).c === 0) {
    const insert = db.prepare('INSERT INTO features (slug, title, description, icon) VALUES (?, ?, ?, ?)');
    insert.run('lightning-fast', 'Lightning Fast', 'Blazing fast performance optimized for modern workflows.', 'Zap');
    insert.run('secure-vault', 'Secure by Default', 'Enterprise-grade security baked into every layer.', 'Shield');
    insert.run('scalable-infra', 'Scalable Infrastructure', 'Grows with your business from startup to enterprise.', 'TrendingUp');
    insert.run('smart-analytics', 'Smart Analytics', 'Actionable insights powered by real-time data processing.', 'BarChart3');
    insert.run('seamless-integration', 'Seamless Integrations', 'Connect with hundreds of tools you already use.', 'Plug');
  }

  return db;
}