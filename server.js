import express from 'express';
import path from 'path';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

app.use(express.static('public'));

app.get('/artists', (req, res) => {
    const data = fs.readFileSync('artists.json', 'utf-8');
    const artists = JSON.parse(data);
    res.json(artists);
});

// Handle requests for artist editing pages
app.get('/edit-artist', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'edit-artist.html');
    res.sendFile(filePath);
});

// Update artist by ID
app.put('/artists/:id', (req, res) => {
    const artistId = req.params.id;
    const updatedData = req.body;
    // Update the artist data in the JSON file based on the ID (you'll need to implement this)
    // Send a success or error response
});

// Handle GET request for fetching a single artist's data
app.get('/artists/:id', (req, res) => {
    const artistId = req.params.id; // Get the artist ID from the request parameters

    // Read the artists data from your JSON file (assuming it's an array)
    const data = fs.readFileSync('artists.json', 'utf-8');
    const artists = JSON.parse(data);

    // Find the artist with the matching ID
    const artist = artists.find((a) => a.id === artistId);

    if (artist) {
        // If the artist is found, send it as JSON response
        res.json(artist);
    } else {
        // If the artist is not found, send a 404 (Not Found) response
        res.status(404).json({ error: 'Artist not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
