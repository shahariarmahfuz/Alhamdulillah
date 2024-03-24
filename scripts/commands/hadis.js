const fs = require('fs-extra');
const axios = require('axios');

module.exports.config = {
  name: "hadis",
  version: "1.0.0",
  permission: 0,
  credits: "Nayan",
  prefix: true,
  description: "একটি র‍্যান্ডম হাদীস এবং ইসলামিক ছবি প্রদান করে",
  category: "media",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async ({ api, event, args }) => {
  // এখানে আপনার হাদীস এবং ইসলামিক ছবির URL জেনারেটর ফাংশন থাকবে
  const hadisList = [
    'হাদীস ১: বাণী...',
    'হাদীস ২: বাণী...',
    // আরও হাদীস যোগ করুন
  ];

  // এখানে আপনার ইসলামিক ছবির URL জেনারেটর ফাংশন থাকবে
  // এই ফাংশনটি একটি থার্ড-পার্টি API থেকে র‍্যান্ডম ইসলামিক ছবির URL পাঠাবে
  async function getRandomIslamicImage() {
    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/randomimage?category=nature', { headers: { 'Api-Key': 'zs4WYN4AU2Dr/E2jp2Muvw==AQnsU2hxzUkJoZlj' } });
      return response.data.url; // এখানে 'url' হলো ছবির URL যা API থেকে পাওয়া যাবে
    } catch (error) {
      console.error('Error fetching Islamic image:', error);
      return null; // যদি কোনো ছবি না পাওয়া যায়, তাহলে null পাঠানো হবে
    }
  }

  const randomIndex = Math.floor(Math.random() * hadisList.length);
  const hadis = hadisList[randomIndex];
  const imageUrl = await getRandomIslamicImage();
  
  // যদি ছবির URL পাওয়া যায়, তাহলে হাদীস এবং ছবি পাঠানো হবে
  if (imageUrl) {
    api.sendMessage({body: hadis, attachment: await axios.get(imageUrl, { responseType: 'arraybuffer' }).then(res => [{ isBuffer: true, data: res.data }])}, event.threadID, event.messageID);
  } else {
    // যদি ছবির URL না পাওয়া যায়, তাহলে শুধু হাদীস পাঠানো হবে
    api.sendMessage(hadis, event.threadID, event.messageID);
  }
};
