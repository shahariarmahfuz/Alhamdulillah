const { get } = require('axios');
const fs = require('fs');
const path = require('path');

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

    if(args.length === 0) {
      return r('Please provide a prompt for the image.');
    }

    const prompt = args.join(" "); // This will combine all arguments into a single string

    try {
      const response = await get(`https://api.easy-api.online/api/sfw/neko?prompt=${encodeURIComponent(prompt)}`, {
        responseType: 'arraybuffer'
      });
      const f = path.join(__dirname, '/cache/emi.png');
      fs.writeFileSync(f, Buffer.from(response.data));
      return r({attachment: fs.createReadStream(f, () => fs.unlinkSync(f))});
    } catch (e){
      return r(e.message);
    }
  }
}
