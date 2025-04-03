import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import BookingPage from './BookingPage';
import { fetchAPI, submitAPI } from '../api/api';

// Mock the API functions
vi.mock('../api/api', () => ({
  fetchAPI: vi.fn(),
  submitAPI: vi.fn(),
}));

// Mock the navigate function from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Helper function to render the component with router context
const renderBookingPage = () => {
  return render(
    <BrowserRouter>
      <BookingPage />
    </BrowserRouter>
  );
};

describe('BookingPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchAPI.mockImplementation(() => ['17:00', '17:30', '18:00']);
    submitAPI.mockImplementation(() => true);
  });

  test('renders the booking form', () => {
    renderBookingPage();

    // Check main elements
    expect(screen.getByText('Reserve a Table')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Reserve Table' })
    ).toBeInTheDocument();

    // Check essential form fields
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Time')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of Guests')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  test('loads available times when date is selected', async () => {
    renderBookingPage();

    const dateInput = screen.getByLabelText('Date');
    fireEvent.change(dateInput, { target: { value: '2024-04-15' } });

    expect(fetchAPI).toHaveBeenCalledWith(expect.any(Date));

    await waitFor(() => {
      expect(screen.getByLabelText('Time')).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    renderBookingPage();

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Date'), {
      target: { value: '2024-04-15' },
    });

    await waitFor(() => {
      expect(screen.getByLabelText('Time')).toBeInTheDocument();
    });

    // Select time from dropdown
    const timeSelect = screen.getByLabelText('Time');
    fireEvent.change(timeSelect, { target: { value: '17:00' } });

    // Select number of guests from dropdown
    const guestsSelect = screen.getByLabelText('Number of Guests');
    fireEvent.change(guestsSelect, { target: { value: '2' } });

    // Select occasion from dropdown
    const occasionSelect = screen.getByLabelText('Occasion');
    fireEvent.change(occasionSelect, { target: { value: 'birthday' } });

    // Fill in text inputs
    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Phone Number'), {
      target: { value: '1234567890' },
    });

    // Wait for the form to be valid and then submit
    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: 'Reserve Table' });
      expect(submitButton).not.toBeDisabled();
      fireEvent.click(submitButton);
    });

    // Verify submission
    expect(submitAPI).toHaveBeenCalledWith({
      date: '2024-04-15',
      time: '17:00',
      guests: '2',
      occasion: 'birthday',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
    });

    // Verify navigation
    expect(mockNavigate).toHaveBeenCalledWith('/booking-confirmed');
  });

  test('shows error when submission fails', async () => {
    submitAPI.mockImplementation(() => false);
    const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {});

    renderBookingPage();

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Date'), {
      target: { value: '2024-04-15' },
    });

    await waitFor(() => {
      expect(screen.getByLabelText('Time')).toBeInTheDocument();
    });

    // Select time from dropdown
    const timeSelect = screen.getByLabelText('Time');
    fireEvent.change(timeSelect, { target: { value: '17:00' } });

    // Select number of guests from dropdown
    const guestsSelect = screen.getByLabelText('Number of Guests');
    fireEvent.change(guestsSelect, { target: { value: '2' } });

    // Select occasion from dropdown
    const occasionSelect = screen.getByLabelText('Occasion');
    fireEvent.change(occasionSelect, { target: { value: 'birthday' } });

    // Fill in text inputs
    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Phone Number'), {
      target: { value: '1234567890' },
    });

    // Submit the form
    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: 'Reserve Table' });
      expect(submitButton).not.toBeDisabled();
      fireEvent.click(submitButton);
    });

    // Verify error handling
    expect(mockAlert).toHaveBeenCalledWith(
      'There was an error submitting your booking. Please try again.'
    );
    expect(mockNavigate).not.toHaveBeenCalled();

    mockAlert.mockRestore();
  });
});
