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
  // এখানে আপনার হাদীস জেনারেটর ফাংশন থাকবে
  const hadisList = [
    'হাদীস ১: বাণী...',
    'হাদীস ২: বাণী...',
    // আরও হাদীস যোগ করুন
  ];

  // এখানে আপনার ইসলামিক ছবির URL খুঁজে বের করার ফাংশন থাকবে
  async function findIslamicImage() {
    try {
      // এখানে আপনার ইসলামিক ছবির জন্য সার্চ কোয়েরি থাকবে
      const searchQuery = 'ইসলামিক ছবি';
      const response = await axios.get(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchQuery)}&cx=YOUR_CUSTOM_SEARCH_ENGINE_ID&searchType=image&key=YOUR_API_KEY`);
      const images = response.data.items;
      return images.length > 0 ? images[0].link : null;
    } catch (error) {
      console.error('Error finding Islamic image:', error);
      return null;
    }
  }

  const randomIndex = Math.floor(Math.random() * hadisList.length);
  const hadis = hadisList[randomIndex];
  const imageUrl = await findIslamicImage();
  
  if (imageUrl) {
    // যদি ছবির URL পাওয়া যায়, তাহলে হাদীস এবং ছবি পাঠানো হবে
    api.sendMessage({body: hadis, attachment: await axios.get(imageUrl, { responseType: 'arraybuffer' }).then(res => [{ isBuffer: true, data: res.data }])}, event.threadID, event.messageID);
  } else {
    // যদি ছবির URL না পাওয়া যায়, তাহলে শুধু হাদীস পাঠানো হবে
    api.sendMessage(hadis, event.threadID, event.messageID);
  }
};
