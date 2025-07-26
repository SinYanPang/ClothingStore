import React, { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  Typography,
  Link
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Navigate, Link as RouterLink } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  textAlign: 'center',
  marginTop: theme.spacing(5),
  paddingBottom: theme.spacing(2)
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  width: 300
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: 'auto',
  marginBottom: theme.spacing(2)
}));

export default function Signin() {
  const [redirect, setRedirect] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = () => {
    alert('Signed in successfully');
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" sx={{ mt: 2, color: 'text.primary' }}>
          Sign In
        </Typography>
        <StyledTextField
          id="email"
          type="email"
          label="Email"
          value={values.email}
          onChange={handleChange('email')}
          margin="normal"
        />
        <br />
        <StyledTextField
          id="password"
          type="password"
          label="Password"
          value={values.password}
          onChange={handleChange('password')}
          margin="normal"
        />
      </CardContent>
      <CardActions>
        <SubmitButton color="primary" variant="contained" onClick={clickSubmit}>
          Submit
        </SubmitButton>
      </CardActions>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Don't have an account?{' '}
        <Link component={RouterLink} to="/signup">
          Create an account
        </Link>
      </Typography>
    </StyledCard>
  );
}