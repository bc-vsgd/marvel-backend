// Packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
// Routes
const marvelComicRoutes = require("./routes/marvel/comic");
const marvelCharacterRoutes = require("./routes/marvel/character");
app.use(marvelComicRoutes);
app.use(marvelCharacterRoutes);

// Home
app.get("/", (req, res) => {
  try {
    return res.status(200).json({ message: "My site home page" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

// Marvel home
// const marvelUrl = process.env.MARVEL_URL;
app.get("/marvel", (req, res) => {
  try {
    return res.status(200).json({ message: "Marvel home page" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Not found
app.all("*", (req, res) => {
  return res.status(404).json({ message: "Not found" });
});

app.listen(3000, () => {
  console.log("Marvel server started");
});
