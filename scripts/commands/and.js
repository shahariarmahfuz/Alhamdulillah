module.exports.config = {
	name: "and",
	version: "1.0.0",
	permission: 0,
	credits: "nayan",
	prefix: true,
	description: "Download a random image from a set of categories",
	category: "media",
	usages: "image",
	cooldowns: 5,
	dependencies: {
		"axios": "",
		"fs-extra": "",
		"googlethis": "",
		"cloudscraper": ""
	}
};

module.exports.run = async ({ api, event }) => {
	const axios = global.nodemodule['axios'];
	const google = global.nodemodule["googlethis"];
	const cloudscraper = global.nodemodule["cloudscraper"];
	const fs = global.nodemodule["fs-extra"];

	const hadisList = [
			   `হযরত ইবনে উমর (রা.) বলেন, আল্লাহর রাসূল (সাঃ) বলেছেন:
- ইসলাম পাঁচটি স্তম্ভের উপর স্থাপিত (এগুলো হল) এই সাক্ষ্য দেওয়া যে, আল্লাহ ব্যতীত আর কোনো ইলাহ নেই এবং মুহাম্মদ আল্লাহর রাসূল, সালাত আদায় করা, যাকাত আদায় করা, হজ্জ আদায় করা এবং রমাযানের ছিয়াম পালন করা। [বুখারীঃ ৭]`,
		`হযরত আনাস (রাঃ) বলেন, আল্লাহর রাসূল (সাঃ) বলেছেন:
- যার মধ্যে তিনটি গুণ রয়েছে সে ঈমানের স্বাদ অনুভব করবে, (ক) তার কাছে অন্য সবার তুলনায় আল্লাহ ও রাসূল (সাঃ) প্রিয়তর হয়, (খ) কাউকে ভালোবাসলে আল্লাহর জন্যই ভালোবাসে, (গ) আগুনে ফিরে যাওয়াকে যেমন অপ্রিয় জানে, কুফরিতে ফিরে যাওয়াকে তেমন অপ্রিয় মনে করে।
- [বুখারীঃ ১৫]`,
		"হাদিস 3",
		// এখানে আরও হাদিস যোগ করুন
	];

	const queries = ["Muslim worshiping and praying", "Kaaba image", "beautiful flower","madina","beautiful masjid","Quran","best masjid in the world","beautiful masjid al aqsa"]; // সার্চ কোয়েরির অ্যারে

	try {
		const randomQuery = queries[Math.floor(Math.random() * queries.length)]; // রেনডম কোয়েরি নির্বাচন
		let result = await google.image(randomQuery, { safe: false });
		if (result.length === 0) return; // কোনো মেসেজ প্রদর্শন না করে ফাংশন থেকে বের হয়ে যাবে

		const randomIndex = Math.floor(Math.random() * result.length);
		const imageUrl = result[randomIndex].url;
		const randomHadis = hadisList[Math.floor(Math.random() * hadisList.length)]; // রেনডম হাদিস নির্বাচন

		let path = __dirname + `/cache/image.jpg`;
		let buffer = await cloudscraper.get({ uri: imageUrl, encoding: null });
		fs.writeFileSync(path, buffer);

		api.sendMessage({ body: randomHadis, attachment: fs.createReadStream(path) }, event.threadID, () => {
			fs.unlinkSync(path); // ডাউনলোড করা ছবি মুছে ফেলা হয়েছে
		});
	} catch (error) {
		// কোনো ধরনের ত্রুটি বা সমস্যা মেসেজ প্রদর্শন না করে ফাংশন থেকে বের হয়ে যাবে
		return;
	}
};
