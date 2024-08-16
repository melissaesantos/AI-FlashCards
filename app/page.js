import Image from 'next/image'
import getStripe from '@/utils/get-stripe'
import '@/app/globals.css';

import {SignedIn, SignedOut,UserButton} from '@clerk/nextjs'
import Head from 'next/head'
import { AppBar, Container, Toolbar, Typography,Button,Box } from '@mui/material'

export default function Home(){
  return(
    <Container maxWidth="lg">
      <Head>
      <title>flashcard Saas</title>
      <meta name = "description" content = 'Create flash from your text'></meta>
      </Head>
      <AppBar position ="static" className="appBar">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h5" className="title">SWE CARDS</Typography> 
          </Box>
          <SignedOut>
            <Button sx={{backgroundColor:'#b599e0'} }variant="contained" className="loginButton">Login</Button>
            <Button variant="contained" className="signUpButton">Sign Up</Button>
          </SignedOut>
          <SignedIn>
             <UserButton/>
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box>
        <Typography variant="h2">Welcome to FLASH Cards</Typography>
        <Typography variant="h5">The easiest way to make flashcards from your text</Typography>
        <Button variant="contained" className="getstartedbutton" sx={{ mt: 2,backgroundColor:'#b599e0' }}>
          Get Started
        </Button>
      </Box>
    </Container>
  )
}