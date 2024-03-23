const request = require('request');
const fs = require('fs');

module.exports.config = {
  name: "my",
  version: "1.0.0",
  permission: 0,
  credits: "Nayan",
  category: "user",
  prefix: true,
  description: "msg",
  commands: [
    {
      name: "searchImage",
      description: "Searches for an image based on user input",
      usages: "[query]",
      cooldowns: 5,
      dependencies: { "request": "", "fs": "" }
    }
  ]
};

// Messenger bot command handler
function handleBotCommand(userInput) {
  const apiEndpoint = 'https://rule34.xxx/'; // Add your API endpoint here
  const token = 'https://rule34.xxx/'; // Add your API token here

  // API call to search for an image
  request({
    url: apiEndpoint,
    qs: { token: token, query: userInput },
    method: 'GET',
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const imageUrl = JSON.parse(body).imageUrl;
      downloadImage(imageUrl);
    } else {
      console.error('Error searching for image:', error);
    }
  });
}

// Download the image
function downloadImage(imageUrl) {
  const filename = 'downloaded_image.jpg';

  request.head(imageUrl, function(err, res, body){
    if (err) {
      console.error('Error downloading image:', err);
      return;
    }
    request(imageUrl).pipe(fs.createWriteStream(filename)).on('close', function() {
      console.log('Image download complete:', filename);
    });
  });
}

// Example command that the bot will process
handleBotCommand('picture of a dog');
