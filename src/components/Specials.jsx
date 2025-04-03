import { useState } from 'react';
import greekSalad from '../assets/greekSalad.jpg';
import bruschetta from '../assets/bruschetta.svg';
import lemonDessert from '../assets/lemonDessert.jpg';
import './Specials.css';

const specialDishes = [
    {
        id: 1,
        name: "Greek Salad",
        price: 12.99,
        description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
        image: greekSalad
    },
    {
        id: 2,
        name: "Bruschetta",
        price: 7.99,
        description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
        image: bruschetta
    },
    {
        id: 3,
        name: "Lemon Dessert",
        price: 6.99,
        description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
        image: lemonDessert
    }
];

function Specials() {
    const [dishes] = useState(specialDishes);

    return (
        <section className="specials-section">
            <div className="specials-content">
                <div className="specials-header">
                    <h2>This Week's Specials</h2>
                    <button className="online-menu-button">Online Menu</button>
                </div>
                <div className="specials-grid">
                    {dishes.map(dish => (
                        <article key={dish.id} className="special-card">
                            <div className="special-image">
                                <img src={dish.image} alt={dish.name} />
                            </div>
                            <div className="special-info">
                                <div className="special-header">
                                    <h3>{dish.name}</h3>
                                    <span className="price">${dish.price}</span>
                                </div>
                                <p>{dish.description}</p>
                                <button className="order-button">Order a delivery</button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Specials; 