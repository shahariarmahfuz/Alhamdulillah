const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/reply', (req, res) => {
  const message = req.body.message;
  const category = req.body.category; // নতুন ক্যাটাগরি প্রোপার্টি যোগ করা হয়েছে
  let reply = '';

  if(message === 'hello') {
    reply = 'world';
  } else if(category === 'greeting') { // ক্যাটাগরি চেক করা হচ্ছে
    reply = 'Hello, how can I help you?';
  } else {
    reply = 'I did not understand your message.';
  }

  res.json({ reply: reply, category: category }); // রেসপন্সে ক্যাটাগরি যোগ করা হয়েছে
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
