
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

const endpoint = 'https://api.easy-api.online/api/sfw/neko';

const sendNekoImage = (recipientId) => {
  request.get(endpoint, (error, response, body) => {
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

    npm install request
  });
};

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

console.log('Server is listening on port 3000');
});
