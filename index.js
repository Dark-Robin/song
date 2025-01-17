const express = require('express');
const ytdl = require('ytdl-core');

const app = express();

app.get('/', (req, res) => {
  res.send('YouTube Audio Downloader API is running!');
});

app.get('/download/ytmp3', async (req, res) => {
  try {
    const videoUrl = req.query.url;
    if (!videoUrl || !ytdl.validateURL(videoUrl)) {
      return res.status(400).json({ error: 'Invalid or missing YouTube URL.' });
    }

    const info = await ytdl.getInfo(videoUrl);
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    res.json({
      title: info.videoDetails.title,
      downloadLink: audioFormat.url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to process the request.' });
  }
});

module.exports = app;
