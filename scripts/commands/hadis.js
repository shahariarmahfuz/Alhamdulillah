module.exports.config = {
  name: "hadis", // এখানে কমান্ডের নাম দিয়ে দিন
  version: "1.0.0",
  permssion: 0,
  credits: "nayan",
  prefix: true,
  description: "হাদীস প্রদান করে",
  category: "general",
  usages: "hadis",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "request": ""
  }
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const request = require('request');
  const fs = require('fs-extra');
  
  // হাদীস এবং ছবির লিঙ্ক তালিকা
  var hi = ["•\n– কোনো নেতার পিছনে নয়.!!🤸‍♂️\n– মসজিদের ইমামের পিছনে দাড়াও জীবন বদলে যাবে ইনশাআল্লাহ.!!🖤🌻\n۵",
           "•\n– হযরত ইবনে উমর (রা.) বলেন, আল্লাহর রাসূল (সাঃ) বলেছেন:🤸‍♂️\n– ইসলাম পাঁচটি স্তম্ভের উপর স্থাপিত (এগুলো হল) এই সাক্ষ্য দেওয়া যে, আল্লাহ ব্যতীত আর কোনো ইলাহ নেই এবং মুহাম্মদ আল্লাহর রাসূল, সালাত আদায় করা, যাকাত আদায় করা, হজ্জ আদায় করা এবং রমাযানের ছিয়াম পালন করা।🖤🌻\n- [বুখারীঃ ৭]\n۵"];
  var link = ["https://i.postimg.cc/kXqVcsh9/muslim-boy-having-worship-praying-fasting-eid-islamic-culture-mosque-73899-1334.webp"];
  
  // র‍্যান্ডম হাদীস এবং ছবি নির্বাচন
  var know = hi[Math.floor(Math.random() * hi.length)];
  var imageUrl = link[Math.floor(Math.random() * link.length)];
  
  // ছবি ডাউনলোড এবং মেসেজ পাঠানো
  let path = __dirname + "/cache/5.jpg";
  let callback = () => api.sendMessage({ body: `「 ${know} 」`, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path));
  request(encodeURI(imageUrl)).pipe(fs.createWriteStream(path)).on("close", callback);
};
