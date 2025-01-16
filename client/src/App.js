import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './comp/nav';
import Home from './pages/home';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin'; // Importer le composant Admin
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Chargez la clé publique Stripe
const stripePromise = loadStripe("pk_test_51QhAtqIO7hbGXJJil8qtu9Uh1mq7LXeqT7NdUZk6ANts14r3WRmHgOMK5viJUChj9FUytP9sM1yv4YuUMPtsnIYE00pDwRSOVx");

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={
            <Elements stripe={stripePromise}>
              <CartPage />
            </Elements>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} /> {/* Utiliser le composant Admin */}
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;