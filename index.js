// Import necessary libraries
const express = require("express"); // Web server framework
const axios = require("axios"); // HTTP request library
const ytdl = require("ytdl-core"); // YouTube video downloader library

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable or default port

// Create an endpoint to download audio from YouTube
app.get("/download/ytmp3", async (req, res) => {
    const videoUrl = req.query.url; // Extract 'url' query parameter

    if (!videoUrl) {
        return res.status(400).json({ error: "Please provide a YouTube URL as 'url' parameter." });
    }

    try {
        // Step 1: Extract the YouTube video ID
        const videoId = ytdl.getVideoID(videoUrl); // This extracts 'ptibTfys2To' from the URL

        // Step 2: Generate the direct audio download link
        const apiUrl = `https://cdn61.savetube.su/media/${videoId}`;
        const response = await axios.get(`${apiUrl}/metadata.json`); // Fetch metadata from the API

        const downloadLink = response.data.audio[0].url; // Adjust based on the API's response format

        // Step 3: Return the direct download link
        res.json({
            success: true,
            videoId,
            downloadLink,
        });
    } catch (error) {
        console.error("Error generating direct link:", error.message);
        res.status(500).json({ error: "Failed to generate direct download link." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
