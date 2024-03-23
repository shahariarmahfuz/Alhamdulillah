const axios = require("axios");

const config = {
  name: "tst",
  version: "1.1",
  permission: 0,
  credits: "Samir Œ",
  prefix: true,
  description: "Converts speech into text",
  category: "admin",
  usages: "uid",
  cooldowns: 0,
  guide: {
    en: "{pn} reply to an audio/video"
  }
};

const onStart = async function({ event, api, message }) {
  try {
    if (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0) {
      return message.reply('Please reply to an audio or video.');
    }

    const link = event.messageReply.attachments[0].url;
    const response = await axios.get(`https://api-samir.onrender.com/transcribe?url=${encodeURIComponent(link)}`);
    const text = response.data.transcript;

    if (text) {
      message.reply(text);
    } else {
      message.reply("Failed to transcribe the audio or video.");
    }
  } catch (error) {
    console.error(error);
    message.reply("An error occurred while processing the request.");
  }
};

module.exports = {
  config,
  onStart
};
