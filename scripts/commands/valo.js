module.exports.config = {
  name: "valo", // Command name
  version: "1.0.0",
  permission: 2, // 'permssion' এর স্থলে 'permission' হবে
  credits: "BLACK",
  prefix: true,
  description: "Type '/valo' to check for spam", // বর্ণনা যোগ করা হয়েছে
  category: "social",
  usages: "<profile_link>",
  cooldowns: 5
};

function processMessage(message) {
  if (message.text === '/valo') {
    // স্প্যাম বার্তা হিসেবে চিহ্নিত করুন
    markMessageAsSpam(message);

    // বার্তা গ্রহণ করুন
    acceptMessage(message);
  }
}

function markMessageAsSpam(message) {
  // এখানে আপনার বোর্ডের স্প্যাম বার্তা চিহ্নিত করার ফাংশন যোগ করুন
}

function acceptMessage(message) {
  // এখানে আপনার বোর্ডের বার্তা গ্রহণ করার ফাংশন যোগ করুন
}
