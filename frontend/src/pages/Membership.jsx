import React from 'react'
import './styles/Membership.css'
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';


export default function About() {
  // Utility function to check the JWT token in local storage
  const checkJwtAndRedirect = (checkoutUrl) => {
    const token = localStorage.getItem('jwtToken');
    // Replace this with your actual logic to validate the token
    if (!token) {
      // Redirect to login page if the token does not exist
      window.location.href = '/login';
    } else {
      // Redirect to the checkout page if the token exists (and is valid)
      window.location.href = checkoutUrl;
    }
  };
  return (
    <div className='membership-whole'>
      <Navbar />

      <div className="membership-title">
        <h1>
          Welcome to our <br />
          <span className='membership-highlight'>Membership </span>Program!
        </h1>
      </div>

      <div className="membership-title-description">
        <p className='membership-paraone'>
          As a member,
          you'll unlock a world of exclusive benefits, resources,
          and opportunities tailored to your needs and interests.
        </p>
        <p className='membership-paratwo'>
          Choose from our range of membership packages below to find the perfect fit for you.
          Whether you're looking to connect with like-minded individuals,<br />access premium content, or take
          advantage of professional development opportunities, we have a membership option
          designed to meet your requirements.
        </p>
        <p className='membership-parathree'>
          Thank you for choosing to be part of our community!
        </p>
      </div>


      <div class="membership-container">

        <div className="membership-cards">
          <h2>Basic Membership</h2>
          <p className='membership-para'>This package is designed for individuals who primarily want to access and read eBooks from the platform. It offers essential features for a seamless reading experience.</p>
          <ul className="membership-list">
            <li>Access to a wide range of eBooks</li>
            <li>Monthly newsletter</li>
            <li>Community forum access</li>
            <li>Access to our online community forums</li>
          </ul>
          <button className="membership-but" onClick={() => checkJwtAndRedirect('/checkout/$9.99')}>$9.99/month</button>
        </div>

        <div className="membership-cardtwo">
          <h2>Standard Membership</h2>
          <p className='membership-para'>You'll receive exclusive access to our carefully curated newsletter, delivering insights, updates, and invitations to upcoming events directly to your inbox every month.</p>
          <ul className="membership-list">
            <li>All benefits of Basic Membership, plus:</li>
            <li>Access to our online community forums</li>
            <li>Discounts on merchandise and event tickets</li>
            <li>Upload Books and other Text</li>
          </ul>
          <button className="membership-but" onClick={() => checkJwtAndRedirect('/checkout/$19.99')}>$19.99/month
          </button>
        </div>

        <div className="membership-cardthree">
          <h2>Premium Membership</h2>
          <p className='membership-para'>Gain access to our engaging and dynamic forums where you can connect with peers, exchange ideas, and participate in lively discussions on a wide range of topics.</p>
          <ul className="membership-list">
            <li>All benefits of Standard Membership, plus:</li>
            <li>Exclusive webinars and events</li>
            <li>Specialized content and resources</li>
            <li>Upload Books and other literature</li>
          </ul>
          <button className="membership-but" onClick={() => checkJwtAndRedirect('/checkout/$29.99')}>$29.99/month
          </button>
        </div>

      </div>
      <Footer/>
    </div>
  )
}
