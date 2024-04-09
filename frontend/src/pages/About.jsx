import React from 'react'
import './styles/About.css'
import Navbar from '../Components/Navbar';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';

const AboutUs = () => {
  return (
    <div className="about-about-us">
      <Navbar />
      <div className='fix-about'>
        <h1>About Us</h1>
        <p>Welcome to our Book Store! We are a passionate team dedicated to providing readers with an exceptional selection of books.<br /> Our store is the result of a collaborative group project aimed at bringing the joy of reading to everyone.</p>

        <h2>Our Team</h2>
        <p>Our team consists of book lovers, seasoned experts in literature, and technology enthusiasts working together to create an immersive reading experience for our subscribers.<br /> We believe in the power of stories to inspire, educate, and entertain.</p>

        <h2>Join Us</h2>
        <p>Become a part of our community today.<br /> Subscribe to explore our vast collection, and start your next reading adventure.</p>
        <Link to={"/Membership"}><button className="landing-btn" data="Subscribe Now!"></button></Link>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
