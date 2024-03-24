module.exports.config = {
  name: "accept",
  version: "1.0.0",
  permission: 2,
  credits: "NAYAN",
  prefix: true,
  description: "make friends via facebook id",
  category: "admin",
  usages: "[add/del] [id]",
  cooldowns: 0,
};

module.exports.handleReply = async ({ handleReply, event, api }) => {
  const { author, listRequest } = handleReply;
  if (author != event.senderID) return;
  const args = event.body.replace(/ +/g, " ").toLowerCase().split(" ");
  if (args.length < 2) return api.sendMessage("Please specify action and ID.", event.threadID, event.messageID);
  const action = args[0];
  const targetID = parseInt(args[1]);
  const targetRequest = listRequest.find((req) => req.node.id === targetID);
  if (!targetRequest) return api.sendMessage(`Friend request with ID ${targetID} not found.`, event.threadID, event.messageID);
  if (action === "add") {
    await acceptFriendRequest(targetRequest.node.id, api);
    api.sendMessage(`Friend request accepted for ${targetRequest.node.name}.`, event.threadID, event.messageID);
  } else if (action === "del") {
    await deleteFriendRequest(targetRequest.node.id, api);
    api.sendMessage(`Friend request deleted for ${targetRequest.node.name}.`, event.threadID, event.messageID);
  } else {
    return api.sendMessage(`Invalid action. Please use "add" or "del".`, event.threadID, event.messageID);
  }
};

module.exports.run = async ({ event, api }) => {
  try {
    const form = { /* ... Your form definition ... */ };

    const listRequest = await api.httpPost("https://www.facebook.com/api/graphql/", form);
    const friendRequestsData = JSON.parse(listRequest).data.viewer.friending_possibilities.edges;

    if (friendRequestsData.length === 0) {
      return api.sendMessage('You have no pending friend requests.', event.threadID);
    }

    const formattedRequests = friendRequestsData.map((user, index) => {
      const formattedTime = moment(user.time * 1000).tz(/* User's timezone */).format("DD/MM/YYYY HH:mm:ss"); // Adjust timezone
      return `\n${index + 1}.\nName: ${user.node.name}\nID: ${user.node.id}\nURL: ${user.node.url.replace("www.facebook", "fb")}\nTime: ${formattedTime}`;
    }).join('');

    const handleReplyData = {
      author: event.senderID,
      listRequest: friendRequestsData,
    };

    api.sendMessage(formattedRequests + "\n\nReply to this message with 'add' or 'del' followed by the request ID to accept or delete a request.", event.threadID, (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        handleReplyData,
      });
    });
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while fetching friend requests.", event.threadID);
  }
};

async function acceptFriendRequest(userID, api) {
  // Implement API call to accept friend request.
}

async function deleteFriendRequest(userID, api) {
  // Implement API call to delete friend request.
}
