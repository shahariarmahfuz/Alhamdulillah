module.exports.config = {
  name: "accept",
  version: "1.0.0",
  permission: 2,
  credits: "NAYAN",
  description: "Accept incoming friend requests (Use with caution)",
  category: "admin",
  usages: "", // No additional arguments needed
  cooldowns: 5
};

module.exports.run = async ({ event, api }) => {
  if (event.body.toLowerCase() !== "/accept") return;

  const { threadID } = event;

  try {
    // Retrieve pending friend requests (requires user_friends permission)
    const pendingRequests = await api.getThreadList(10, null, ['INBOX']);
    const requestsFromUsers = pendingRequests.filter(t => t.is_other_friend && t.approval_mode === 0);

    if (requestsFromUsers.length === 0) {
      return api.sendMessage("You have no pending friend requests!.", threadID);
    }

    const confirmed = [], failed = [];

    for (const request of requestsFromUsers) {
      try {
        // Use the acceptFriendRequest API call:
        await api.acceptFriendRequest(request.other_user);
        confirmed.push(request.other_user);
      } catch (error) {
        failed.push(request.other_user);
      }
      await new Promise(resolve => setTimeout(resolve, 1000)); // Delay between requests
    }

    const successMessage = `Accepted ${confirmed.length} friend requests: ${confirmed.join(", ")}`;
    const failureMessage = failed.length > 0 ? `\nFailed to accept ${failed.length} requests: ${failed.join(", ")}` : "";
    api.sendMessage(successMessage + failureMessage, threadID);
  } catch (error) {
    console.error(error);
    api.sendMessage("Error accepting friend requests.", threadID);
  }
};
