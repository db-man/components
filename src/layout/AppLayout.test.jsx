import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AppLayout from './AppLayout';

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

it('navigates settings page', () => {
  render(
    <MemoryRouter initialEntries={['/settings']}>
      <AppLayout modes={[]} />
    </MemoryRouter>,
  );
  const linkElement = screen.getByText(/Settings/i);
  expect(linkElement).toBeInTheDocument();
});

it('navigates db page', () => {
  /* const { asFragment } = */ render(
    <MemoryRouter initialEntries={['/foo']}>
      <AppLayout modes={[]} />
    </MemoryRouter>,
  );
  const linkElement = screen.getByText(/List of tables in DB:/i);

  expect(linkElement).toBeInTheDocument();
  // expect(asFragment()).toMatchSnapshot();
});
