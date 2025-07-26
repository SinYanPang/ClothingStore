import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled card layout
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  textAlign: 'center',
  marginTop: theme.spacing(5),
  paddingBottom: theme.spacing(2)
}));

const Signout = () => {
  const navigate = useNavigate();

  
  const handleSignOut = () => {
    alert('Signed out successfully');
    navigate('/');
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" sx={{ mt: 2, color: 'text.primary' }}>
          You've signed out of your account
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }} 
          onClick={handleSignOut}
        >
          Go to Home
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default Signout;
