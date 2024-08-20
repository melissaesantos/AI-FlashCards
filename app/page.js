'use client';
import { useRouter } from 'next/navigation'; // Use next/navigation for client-side navigation
import { useEffect } from 'react';
import Image from 'next/image';
import getStripe from '@/utils/get-stripe';
import '@/app/globals.css';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Head from 'next/head';
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid } from '@mui/material';

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useUser(); // Get user's sign-in status from Clerk

  const handleRedirect = () => {
    if (isSignedIn) {
      router.push('/generate'); // Redirect to generate page if signed in
    } else {
      router.push('/sign-up'); // Redirect to sign-up page if not signed in
    }
  };

  const handleSubmit = async (amount) => {
    console.log('Submitting amount:', amount); // Log the amount
    try {
      const checkoutSession = await fetch('/api/checkout_session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'origin': 'http://localhost:3000',
        },
        body: JSON.stringify({ amount }), // Pass the amount as part of the request body
      });

      console.log('Response:', checkoutSession);

      if (!checkoutSession.ok) {
        throw new Error(`HTTP error! status: ${checkoutSession.status}`);
      }

      const checkoutSessionJson = await checkoutSession.json();
      console.log('Parsed JSON:', checkoutSessionJson);

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      alert('An error occurred while processing your request. Please try again later.');
    }
  };

  return (
    <>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flash from your text" />
      </Head>
      <AppBar position="static" className="appBar">
        <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" className="title">CodeCard</Typography>
          </Box>
          <SignedOut>
            <Button 
              sx={{ 
                background: 'linear-gradient(45deg, #5C374C 30%, #802063 90%)', 
                color: 'white', 
                padding: '8px 16px', 
                borderRadius: '20px', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                '&:hover': { 
                  background: 'linear-gradient(45deg, #802063 30%, #5C374C 90%)', 
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)'
                },
                transition: 'all 0.3s ease',
                margin: '0 10px'
              }} 
              variant="contained" 
              className="loginButton"
              href='/sign-in'
            >
              Login
            </Button>
            <Button 
              sx={{ 
                background: 'linear-gradient(45deg, #5C374C 30%, #802063 90%)', 
                color: 'white', 
                padding: '8px 16px', 
                borderRadius: '20px', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                '&:hover': { 
                  background: 'linear-gradient(45deg, #802063 30%, #5C374C 90%)', 
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)'
                },
                transition: 'all 0.3s ease',
                margin: '0 10px'
              }} 
              variant="contained" 
              className="signUpButton"
              href='/sign-up'
            >
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h2">Welcome to CodeCard</Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>The easiest way to make flashcards to ace your coding interviews!</Typography>
          <Button 
            onClick={handleRedirect} // Use handleRedirect to check authentication status
            variant="contained" 
            className="getstartedbutton" 
            sx={{ 
              mt: 2, 
              backgroundColor: '#b599e0', 
              borderRadius: '20px', 
              padding: '12px 24px', 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
              '&:hover': { 
                backgroundColor: '#a487d0', 
                transform: 'translateY(-2px)', 
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)' 
              } 
            }}
          >
            Get Started
          </Button>
        </Box>

        <Box sx={{ my: 6 }}>
          <Box sx={{ display: 'inline-block', borderBottom: '4px solid', borderColor: '#802063', mb: 4 }}>
            <Typography variant='h4' component='h2' sx={{ fontWeight: 'bold' }}>
              Features
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', boxShadow: 3, '&:hover': { boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)' } }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Easy Text Input</Typography>
                <Typography>Simply input your text and let our software do the rest. Creating flashcards has never been easier!</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', boxShadow: 3, '&:hover': { boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)' } }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Smart Flashcard</Typography>
                <Typography>Our AI intelligently breaks down your text into concise flashcards, perfect for studying.</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', boxShadow: 3, '&:hover': { boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)' } }}>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Accessible Anywhere</Typography>
                <Typography>Access your flashcards from any device! You can study on the go!</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 6, textAlign: 'center', display: 'inline-block', borderBottom: '4px solid', borderColor: '#802063' }}>
          <Typography variant='h4' component='h2' sx={{ fontWeight: 'bold' }}>
            Plans
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', boxShadow: 3, '&:hover': { boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)' } }}>
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Student Plan</Typography>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>$0 / month</Typography>
              <Typography>Access to basic flashcard creation and study features.</Typography>
              <Button onClick={() => handleSubmit(0.00)} sx={{ mt: 2, backgroundColor: '#802063', color: 'white', '&:hover': { backgroundColor: '#b599e0', transform: 'translateY(-2px)', boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)' } }}>
                Choose Plan
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', boxShadow: 3, '&:hover': { boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)' } }}>
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Basic Plan</Typography>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>$5 / month</Typography>
              <Typography>Access to basic flashcard creation and study features.</Typography>
              <Button onClick={() => handleSubmit(5)} sx={{ mt: 2, backgroundColor: '#802063', color: 'white', '&:hover': { backgroundColor: '#b599e0', transform: 'translateY(-2px)', boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)' } }}>
                Choose Plan
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', boxShadow: 3, '&:hover': { boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)' } }}>
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Pro Plan</Typography>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>$10 / month</Typography>
              <Typography>Unlock advanced features like AI-powered flashcard creation.</Typography>
              <Button onClick={() => handleSubmit(10)} sx={{ mt: 2, backgroundColor: '#802063', color: 'white', '&:hover': { backgroundColor: '#b599e0', transform: 'translateY(-2px)', boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)' } }}>
                Choose Plan
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
