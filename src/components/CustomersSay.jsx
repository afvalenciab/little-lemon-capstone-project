import { useState } from 'react';
import customer from '../assets/a_random_person.jpeg';
import './CustomersSay.css';

const testimonials = [
    {
        id: 1,
        name: "John Smith",
        image: customer,
        rating: 5,
        review: "The food was absolutely delicious! The atmosphere was perfect for a family dinner. Will definitely come back!"
    },
    {
        id: 2,
        name: "Sarah Johnson",
        image: customer,
        rating: 4,
        review: "Great Mediterranean cuisine! The service was excellent and the prices are reasonable. Highly recommend the Greek salad!"
    },
    {
        id: 3,
        name: "Michael Brown",
        image: customer,
        rating: 5,
        review: "One of the best restaurants in Chicago! The lemon dessert is to die for. The staff is friendly and attentive."
    },
    {
        id: 4,
        name: "Emily Davis",
        image: customer,
        rating: 5,
        review: "Authentic Mediterranean flavors! The bruschetta was amazing. Perfect place for a date night or family gathering."
    }
];

function CustomersSay() {
    const [testimonialsList] = useState(testimonials);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span 
                key={index} 
                className={`star ${index < rating ? 'filled' : ''}`}
            >
                ★
            </span>
        ));
    };

    return (
        <section className="testimonials-section">
            <div className="testimonials-content">
                <h2>What Our Customers Say</h2>
                <div className="testimonials-grid">
                    {testimonialsList.map(testimonial => (
                        <article key={testimonial.id} className="testimonial-card">
                            <div className="testimonial-header">
                                <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name}
                                    className="customer-image"
                                />
                                <div className="customer-info">
                                    <h3>{testimonial.name}</h3>
                                    <div className="rating">
                                        {renderStars(testimonial.rating)}
                                    </div>
                                </div>
                            </div>
                            <p className="review-text">{testimonial.review}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CustomersSay; 