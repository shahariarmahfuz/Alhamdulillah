module.exports.config = {
  name: "bot",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Nayan",
  description: "msg",
  category: "user",
  usages: "",
  cooldowns: 5,
  dependencies: {}
};

module.exports.run = async ({ api, event, args }) => {
  let message = event.body; // মেসেজ পাঠানোর জন্য বডি থেকে পাঠানো হচ্ছে
  let reply = '';

  // নির্দিষ্ট লেখা যাচাই করা
  if (message.toLowerCase() === "হ্যালো") {
    reply = "Hello there!"; // নির্দিষ্ট উত্তর দেওয়া
  } else {
    reply = "I did not understand your message."; // ডিফল্ট উত্তর
  }

  // উত্তর পাঠানো
  return api.sendMessage(reply, event.threadID);
};
