import Image from 'next/image'
import getStripe from '@/utils/get-stripe'
import '@/app/globals.css';

import { SignedIn, SignedOut, UserButton,useUser } from '@clerk/nextjs'
import Head from 'next/head'
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid } from '@mui/material'

export default function Home() {
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
          <Button variant="contained" className="getstartedbutton" sx={{ mt: 2, backgroundColor: '#b599e0', borderRadius: '20px', padding: '12px 24px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', '&:hover': { backgroundColor: '#a487d0', transform: 'translateY(-2px)', boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)' } }}>
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

        <Box sx={{ my: 6, textAlign: 'center', display: 'inline-block', borderBottom: '4px solid', borderColor: '#802063', mb: 4 }}>
          <Typography sx={{ fontWeight: 'bold', display: 'inline-block', borderBottom: '4px solid', borderColor: '#802063', mb: 4 }} variant='h4'>
            Pricing
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', boxShadow: 3 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Student Plan</Typography>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>$0 / month</Typography>
                <Typography>Access to basic flashcard creation and study features.</Typography>
                <Button variant="contained" sx={{ mt: 2, backgroundColor: '#802063', borderRadius: '20px', padding: '8px 16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', '&:hover': { backgroundColor: '#5C374C', boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)' } }}>Select</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', boxShadow: 3 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Basic Plan</Typography>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>$5 / month</Typography>
                <Typography>Access to basic flashcard creation and study features.</Typography>
                <Button variant="contained" sx={{ mt: 2, backgroundColor: '#802063', borderRadius: '20px', padding: '8px 16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', '&:hover': { backgroundColor: '#5C374C', boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)' } }}>Select</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', boxShadow: 3 }}>
                <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Pro Plan</Typography>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>$10 / month</Typography>
                <Typography>Unlock advanced features like AI-powered flashcard creation.</Typography>
                <Button variant="contained" sx={{ mt: 2, backgroundColor: '#802063', borderRadius: '20px', padding: '8px 16px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', '&:hover': { backgroundColor: '#5C374C', boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)' } }}>Select</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}
