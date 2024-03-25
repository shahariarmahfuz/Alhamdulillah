module.exports.config = {
	name: "/help",
	version: "1.0.1",
	permssion: 0,
	credits: "aizen code",
	prefix: true,
	description: "spam message accept",
	category: "system",
	usages: "[Tên module]",
	cooldowns: 5,
};

module.exports.handleEvent = function ({ api, event }) {
	const { commands } = global.client;
	
	if (!event.body) return;

	const { threadID, messageID, body } = event;

	if (body.indexOf(module.exports.config.PREFIX + "help") !== 0) return;

	const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);

	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;

	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());

	const prefix = threadSetting.PREFIX || module.exports.config.PREFIX;

	return api.sendMessage(`Bot connected successfully with prefix ${prefix}`, threadID, messageID);
}

module.exports.run = function({ api, event, args }) {
	var a = function (a) { api.sendMessage(a, event.threadID); }
	a("Accept successfully\n\nPlease check bot messages in waiting messages or spam");
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	
	if (!command) {
		let msg = `Bot connected successfully with prefix ${module.exports.config.PREFIX}\n\n`;
		for (let [cmdName, cmd] of commands) {
			msg += `「 ${cmdName.charAt(0).toUpperCase() + cmdName.slice(1)} 」: ${cmd.description}\n\n`;
		}
		
		return api.sendMessage(msg + `[ Use: "${threadSetting.PREFIX || module.exports.config.PREFIX}help [command name]" for detailed usage! | Currently available ${commands.size} commands usable on this bot ]`, event.senderID, (err, info) =>
			setTimeout(() => {api.unsendMessage(info.messageID)}, 45000));
	}
	
	const prefix = threadSetting.PREFIX || module.exports.config.PREFIX;

	return api.sendMessage(`Bot connected successfully with prefix ${prefix}`, threadID, messageID);
}
