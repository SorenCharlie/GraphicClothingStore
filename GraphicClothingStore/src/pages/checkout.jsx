// src/components/Cart.jsx
import React from 'react';

const Cart = ({ cart, handleUpdateItem, handleRemoveFromCart, handleCheckout }) => {
  return (
    <div className="step3">
      <h2>Checkout</h2>
      <div className="cart-items">
        {cart.map((item, index) => (
          <div key={index}>
            <p>
              {item.type} - {item.color} - {item.size} - Graphic: {item.graphic}
            </p>
            <button onClick={() => handleUpdateItem(index)}>Update</button>
            <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default Cart;
