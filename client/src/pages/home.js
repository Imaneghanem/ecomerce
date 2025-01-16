import React, { useState } from "react";
import image1 from '../assets/affrique/af1.png';
import image2 from '../assets/affrique/af2.png';
import image3 from '../assets/amerique/am1.png';
import image4 from '../assets/amerique/am2.png';
import image5 from '../assets/Asie/as1.png';
import image6 from '../assets/Asie/as2.png';
import image7 from '../assets/europe/eu2.png';
import image8 from '../assets/europe/eu1.png';
import Banner from "../comp/banner.js"
import Products from "../comp/Products";
import Footer from "../comp/Footer"; // Importer le composant Footer

const Home = () => {
    const images = [image1, image2, image3, image4, image5, image6, image7, image8];
    return (
        <div>
            <Banner images={images} />
            <div className="mt-10">
                <Products />
            </div>
            <Footer /> 
        </div>
    );
};

export default Home;

