import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" exact = "true" className="active">Clothing</Link>
        </li>
        <li>
          <Link to="/portfolio" className="active">Graphic Images</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;