import './styles/CheckoutPage.css';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PayPalButton from '../Components/PayPalButton';
import axios from 'axios';
import * as PropTypes from "prop-types";



PayPalButton.propTypes = {planId: PropTypes.string};

function CheckoutPage() {
    const { price } = useParams();

    // Initialize state for tax, dueNow, and userEmail
    const [tax, setTax] = useState(0);
    const [dueNow, setDueNow] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const amount = 11;

    useEffect(() => {
        // Function to fetch profile data and extract email
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('jwtToken'); // Adjust based on your token storage key
                const response = await axios.get(`${process.env.REACT_APP_API_PATH}/users/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserEmail(response.data.email); // Adjust based on your response structure
            } catch (error) {
                console.error("Error fetching user profile:", error);
                // Handle error (e.g., redirect to login page if unauthorized)
            }
        };

        fetchUserProfile();

        // Convert price string to number and calculate taxes and dueNow amount
        const priceNumber = parseFloat(price.replace('$', '').replace('/month', ''));
        const calculatedTax = priceNumber * 0.09;
        const roundedTax = calculatedTax.toFixed(2);
        setTax(roundedTax);
        const vat = 0.99; // Adjusted to reflect fixed $1/month for simplicity
        const totalDueNow = priceNumber + calculatedTax + vat;
        setDueNow(totalDueNow.toFixed(2));
    }, [price]); // Add setTax to the dependency array

    return (
        <main className="check-checkout-container">
            <Navbar />
            <section className="check-checkout-content">
                <div className="check-checkout-details">
                    <h1 className="check-checkout-title">Checkout</h1>
                    <p className="check-checkout-description">Enter the payment info to start your subscription</p>
                    <div className="check-user-info">
                        <div className="check-user-details">
                            <p className="check-user-label">You are logged in as,</p>
                            <p className="check-user-email">{userEmail}</p>
                        </div>
                    </div>
                </div>
                <div className="check-summary-container">
                    <h2 className="check-summary-title">Summary</h2>
                    <hr className="check-summary-divider" />
                    <div className="check-subscription-details">
                        <p className="check-subscription-label">Subscription</p>
                        <p className="check-subscription-price">{price}</p>
                    </div>
                    <hr className="check-summary-divider-2" />
                    <div className="check-subscription-details">
                        <p className="check-subscription-label">Sub Total</p>
                        <p className="check-subscription-price">{price}</p>
                    </div>
                    <div className="check-subscription-details">
                        <p className="check-subscription-label">Tax (9%)</p>
                        <p className="check-subscription-price">${tax}</p>
                    </div>
                    <div className="check-subscription-details">
                        <p className="check-subscription-label">Value added tax (VAT)</p>
                        <p className="check-subscription-price">$1/month</p>
                    </div>
                    <div className="check-subscription-due">
                        <p className="check-subscription-due-lable">Due Now</p>
                        <p className="check-subscription-due-price">${dueNow}</p>
                    </div>
                    <PayPalButton amount={amount} userEmail={userEmail} />
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default CheckoutPage;
