module.exports.config = {
  name: "img",
  version: "1.0.0",
  permssion: 0,
  credits: "Deku",
  prefix: true,
  description: "this command will help you to answer your questions!",
  category: "Artificial Intelligence",
  usages: "(name_of_cmd) [query]",
  cooldowns: 0
};  
  
module.exports.run = async ({ api, event, args }) => {
    const axios = require("axios");
    let prompt = args.join(" "),
      uid = event.senderID,
      url;
    if (!prompt) return api.sendMessage(`Please enter a prompt.`, event.threadID, event.messageID);
    
    try {
      const apis = `https://api.easy-api.online/api/sfw/kiss`;
      if (event.type == "message_reply"){
        if (event.messageReply.attachments[0]?.type == "photo"){
        url = encodeURIComponent(event.messageReply.attachments[0].url);
        const res = (curl -X 'GET' \
  'https://api.easy-api.online/api/sfw/kiss' \
  -H 'accept: */*').data;
        return api.sendMessage(`${res.gemini}`, event.threadID, event.messageID)
        } else {
          return api.sendMessage('Please reply to an image.', event.threadID, event.messageID)
        }
      }
      const rest = (curl -X 'GET' \
  'https://api.easy-api.online/api/sfw/kiss' \
  -H 'accept: */*').data;
      return api.sendMessage(rest.gemini, event.threadID, event.messageID)
    } catch (e) {
      console.log(e);
      return api.sendMessage(e.message, event.threadID, event.messageID);
    } //end of catch
  };
