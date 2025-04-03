import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="nav-container">
            <div className="nav-content">
                <Link to="/" className="logo">
                    Little Lemon
                </Link>
                <button 
                    className="mobile-menu-button"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    ☰
                </button>
                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
                    <li><Link to="/menu" onClick={() => setIsMenuOpen(false)}>Menu</Link></li>
                    <li><Link to="/reservations" onClick={() => setIsMenuOpen(false)}>Reservations</Link></li>
                    <li><Link to="/order-online" onClick={() => setIsMenuOpen(false)}>Order Online</Link></li>
                    <li><Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav; 