import React, { useState, useEffect } from 'react';
import style from './Css/Cards.css';
import ProfileSection from './ProfileSection';
import Navbar from './Navbar';
import Footer from './Footer';
import {Link} from "react-router-dom";

const CardsPage = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // Update this URL to your backend API endpoint
        fetch(`${process.env.REACT_APP_API_PATH}/books/all`)
            .then(response => response.json())
            .then(data => setCards(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="cards-page">
            <Navbar />
            <ProfileSection username="Yevin Mawathage" profileImage="profile.jpg" />
            <div className="gallery">
                {cards.map(card => ( // Updated variable name from 'card' to 'cards' for clarity
                    <div key={card.id} className="card">
                        <div className="book-image">
                            <img src={card.bookImg} alt={card.bookName} className='cardimage'/>
                        </div>
                        <div className="card-content">
                            <div className="card-details">
                                <h2 className='cardheading'>{card.bookName}</h2>
                                <p className='cardpara'><strong></strong> {card.author}</p>
                                <p className='card-des'>{card.aboutBook}</p>
                                <button className='cardbutton'>
                                    <Link to={`/books/${card._id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                        View
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default CardsPage;
