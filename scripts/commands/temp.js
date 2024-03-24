module.exports.config = {
    name: "temp",
    version: "1.0.5",
    permission: 0,
    prefix: true,
    credits: "Deku",
    description: "Get all uid and names in Group.",
    category: "Media",
    cooldowns: 2
};

const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/generate', async (req, res) => {
  try {
    const response = await axios.get('https://n342hg-3000.csb.app/gen');
    console.log(response.data);
    const email = response.data.email;
    res.json({ email });
    console.log(email);
  } catch (error) {
    res.json({ error: error.message });
    console.log(error);
  }
});

router.get('/inbox', async (req, res) => {
  const title = req.query.title;
  try {
    const response = await axios.get(`https://n342hg-3000.csb.app/inbox/${title}`);
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    res.json({ error: error.message });
    console.log(error);
  }
});

module.exports = router;
