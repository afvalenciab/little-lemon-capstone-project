import { Routes as RouterRoutes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import BookingPage from './BookingPage';
import Chicago from './Chicago';
import Specials from './Specials';
import CustomersSay from './CustomersSay';
import ConfirmedBooking from './ConfirmedBooking';

function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Homepage />} />
      <Route path="/reservations" element={<BookingPage />} />
      <Route path="/about" element={<Chicago />} />
      <Route path="/menu" element={<Specials />} />
      <Route path="/testimonials" element={<CustomersSay />} />
      <Route path="/booking-confirmed" element={<ConfirmedBooking />} />
    </RouterRoutes>
  );
}

export default Routes; 