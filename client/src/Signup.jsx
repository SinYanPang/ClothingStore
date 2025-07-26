import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    // Simulate successful sign up
    alert('Sign up successfully');
    navigate('/signin'); // Redirect to Signin.jsx
  };

  return (
    <div>
      <Card
        sx={{
          maxWidth: 400,
          margin: '0 auto',
          marginTop: 4,
          padding: 2,
          textAlign: 'center'
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontSize: 18 }}>
            Sign Up
          </Typography>

          <TextField
            id="name"
            label="Name"
            fullWidth
            value={values.name}
            onChange={handleChange('name')}
            margin="normal"
          />
          <TextField
            id="email"
            label="Email"
            fullWidth
            value={values.email}
            onChange={handleChange('email')}
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={values.password}
            onChange={handleChange('password')}
            margin="normal"
          />
        </CardContent>

        <CardActions sx={{ justifyContent: 'center', marginBottom: 2 }}>
          <Button color="primary" variant="contained" onClick={clickSubmit}>
            Submit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}