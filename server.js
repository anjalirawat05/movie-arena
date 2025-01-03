const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const admin = require('./firebaseAdmin'); // Firebase Admin setup

const app = express();
const PORT = 3001;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies


// Middleware to verify token
const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(403).send('Unauthorized');
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(403).send('Invalid token');
    }
  };
  
  // Example protected route
  app.get('/protected', verifyToken, (req, res) => {
    res.send(`Welcome ${req.user.email}, you have access to this route!`);
  });

// Environment Variables
const OMDB_API_KEY = process.env.OMDB_API_KEY; // Store your OMDb API key in a .env file

// Search route to fetch multiple movies
app.get('/api/movies', async (req, res) => {
    const { query } = req.query; // Get search query from URL eg./api/movies?query=inception
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await axios.get(`http://www.omdbapi.com/`, {
            params: {
                apikey: OMDB_API_KEY,
                s: query, // Use 's' parameter for searching movies
            },
        });

        if (response.data.Response === 'False') {
            return res.status(404).json({ error: response.data.Error });
        }

        // Return search results
        res.json(response.data.Search);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch data from OMDb API' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});








