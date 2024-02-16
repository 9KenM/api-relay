const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
  
app.use(cors());

app.get('/api/top-headlines', async (req, res) => {
    try {
        const { query } = req;

        const apiUrl="https://newsapi.org/v2/top-headlines";

        const url = new URL(apiUrl);
        Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));

        const response = await axios.get(url.toString());

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));