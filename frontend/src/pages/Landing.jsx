import React from 'react';
import './styles/LandingPage.css';
import { Link } from 'react-router-dom';


const LandingPage = () => {
  return (
    <div className="landing-landing-container">
      <div className="landing-background-image"></div>
      <div className="landing-boulevard-highlight"></div>
      <div className="landing-content-container">
        <div className="landing-text-container">
          <h1 className='landing-one'>Book <span>Boulevard</span></h1>
          <h2 className='landing-two'>Embark on a Reading Adventure</h2>
          <p className='landing-parag'>Explore Our Vast Library of Stories, Genres, and Authors <br /> Await Your Discovery.</p>
          <p className='landing-parag'>Start Browsing Now</p>
        </div>
        <div className="landing-button-container">
          <Link to={"/login"}><button className="landing-btn" data="Browse Library"></button></Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
