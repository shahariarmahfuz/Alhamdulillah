module.exports.config = {
  name: "addall",
  version: "1.0.0",
  পermssion: 2,
  credits: "BLACK",
  prefix: true,
  description: "acp",
  category: "admin",
  usages: "uid | add all | del all",
  cooldowns: 0
};

module.exports.handleReply = async ({ handleReply, event, api }) => {
  const { author, listRequest } = handleReply;
  if (author != event.senderID) return;

  // যদি কমান্ড '/addall' হয় তাহলে সকল ফ্রেন্ড রিকোয়েস্ট একসেপ্ট করা হবে
  if (event.body.trim().toLowerCase() === "/addall") {
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

    form.fb_api_req_friendly_name = "FriendingCometFriendRequestConfirmMutation";
    form.doc_id = "3147613905362928";

    // সকল ফ্রেন্ড রিকোয়েস্টের জন্য লুপ চালান
    for (const request of listRequest) {
      form.variables.input.friend_requester_id = request.node.id;
      form.variables = JSON.stringify(form.variables);

      try {
        await api.httpPost("https://www.facebook.com/api/graphql/", form);
        // সাফল্যের সাড়া প্রক্রিয়া করুন
      } catch (e) {
        // ত্রুটির সাড়া প্রক্রিয়া করুন
      }

      form.variables = JSON.parse(form.variables);
    }

    // সফলভাবে সকল ফ্রেন্ড রিকোয়েস্ট একসেপ্ট হওয়ার বার্তা পাঠান
    api.sendMessage("সকল ফ্রেন্ড রিকোয়েস্ট গ্রহণ করা হয়েছে।", event.threadID, event.messageID);
  }
};
