import React, { useState } from 'react';

// Use Vite's import.meta.glob to import images dynamically
const images = import.meta.glob('/public/images/**/*.{jpg,jpeg,png,gif}');

const ImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState('');

  // Group images by folders
  const imagesByFolder = {};
  for (const path in images) {
    const folder = path.split('/')[3]; // Assuming folders are directly under /public/images
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

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Select a Folder</h2>
      <select onChange={handleFolderChange} value={selectedFolder}>
        <option value="">--Select a Folder--</option>
        {folders.map((folder) => (
          <option key={folder} value={folder}>
            {folder}
          </option>
        ))}
      </select>

      {selectedFolder && (
        <>
          <h2>Select an Image</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {imagesByFolder[selectedFolder].map(({ path, image }) => (
              <img
                key={path}
                src={image} // Use the imported image
                alt={path} // Use the path as alt text
                onClick={() => handleImageClick(image)}
                style={{
                  cursor: 'pointer',
                  border: selectedImage === image ? '2px solid blue' : 'none',
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
