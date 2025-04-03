import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookingPage from '../BookingPage';

describe('BookingPage', () => {
  it('should render the "Reserve a Table" heading', () => {
    render(<BookingPage />);
    const headingElement = screen.getByText('Reserve a Table');
    expect(headingElement).toBeInTheDocument();
  });
}); 