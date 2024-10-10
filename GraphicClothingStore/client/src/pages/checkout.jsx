import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loadStripe } from '@stripe/stripe-js';
import { CREATE_CHECKOUT_SESSION } from '../utils/mutations';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);

const Checkout = () => {
  const location = useLocation();
  const { cart, total } = location.state || { cart: [], total: 0 };

  const [createCheckoutSession, { loading, error }] = useMutation(CREATE_CHECKOUT_SESSION);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);

    try {
      const { data } = await createCheckoutSession({
        variables: { items: cart }
      });

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: data.createCheckoutSession.sessionId
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert(`An error occurred during checkout: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <p>Preparing checkout...</p>;
  if (error) return <p>Error: Unable to initiate checkout. Please try again.</p>;

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="order-summary">
        <h2>Order Summary</h2>
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <span>{item.type} - {item.color} - {item.size}</span>
            <span>Graphic: {item.graphics}</span>
            <span>Price: ${item.price.toFixed(2)}</span>
          </div>
        ))}
        <div className="total">
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>
      </div>
      <button 
        onClick={handleCheckout} 
        disabled={isProcessing || loading}
        className={isProcessing || loading ? 'button-disabled' : ''}
      >
        {isProcessing ? 'Processing...' : 'Proceed to Payment'}
      </button>
    </div>
  );
};

export default Checkout;