const express = require('express');
module.exports.config = {
    name: "bot",
  version: "1.0.0",
  permission: 0,
  credits: "Nayan",
  description: "msg",
  prefix: true, 
  category: "user", 
  usages: "",
  cooldowns: 5,
  dependencies: {
  } // পোর্ট নম্বর পরিবর্তন করা হয়েছে

app.use(express.json());

app.post('/reply', (req, res) => {
  const message = req.body.message;
  let reply = '';

  if(message === 'hello') {
    reply = 'world';
  } else {
    reply = 'I did not understand your message.';
  }

  res.json({ reply: reply });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`); // কনসোল লগে পোর্ট নম্বর পরিবর্তন করা হয়েছে
});
