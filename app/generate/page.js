"use client";

import { useState, useEffect } from "react";
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
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Generate() {
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [savedFlashcards, setSavedFlashcards] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
    if (!name.trim()) {
      alert("Please enter a name for your flashcard set.");
      return;
    }

    try {
      // Mock saving function (replace with actual Firestore logic)
      const newSavedFlashcards = [...savedFlashcards, { name, flashcards }];
      setSavedFlashcards(newSavedFlashcards);

      alert("Flashcards saved successfully!");
      handleClose();
      setName(""); // Clear the name input after saving
      setFlashcards([]); // Clear generated flashcards after saving
    } catch (error) {
      console.error("Error saving flashcards:", error);
      alert("An error occurred while saving flashcards. Please try again.");
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  useEffect(() => {
    // Optionally fetch saved flashcards from a database or local storage
  }, []);

  return (
    <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "row" }}>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ width: 250, flexShrink: 0 }}
      >
        <Box
          sx={{ width: 250, backgroundColor: "#985277", color: "white" }}
        >
          <Typography variant="h6" sx={{ padding: 2, textAlign: "center" }}>
            Saved Flashcards
          </Typography>
          <Divider />
          <List>
            {savedFlashcards.length > 0 ? (
              savedFlashcards.map((set, index) => (
                <ListItem button key={index} onClick={() => setSelectedSet(set)}>
                  <ListItemText primary={set.name} />
                </ListItem>
              ))
            ) : (
              <Typography sx={{ padding: 2, textAlign: "center" }}>
                No flashcards saved.
              </Typography>
            )}
          </List>
        </Box>
      </Drawer>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ margin: "16px 0" }}>
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
            <CircularProgress color="secondary" />
            <Typography variant="h6">Generating flashcards...</Typography>
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
              {flashcards.length > 0 && (
                <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#802063",
                      color: "white",
                      "&:hover": { backgroundColor: "#5C374C" },
                      borderRadius: "20px",
                    }}
                    onClick={handleOpen}
                    fullWidth
                  >
                    Save Flashcards
                  </Button>
                </Box>
              )}
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
            <DialogContentText sx={{ color: "white" }}>
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
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions
            sx={{ backgroundColor: "#985277", padding: 2 }}
          >
            <Button
              onClick={handleClose}
              sx={{ color: "white" }}
            >
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
      </Box>
    </Container>
  );
}

