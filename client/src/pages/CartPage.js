import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import CartItem from "../comp/CartItem";
import { useAuth } from '../context/AuthContext'; // Importer useAuth
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const [email, setEmail] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { isAuthenticated, user } = useAuth(); // Utiliser useAuth pour obtenir l'état d'authentification et les informations de l'utilisateur

  useEffect(() => {
    if (isAuthenticated) {
      setEmail(localStorage.getItem('userEmail'));
    }
  }, [isAuthenticated]);



  // Calculer le sous-total dynamiquement
  const subtotal = productData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Gestion du paiement
  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      // Obtenez le client secret du backend
      const { data: { clientSecret } } = await axios.post("https://basarwebsite.onrender.com/pay", {
        amount: subtotal * 100, // Montant en cents
      });

      // Confirmez le paiement avec Stripe.js
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: email,
          },
        },
      });

      if (result.error) {
        toast.error(`Payment failed: ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-10 px-6">
      {/* Section des articles dans le panier */}
      <div className="w-full md:w-2/3 pr-10">
        <CartItem />
      </div>

      {/* Section des totaux */}
      <div className="w-full md:w-1/3 bg-[#fafafa] px-6 py-4 border rounded-lg">
        <h2 className="text-2xl font-medium mb-6">Cart Totals</h2>
        <p className="flex items-center justify-between text-base mb-4">
          <span>Subtotal:</span>
          <span className="font-titleFont font-bold text-lg">
            ${subtotal.toFixed(2)}
          </span>
        </p>
        <form onSubmit={handlePayment} className="mt-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
            required
          />
          <CardElement className="p-4 border rounded mb-4" />
          <button
            type="submit"
            disabled={!stripe}
            className="text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-500"
          >
            Pay ${subtotal.toFixed(2)}
          </button>
        </form>
      </div>
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

export default CartPage;