import React,  {  useState } from 'react';

 const GraphcClothingShop = () => {
  const [ step , setStep ] = useState(1);
  const [selectedClothing, setSelectedClothing] = useState({
    type: '',
    color: '',
    size: '',
  });
  const [slectedGraphic, setSelectedGraphics] = useState("");
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

  const handleClothingSelect = (e) => {
    const { name, value } = e.Target: 

  return (
    <>
        <button><Link to="/home">Design Your Own!</Link>
        </button>
        <h1>Clothing Items</h1>
        <p>Check out our clothing items!<br />Click on the item to view more details.</p>
        <ul>{clothingItems}</ul> /* Need selector for t-shirts sizes,color, and design etc */
        
    </>
  );
}

export default MyClothingItems() {
return(
    <div>
        <h1>Clothing Items</h1>
        <MyClothingItems />
    </div>
);
}