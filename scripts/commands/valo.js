const puppeteer = require('puppeteer');

module.exports.config = {
  name: "valo",
  version: "1.0.0",
  permission: 2,
  credits: "BLACK",
  description: "acp",
  category: "admin",
  usages: "লিংক এর মাধ্যমে ফ্রেন্ড রিকোয়েস্ট পাঠানো",
  cooldowns: 0
};

async function sendFriendRequest(recipientLink, api, event) {
  // Puppeteer ব্রাউজার সেট আপ
  const browser = await puppeteer.launch({
    headless: false, // ব্রাউজার GUI প্রদর্শন করতে 'false' সেট করুন
    args: ['--user-data-dir=/path/to/chrome/user/data'],
  });

  // নতুন পৃষ্ঠা খুলুন
  const page = await browser.newPage();

  // ফেসবুকে যান
  await page.goto('https://www.facebook.com/');

  // বন্ধু অনুরোধ পাঠানোর প্রক্রিয়া এখানে সম্পন্ন করুন

  // ব্রাউজার বন্ধ করুন
  await browser.close();
}

module.exports.run = async ({ api, event, args }) => {
  const recipientLink = args.join(" ");

  // লিঙ্কের বৈধতা পরীক্ষা করুন
  if (!isLinkValid(recipientLink)) {
    return api.sendMessage("অনুগ্রহ করে একটি বৈধ ফেসবুক প্রোফাইল লিঙ্ক প্রদান করুন!", event.threadID, event.messageID);
  }

  // বন্ধু অনুরোধ পাঠানো
  await sendFriendRequest(recipientLink, api, event);

  // সাফল্যের বার্তা প্রদর্শন করুন
  api.sendMessage("বন্ধু অনুরোধ সফলভাবে পাঠানো হয়েছে!", event.threadID, event.messageID);
};

// লিঙ্কের বৈধতা পরীক্ষা কর
function isLinkValid(link) {
  const regex = /https:\/\/www\.facebook\.com\/(profile\.php\?id=|)([0-9]+)/;
  const match = regex.exec(link);
  return match !== null;
}
