//THIS IS OUR HOMEPAGE/LANDING PAGE 
import Image from 'next/image'
import getStripe from '@/utils/get-stripe'
import {SignedIn, SignedOut,UserButton} from '@clerk/nextjs'
import Head from 'next/head'
import { AppBar, Container, Toolbar, Typography } from '@mui/material'

export default function Home(){
    return(
      <Container maxWidth="lg">
        <Head>
        <title>flashcard Saas</title>
        <meta name = "description" content = 'Create flash from your text'></meta>
        </Head>
        <AppBar position ="static">
          <Toolbar>
            <Typography variant = 'h6'>flashcard Saas</Typography> 
          </Toolbar>
        </AppBar>
      </Container>
    )
}
