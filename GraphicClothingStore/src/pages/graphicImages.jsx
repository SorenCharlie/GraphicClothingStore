
import React from 'react';
// Graphic Clothing Shop Components Graphic Images selector
const GraphicsSelector = ({graphicsOptions, selectedGraphics, handleGraphicsSelect, addToCart }) => {
  return (
    <div className="step2">
      <h2>Select a Graphic</h2>
      <div className="graphics-grid">
        {graphicsOptions.map((graphic, index) => (
          <div
            key={index}
            className={`graphic-item ${selectedGraphics ===graphic ? "selected" : ""}`}
            onClick={() => handleGraphicSelect(graphic)}>
              <img src={`path-to-image/${graphic}.jpg`} alt={graphic} />
              <p>{graphic}</p>
            </div>
        ))}
      </div>
      <button onCLick={addToCart}>Add to Cart & Checkout</button>
    </div>
  );
};
export default GraphicsSelector;