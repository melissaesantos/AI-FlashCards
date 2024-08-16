import Image from 'next/image'
import getStripe from '@/utils/get-stripe'
import '@/app/globals.css';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Head from 'next/head'
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid } from '@mui/material'

export default function Home() {
  return (
    <>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flash from your text" />
      </Head>
      <AppBar position="static" className="appBar" sx={{ width: '100%', boxSizing: 'border-box' }}>
        <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" className="title">CodeCard</Typography>
          </Box>
          <SignedOut>
            <Button sx={{ backgroundColor: '#31081F' }} variant="contained" className="loginButton">Login</Button>
            <Button sx={{ backgroundColor: '#31081F' }} variant="contained" className="signUpButton">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h2">Welcome to CodeCard</Typography>
          <Typography variant="h5">The easiest way to make flashcards to ace your coding interviews!</Typography>
          <Button variant="contained" className="getstartedbutton" sx={{ mt: 2, backgroundColor: '#b599e0' }}>
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
              <Typography variant='h6'>Easy Text Input</Typography>
              <Typography>Simply input your text and let our software do the rest. Creating flashcards has never been easier!</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant='h6'>Smart Flashcard</Typography>
              <Typography>Our AI intelligently breaks down your text into concise flashcards, perfect for studying.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant='h6'>Accessible Anywhere</Typography>
              <Typography>Access your flashcards from any device, anywhere!</Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 6, textAlign: 'center', display: 'inline-block', borderBottom: '4px solid', borderColor: '#802063', mb: 4  }}>
          <Typography  sx={{ fontWeight: 'bold', display: 'inline-block', borderBottom: '4px solid', borderColor: '#802063', mb: 4 }} variant='h4'>
            Pricing
            </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', boxShadow: 3 }}>
                <Typography variant='h6'>Basic Plan</Typography>
                <Typography>Access to basic flashcard creation and study features.</Typography>
                <Button variant="contained" sx={{ mt: 2, backgroundColor: '#802063' }}>Select</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', boxShadow: 3 }}>
                <Typography variant='h6'>Pro Plan</Typography>
                <Typography>Unlock advanced features like AI-powered flashcard creation.</Typography>
                <Button variant="contained" sx={{ mt: 2, backgroundColor: '#802063' }}>Select</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: '8px', boxShadow: 3 }}>
                <Typography variant='h6'>Enterprise Plan</Typography>
                <Typography>Get custom solutions for large teams or organizations.</Typography>
                <Button variant="contained" sx={{ mt: 2, backgroundColor: '#802063' }}>Select</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}
