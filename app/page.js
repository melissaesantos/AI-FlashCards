//THIS IS OUR HOMEPAGE/LANDING PAGE 
import Image from 'next/image'
import getStripe from '@/utils/get-stripe'
import '@/app/globals.css';

import {SignedIn, SignedOut,UserButton} from '@clerk/nextjs'
import Head from 'next/head'
import { AppBar, Container, Toolbar, Typography,Button } from '@mui/material'

export default function Home(){
  return(
    <Container maxWidth="lg">
      <Head>
      <title>flashcard Saas</title>
      <meta name = "description" content = 'Create flash from your text'></meta>
      </Head>
      <AppBar position ="static" className="appBar">
        <Toolbar>
          <Typography variant="h5" className="title">SWE CARDS</Typography> 
          <SignedOut>
            <Button sx={{backgroundColor:'#b599e0'} }variant="contained" className="loginButton">Login</Button>
            <Button variant="contained" className="signUpButton">Sign Up</Button>
          </SignedOut>
          <SignedIn>
             <UserButton/>
          </SignedIn>
        </Toolbar>
      </AppBar>
    </Container>
  )
}