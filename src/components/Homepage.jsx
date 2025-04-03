import CallToAction from './CallToAction';
import Specials from './Specials';
import CustomersSay from './CustomersSay';
import Chicago from './Chicago';
import './Homepage.css';

function Homepage() {
    return (
        <main className="homepage">
            <CallToAction />
            <Specials />
            <CustomersSay />
            <Chicago />
        </main>
    );
}

export default Homepage; 