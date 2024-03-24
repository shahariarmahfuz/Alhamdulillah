module.exports.config = {
  name: "chita",
  version: "1.0.0",
  permission: 0,
  credits: "Nayan", 
  description: "Temporary email interactions (Needs more context for accurate description)",
  prefix: true,
  category: "utility", // Assuming it falls under utility
  usages: "temp generate | temp inbox <title>", // Suggest potential usages
  cooldowns: 5,
  dependencies: { 
    axios: "^1.x" // Explicitly declare axios dependency
  }
};

const axios = require('axios');

module.exports.generateEmail = async ({ event, api }) => {
  try {
    const response = await axios.get('https://n342hg-3000.csb.app/gen');
    const email = response.data.email;
    api.sendMessage(`Generated temporary email: ${email}`, event.threadID, event.messageID); 
  } catch (error) {
    console.error(error);
    api.sendMessage(`Error generating email: ${error.message}`, event.threadID, event.messageID);  
  }
};

module.exports.checkInbox = async ({ event, api }) => {
  const args = event.body.split(/\s+/); 
  if (args.length < 2) {
    return api.sendMessage("Please provide the inbox title.", event.threadID, event.messageID);
  }

  const title = args[1];

  try {
    const response = await axios.get(`https://n342hg-3000.csb.app/inbox/${title}`);
    api.sendMessage("Inbox Contents:\n" + response.data, event.threadID, event.messageID); 
  } catch (error) {
    console.error(error);
    api.sendMessage(`Error checking inbox: ${error.message}`, event.threadID, event.messageID);  
  }
};

module.exports.run = async ({ event, api }) => {
  const args = event.body.split(/\s+/); 
  if (args[0] === 'generate') {
    return this.generateEmail({ event, api });
  } else if (args[0] === 'inbox') {
    return this.checkInbox({ event, api });
  } else {
    // Provide help text or usage instructions.
  }
};
