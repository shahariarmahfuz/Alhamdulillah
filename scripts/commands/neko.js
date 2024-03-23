const { get } = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: "neko",
    version: "1.0.0",
    permission: 0,
    credits: "Deku",
    prefix: true,
    description: "Generate image in emi",
    category: "AI",
    usages: "[prompt]",
    cooldowns: 5,
  },
  run: async function({api, event, args}){
    function r(msg){
      api.sendMessage(msg, event.threadID, event.messageID);
    }

    if (!args[0]) return r('Missing prompt!');

    const a = encodeURIComponent(args.join(" "));
    try {
      const response = await get("https://api.easy-api.online/api/sfw/neko?prompt=" + a, {
        responseType: 'arraybuffer'
      });
      const f = __dirname + '/cache/emi.png';
      fs.writeFileSync(f, Buffer.from(response.data, "utf8"));
      return r({attachment: fs.createReadStream(f, () => fs.unlinkSync(f))});
    } catch (e){
      return r(e.message);
    }
  }
}
