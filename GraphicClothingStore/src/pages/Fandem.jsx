// src/pages/GraphicClothingShop.jsx
import React, { useState } from 'react';
import ClothingSelector from '../components/ClothingSelector';
import GraphicsSelector from '../components/GraphicsSelector';
import Cart from '../components/Cart';

const GraphicClothingShop = () => {
  const [step, setStep] = useState(1);
  const [selectedClothing, setSelectedClothing] = useState({
    type: "",
    color: "",
    size: "",
  });
  const [selectedGraphics, setSelectedGraphics] = useState("");
  const [cart, setCart] = useState([]);

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

  // Handles clothing selection
  const handleClothingSelect = (e) => {
    const { name, value } = e.target;
    setSelectedClothing({ ...selectedClothing, [name]: value });
  };

  // Handles graphic selection
  const handleGraphicSelect = (graphic) => {
    setSelectedGraphics(graphic);
  };

  // Adds item to cart and proceeds to checkout
  const handleAddToCart = () => {
    const item = { ...selectedClothing, graphic: selectedGraphics };
    setCart([...cart, item]);
    setStep(3); // Move to checkout
  };

  // Removes item from cart
  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  // Updates item in the cart
  const handleUpdateItem = (index) => {
    setSelectedClothing(cart[index]); // Load the selected item for editing
    setStep(1); // Go back to the first step to allow the user to edit the item
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout!");
    // Add your checkout logic here
  };

  return (
    <div className='shop-container'>
      <h1>Welcome to Fandem! Your Graphic Clothing Shop!</h1>
      <div className="steps">
        {step === 1 && (
          <ClothingSelector
            clothingOptions={clothingOptions}
            selectedClothing={selectedClothing}
            handleClothingSelect={handleClothingSelect}
            nextStep={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <GraphicsSelector
            graphicsOptions={graphicsOptions}
            selectedGraphics={selectedGraphics}
            handleGraphicSelect={handleGraphicSelect}
            addToCart={handleAddToCart}
          />
        )}
        {step === 3 && (
          <Cart
            cart={cart}
            handleUpdateItem={handleUpdateItem}
            handleRemoveFromCart={handleRemoveFromCart}
            handleCheckout={handleCheckout}
          />
        )}
      </div>
    </div>
  );
};

export default GraphicClothingShop;
