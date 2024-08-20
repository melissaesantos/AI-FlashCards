"use client";

import { useState } from "react";
import { Container, Box, TextField, Button, Typography, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Card, CardContent, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Generate() {
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    fetch("api/generate", {
      method: "POST",
      body: text,
    })
      .then((res) => res.json())
      .then((data) => setFlashcards(data));
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id], //flip card with specific id
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveFlashcards = async () => {
    if (!name.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }

    try {
      console.log("Saving flashcards", { name, flashcards });
      alert("Flashcards saved successfully!");
      handleClose();
      setName("");
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", color: "#333" }}
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

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333" }}
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
                    perspective: "1000px",
                    height: "250px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
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
                      width: "100%",
                      height: "100%",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
                        backgroundColor: "#f5f5f5",
                        borderRadius: "12px",
                        transform: "rotateY(0deg)",
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        Front
                      </Typography>
                      <Typography sx={{ mt: 2 }}>{flashcard.front}</Typography>
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
                        backgroundColor: "#e0e0e0",
                        borderRadius: "12px",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: "bold", color: "#333" }}
                      >
                        Back
                      </Typography>
                      <Typography sx={{ mt: 2 }}>{flashcard.back}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
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
