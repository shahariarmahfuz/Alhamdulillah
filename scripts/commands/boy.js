module.exports.config = {
  name: "boy",
  version: "1.0.0",
  permission: 2,
  credits: "NAYAN",
  prefix: true,
  description: "make friends via facebook id",
  category: "admin",
  usages: "uid",
  cooldowns: 0
};

module.exports.handleReply = async ({ handleReply, event, api }) => {
  // ... (Your existing logic with refinements)
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

    api.sendMessage(formattedRequests, event.threadID, (e, info) => {
      // ... (Rest of your handling logic)
    });
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while fetching friend requests.", event.threadID);
  }
};
