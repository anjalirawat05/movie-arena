const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const admin = require('./firebaseAdmin');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(express.json()); 


const OMDB_API_KEY = process.env.OMDB_API_KEY; 

app.get('/api/movies', async (req, res) => {
    const { query } = req.query; 
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await axios.get(`http://www.omdbapi.com/`, {
            params: {
                apikey: OMDB_API_KEY,
                s: query, 
            },
        });

        if (response.data.Response === 'False') {
            return res.status(404).json({ error: response.data.Error });
        }

      
        res.json(response.data.Search);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch data from OMDb API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});








