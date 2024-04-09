import React, { useState, useEffect } from 'react';
import ReviewCard from '../Components/ReviewCard';
import Navbar from '../Components/Navbar';
import { FaStar } from "react-icons/fa";
import './styles/Testimonials.css';
import jwt_decode from "jwt-decode";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};

const Testimonials = () => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_PATH}/testimonial/getTestimonials`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error("Fetching reviews failed:", err));
  }, []);

  const handleClick = value => setCurrentValue(value);
  const handleMouseOver = value => setHoverValue(value);
  const handleMouseLeave = () => setHoverValue(undefined);



  const handleReviewSubmit = () => {
    if (currentValue !== 0 && reviewText.trim() !== '') {
      const token = localStorage.getItem('jwtToken'); // Ensure this key matches where you store the token
      const newReview = { rating: currentValue, text: reviewText };

      fetch(`${process.env.REACT_APP_API_PATH}/testimonial/createTestimonial`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Properly formatted Authorization header with Bearer scheme
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newReview),
      })
          .then(res => res.json())
          .then(data => {
            setReviews([...reviews, data]);
            setReviewText('');
            setCurrentValue(0);
          })
          .catch(err => console.error('Error posting review:', err));
    }
  };


  return (
    <div className="testimonials-container">
      <Navbar /> {/* Assuming Navbar is prepared to render */}
      <div className="testimonials-container-brack">
        <h1>Share Your Experience</h1>
        <p>Have you experienced the magic of Book Boulevard? Share your thoughts, insights, and favorite moments with us!<br /> Your voice is the heart of our community, inspiring others to explore and discover the wonders of literature.<br /> Let your testimonial shine bright and illuminate the path for fellow book lovers!</p>
        <div className="rating-section">
          <h2>Add Rating in Stars</h2>
          <div className="stars">
            {Array(5).fill(0).map((_, index) => (
              <FaStar
                key={index}
                size={60}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                style={{ marginRight: 10, cursor: "pointer" }}
              />
            ))}
          </div>
          <textarea
            placeholder="You Had Me at Hola by Alexis Daria is a captivating contemporary romance novel..."
            className="testo-textarea"
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
          />
          <button className="landing-btn" data="Submit Review" onClick={handleReviewSubmit}></button>
          <div className="review-cards">
            {reviews.map((review, index) => (
                <ReviewCard key={index} stars={review.rating} review={review.text} profileImageUrl={review.profile} />
            ))}
          </div>|
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
