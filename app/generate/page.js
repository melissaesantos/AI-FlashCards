'use client'
import {useUser} from '@clerk/next.js'
import { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material'

import { writeBatch } from 'firebase/firestore'

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
    const saveFlashcards = async () => {
        if (!setName.trim()) {
          alert('Please enter a name for your flashcard set.')
          return
        }
      
        try {
          const userDocRef = doc(collection(db, 'users'), user.id)
          const userDocSnap = await getDoc(userDocRef)
      
          const batch = writeBatch(db)
      
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data()
            const updatedSets = [...(userData.flashcardSets || []), { name: setName }]
            batch.update(userDocRef, { flashcardSets: updatedSets })
          } else {
            batch.set(userDocRef, { flashcardSets: [{ name: setName }] })
          }
      
          const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
          batch.set(setDocRef, { flashcards })
      
          await batch.commit()
      
          alert('Flashcards saved successfully!')
          handleCloseDialog()
          setSetName('')
        } catch (error) {
          console.error('Error saving flashcards:', error)
          alert('An error occurred while saving flashcards. Please try again.')
        }
      }
      //SAVE FLASHCARD BUTTON
      {flashcards.length > 0 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleOpenDialog}>
            Save Flashcards
          </Button>
        </Box>
      )}
      

}