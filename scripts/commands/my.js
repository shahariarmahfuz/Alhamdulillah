const request = require('request');
const fs = require('fs');

// মেসেঞ্জার বট কমান্ড হ্যান্ডলার
function handleBotCommand(userInput) {
  // এখানে আপনার এপিআই এন্ডপয়েন্ট এবং টোকেন যোগ করুন
  const apiEndpoint = 'https://rule34.xxx/';
  const token = 'https://rule34.xxx/';

  // এপিআই কল করে ছবি সার্চ করা
  request({
    url: apiEndpoint,
    qs: { token: token, query: userInput },
    method: 'GET',
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const imageUrl = JSON.parse(body).imageUrl;
      downloadImage(imageUrl);
    } else {
      console.error('ছবি সার্চ করতে সমস্যা হয়েছে:', error);
    }
  });
}

// ছবি ডাউনলোড করা
function downloadImage(imageUrl) {
  const filename = 'downloaded_image.jpg';

  request.head(imageUrl, function(err, res, body){
    request(imageUrl).pipe(fs.createWriteStream(filename)).on('close', function() {
      console.log('ছবি ডাউনলোড সম্পন্ন:', filename);
    });
  });
}

// উদাহরণ কমান্ড যা বট প্রসেস করবে
handleBotCommand('কুকুরের ছবি');
