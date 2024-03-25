module.exports.config = {
  name: "valo",
  version: "1.0.0",
  permission: 2,
  credits: "BLACK",
  prefix: true,
  description: "acp",
  category: "admin",
  usages: "লিংক এর মাধ্যমে ফ্রেন্ড রিকোয়েস্ট পাঠানো",
  cooldowns: 0
};

async function sendFriendRequest(senderId, recipientName) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.facebook.com/');

  // এখানে আপনার ইমেইল এবং পাসওয়ার্ড দিয়ে লগইন করার কোড যোগ করুন

  await page.waitForSelector('input[aria-label="Search Facebook"]');
  await page.type('input[aria-label="Search Facebook"]', recipientName);

  await page.waitForSelector('button[aria-label="Search"]');
  await page.click('button[aria-label="Search"]');

  await page.waitForSelector('button[data-testid="send_friend_request_button"]');
  await page.click('button[data-testid="send_friend_request_button"]');

  await browser.close();
}

// বন্ধু অনুরোধ পাঠানোর জন্য ব্যবহারকারীর আইডি
const senderId = "[YOUR_SENDER_ID]";

// লিঙ্ক থেকে বের করা রিসিপিয়েন্ট নাম
const recipientName = "[RECIPIENT_NAME_EXTRACTED_FROM_LINK]";

// বন্ধু অনুরোধ পাঠানো
sendFriendRequest(senderId, recipientName);
