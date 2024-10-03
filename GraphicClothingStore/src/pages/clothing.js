const { Link } = require("react-router-dom");

function MyClothingItems() {
    const clothingItems = [
        {id: 1, name: 'T-shirt', price: 20, size: 'S', color: 'black', design: 'image'},
        {id: 2, name: 'Sweatshirt', price: 40, size: 'M', color: 'gray', design: 'image'},
        {id: 3, name: 'Hoodie', price: 50, size: 'L', color: 'blue', design: 'image'},
    ];
    // const clothingItems = clothingItems.map((item) => {
    //     return (
    //         <li key={item.id}>
    //             <Link to={`/clothing/${item.id}`}>{item.name}</Link>
    //         </li>
    //     );
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