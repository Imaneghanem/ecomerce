import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import Footer from '../comp/Footer'; // Assurez-vous que le chemin est correct
import { ToastContainer, toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://basarwebsite.onrender.com/contact/contact', formData);
      toast.success(response.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div>
     
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Contactez-nous
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Propriétaires : Imane et Emmanuella
        </Typography>
        <Typography variant="body1" gutterBottom>
          Si vous avez besoin de nous contacter, veuillez envoyer un email à : 
          <a href="mailto:e51825741@gmail.com"> e51825741@gmail.com</a>
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <TextField
            label="Nom"
            name="name"
            variant="outlined"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            required
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Message"
            name="message"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Envoyer
          </Button>
        </Box>
      </Container>
      <Footer /> {/* Utiliser le composant Footer */}
      <ToastContainer 
        position="top-left"
        autoClose={2000}
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

export default Contact;