import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AppLayout from './AppLayout';

it('navigates settings page', () => {
  render(
    <MemoryRouter initialEntries={['/settings']}>
      <AppLayout />
    </MemoryRouter>,
  );
  const linkElement = screen.getByText(/Settings/i);
  expect(linkElement).toBeInTheDocument();
});

it('navigates db page', () => {
  /* const { asFragment } = */ render(
    <MemoryRouter initialEntries={['/foo']}>
      <AppLayout />
    </MemoryRouter>,
  );
  const linkElement = screen.getByText(/List of tables in DB:/i);

  expect(linkElement).toBeInTheDocument();
  // expect(asFragment()).toMatchSnapshot();
});
