// src/ImageSelector.jsx
import React, { useState } from 'react';

const images = [
  { id: 1, src: 'img1', alt: 'Image 1 text' },
  { id: 2, src: 'img2', alt: 'Image 2 text' },
  { id: 3, src: 'img3', alt: 'Image 3 text' },
  { id: 4, src: 'img4', alt: 'Image 4 text' },
];


const ImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Displays a title and list of images
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Select an Image</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}> 
        {/* creates img tag element for each image in the images array */}
        {images.map((image) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.alt}
            onClick={() => handleImageClick(image)}
            // shows blue border around selected image
            style={{
              cursor: 'pointer',
              border: selectedImage?.id === image.id ? '2px solid blue' : 'none',
              width: '150px',
              height: '150px',
            }}
          />
        ))}
      </div>
      {/* shows selected image and message */}
      {selectedImage && (
        <div style={{ marginTop: '20px' }}>
          <h3>You selected:</h3>
          <img src={selectedImage.src} alt={selectedImage.alt} style={{ width: '150px', height: '150px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageSelector;

