const express = require("express");
const router = express.Router();
const axios = require("axios");

const marvelUrl = process.env.MARVEL_URL;

router.get("/marvel/characters", async (req, res) => {
  try {
    // console.log("Coucou");
    const { page, limit, name } = req.query;
    // 100 results per page
    const skip = page * 100 - 100;
    const response = await axios.get(`${marvelUrl}/characters`, {
      params: {
        apiKey: process.env.MARVEL_API_KEY,
        skip: skip,
        limit: limit,
        name: name,
      },
    });
    return res.status(200).json({ data: response.data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/marvel/character/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${marvelUrl}/character/${id}`, {
      params: {
        apiKey: process.env.MARVEL_API_KEY,
      },
    });
    return res.status(200).json({ message: response.data });
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

module.exports = router;
