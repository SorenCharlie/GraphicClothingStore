import React, { useState, useEffect } from 'react';
import ImageSelector from './graphicImages';
import { useNavigate } from "react-router-dom";
import Auth from '../utils/auth';

// Graphic Clothing Shop Component declaration
const GraphicClothingShop = () => {
  const [step, setStep] = useState(1);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedClothing, setSelectedClothing] = useState({
    type: "",
    color: "",
    size: " ",
  });
  const [selectedGraphics, setSelectedGraphics] = useState(" ");
  const [cart, setCart] = useState([]);

  // Clothing Options and Selections
  const clothingOptions = {
    types: ['T-shirt', 'Hoodie', 'Sweatshirt'],
    colors: ['Black', 'White', 'Blue', 'Red', 'Yellow'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  };

  const graphicsOptions = [
    'Graphic 1',
    'Graphic 2',
    'Graphic 3',
    'Graphic 4',
    'Graphic 5',
  ];
  const navigate = useNavigate();

  useEffect(function(){

    if (!Auth.loggedIn()) {
      navigate('/login');
    };
  },[]);
  // Handling Selection (what happens when a user selects a clothing option)
  const handleClothingSelect = (e) => {
    const { name, value } = e.target;
    setSelectedClothing({ ...selectedClothing, [name]: value });
  };
  // Hanlding Graphic Selection (what happens when a user selects a graphic)
  const handleGraphicSelect = (graphic) => {
    setSelectedGraphics(graphic);
  };
  // Handling Cart Addition (what happens when a user adds an item to the cart)
  const handleAddToCart = () => {
    const item = { ...selectedClothing, graphic: selectedGraphics };
    // modify handleAddToCart to handle item updates
    if (editIndex !== null) {
      //when the user is updating an item edit the item in the cart
      const updateCart = cart.map((cartItem, index) =>
        index === editIndex ? item : cartItem);
      setCart(updateCart);
      setEditIndex(null);            // Reset the edit index
    } else {
      setCart([...cart, item]);   // Add the new item to the cart
    }
    setStep(3);                  // Proceed to checkout
  };
  // Handling Item Removal (what happens when a user removes an item from the cart)
  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };
  // Handling Item Update (what happens when a user updates an item in the cart)
  const handleUpdateItem = (index) => {
    setSelectedClothing(cart[index]);  //Load current item
    setStep(1); // Go back to step 1
    setEditIndex(index); // Set the index of the item being edited
  };


  // Handling Checkout (what happens when a user proceeds to checkout)
  const handleCheckout = () => {
    alert("Proceeding to Checkout");
    // Add code to proceed to checkout
  };
  return (
    <div className='shop-container'>
      <h1>Welcome to Fandem! Your Graphic Clothing Shop!</h1>
      <div className="steps">

        {/* Step 1: Clothing Selection */}
        {step === 1 && (
          <div className="step1">
            <h2>Select Your Clothing</h2>
            <label>
              Type:
              <select
                name="type"
                value={selectedClothing.type}
                onChange={handleClothingSelect}>
                <option value="">Select Type</option>
                {clothingOptions.types.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            {/*Color Selection */}
            <label>
              Color:
              <select
                name="color"
                value={selectedClothing.color}
                onChange={handleClothingSelect}
              >
                <option value="">Select Color</option>
                {clothingOptions.colors.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </label>
            {/* Size Selection */}
            <label>
              Size:
              <select
                name="size"
                value={selectedClothing.size}
                onChange={handleClothingSelect}
              >
                <option value="">Select Size</option>
                {clothingOptions.sizes.map((size, index) => (
                  <option key={index} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => setStep(2)}>Next: Select Graphics</button>
          </div>
        )}

        {/* Step 2 Graphic Selection */}
        {step === 2 && (
          <div className="step2">
            <h2>Select a Graphic</h2>
            <ImageSelector/>
            {/* <div className="graphics-grid">
              {graphicsOptions.map((graphic, index) => (
                <div
                  key={index}
                  className={`graphic-item ${selectedGraphics === graphic ? "selected" : ""}`}
                  onClick={() => handleGraphicSelect(graphic)}>
                  <img src={`path-to-image/${graphic}.jpg`} alt={graphic} />
                  <p>{graphic}</p>
                </div>
              ))}
            </div> */}
            <button onClick={handleAddToCart}>Add to Cart & Checkout</button>
          </div>
        )}
        {/* Step 3 Checkout */}
        {step === 3 && (
          <div className="step3">
            <h2>Checkout</h2>
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index}>
                  <p>
                    {item.type} - {item.color} - {item.size} - Graphic:{" "}
                    {item.graphic}
                  </p>
                  {/* Update button */}
                  <button onClick={() => handleUpdateItem(index)}>Update</button>
                  {/* Remove button */}
                  <button onClick={() => handleRemoveItem(index)}>Remove</button>
                </div>
              ))}
            </div>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        )}
      </div>
    </div>
  );

}

export default GraphicClothingShop;
