// server.js (assuming your model is set up to interact with the 'artworks' collection)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Artworks = require('./Artworks'); // Make sure this is correctly set up for the 'artworks' collection

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files (client)
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/arts', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// API endpoint to get all paintings
app.get('/api/paintings', async (req, res) => {
  try {
    const paintings = await Artworks.find({});
    res.json(paintings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching paintings' });
  }
});

// API endpoint to get a single painting by ID
app.get('/api/paintings/:id', async (req, res) => {
  try {
    console.log("id to find:" + req.params.id);
    const painting = await Artworks.findById(req.params.id);
    res.json(painting);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching painting' });
  }
});

// API endpoint to update a painting by ID
app.put('/api/paintings/:id', async (req, res) => {
  try {
    const updatedPainting = await Artworks.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPainting);
  } catch (error) {
    res.status(500).json({ error: 'Error updating painting' });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


