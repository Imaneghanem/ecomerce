import React, { useState, useEffect } from 'react';
import '../output.css';

const Banner = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change d'image toutes les 3 secondes

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full overflow-hidden">
            {/* Conteneur des images */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="w-full flex-shrink-0"
                        style={{ height: 'auto' }} // Le conteneur s'ajuste automatiquement à la taille des images
                    >
                        <img
                            src={image}
                            alt={`Slide ${index}`}
                            className="w-full h-auto object-contain" // Les images conservent leurs proportions
                        />
                    </div>
                ))}
            </div>

            {/* Indicateurs */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                    ></div>
                ))}
            </div>

            {/* Boutons de navigation */}
            <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded z-10"
                onClick={() =>
                    setCurrentIndex((prevIndex) =>
                        prevIndex === 0 ? images.length - 1 : prevIndex - 1
                    )
                }
            >
                &#8592;
            </button>
            <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded z-10"
                onClick={() =>
                    setCurrentIndex((prevIndex) =>
                        (prevIndex + 1) % images.length
                    )
                }
            >
                &#8594;
            </button>
        </div>
    );
};

export default Banner;
