import restaurantChef from '../assets/restaurantChefB.jpg';
import restaurantOutside from '../assets/restaurant.jpg';
import './Chicago.css';

function Chicago() {
    return (
        <section className="chicago-section">
            <div className="chicago-content">
                <div className="chicago-text">
                    <h2>Little Lemon</h2>
                    <h3>Chicago</h3>
                    <p>
                        Little Lemon is owned by two Italian brothers, Mario and Adrian, who moved to the United States to pursue their shared dream of owning a restaurant.
                    </p>
                    <p>
                        To craft the menu, Mario relies on family recipes and his experience as a chef in Italy. Adrian does all the marketing for the restaurant and manages the dining room.
                    </p>
                    <p>
                        Our restaurant is located in the heart of Chicago, serving authentic Mediterranean cuisine with a modern twist. We take pride in using fresh, locally sourced ingredients to create memorable dining experiences for our guests.
                    </p>
                </div>
                <div className="chicago-images">
                    <img 
                        src={restaurantChef} 
                        alt="Little Lemon restaurant interior"
                        className="chicago-img main"
                    />
                    <img 
                        src={restaurantOutside}
                        alt="Little Lemon restaurant food"
                        className="chicago-img secondary"
                    />
                </div>
            </div>
        </section>
    );
}

export default Chicago; 