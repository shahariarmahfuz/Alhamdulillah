module.exports.config = {
  name: "friendrequest", 
  version: "1.1.0",
  permssion: 2, 
  credits: "chom (Original), Revised by [Your Name]",
  prefix: true, 
  description: "Manage Facebook friend requests via ID",
  commandCategory: "admin",
  usages: "friendrequest", 
  cooldowns: 0 
};

module.exports.handleReply = async ({ handleReply, event, api }) => {
  const { author, listRequest } = handleReply;
  if (author !== event.senderID) return; 

  const args = event.body.trim().split(/\s+/); // Improved parsing

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

  if (args[0] === "add") {
    form.fb_api_req_friendly_name = "FriendingCometFriendRequestConfirmMutation";
    form.doc_id = "3147613905362928";
  } else if (args[0] === "del") {
    form.fb_api_req_friendly_name = "FriendingCometFriendRequestDeleteMutation";
    form.doc_id = "4108254489275063";
  } else {
    return api.sendMessage("Invalid command. Use: 'add' or 'del' followed by request number(s) or 'all'", event.threadID, event.messageID);
  }

  const targetIDs = args.slice(1);
  if (args[1] === "all") {
    for (let i = 0; i < listRequest.length; i++) {
      targetIDs.push(i + 1); // Start indexing at 1 for user clarity
    }
  }

  for (const stt of targetIDs) {
    const index = parseInt(stt) - 1;
    const user = listRequest[index];

    if (!user) {
      failed.push(`Request #${stt} not found.`);
      continue;
    }

    form.variables.input.friend_requester_id = user.node.id;
    form.variables = JSON.stringify(form.variables);

    try {
      const response = await api.httpPost("https://www.facebook.com/api/graphql/", form);
      const jsonData = JSON.parse(response);

      if (jsonData.errors) {
        failed.push(`${user.node.name} (Error: ${jsonData.errors[0].message})`);
      } else {
        success.push(user.node.name);
      }
    } catch (error) {
      console.error(error);
      failed.push(user.node.name);
    }
  }

  // ... (Rest of module.exports.run goes here) 
  
