module.exports.config = {
  name: "app",
  version: "1.0.0",
  permission: 0,
  credits: "Nayan",
  description: "all groups",
  prefix: true,
  category: "admin",
  usages: "groups",
  cooldowns: 5,
};

  const axios = require("axios")
const express = require("express");
const app = express();
const port = 3000;

app.get("/appstate", async (req, res) => {
  const email = req.query.e;
  const password = req.query.p;
  try {
    const response = await axios.get(`https://m8jpfz-3000.csb.app/appstate?e=${email}&p=${password}`);
    const result = response.data;
    res.json({ result });
    console.log({ result });
  } catch (e) {
    res.json({ error: e.message });
    console.log(e);
  }
});

app.listen(port)
