module.exports = class Twitch {
	static checkState(channel, callback) {
		var options = {};
		options.url ='https://api.twitch.tv/kraken/streams/' + channel + "?client_id=" + config.twitch.token;
		request(options, function(error, response, body) {
			if(error) {
				console.log("Error: " + error);
			}

			if(response.statusCode === 200) {
				var retour = JSON.parse(body);

				callback(retour.stream != null);
			}
		});
	}
};