import React from 'react';
import { render } from '@testing-library/react';
import App from './index';

test('renders header', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText(/javascript plot/i);
  expect(headerElement).toBeInTheDocument();
});
