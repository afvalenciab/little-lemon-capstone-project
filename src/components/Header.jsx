import Nav from './Nav';
import Logo from '../assets/Logo.svg';
import './Header.css';

function Header() {
    return (
        <header>
            <img src={Logo} alt="Little Lemon Logo" />
            <Nav />
        </header>
    );
}

export default Header; 