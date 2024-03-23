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
  const axios = require('axios');
const fs = require('fs');
const { MessengerClient } = require('messaging-api-messenger');

// Initialize Messenger Client with your access token
const client = MessengerClient.connect('YOUR_ACCESS_TOKEN');

// Function to get image from the API and send as an attachment
async function getImageAndSend(senderId) {
  try {
    // Get the image from the API
    const response = await axios({
      method: 'get',
      url: 'https://api.easy-api.online/api/sfw/neko',
      responseType: 'stream'
    });

    // Save the image to a file
    const path = `./temp_image.png`;
    const writer = fs.createWriteStream(path);
    response.data.pipe(writer);
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // Send the image to the user
    await client.sendImage(senderId, path);

    // Delete the image file after sending
    fs.unlinkSync(path);
  } catch (error) {
    console.error('Failed to retrieve image:', error);
  }
}

// Example usage
// Replace 'USER_ID' with the actual sender ID
getImageAndSend('USER_ID');
  
