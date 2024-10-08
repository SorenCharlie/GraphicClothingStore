import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className="active">Clothing</Link>
        </li>
        <li>
          <Link to="/graphic-images" className="active">Graphic Images</Link>
        </li>
        <li>
          <Link to="/checkout" className="active">Checkout</Link>
        </li>
        <li>
          <Link to="/login" className="active">Login</Link>
        </li>
        <li>
          <Link to="/signup" className="active">Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;