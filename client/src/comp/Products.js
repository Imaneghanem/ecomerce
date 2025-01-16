import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/bazarSlice";
import image1 from '../assets/affrique/af1.png';
import image2 from '../assets/affrique/af2.png';
import image3 from '../assets/amerique/am1.png';
import image4 from '../assets/amerique/am2.png';
import image5 from '../assets/Asie/as1.png';
import image6 from '../assets/Asie/as2.png';
import image7 from '../assets/europe/eu2.png';
import image8 from '../assets/europe/eu1.png';
import {ToastContainer, toast } from "react-toastify";
const Products = () => {
    const categories = ["Afrique", "Amérique", "Asie", "Europe"];
    const [activeCategory, setActiveCategory] = useState("Afrique");
    const dispatch = useDispatch();

    const products = [
        { id: 1, name: "Produit 1", price: 3.00, image: image1, category: "Afrique" },
        { id: 2, name: "Produit 2", price: 3.00, image: image2, category: "Afrique" },
        { id: 3, name: "Produit 3", price: 3.00, image: image3, category: "Amérique" },
        { id: 4, name: "Produit 4", price: 3.00, image: image4, category: "Amérique" },
        { id: 5, name: "Produit 5", price: 3.00, image: image5, category: "Asie" },
        { id: 6, name: "Produit 6", price: 3.00, image: image6, category: "Asie" },
        { id: 7, name: "Produit 7", price: 3.00, image: image7, category: "Europe" },
        { id: 8, name: "Produit 8", price: 3.00, image: image8, category: "Europe" },
    ];

    return (
        <div className="flex py-10 max-w-screen-xl mx-auto">
            {/* Sidebar */}
            <div className="w-1/4 pr-5">
                <h2 className="text-xl font-bold mb-4">Continents</h2>
                <ul className="space-y-3">
                    {categories.map((category) => (
                        <li
                            key={category}
                            className={`p-2 rounded cursor-pointer font-medium ${
                                activeCategory === category
                                    ? "bg-yellow-700 text-white"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Product List */}
            <div className="w-3/4 grid grid-cols-3 gap-10">
                {products
                    .filter((product) => product.category === activeCategory)
                    .map((product) => (
                        <div
                            key={product.id}
                            className="p-6 border-2 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-64 object-cover rounded-md mb-6"
                            />
                            <h3 className="text-lg font-bold mb-2 text-center">{product.name}</h3>
                            <p className="text-gray-600 mb-4 text-center">{product.price}</p>
                            <button
                                className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition w-full"
                                onClick={() =>
                                    dispatch(
                                        addToCart({
                                            id: product.id,
                                            title: product.name,
                                            price: product.price,
                                            image: product.image,
                                            category: product.category,
                                            quantity: 1,
                                        })
                                    )& toast.success(`${product.name} is added`)
                                }
                            >
                                Add to cart
                            </button>
                        </div>
                    ))}
            </div>
            <ToastContainer 
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnfocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />
        </div>
    );
};

export default Products;
