import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, Typography, TextField, Button, Checkbox, FormControlLabel, Divider } from '@mui/material';

const SignUp = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const name = document.getElementById('name');
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const data = new FormData(event.currentTarget);
    const newUser = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const response = await fetch('https://basarwebsite.onrender.com/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const result = await response.json();
      localStorage.setItem('token', result.token); // Stockez le token JWT
      localStorage.setItem('user', JSON.stringify(result.result)); // Stockez les informations de l'utilisateur

      

      navigate('/login'); // Redirige vers la page de login
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card sx={{ maxWidth: 400, width: '100%', padding: 2 }}>
        <CardContent>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Create your account
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              name="name"
              type="text"
              label="Full name"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              error={nameError}
              helperText={nameErrorMessage}
            />
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email address"
              variant="outlined"
              margin="normal"
              fullWidth
              required
              error={emailError}
              helperText={emailErrorMessage}
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
              error={passwordError}
              helperText={passwordErrorMessage}
            />
            {errorMessage && (
              <Typography color="error" align="center">
                {errorMessage}
              </Typography>
            )}
            <FormControlLabel
              control={<Checkbox id="terms" name="terms" color="primary" />}
              label="I agree to the terms and conditions"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign up
            </Button>
            <Typography align="center">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </Typography>
          </form>
          <Divider sx={{ my: 2 }}>or</Divider>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('Sign up with Google')}
            sx={{ mb: 1 }}
          >
            Sign up with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert('Sign up with Github')}
          >
            Sign up with Github
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;