import React, { useState } from 'react';

// Use Vite's import.meta.glob to import images dynamically
const images = import.meta.glob('/src/images/**/*.{jpg,jpeg,png,gif}');

const ImageSelector = () => {
  // track selected image and folder
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState('');

  // Group images by folders
  const imagesByFolder = {};
  for (const path in images) {
    const folder = path.split('/')[3]; 
    if (!imagesByFolder[folder]) {
      imagesByFolder[folder] = [];
    }
    imagesByFolder[folder].push({ path, image: images[path] });
  }
  const folders = Object.keys(imagesByFolder);

  const handleFolderChange = (event) => {
    setSelectedFolder(event.target.value);
    setSelectedImage(null); // Reset selected image when folder changes
  };

  // sets selected image when image is clicked
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // renders dropdown for user to select a folder
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Choose your graphics</h2>
      <select onChange={handleFolderChange} value={selectedFolder}>
        <option value="">Choose a Fandom</option>
        {folders.map((folder) => (
          <option key={folder} value={folder}>
            {folder}
          </option>
        ))}
      </select>

      {selectedFolder && (
        <>
          {/* Once a folder is selected, the images in that folder are displayed */}
          <h2>Choose an Image</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {imagesByFolder[selectedFolder].map(({ path, image }) => (
              <img
                key={path}
                src={path} // Use the imported image
                alt={path} // Use the path as alt text
                onClick={() => handleImageClick(path)}
                style={{
                  cursor: 'pointer',
                  border: selectedImage === path ? '2px solid white' : 'none',
                  width: '150px',
                  height: '150px',
                }}
              />
            ))}
          </div>
        </>
      )}

      {selectedImage && (
        <div style={{ marginTop: '20px' }}>
          <h3>You selected:</h3>
          <img src={selectedImage} alt="Selected" style={{ width: '150px', height: '150px' }} />
        </div>
      )}
    </div>
    
  );
};

export default ImageSelector;
