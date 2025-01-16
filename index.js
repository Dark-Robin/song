const express = require('express');
const ytdl = require('ytdl-core');

const app = express();

app.get('/download/ytmp3', async (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).send({ error: 'Please provide a YouTube URL' });
    }

    try {
        const videoInfo = await ytdl.getInfo(videoUrl);
        const audioFormat = ytdl.chooseFormat(videoInfo.formats, { quality: 'highestaudio' });

        res.json({
            title: videoInfo.videoDetails.title,
            downloadLink: audioFormat.url,
        });
    } catch (err) {
        res.status(500).send({ error: 'Failed to process the URL', details: err.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
