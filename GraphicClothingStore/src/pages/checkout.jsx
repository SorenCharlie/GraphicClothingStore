import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load Stripe with my live publishable key
const stripePromise = loadStripe('pk_live_51Q61ApRtvPeX49hMt08RptOVSeQf9P8eHdvktYJvoiHBppVd0LCWNGhu5R9SqHTE6vLNCvA62Xkhvu2amACwsHbm00sMCgyL3F');

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true); // Indicate that payment processing has started

    if (!stripe || !elements) {
      return; // Return early if Stripe hasn't loaded
    }

    // Step 1: Sending request to my backend to create a PaymentIntent
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: Math.round(totalAmount * 100) }), // Sending total in cents
    });

    if (!response.ok) {
      setError('Failed to create payment intent. Please try again.'); 
      setProcessing(false); // Reset processing state
      return;
    }

    const { clientSecret } = await response.json(); // Extracting clientSecret from the response

    // Step 2: Confirm the payment with the clientSecret
    const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (paymentError) {
      setError(paymentError.message); // Display any errors during payment
      setProcessing(false); // Reset processing state
    } else if (paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded:', paymentIntent); // Log successful payment
      // TODO: Handle successful payment (e.g., clear cart, show confirmation)
      setProcessing(false); // Reset processing state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement /> {/* Card input field for payment details */}
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Show any error messages */}
      <button type="submit" disabled={!stripe || processing}>
        Pay Now {/* Disable button if Stripe isn't loaded or payment is being processed */}
      </button>
    </form>
  );
};
const CheckoutPage = () => {
  const location = useLocation();
  const { cartItems, total } = location.state || { cartItems: [], total: 0 };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="order-summary">
        <h2>Order Summary</h2>
        {cartItems.map((item, index) => (
          <div key={index} className="cart-item">
            <span>{item.type} - {item.color} - {item.size}</span>
            <span>Graphic: {item.graphic}</span>
          </div>
        ))}
        <div className="total">
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalAmount={total} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;
