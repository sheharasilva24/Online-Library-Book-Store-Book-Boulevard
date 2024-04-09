import React from 'react';
import { FaStar } from "react-icons/fa";
import './Css/ReviewCard.css';

const ReviewCard = ({ stars, review, profileImageUrl }) => {
    return (
        <div className="review-card">
            <div className="review-header">
                {profileImageUrl && <img src={profileImageUrl} alt="Profile" className="profile-image"/>}
                <div className="stars">
                    {Array.from({ length: stars }, (_, index) => (
                        <FaStar key={index} color="#FFBA5A" />
                    ))}
                </div>
            </div>
            <div className="review">{review}</div>
        </div>
    );
};

export default ReviewCard;
