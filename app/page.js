import Image from 'next/image'
import getStripe from '@/utils/get-stripe'
import '@/app/globals.css';

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Head from 'next/head'
import { AppBar, Container, Toolbar, Typography, Button, Box } from '@mui/material'

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
            <Button sx={{ backgroundColor: '#b599e0' }} variant="contained" className="loginButton">Login</Button>
            <Button variant="contained" className="signUpButton">Sign Up</Button>
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
      </Container>
    </>
  )
}
