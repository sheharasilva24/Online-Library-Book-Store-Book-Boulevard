import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
import booksData from '../Components/Data/carouselBooks.json'; // Update the path as necessary

const BookCarousel = () => {
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 3,
      },
      600: {
        items: 7,
      },
      1000: {
        items: 11,
      },
    },
  };

  return (
    <OwlCarousel className="owl-theme" {...options}>
      {booksData.books.map((book) => (
        <div key={book.id} className="item">
          <Link to={`/book/${book.id}`}>
            <img src={book.image} alt={book.title} style={{ width: '100%', height: 'auto' }} />
          </Link>
        </div>
      ))}
    </OwlCarousel>
  );
};

export default BookCarousel;
