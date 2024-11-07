const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// Serve static files from 'public' directory
app.use(express.static('public'));

// Serve listings.html at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'listings.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
