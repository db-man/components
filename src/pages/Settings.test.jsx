import React from 'react';
import { render, screen } from '@testing-library/react';
import Settings from './Settings';

describe('Settings', () => {
  it('renders Settings', () => {
    render(<Settings />);
    const el = screen.getByText(/Settings/i);
    expect(el).toBeInTheDocument();
  });
});
