import React, { useEffect } from 'react';
import axios from 'axios'; // Make sure you have axios installed

const PayPalCheckoutButton = ({ amount, userEmail }) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=AZUSZFCpoMfvoraxEmJaWyCPZvCf9htraDivR5IPvx02CoZxN-OxAdvJvGoQ-meiBuG6BIjeSgU0dinN&currency=USD";
        script.addEventListener("load", () => {
            window.paypal.Buttons({
                style: {
                    shape: 'pill',
                    color: 'black',
                    layout: 'vertical',
                    label: 'pay',
                },
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: amount, // Use the dynamic amount passed via props
                            },
                        }],
                    });
                },
                onApprove: function (data, actions) {
                    return actions.order.capture().then(function(details) {
                        alert(`Transaction completed by ${details.payer.name.given_name}`);
                        // Construct the data to send to your backend
                        const checkoutDetails = {
                            email: userEmail, // Assuming userEmail is passed as a prop to this component
                            transactionId: details.id, // PayPal transaction ID
                            // Include any other details you want to send to your backend
                        };

                        // Call your backend endpoint to save the transaction details
                        axios.post(`${process.env.REACT_APP_API_PATH}/checkout/checkout-details`, checkoutDetails)
                            .then(response => {
                                console.log('Checkout details saved:', response.data);
                            })
                            .catch(error => {
                                console.error('Error saving checkout details:', error);
                            });
                    });
                },
                onError: function (err) {
                    console.error('Payment error:', err);
                    alert('There was an issue with your payment. Please try again.');
                },
            }).render('#paypal-button-container');
        });

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [amount, userEmail]); // React to changes in amount or userEmail

    return <div id="paypal-button-container"></div>;
};

export default PayPalCheckoutButton;
