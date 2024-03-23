module.exports.config = {
	name: "message",
	version: "1.0.0",
	permission: 2,
	credits: "ryuko",
	description: "React to messages by id with specified emoji",
	prefix: true,
	category: "admin",
	usages: "[messageID] <reaction type>: (unlike/like/love/heart/haha/wow/sad/angry)",
	cooldowns: 1
};

module.exports.run = async ({ api, event, args }) => {
	const allType = "unlike/like/love/heart/haha/wow/sad/angry".split("/");
	const messageID = args[0];
	const type = args[1];
	if (!messageID || !type) return global.utils.throwError(this.config.name, event.threadID, event.messageID);
	if (!allType.includes(type)) return api.sendMessage(`অনুগ্রহ করে নিম্নলিখিত স্টাইলগুলির মধ্যে থেকে একটি বেছে নিন: ${allType.join("/")}`, event.threadID, event.messageID);
	api.setMessageReaction(type, messageID, (err, data) => {
		if (err) return api.sendMessage("কিছু ভুল হয়েছে, অনুগ্রহ করে আপনার মেসেজ আইডি চেক করুন এবং পরে আবার চেষ্টা করুন", event.threadID, event.messageID);
		api.sendMessage(`মেসেজের জন্য ${type} রিয়্যাক্ট দেওয়া হয়েছে আইডি ${messageID}`, event.threadID, event.messageID);
	});
};
