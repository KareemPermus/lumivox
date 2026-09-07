import { render, screen, waitFor } from '@testing-library/react';
import Features from '@/pages/features';
import apiClient from '@/api/client';

jest.mock('@/api/client', () => ({
  __esModule: true,
  default: { get: jest.fn() },
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

const mockFeatures = [
  { id: 1, title: 'Feature One', description: 'Desc one', icon: 'zap' },
  { id: 2, title: 'Feature Two', description: 'Desc two', icon: 'plug' },
];

describe('Features page', () => {
  it('renders features from API', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockFeatures });
    render(<Features />);
    await waitFor(() => {
      expect(screen.getByText('Feature One')).toBeInTheDocument();
      expect(screen.getByText('Desc two')).toBeInTheDocument();
    });
  });

  it('shows error on API failure', async () => {
    (apiClient.get as jest.Mock).mockRejectedValue(new Error('fail'));
    render(<Features />);
    await waitFor(() => {
      expect(screen.getByText('Failed to load features.')).toBeInTheDocument();
    });
  });

  it('shows empty state', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({ data: [] });
    render(<Features />);
    await waitFor(() => {
      expect(screen.getByText('No features available yet.')).toBeInTheDocument();
    });
  });
});