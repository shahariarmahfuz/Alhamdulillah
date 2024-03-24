module.exports.config = {
  name: "bcp",
  version: "1.0.0",
  permssion: 2,
  credits: "BLACK",
  prefix: true,
  description: "acp",
  category: "admin",
  usages: "uid | add all | del all", // Added options for all-accept/all-delete
  cooldowns: 0
};


module.exports.handleReply = async ({ handleReply, event, api }) => {
  const { author, listRequest } = handleReply;
  if (author != event.senderID) return;

  const args = event.body.replace(/ +/g, " ").toLowerCase().split(" ");

  const form = {
    av: api.getCurrentUserID(),
    fb_api_caller_class: "RelayModern",
    variables: {
      input: {
        source: "friends_tab",
        actor_id: api.getCurrentUserID(),
        client_mutation_id: Math.round(Math.random() * 19).toString()
      },
      scale: 3,
      refresh_num: 0
    }
  };

  const success = [];
  const failed = [];

  // Determine action based on user input
  if (args[0] == "add") {
    form.fb_api_req_friendly_name = "FriendingCometFriendRequestConfirmMutation";
    form.doc_id = "3147613905362928";
  } else if (args[0] == "del") {
    form.fb_api_req_friendly_name = "FriendingCometFriendRequestDeleteMutation";
    form.doc_id = "4108254489275063";
  } else if (args[0] == "all") { // Handle "add all" or "del all"
    if (args[1] == "add") {
      form.fb_api_req_friendly_name = "FriendingCometFriendRequestConfirmMutation";
      form.doc_id = "3147613905362928";
    } else if (args[1] == "del") {
      form.fb_api_req_friendly_name = "FriendingCometFriendRequestDeleteMutation";
      form.doc_id = "4108254489275063";
    } else {
      return api.sendMessage("Please choose <add all | del all>", event.threadID, event.messageID);
    }

    const targetIDs = listRequest.map(u => u.node.id); // Get IDs of all requests
    await processRequests(api, form, targetIDs, success, failed, event); 

  } else return api.sendMessage("Please choose <add | del | add all | del all>", event.threadID, event.messageID); // Corrected message  
};


module.exports.run = async ({ event, api }) => {
  const moment = require("moment-timezone");
  const form = {
    av: api.getCurrentUserID(),
    fb_api_req_friendly_name: "FriendingCometFriendRequestsRootQueryRelayPreloader",
    fb_api_caller_class: "RelayModern",
    doc_id: "4499164963466303",
    variables: JSON.stringify({ input: { scale: 3 } })
  };

  const listRequest = JSON.parse(await api.httpPost("https://www.facebook.com/api/graphql/", form)).data.viewer.friending_possibilities.edges;

  // ...[rest of run function]...
};

// Helper function to send requests in batches
async function processRequests(api, form, targetIDs, success, failed, event) {
  const batchSize = 20; // Adjust for safety
  for (let i = 0; i < targetIDs.length; i += batchSize) {
    const batch = targetIDs.slice(i, i + batchSize);
    await Promise.all(batch.map(id => sendRequest(api, form, id)));
    await new Promise(resolve => setTimeout(resolve, 2000)); // Delay between batches
  }

  // ...[report results]...
}

// Helper to send a single request
async function sendRequest(api, form, id) {
  // ...[send request logic]... 
}
