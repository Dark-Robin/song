const express = require('express');
const axios = require('axios');
const app = express();

app.get('/download/ytmp3', async (req, res) => {
  try {
    const videoUrl = req.query.url;
    if (!videoUrl) {
      return res.status(400).json({ error: 'Missing YouTube URL.' });
    }

    // Extract the YouTube video ID
    const videoIdMatch = videoUrl.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
    if (!videoIdMatch) {
      return res.status(400).json({ error: 'Invalid YouTube URL.' });
    }
    const videoId = videoIdMatch[1];

    // Generate the download link
    const downloadLink = `https://cdn59.savetube.su/media/${videoId}/your-desired-filename.mp3`;

    // Verify if the link works
    try {
      await axios.head(downloadLink);
      res.json({ downloadLink });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch the download link. The service may have restrictions.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

module.exports = app;

