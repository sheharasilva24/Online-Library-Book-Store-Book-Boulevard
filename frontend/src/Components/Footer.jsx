import React from "react";
import "./Css/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <hr className="footer-hr" />
      <div className="subscription_links">
        <section className="footer-subscription">
          <Link to="/" className="footer-logo"><h1>Book Boulevard</h1></Link>
          <p className="footer-subscription-text">
            Hey there, bookworms! Welcome to Book Boulevard, your go-to destination for e-book adventures.
            Get ready to dive into a world where stories leap off the screen and imagination knows no bounds.
            Whether you're into magical realms, heart-pounding adventures, or heartwarming romances, we've got something for every kind of reader.
            Join us as we embark on thrilling journeys between the pages, where the only limit is your imagination.
            Let's turn the next page together and discover the magic of reading.
          </p>
        </section>
        <div className="footer-links">
          <div className="footer-link-items">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/about">About Us</Link>
            <Link to="/testimonials">Testimonials</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
