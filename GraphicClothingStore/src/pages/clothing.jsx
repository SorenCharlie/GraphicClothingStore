import React from 'react';
// Graphic Clothing Shop Components Clothing Selector
 const ClothingSelector = ({clothingOptions, selectedClothing, handleClothingSelect, nextStep}) => {
  <div className="step1">
    <h2>Select Your Clothing</h2>
 {/* Type Selection */}
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
  {/* Color Selection */}
    <label>
      Color:
      <select
        name="color"
        value={selectedClothing.color}
        onChange={handleClothingSelect}>
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
        onChange={handleClothingSelect}>
        <option value="">Select Size</option>
        {clothingOptions.sizes.map((size, index) => (
          <option key={index} value={size}>
            {size}
          </option>
        ))}
      </select>
    </label>
    <button onClick={nextStep}>Next: Select Graphics</button>
  </div>
};
export default ClothingSelector; 