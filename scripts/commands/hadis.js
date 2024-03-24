const fs = require('fs-extra');
const axios = require('axios');
const request = require('request'); // এখানে 'request' মডিউল যোগ করা হলো

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
    "axios": "",
    "request": "" // 'request' মডিউল যোগ করা হলো
  }
};

function getRandomImage() {
  var link = [
    "https://i.postimg.cc/7LdGnyjQ/images-31.jpg",
  "https://i.postimg.cc/65c81ZDZ/images-30.jpg",
"https://i.postimg.cc/Y0wvTzr6/images-29.jpg",
"https://i.postimg.cc/1Rpnw2BJ/images-28.jpg",
"https://i.postimg.cc/mgrPxDs5/images-27.jpg",
"https://i.postimg.cc/yxXDK3xw/images-26.jpg",
"https://i.postimg.cc/kXqVcsh9/muslim-boy-having-worship-praying-fasting-eid-islamic-culture-mosque-73899-1334.webp",
"https://i.postimg.cc/hGzhj5h8/muslims-reading-from-quran-53876-20958.webp",
"https://i.postimg.cc/x1Fc92jT/blue-mosque-istanbul-1157-8841.webp",
"https://i.postimg.cc/j5y56nHL/muhammad-ali-pasha-cairo-219717-5352.webp",
"https://i.postimg.cc/dVWyHfhr/images-1-21.jpg",
"https://i.postimg.cc/q7MGgn3X/images-1-22.jpg",
"https://i.postimg.cc/sX5CXtSh/images-1-16.jpg",
"https://i.postimg.cc/66Rp2Pwz/images-1-17.jpg",
"https://i.postimg.cc/Qtzh9pY2/images-1-18.jpg",
"https://i.postimg.cc/MGrhdz0R/images-1-19.jpg",
"https://i.postimg.cc/LsMSj9Ts/images-1-20.jpg",
"https://i.postimg.cc/KzNXyttX/images-1-13.jpg",
  ];
  // এখানে 'know' ভ্যারিয়েবলটি ডিফাইন করা হলো
  var know = 'আপনার হাদীস বা বার্তা';
  var callback = () => api.sendMessage({body: `「 ${know} 」`, attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg"));
  return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close", callback);
};

module.exports.run = async ({ api, event, args }) => {
  const hadisList = [
    'হাদীস ১: বাণী...',
    'হাদীস ২: বাণী...',
  ];

  const randomIndex = Math.floor(Math.random() * hadisList.length);
  const hadis = hadisList[randomIndex];
  const image = getRandomImage();
  api.sendMessage({body: hadis, attachment: await axios.get(image, { responseType: 'arraybuffer' }).then(res => [{ isBuffer: true, data: res.data }])}, event.threadID, event.messageID);
};
