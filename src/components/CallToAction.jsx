import { Link } from 'react-router-dom';
import restaurantFood from '../assets/restauranfood.jpg';
import './CallToAction.css';

function CallToAction() {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <div className="hero-text">
                    <h1>Little Lemon</h1>
                    <h2>Chicago</h2>
                    <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                    <Link to="/reservations" className="cta-button">
                        Reserve a Table
                    </Link>
                </div>
                <div className="hero-image">
                    <img 
                        src={restaurantFood}
                        alt="Little Lemon restaurant cuisine"
                        className="hero-img"
                    />
                </div>
            </div>
        </section>
    );
}

export default CallToAction; 