const fs = require('fs-extra');
const axios = require('axios');

module.exports.config = {
  name: "shairi",
  version: "1.0.0",
  permssion: 0,
  credits: "Nayan",
  description: "একটি র‍্যান্ডম শাইরি ভিডিও প্রদান করে",
  category: "media",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async ({ api, event, args }) => {
  // এখানে আপনার শাইরি জেনারেটর ফাংশন থাকবে
  const shairiList = [
    'আকাশের তারা বলে, তুমি আমার মনের ঘরে',
    'জীবনের সাগর বলে, তুমি আমার বন্ধু পরে',
    // আরও শাইরি যোগ করুন
  ];

  const randomIndex = Math.floor(Math.random() * shairiList.length);
  const shairi = shairiList[randomIndex];
  api.sendMessage(shairi, event.threadID, event.messageID);
};
