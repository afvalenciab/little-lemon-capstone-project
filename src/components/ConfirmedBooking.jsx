import { useNavigate } from 'react-router-dom';
import './ConfirmedBooking.css';

function ConfirmedBooking() {
  const navigate = useNavigate();

  return (
    <section className="confirmed-booking">
      <div className="confirmed-content">
        <h1>Booking Confirmed!</h1>
        <p>Your reservation has been successfully confirmed.</p>
        <p>Thank you for choosing Little Lemon!</p>
        <button 
          className="home-button"
          onClick={() => navigate('/')}
        >
          Return to Home
        </button>
      </div>
    </section>
  );
}

export default ConfirmedBooking; 