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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData.date) {
      setFormData((prevState) => ({ ...prevState, time: '' }));
      const times = fetchAPI(new Date(formData.date));
      setAvailableTimes(times);
    }
  }, [formData.date]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.length < 2) {
          error = 'Name must be at least 2 characters long';
        }
        break;
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value) {
          error = 'Phone number is required';
        } else if (!/^\+?[\d\s-()]{10,}$/.test(value)) {
          error = 'Please enter a valid phone number';
        }
        break;
      case 'date':
        if (!value) {
          error = 'Date is required';
        } else if (new Date(value) < new Date(today)) {
          error = 'Cannot select a past date';
        }
        break;
      case 'time':
        if (!value) {
          error = 'Time is required';
        }
        break;
      case 'guests':
        if (!value || parseInt(value) < 1) {
          error = 'At least one guest is required';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validate the field and update errors
    const error = validateField(name, value);
    setErrors((prevState) => {
      const newErrors = { ...prevState };
      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    // If there are no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      const success = submitAPI(formData);
      if (success) {
        navigate('/booking-confirmed');
      } else {
        alert('There was an error submitting your booking. Please try again.');
      }
    }
  };

  const isFormValid = () => {
    if (Object.values(errors).some((item) => item !== '')) {
      return false;
    }

    // Check if all required fields have values
    return (
      formData.date &&
      formData.time &&
      formData.guests &&
      formData.occasion &&
      formData.name.trim() &&
      formData.email &&
      formData.phone
    );
  };

  return (
    <section className='booking-section'>
      <div className='booking-content'>
        <h1>Reserve a Table</h1>
        <p>Please fill out the form below to make a reservation.</p>

        <form onSubmit={handleSubmit} className='booking-form' aria-label="Reservation form">
          <div className='form-row'>
            <div className='form-group'>
              <label htmlFor='date'>Date</label>
              <input
                type='date'
                id='date'
                name='date'
                value={formData.date}
                onChange={handleChange}
                min={today}
                required
                aria-required="true"
                aria-invalid={errors.date ? "true" : "false"}
                aria-describedby={errors.date ? "date-error" : undefined}
              />
              {errors.date && (
                <span className='error-message' id="date-error" role="alert">{errors.date}</span>
              )}
            </div>
            <div className='form-group'>
              <label htmlFor='time'>Time</label>
              <select
                id='time'
                name='time'
                value={formData.time}
                onChange={handleChange}
                required
                aria-required="true"
                aria-invalid={errors.time ? "true" : "false"}
                aria-describedby={errors.time ? "time-error" : undefined}
              >
                <option value=''>Select a time</option>
                {availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.time && (
                <span className='error-message' id="time-error" role="alert">{errors.time}</span>
              )}
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
                min='1'
                max='10'
                aria-required="true"
                aria-invalid={errors.guests ? "true" : "false"}
                aria-describedby={errors.guests ? "guests-error" : undefined}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
              {errors.guests && (
                <span className='error-message' id="guests-error" role="alert">{errors.guests}</span>
              )}
            </div>
            <div className='form-group'>
              <label htmlFor='occasion'>Occasion</label>
              <select
                id='occasion'
                name='occasion'
                value={formData.occasion}
                onChange={handleChange}
                required
                aria-required="true"
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
                minLength='2'
                pattern='[A-Za-z\s]+'
                title='Please enter a valid name (letters and spaces only)'
                aria-required="true"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <span className='error-message' id="name-error" role="alert">{errors.name}</span>
              )}
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
                aria-required="true"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span className='error-message' id="email-error" role="alert">{errors.email}</span>
              )}
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
              pattern='^\+?[\d\s-()]{10,}$'
              title='Please enter a valid phone number'
              aria-required="true"
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <span className='error-message' id="phone-error" role="alert">{errors.phone}</span>
            )}
          </div>

          <button
            type='submit'
            className='submit-button'
            disabled={!isFormValid()}
            aria-label="On Click"
            aria-disabled={!isFormValid()}
          >
            Reserve Table
          </button>
        </form>
      </div>
    </section>
  );
}

export default BookingPage;
