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
    // Reset all mocks before each test
    vi.clearAllMocks();
    
    // Setup default mock implementations
    fetchAPI.mockImplementation(() => ['17:00', '17:30', '18:00']);
    submitAPI.mockImplementation(() => true);
  });

  test('renders booking form with all fields', () => {
    renderBookingPage();
    
    // Check if main elements are rendered
    expect(screen.getByText('Reserve a Table')).toBeInTheDocument();
    expect(screen.getByText('Please fill out the form below to make a reservation.')).toBeInTheDocument();
    
    // Check form fields
    expect(screen.getByLabelText('Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Time')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of Guests')).toBeInTheDocument();
    expect(screen.getByLabelText('Occasion')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reserve Table' })).toBeInTheDocument();
  });

  test('loads available times when date is selected', async () => {
    renderBookingPage();
    
    const dateInput = screen.getByLabelText('Date');
    fireEvent.change(dateInput, { target: { value: '2024-04-15' } });
    
    // Verify fetchAPI was called with the correct date
    expect(fetchAPI).toHaveBeenCalledWith(expect.any(Date));
    
    // Wait for the time options to be populated
    await waitFor(() => {
      expect(screen.getByLabelText('Time')).toBeInTheDocument();
    });
  });

  test('submits form with valid data and navigates on success', async () => {
    renderBookingPage();
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2024-04-15' } });
    
    // Wait for time options to be populated
    await waitFor(() => {
      expect(screen.getByLabelText('Time')).toBeInTheDocument();
    });
    
    fireEvent.change(screen.getByLabelText('Time'), { target: { value: '17:00' } });
    fireEvent.change(screen.getByLabelText('Number of Guests'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('Occasion'), { target: { value: 'birthday' } });
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Reserve Table' }));
    
    // Verify submitAPI was called with the correct data
    expect(submitAPI).toHaveBeenCalledWith({
      date: '2024-04-15',
      time: '17:00',
      guests: '2',
      occasion: 'birthday',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
    });
    
    // Verify navigation occurred
    expect(mockNavigate).toHaveBeenCalledWith('/booking-confirmed');
  });

  test('shows error alert when form submission fails', async () => {
    // Mock submitAPI to return false (failure)
    submitAPI.mockImplementation(() => false);
    
    // Mock window.alert
    const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    renderBookingPage();
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2024-04-15' } });
    
    // Wait for time options to be populated
    await waitFor(() => {
      expect(screen.getByLabelText('Time')).toBeInTheDocument();
    });
    
    fireEvent.change(screen.getByLabelText('Time'), { target: { value: '17:00' } });
    fireEvent.change(screen.getByLabelText('Number of Guests'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('Occasion'), { target: { value: 'birthday' } });
    fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone Number'), { target: { value: '1234567890' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Reserve Table' }));
    
    // Verify error alert was shown
    expect(mockAlert).toHaveBeenCalledWith('There was an error submitting your booking. Please try again.');
    
    // Verify navigation did not occur
    expect(mockNavigate).not.toHaveBeenCalled();
    
    // Restore window.alert
    mockAlert.mockRestore();
  });
}); 