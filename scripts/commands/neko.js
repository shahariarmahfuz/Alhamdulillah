
module.exports = {
  config: {
    name: "neko",
  	version: "1.0.0",
  	permssion: 0,
    credits: "Deku",
    prefix: true,
	  description: "Generate image in emi",
  	category: "AI",
  	usages: "[prompt]",
  	cooldowns: 5,
  },
  const request = require('request');

const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const EASY_API_KEY = process.env.EASY_API_KEY;

const endpoint = 'https://api.easy-api.online/api/sfw/neko';

const sendNekoImage = (recipientId) => {
  request.get(endpoint, {
    headers: {
      'Authorization': `Bearer ${EASY_API_KEY}`
    }
  }, (error, response, body) => {
    if (error) {
      console.log(error);
      return;
    }

    const imageURL = JSON.parse(body).url;

    const message = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type: 'image',
          payload: {
            url: imageURL
          }
        }
      }
    };

    sendAPIRequest(message);
  });
};

const sendAPIRequest = (message) => {
  request({
    url: 'https://graph.facebook.com/v14.0/me/messages',
    qs: {
      access_token: PAGE_ACCESS_TOKEN
    },
    method: 'POST',
    json: message
  }, (error, response, body) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log('Message sent successfully');
  });
};

// মেসেজ রিসিভ করার জন্য Webhook সেটআপ

// ...

// মেসেজ প্রসেসিং

app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object === 'page' && body.entry) {
    const entries = body.entry;

    entries.forEach((entry) => {
      const messaging = entry.messaging;

      messaging.forEach((message) => {
        const senderId = message.sender.id;
        const text = message.message.text;

        if (text === 'neko') {
          sendNekoImage(senderId);
        }
      });
    });
  }

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
