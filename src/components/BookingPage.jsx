import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAPI, submitAPI } from '../api/api';
import './BookingPage.css';

function BookingPage() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const [availableTimes, setAvailableTimes] = useState([]);
  const [formData, setFormData] = useState({
    date: today,
    time: '',
    guests: '1',
    occasion: 'birthday',
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (formData.date) {
      setFormData((prevState) => ({ ...prevState, time: '' }));
      const times = fetchAPI(new Date(formData.date));
      setAvailableTimes(times);
    }
  }, [formData.date]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = submitAPI(formData);

    if (success) {
      navigate('/booking-confirmed');
    } else {
      alert('There was an error submitting your booking. Please try again.');
    }
  };

  return (
    <section className='booking-section'>
      <div className='booking-content'>
        <h1>Reserve a Table</h1>
        <p>Please fill out the form below to make a reservation.</p>

        <form onSubmit={handleSubmit} className='booking-form'>
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='date'>Date</label>
              <input
                type='date'
                id='date'
                name='date'
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='time'>Time</label>
              <select
                id='time'
                name='time'
                value={formData.time}
                onChange={handleChange}
                required
              >
                <option value=''>Select a time</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='guests'>Number of Guests</label>
              <select
                id='guests'
                name='guests'
                value={formData.guests}
                onChange={handleChange}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor='occasion'>Occasion</label>
              <select
                id='occasion'
                name='occasion'
                value={formData.occasion}
                onChange={handleChange}
                required
              >
                <option value='birthday'>Birthday</option>
                <option value='anniversary'>Anniversary</option>
                <option value='business'>Business</option>
                <option value='other'>Other</option>
              </select>
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='name'>Full Name</label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='phone'>Phone Number</label>
            <input
              type='tel'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type='submit' className='submit-button'>
            Reserve Table
          </button>
        </form>
      </div>
    </section>
  );
}

export default BookingPage;
