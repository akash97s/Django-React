import { render, screen } from '@testing-library/react';
import Home from '../index';

describe('Home Page', () => {
  test('renders the dashboard title', () => {
    render(<Home />);
    const titleElement = screen.getByText(/Dashboard/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('shows loading text for candlestick data', () => {
    render(<Home />);
    const loadingText = screen.getByText(/Loading Candlestick Data.../i);
    expect(loadingText).toBeInTheDocument();
  });
});
