// server.js (Backend)

const express = require('express');
const cors = require('cors');
const fs = require('fs'); // File System module
const path = require('path'); // Path module

const app = express();
const port = process.env.PORT || 5000;
// --- Middleware ---

// Enable CORS for our frontend (running on localhost:3000)
app.use(cors());

// Serve static files (our images) from the 'public/images' directory
// This allows URLs like http://localhost:5000/images/photo1.jpg
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// --- API Endpoints ---

// 1. API to get the list of all images
app.get('/api/images', (req, res) => {
  const imagesDirectory = path.join(__dirname, 'public/images');

  fs.readdir(imagesDirectory, (err, files) => {
    if (err) {
      console.error("Could not list the directory.", err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Filter out non-image files if any (e.g., .DS_Store)
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|avif|heic)$/i.test(file)
    );

    res.json(imageFiles);
  });
});

// 2. API to handle downloading an image
app.get('/api/download/:imageName', (req, res) => {
  const { imageName } = req.params;
  const filePath = path.join(__dirname, 'public/images', imageName);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Image not found' });
  }

  // 'res.download()' prompts the user to download the file
  res.download(filePath, imageName, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
    }
  });
});

// --- Start the server ---
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});