const express = require('express');
const app = express();
const port = 8000; // পোর্ট নম্বর পরিবর্তন করা হয়েছে

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
