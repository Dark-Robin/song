const express = require('express');
const ytdl = require('ytdl-core');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('YouTube Downloader API is running.');
});

// API endpoint to generate MP3 download link
app.get('/download/ytmp3', async (req, res) => {
  try {
    const videoUrl = req.query.url;
    if (!videoUrl || !ytdl.validateURL(videoUrl)) {
      return res.status(400).json({ error: 'Invalid or missing YouTube URL.' });
    }

    const info = await ytdl.getInfo(videoUrl);
    const title = info.videoDetails.title;

    // Get audio format
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
    const downloadLink = audioFormat.url;

    res.json({
      title,
      downloadLink,
    });
  } catch (error) {
    console.error(error);
   

