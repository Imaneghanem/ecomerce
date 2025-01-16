import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineClose } from "react-icons/md";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { deleteItem, resetCart, increamentQuantity, decreamentQuantity } from '../redux/bazarSlice';
import { Link } from "react-router-dom";

const CartItem = () => {
    const productData = useSelector((state) => state.bazar.productData);
    const dispatch = useDispatch();

    return (
        <div className="w-full">
            <h2 className="font-titleFont text-2xl border-b pb-4">Shopping Cart</h2>
            <div>
                {productData.length > 0 ? (
                    productData.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between gap-6 mt-6"
                        >
                            {/* Delete Button and Product Image */}
                            <div className="flex items-center gap-4">
                                <MdOutlineClose
                                    className="text-xl text-gray-600 hover:text-red-600 cursor-pointer duration-300"
                                    onClick={() => {
                                        dispatch(deleteItem(item.id));
                                        toast.error(`${item.title} is removed`);
                                    }}
                                />
                                <img
                                    className="w-24 h-24 object-cover rounded-md"
                                    src={item.image}
                                    alt={item.title}
                                />
                            </div>

                            {/* Product Title */}
                            <h2 className="w-52 truncate">{item.title}</h2>

                            {/* Product Price */}
                            <p className="w-20 text-center">${item.price.toFixed(2)}</p>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-4 text-sm font-semibold">
                                <p>Quantity</p>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                        onClick={() => {
                                            if (item.quantity > 1) {
                                                dispatch(decreamentQuantity(item.id));
                                            } else {
                                                dispatch(deleteItem(item.id));
                                                toast.error(`${item.title} is removed`);
                                            }
                                        }}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                        onClick={() => dispatch(increamentQuantity(item.id))}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Total Price for Product */}
                            <p className="w-20 text-right">
                                ${(item.quantity * parseFloat(item.price)).toFixed(2)}
            </p>

                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg mt-10">Your cart is empty.</p>
                )}
            </div>

            {/* Reset Cart and Go Shopping */}
            {productData.length > 0 && (
                <div className="mt-8">
                    <button
                        className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-800"
                        onClick={() => {
                            dispatch(resetCart());
                            toast.error("Cart has been reset");
                        }}
                    >
                        Reset Cart
                    </button>
                    <Link to="/">
                        <button className="mt-4 flex items-center gap-2 text-gray-400 hover:text-black duration-300">
                            <HiOutlineArrowLeft className="text-xl" />
                            Go Shopping
                        </button>
                    </Link>
                </div>
            )}

            {/* Toast Container */}
            <ToastContainer
                position="top-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default CartItem;
