module.exports.config = {
  name: "accept",
  version: "1.0.0",
  permission: 2,
  credits: "NAYAN",
  prefix: true,
  description: "বন্ধু তৈরি করুন ফেসবুক আইডি ব্যবহার করে",
  category: "admin",
  usages: "uid",
  cooldowns: 0
};

module.exports.handleReply = async ({ handleReply, event, api }) => {
  const { author, listRequest } = handleReply;
  if (author !== event.senderID) return;
  const args = event.body.replace(/ +/g, " ").toLowerCase().split(" ");

  const form = {
    av: api.getCurrentUserID(),
    fb_api_caller_class: "RelayModern",
    variables: {
      input: {
        source: "friends_tab",
        actor_id: api.getCurrentUserID(),
        client_mutation_id: Math.round(Math.random() * 19).toString(),
      },
      scale: 3,
      refresh_num: 0,
    },
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
    api.sendMessage("অনুগ্রহ করে 'add' বা 'del' নির্বাচন করুন, 'end' অথবা 'all' লিখে কাজ শেষ করুন", event.threadID, event.messageID);
    return;
  }

  let targetIDs = args.slice(1);

  if (args[1] === "all") {
    targetIDs = [];
    const lengthList = listRequest.length;
    for (let i = 1; i <= lengthList; i++) targetIDs.push(i);
  }

  const newTargetIDs = [];
  const promiseFriends = [];

  for (const stt of targetIDs) {
    const u = listRequest[parseInt(stt) - 1];
    if (!u) {
      failed.push(`স্ট্যাটাস ${stt} তালিকায় পাওয়া যায়নি`);
      continue;
    }
    form.variables.input.friend_requester_id = u.node.id;
    form.variables = JSON.stringify(form.variables);
    newTargetIDs.push(u);
    promiseFriends.push(api.httpPost("https://www.facebook.com/api/graphql/", form));
    form.variables = JSON.parse(form.variables);
  }

  const lengthTarget = newTargetIDs.length;
  for (let i = 0; i < lengthTarget; i++) {
    try {
      const friendRequest = await promiseFriends[i];
      const response = JSON.parse(friendRequest);
      if (response.errors) failed.push(newTargetIDs[i].node.name);
      else success.push(newTargetIDs[i].node.name);
    } catch (e) {
      failed.push(newTargetIDs[i].node.name);
    }
  }

  api.sendMessage(
    `**${args[0] === "add" ? "বন্ধুত্বপূর্ণ অনুরোধ গ্রহণ করা হয়েছে" : "বন্ধুত্বপূর্ণ অনুরোধ বাতিল করা হয়েছে"}** <span class="math-inline">\{success\.length\} জনের\:\\n</span>{success.join("\n")}${
      failed.length > 0 ? `\n**ব্যর্থ হয়েছে:** ${failed.length} জনের: ${failed.join("\n")}` : ""
    }`,
    event.threadID,
    event.messageID
  );
};

module.exports.run = async ({ event, api }) => {
      
