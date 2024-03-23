module.exports.run = async ({ api, event, args }) => {
  // আপনার বটের লজিক অনুযায়ী কোড যোগ করুন
  let message = event.body; // মেসেজ পাঠানোর জন্য বডি থেকে পাঠানো হচ্ছে
  let reply = '';

  // নির্দিষ্ট লেখা যাচাই করা
  if (message.toLowerCase() === "হ্যালো") {
    reply = "hello 8"; // নির্দিষ্ট উত্তর দেওয়া
  } else {
    reply = "I did not understand your message."; // ডিফল্ট উত্তর
  }

  // উত্তর পাঠানো
  return api.sendMessage(reply, event.threadID);
};
