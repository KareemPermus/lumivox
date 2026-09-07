import { render, screen } from '@testing-library/react';
import Home from '@/pages/home';
import apiClient from '@/api/client';

jest.mock('@/api/client', () => ({ __esModule: true, default: { get: jest.fn() } }));
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: new Proxy({}, { get: (_, tag) => React.forwardRef((props: any, ref: any) => React.createElement(tag as string, { ...props, ref })) }),
  };
});

describe('Home page /home', () => {
  beforeEach(() => {
    (apiClient.get as jest.Mock).mockResolvedValue({ data: [
      { id: 1, title: 'Fast', description: 'Speed matters', icon: 'plug' }
    ]});
  });

  it('renders hero heading', () => {
    render(<Home />);
    expect(screen.getByText(/ships itself/i)).toBeInTheDocument();
  });

  it('fetches features from /api/features', () => {
    render(<Home />);
    expect(apiClient.get).toHaveBeenCalledWith('/api/features');
  });

  it('renders fetched feature title', async () => {
    render(<Home />);
    expect(await screen.findByText('Fast')).toBeInTheDocument();
  });

  it('renders stats section', () => {
    render(<Home />);
    expect(screen.getByText('99.98%')).toBeInTheDocument();
  });
});