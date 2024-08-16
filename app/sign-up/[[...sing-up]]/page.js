import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignIn, SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import '@/app/globals.css';

export default function SignUpPage() {
  return (
    <Container maxWidth='md'>
      <AppBar className='appBar' position="static" sx={{ backgroundColor: '#5C374C' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CodeCard
          </Typography>
          <Button className='loginButton' href='/sign-in'>
            <Link href="/sign-in" passHref style={{ textDecoration: 'none' }}>
              <Typography component="span" sx={{ color: 'white'}}>
                Login
              </Typography>
            </Link>
          </Button>
          <Button className='signUpButton'href='/sign-up'>
            <Link href="/sign-up" passHref style={{ textDecoration: 'none' }}>
              <Typography component="span" sx={{ color: 'white'}}>
                Sign Up
              </Typography>
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ textAlign: 'center', my: 4 }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ borderBottom: '4px solid #4A2040', textDecoration: 'none' }}>
          Sign Up
        </Typography>
       <SignUp/>
      </Box>
    </Container>
  )
}
