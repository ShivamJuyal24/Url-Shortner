const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Url = require('./models/url');

const shortid = require('shortid');


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.post('/api/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ error: 'URL is required' });

  try {
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.json({ shortUrl: `${process.env.BASE_URL}/${url.shortUrl}` });
    }

    const shortUrl = shortid.generate();
    url = new Url({ originalUrl, shortUrl });
    await url.save();
    res.json({ shortUrl: `${process.env.BASE_URL}/${url.shortUrl}` });
  } catch (err) {
     console.error('POST /api/shorten error:', err); // <-- ADD THIS
    res.status(500).json({ error: 'Server error' });
  }
});

app.get("/:shortUrl", async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });

    if (url) {
      url.clicks++;
      await url.save();
      return res.redirect(url.originalUrl.startsWith("http") ? url.originalUrl : "https://" + url.originalUrl);
    } else {
      return res.status(404).json({ error: "URL not found" });
    }
  } catch (err) {
    console.error("GET /:shortUrl error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));