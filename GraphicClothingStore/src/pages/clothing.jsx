// src/ClothingSelector.js

import React, { useState } from 'react';

const clothingOptions = [
  { type: 'Tshirt', img: './src/clothes/tshirt.png' },
  { type: 'Sweater', img: 'src/clothes/sweatshirt.png' },
  { type: 'Hoodie', img: './src/clothes/hoodie.png' },
];

const colors = ['Red', 'Blue', 'Green', 'Black', 'White'];
const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const ClothingSelector = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Selected: ${selectedType}, ${selectedColor}, ${selectedSize}`);
  };

  const dropdownStyle = {
    position: 'relative',
    display: 'inline-block',
  };

  const dropdownContentStyle = {
    display: 'none',
    position: 'absolute',
    backgroundColor: 'black',
    minWidth: '160px',
    zIndex: 1,
    border: '1px solid #ccc',
  };

  const dropdownVisibleStyle = {
    ...dropdownContentStyle,
    display: 'block',
  };

  const dropdownItemStyle = {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const dropdownImageStyle = {
    width: '20px',
    height: '20px',
    marginRight: '10px',
  };

  return (
    <div>
      <h1>Clothing Option Selector</h1>
      <form onSubmit={handleSubmit}>
        <div style={dropdownStyle}>
          <label>
            Clothing Type:
            <div>
              <button
                type="button"
                className="dropbtn"
                style={{ backgroundColor: '#222', padding: '10px', width: '100%', textAlign: 'center' }}
                onClick={(e) => {
                  const dropdown = e.currentTarget.nextElementSibling;
                  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }}
              >
                {selectedType || 'Select Type'}
              </button>
              <div style={dropdownContentStyle}>
                {clothingOptions.map((option) => (
                  <div
                    key={option.type}
                    style={dropdownItemStyle}
                    onClick={() => {
                      setSelectedType(option.type);
                      document.querySelector('.dropdown-content').style.display = 'none'; // Hide dropdown after selection
                    }}
                  >
                    <img src={option.img} alt={option.type} style={dropdownImageStyle} />
                    {option.type}
                  </div>
                ))}
              </div>
            </div>
          </label>
        </div>
        <div>
          <label>
            Color:
            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
              <option value="">Select Color</option>
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Size:
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
              <option value="">Select Size</option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ClothingSelector;
