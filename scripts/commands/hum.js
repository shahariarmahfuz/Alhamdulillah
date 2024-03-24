module.exports.config = {
	name: "hum",
	version: "1.0.0",
	permission: 0,
	credits: "nayan",
	prefix: true,
	description: "Download a random Islamic image from Google",
	category: "media",
	usages: "hadis",
	cooldowns: 60,
	dependencies: {
		"axios":"",
		"fs-extra":"",
		"googlethis":"",
		"cloudscraper":""
	}
};

module.exports.run = async ({ event, api }) => {
	const axios = global.nodemodule['axios'];
	const google = global.nodemodule["googlethis"];
	const cloudscraper = global.nodemodule["cloudscraper"];
	const fs = global.nodemodule["fs-extra"];

	const query = "Islamic image"; // সার্চ কোয়েরি হিসেবে 'Islamic image' ব্যবহার করা হয়েছে
	api.sendMessage(`গুগলে ${query} সার্চ করা হচ্ছে...`, event.threadID, event.messageID);

	let result = await google.image(query, { safe: false });
	if (result.length === 0) {
		api.sendMessage(`কোনো ইসলামিক ছবি পাওয়া যায়নি।`, event.threadID, event.messageID);
		return;
	}

	const randomIndex = Math.floor(Math.random() * result.length); // রেনডম ইনডেক্স নির্বাচন করা হয়েছে
	const imageUrl = result[randomIndex].url;

	let path = __dirname + `/cache/hadis-image.jpg`;
	await cloudscraper.get({ uri: imageUrl, encoding: null })
		.then((buffer) => fs.writeFileSync(path, buffer))
		.catch((error) => {
			console.error(error);
			api.sendMessage('ছবি ডাউনলোড করতে সমস্যা হয়েছে।', event.threadID, event.messageID);
			return;
		});

	api.sendMessage({ body: `এই হলো ইসলামিক ছবি:`, attachment: fs.createReadStream(path) }, event.threadID, () => {
		fs.unlinkSync(path); // ডাউনলোড করা ছবি মুছে ফেলা হয়েছে
	});
};
