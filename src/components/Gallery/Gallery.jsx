import React from 'react';
import mountainView from '../../assets/mounten.png';
import eifeltower from '../../assets/eiffeltower.png';
import temple from '../../assets/temple.png'; 
import autumn from '../../assets/autumn.png'; 
import historical from '../../assets/historical.jpg';
import peak from '../../assets/peak.png'; // Import the images

const Gallery = () => {
  // Array of images with their details
  const images = [
    { id: 1, src: mountainView, alt: 'Mountain View', title: 'Nature Escape' },
    { id: 2, src: eifeltower, alt: 'Eiffel Tower', title: 'Paris Adventure' },
    { id: 3, src: temple, alt: 'Temple', title: 'Cultural Heritage' },
    { id: 4, src: autumn, alt: 'Autumn Scene', title: 'Seasonal Beauty' },
    { id: 5, src: historical, alt: 'Historic Building', title: 'Historic Tour' },
    { id: 6, src: peak, alt: 'Mountain Peak', title: 'Mountain Trek' },
  ];

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold mb-8">Gallery Showcase</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="relative group overflow-hidden rounded-lg">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-xl font-semibold">{image.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;