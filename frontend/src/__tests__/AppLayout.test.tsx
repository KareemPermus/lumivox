import React from 'react';
import { render, screen } from '@testing-library/react';
import AppLayout from '@/components/layout/AppLayout';

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});

describe('AppLayout', () => {
  it('renders navbar brand and children', () => {
    render(<AppLayout><div data-testid="child">Hello</div></AppLayout>);
    expect(screen.getByText('Lumivox')).toBeTruthy();
    expect(screen.getByTestId('child')).toBeTruthy();
  });
});