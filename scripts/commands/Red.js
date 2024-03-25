module.exports.config = {
	name: "this",
	version: "1.0.1",
	permission: 0, // Corrected spelling
	credits: "aizen code",
	prefix: true,
	description: "spam message accept",
	category: "system",
	usages: "[Tên module]",
	cooldowns: 5
};

module.exports.handleEvent = function ({ api, event }) {
	const { commands } = global.client;
	
	if (!event.body) return;

	const { threadID, messageID, body } = event;

	if (!body.includes("help")) return; // Changed to includes

	const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);

	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;

	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());

	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	return api.sendMessage(`Bot connected successfully prefix ${prefix}`, threadID, messageID);
}

module.exports.run = function({ api, event, args }) {
	const sendMessage = (message) => { api.sendMessage(message, event.threadID); }; // Renamed function
	sendMessage("Accept successfully\n\nPlease check bot messages in waiting messages or spam");
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	
	if (!command) {
		// Removed the shadowed variable declaration
		for (const cmd of commands.values()) {
			// Logic to handle the command
		}
	}
}
