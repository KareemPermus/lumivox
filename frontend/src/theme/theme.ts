export const themeTokens = {
  colors: {
    primary: '#64748B',
    accent: '#F97316',
    red: '#DC2626',
    indigo: '#6366f1',
    violet: '#8b5cf6',
    background: '#020617',
    surface: '#0f172a',
    surfaceLight: '#1e293b',
    textPrimary: '#f1f5f9',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    border: 'rgba(255,255,255,0.05)',
    white: '#ffffff',
  },
  gradients: {
    headerPrimary: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 55%, #020617 100%)',
    panelDark: 'linear-gradient(135deg, #0f172a, #020617)',
    hero: 'radial-gradient(120% 120% at 80% 0%, #1e1b4b 0%, #0f172a 55%, #020617 100%)',
    accentButton: 'linear-gradient(to right, #6366f1, #8b5cf6)',
  },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    h1: { fontSize: '3.5rem', fontWeight: 800 },
    h2: { fontSize: '2.25rem', fontWeight: 700 },
    h3: { fontSize: '1.125rem', fontWeight: 600 },
    body1: { fontSize: '0.875rem', fontWeight: 400 },
    body2: { fontSize: '0.75rem', fontWeight: 400 },
  },
  radius: { sm: '8px', md: '12px', lg: '16px', xl: '20px' },
};

export default themeTokens;