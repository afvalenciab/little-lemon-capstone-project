import Logo from "../assets/Logo.svg";
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src={Logo} alt="Little Lemon Logo" />
                </div>
                <div className="footer-columns">
                    <div className="footer-column">
                        <h3>Doormat Navigation</h3>
                        <ul>
                            <li><a to="#">Home</a></li>
                            <li><a to="#">About</a></li>
                            <li><a to="#">Menu</a></li>
                            <li><a to="#">Reservations</a></li>
                            <li><a to="#">Order Online</a></li>
                            <li><a to="#">Login</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Contact</h3>
                        <ul>
                            <li>Address: 123 Main Street, Chicago, IL 60601</li>
                            <li>Phone: (555) 123-4567</li>
                            <li>Email: info@littlelemon.com</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Social Media</h3>
                        <ul>
                            <li><a href="https://facebook.com">Facebook</a></li>
                            <li><a href="https://instagram.com">Instagram</a></li>
                            <li><a href="https://twitter.com">Twitter</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer; 