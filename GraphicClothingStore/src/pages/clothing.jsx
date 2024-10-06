import { useNavigate } from 'react-router-dom';
import React,  {  useState } from 'react';
// Graphic Clothing Shop Component declaration
 const GraphicClothingShop = () => {
  const navigate = useNavigate();
  const [ step, setStep ] = useState(1);
  const [selectedClothing, setSelectedClothing] = useState({
    type: " ",
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
// Handling Selection (what happens when a user selects a clothing option)
  const handleClothingSelect = (e) => {
    const { name, value } = e.target; 
    setSelectedClothing({...selectedClothing, [name]: value });
  };
// Hanlding Graphic Selection (what happens when a user selects a graphic)
    const handleGraphicSelect = (graphic) => {
      setSelectedGraphics(graphic);
    };
// Handling Cart Addition (what happens when a user adds an item to the cart)
    const handleAddToCart = () => {
      const item ={...selectedClothing, graphic: selectedGraphics};
      setCart([...cart, item]);
      setStep(3);
    };
// Handling Checkout (what happens when a user proceeds to checkout)
const handleCheckout = () => {
  const total = cart.reduce((sum, item) => sum + item.price, 0); // Calculate total
  navigate('/checkout', { state: { cartItems: cart, total } });
};
  return (
    <div className='shop-container'>
      <h1>Welcome to our Graphic Clothing SHop!</h1>
      <div className="steps">
      
{/* Step 1: Clothing Selection */}
      {step === 1 && ( 
        <div className="step1">
        <h2>Select Your Clothing</h2>
        <label>
          Type:
          <select 
            name ="type"
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
          <div className="graphics-grid">
            {graphicsOptions.map((graphic, index) => (
              <div
                key={index}
                className={`graphic-item ${
                  selectedGraphics === graphic ? "selected" : ""}`}
                onClick={() => handleGraphicSelect(graphic)}>
                  <img src={`path-to-image/${graphic}.jpg`} alt={graphic} />
                  <p>{graphic}</p>
                  </div>
                ))}
          </div>
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
              </div>
            ))}
          </div>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
    </div>
  );
};


export default GraphicClothingShop;
