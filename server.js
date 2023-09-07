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

// function to read json file
function readArtistsData() {
    const data = fs.readFileSync('artists.json', 'utf-8');
    return JSON.parse(data);
}

// function to write artists to json file
function writeArtistsData(artists) {
    fs.writeFileSync('artists.json', JSON.stringify(artists, null, 2), 'utf-8');
}

// get all artists in json format
app.get('/artists', (req, res) => {
    const data = fs.readFileSync('artists.json', 'utf-8');
    const artists = JSON.parse(data);
    res.json(artists);
});

// GET request for fetching a single artist by ID
app.get('/artists/:id', (req, res) => {
    const artistId = parseInt(req.params.id); 

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

// navigates to edit-artist page
app.get('/edit-artist', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'edit-artist.html');
    res.sendFile(filePath);
});

// update artist by ID
app.put('/artists/:id', (req, res) => {
    const artistId = parseInt(req.params.id);
    const updatedData = req.body;
    const artists = readArtistsData();

    // Find the artist with the matching ID
    const index = artists.find((a) => a.id === artistId);

    if (index !== -1) {
        // If the artist is found, update their data
        artists[index] = { ...artists[index], ...updatedData };
        writeArtistsData(artists);
        res.json({ message: 'Artist updated successfully' });
        
    } else {
        // If the artist is not found, send a 404 (Not Found) response
        res.status(404).json({ error: 'Artist not found' });
    }
});

// add a new artist
app.post('/artists', async (req, res) => {
    const newArtist = req.body;
    const artists = readArtistsData();

    // Assign a unique ID to the new artist
    newArtist.id = Date.now().toString();

    // Push the new artist to the array
    artists.push(newArtist);

    // Write the updated data back to the JSON file
    writeArtistsData(artists);

    res.json(newArtist);
});

// Handle GET request for fetching a single artist's data
app.get('/artists/:id', (req, res) => {
    const artistId = parseInt(req.params.id);

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

// delete artist by ID
app.delete('/artists/:id', (req, res) => {
    const artistId = parseInt(req.params.id);
    const artists = readArtistsData();

    // Find the index of the artist with the matching ID
    const index = artists.findIndex((a) => a.id === artistId);

    if (index !== -1) {
        // If the artist is found, remove them from the array
        artists.splice(index, 1);

        // Write the updated data back to the JSON file
        writeArtistsData(artists);

        res.json({ message: 'Artist deleted successfully' });
    } else {
        // If the artist is not found, send a 404 (Not Found) response
        res.status(404).json({ error: 'Artist not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
