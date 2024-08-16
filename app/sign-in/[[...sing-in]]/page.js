import React from 'react'
import { Container, Box, Typography, AppBar, Toolbar, Button } from '@mui/material'
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import '@/app/globals.css';

export default function SignUpPage() {
  return (
    <Container maxWidth='md'>
      <AppBar position="static" sx={{ backgroundColor: '#5C374C' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CodeCard
          </Typography>
          <Button sx={{ color: 'white', backgroundColor: '#5C374C', '&:hover': { backgroundColor: '#5C374C' } }}>
            <Link href="/sign-in" passHref style={{ textDecoration: 'none' }}>
              <Typography component="span" sx={{ color: 'white', borderBottom: '4px solid #4A2040' }}>
                Login
              </Typography>
            </Link>
          </Button>
          <Button sx={{ color: 'white', backgroundColor: '#5C374C', '&:hover': { backgroundColor: '#5C374C' } }}>
            <Link href="/sign-up" passHref style={{ textDecoration: 'none' }}>
              <Typography component="span" sx={{ color: 'white', borderBottom: '4px solid #4A2040' }}>
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
          Sign In
        </Typography>
        <SignIn />
      </Box>
    </Container>
  )
}
