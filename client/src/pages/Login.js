import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Importer useAuth

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Utiliser useAuth pour obtenir la fonction login

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://basarwebsite.onrender.com/auth/signin', {
        email,
        password,
      });

      if (response.status === 200) {
        const { result, token, isAdmin } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userName', result.name);
        localStorage.setItem('userEmail', result.email);

        login(token, isAdmin); // Mettre à jour l'état d'authentification global

        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-grow flex items-center justify-center mb-10">
        <Card sx={{ maxWidth: 400, width: '100%', padding: 2 }}>
          <CardContent>
            <Typography variant="h5" component="h2" align="center" gutterBottom>
              Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email address"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && (
                <Typography color="error" variant="body2" align="center">
                  {errorMessage}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2, mb: 2 }}
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;