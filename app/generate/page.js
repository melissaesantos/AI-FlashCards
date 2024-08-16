'use client'

import { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material'
import {useUser} from '@clerk/next.js'

export default function Generate() {
    const {isloaded, isSignedIn,user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped,setFlipped] = useState([])
    const [text,setText] = useState('')
    const [name,setName] = useState('')
    const [open,setOpen] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        if (!text.trim()) {
          alert('Please enter some text to generate flashcards.')
          return
        }
      
        try {
          const response = await fetch('/api/generate', {
            method: 'POST',
            body: text,
          })
      
          if (!response.ok) {
            throw new Error('Failed to generate flashcards')
          }
      
          const data = await response.json()
          setFlashcards(data)
        } catch (error) {
          console.error('Error generating flashcards:', error)
          alert('An error occurred while generating flashcards. Please try again.')
        }
    }
    const handleCardClick = (id) => {
        setFlipped((prev)=>({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const handleOpen =()=>{
        setOpenI(true)
    }
    const handleClose =()=>{
        setOpenI(false)
    }
}