const express = require('express');
const ytdl = require('ytdl-core');

const app = express();

// Base route for testing
app.get('/', (req, res) => {
  res.send('YouTube to MP3 Downloader API is running!');
});

app.get('/download/ytmp3', async (req, res) => {
  try {
    const videoUrl = req.query.url;

    // Validate the YouTube URL
    if (!videoUrl || !ytdl.validateURL(videoUrl)) {
      return res.status(400).json({ error: 'Invalid or missing YouTube URL.' });
    }

    // Get video information
    const info = await ytdl.getInfo(videoUrl);

    // Choose the best audio format or fallback
    const audioFormat =
      ytdl.chooseFormat(info.formats, { quality: 'highestaudio' }) ||
      ytdl.chooseFormat(info.formats, { quality: 'lowestaudio' });

    if (!audioFormat) {
      return res.status(404).json({ error: 'No audio format available for this video.' });
    }

    // Respond with the audio download URL
    res.json({
      title: info.videoDetails.title,
      downloadLink: audioFormat.url,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: 'Failed to process the request.' });
  }
});


