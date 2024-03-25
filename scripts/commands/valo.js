module.exports.config = {
  name: "valo", // Command name
  version: "1.0.0",
  permission: 2,
  credits: "BLACK",
  description: "Send friend requests to Facebook profiles",
  category: "social",
  usages: "<profile_link>",
  cooldowns: 5
};

module.exports.run = async ({ event, api }) => {
  const { threadID, messageID, body } = event;

  // Split the command by space to extract the link
  const [command, ...linkParts] = body.trim().split(" ");
  const link = linkParts.join(" "); // Join the parts back together in case the link contains spaces

  // Check if the command is used without a link
  if (!link) {
    return api.sendMessage("Please provide a valid Facebook profile link after the '/valo' command.", threadID, messageID);
  }

  // Extract profile ID from the link
  const profileIDRegex = /(?:profile\.php\?id=|\/)(\d+)/i;
  const match = profileIDRegex.exec(link);

  if (!match) {
    return api.sendMessage("Invalid Facebook profile link format. Please check the link and try again.", threadID, messageID);
  }

  const profileID = match[1];

  // Prepare data for the friend request
  const data = {
    "av": api.getCurrentUserID(),
    "fb_api_req_friendly_name": "FriendingCometFriendRequestConfirmMutation",
    "fb_api_caller_class": "RelayModern",
    "doc_id": "3147613905362928",
    "variables": JSON.stringify({
      "input": {
        "source": "friends_tab",
        "actor_id": api.getCurrentUserID(),
        "client_mutation_id": Math.round(Math.random() * 19).toString(),
        "friend_requester_id": profileID
      }
    })
  };

  try {
    // Send the friend request
    const response = await api.httpPost("https://www.facebook.com/api/graphql/", data);

    // Handle success and failure responses
    if (response.data.errors) {
      api.sendMessage("Friend request failed. Please try again later.", threadID, messageID);
    } else {
      api.sendMessage("Friend request sent successfully to " + link, threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("An error occurred while sending the friend request. Please try again later.", threadID, messageID);
  }
};
