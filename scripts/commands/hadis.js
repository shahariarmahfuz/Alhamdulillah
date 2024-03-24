const fs = require('fs-extra');
const axios = require('axios');

module.exports.config = {
  name: "hadis",
  version: "1.0.0",
  permission: 0,
  credits: "Nayan",
  prefix: true,
  description: "একটি র‍্যান্ডম হাদীস এবং ছবি প্রদান করে",
  category: "media",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "axios": ""
  }
};

function getRandomImage() {
  // Lorem Picsum ব্যবহার করে র‍্যান্ডম ছবির URL জেনারেট করে
  const width = 200; // ছবির প্রস্থ
  const height = 300; // ছবির উচ্চতা
  return `https://picsum.photos/${width}/${height}`; // র‍্যান্ডম ছবির URL ফেরত পাঠায়
}

module.exports.run = async ({ api, event, args }) => {
  // এখানে আপনার হাদীস জেনারেটর ফাংশন থাকবে
  const hadisList = [
    'হাদীস ১: বাণী...',
    'হাদীস ২: বাণী...',
    // আরও হাদীস যোগ করুন
  ];

  const randomIndex = Math.floor(Math.random() * hadisList.length);
  const hadis = hadisList[randomIndex];
  const image = getRandomImage();
  api.sendMessage({body: hadis, attachment: await axios.get(image, { responseType: 'arraybuffer' }).then(res => [{ isBuffer: true, data: res.data }])}, event.threadID, event.messageID);
};
