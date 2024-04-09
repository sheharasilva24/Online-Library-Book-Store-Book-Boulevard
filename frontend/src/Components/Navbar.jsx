import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Css/Navbar.css';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [username, setUsername] = useState(''); // Store the username

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const checkJwtAndRedirect = (profileUrl) => { // Modified to accept profile page URL
    const token = localStorage.getItem('jwtToken');
    // Replace this with your actual logic to validate the token
    if (!token) {
      // Redirect to login page if the token does not exist
      window.location.href = '/login';
    } else {
      // Redirect to the profile page if the token exists (and is valid)
      window.location.href = profileUrl;
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('jwtToken'); // Retrieve JWT token from localStorage
      if (token) {
        try {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          const response = await axios.get(`${process.env.REACT_APP_API_PATH}/users/profile`, config); // Adjust '/api/profile' as per your API endpoint
          setUsername(response.data.firstname); // Adjust 'username' based on your API response
        } catch (error) {
          console.error("Error fetching profile:", error.response);
        }
      }
    };

    fetchProfile();
  }, []);

  return (
    <nav className="nav-navbar">
      <div className="nav-section left">
        <Link to="/" className="nav-site-title">
          Book Boulevard
        </Link>
      </div>
      <div className="nav-section center">
        <ul className="nav-links">
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/Comingsoon" onClick={toggleMenu}>Shop</Link></li>
          <li><Link to="/About" onClick={toggleMenu}>About Us</Link></li>
          <li><Link to="/Testimonials" onClick={toggleMenu}>Testimonials</Link></li>
          <li><Link to="/Profile" onClick={() => checkJwtAndRedirect('/Profile')}>Profile</Link></li> {/* Use checkJwtAndRedirect function */}
        </ul>
      </div>
      <div className="nav-section right">
        <div className="nav-profile-container">
          <span className="username">{username || "Username"}</span>
        </div>
      </div>
      <div className="nav-menu-toggle" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
};

export default Navbar;
