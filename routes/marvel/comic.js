const express = require("express");
const router = express.Router();
const axios = require("axios");

const marvelUrl = process.env.MARVEL_URL;

router.get("/marvel/comics", async (req, res) => {
  try {
    const { page, limit, title } = req.query;
    // 100 results per page
    const skip = page * 100 - 100;
    const response = await axios.get(`${marvelUrl}/comics`, {
      params: {
        apiKey: process.env.MARVEL_API_KEY,
        skip: skip,
        limit: limit,
        title: title,
      },
    });
    res.status(200).json({ data: response.data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Comics by character id
router.get("/marvel/comics/:charId", async (req, res) => {
  try {
    const { charId } = req.params;
    const response = await axios.get(`${marvelUrl}/comics/${charId}`, {
      params: {
        apiKey: process.env.MARVEL_API_KEY,
      },
    });
    return res.status(200).json({ data: response.data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// One comic infos
router.get("/marvel/comic/:comicId", async (req, res) => {
  try {
    const { comicId } = req.params;
    const response = await axios.get(`${marvelUrl}/comic/${comicId}`, {
      params: {
        apiKey: process.env.MARVEL_API_KEY,
      },
    });
    return res.status(200).json({ data: response.data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
