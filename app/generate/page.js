"use client";

import { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Generate() {
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    fetch("api/generate", {
      method: "POST",
      body: text,
    })
      .then((res) => res.json())
      .then((data) => {
        setFlashcards(data);
        setLoading(false); // Stop loading
      })
      .catch(() => setLoading(false)); // Stop loading on error
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id], // Flip card with specific id
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }

    try {
      // Mock saving function (replace with actual Firestore logic)
      console.log("Saving flashcards", { name: setName, flashcards });

      alert("Flashcards saved successfully!");
      handleCloseDialog();
      setSetName("");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  return (
    <Container maxWidth="md" >
      <Box >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", color: "white" }}
        >
          Generate Flashcards
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#802063",
            color: "white",
            "&:hover": { backgroundColor: "#5C374C" },
            borderRadius: "20px",
          }}
          onClick={handleSubmit}
          fullWidth
        >
          Generate Flashcards
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6">Generating flashcards...</Typography>
          {/* Replace with a spinner or progress bar if you prefer */}
        </Box>
      ) : (
        flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              Generated Flashcards
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {flashcards.map((flashcard, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  onClick={() => handleCardClick(index)}
                >
                  <Card
                    sx={{
                      boxShadow: 3,
                      borderRadius: "12px",
                      border: "1px solid #ddd",
                      perspective: "1000px",
                    }}
                  >
                    <CardContent
                      sx={{
                        transformStyle: "preserve-3d",
                        transform: flipped[index]
                          ? "rotateY(180deg)"
                          : "rotateY(0deg)",
                        transition: "transform 0.6s",
                        position: "relative",
                        height: "400px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* Front Side */}
                      <Box
                        sx={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          backfaceVisibility: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          padding: 2,
                          boxSizing: "border-box",
                          backgroundColor: "white",
                          borderRadius: "12px",
                          transform: "rotateY(0deg)",
                          overflowY: "auto",
                          textAlign: "center", // Center text inside the card
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          Front:
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          {flashcard.front}
                        </Typography>
                      </Box>

                      {/* Back Side */}
                      <Box
                        sx={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          backfaceVisibility: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          padding: 2,
                          boxSizing: "border-box",
                          backgroundColor: "white",
                          borderRadius: "12px",
                          transform: "rotateY(180deg)",
                          overflowY: "auto",
                          textAlign: "center", // Center text inside the card
                        }}
                      >
                        <Typography
                          variant="h6"
                          component="div"
                          sx={{ fontWeight: "bold" }}
                        >
                          Back:
                        </Typography>
                        <Typography>{flashcard.back}</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ backgroundColor: "#802063", color: "white" }}>
          Save Flashcard Set
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "#802063" }}>
            Cancel
          </Button>
          <Button
            onClick={saveFlashcards}
            sx={{
              backgroundColor: "#802063",
              color: "white",
              "&:hover": { backgroundColor: "#5C374C" },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
