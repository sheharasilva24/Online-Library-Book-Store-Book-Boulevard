import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles/BookDetails.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from "../Components/Navbar";
import { useNavigate } from 'react-router-dom';
import Footer from "../Components/Footer";


function BookDetails() {
  const [bookDetails, setBookDetails] = useState(null);
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(false);
  const [showIframe, setShowIframe] = useState(false); // Control the visibility of the iframe
  const { bookId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_PATH}/books/${bookId}`);
        const data = await response.json();
        setBookDetails(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch book details.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      }
    };

    const fetchSubscriptionStatus = async () => {
      getCurrentUserId().then(async (userId) => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_PATH}/checkout/subscriptionStatus/${userId}`);
          const data = await response.json();
          setIsSubscriptionActive(data.status === 'active');
        } catch (error) {
          console.error('Error fetching subscription status:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to check subscription status.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }).catch(error => {
        console.error('Error fetching user ID for subscription status:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch user ID.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
    };

    fetchBookDetails();
    fetchSubscriptionStatus();
  }, [bookId]);

  const handleReadBook = () => {
    if (isSubscriptionActive && bookDetails?.bookLink) {
      setShowIframe(true);
    } else {
      Swal.fire({
        title: 'Access Denied',
        text: 'Your subscription must be active to read this book.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  if (!bookDetails) return <div>Loading...</div>;
  return (
      <div  className="book-details-page">
        <button className="back-button" onClick={() => navigate(-1)}></button> {/* Back button */}
      <div className="book-container">

        <div className="book-left">
          <div className="book-image">
            <img src={bookDetails.bookImg || "https://via.placeholder.com/389x584"}
                 alt={bookDetails.bookName || 'Book title'}/>
          </div>
          <div className="book-actions">
            <button className="action-button" onClick={handleReadBook} disabled={!isSubscriptionActive}>
              Read Book
            </button>
          </div>
        </div>
        <div className="book-info">
          <h1>{bookDetails.bookName || 'Title'}</h1>
          <h2>{bookDetails.author || 'Author'}</h2>
          <p className="topic">{bookDetails.category || 'Topic'}</p>
          <p>{bookDetails.aboutBook || 'Description'}</p>
        </div>
        {showIframe && (
            <div className="iframe-container">
              <iframe
                  src={bookDetails.bookLink}
                  title="Book Reader"
                  allowFullScreen
              ></iframe>
            </div>
        )}

      </div>
        <Footer />
      </div>

  );

}

export default BookDetails;

async function getCurrentUserId() {
  try {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error("No token found");
      Swal.fire({
        title: 'Error!',
        text: 'No token found.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      throw new Error("No token found");
    }

    const config = {
      headers: {Authorization: `Bearer ${token}`},
    };
    const response = await axios.get(`${process.env.REACT_APP_API_PATH}/users/profile`, config);
    return response.data._id;
  } catch (error) {
    console.error("Error fetching profile:", error.response);
    Swal.fire({
      title: 'Error!',
      text: 'Error fetching profile.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    throw new Error("Error fetching profile");
  }
}