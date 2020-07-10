module.exports = class Chat {
	static sendMessage(channel, identity, message) {
		if(config.Identities[identity].picture === undefined) { config.Identities[identity].picture = config.Identities.unknown.picture; }
		if(config.Identities[identity].color === undefined) { config.Identities[identity].color = config.Identities.unknown.color; }

		let embed = new Discord.RichEmbed()
			.setAuthor(config.Identities[identity].name)
			.setDescription(message)
			.setThumbnail(config.Identities[identity].picture)
			.setColor(config.Identities[identity].color)
			;

		channel.send({embed}).catch(console.error);
	}

	static sendImage(channel, identity, imageURL, message="") {
		if(config.Identities[identity].picture === undefined) { config.Identities[identity].picture = config.Identities.unknown.picture; }
		if(config.Identities[identity].color === undefined) { config.Identities[identity].color = config.Identities.unknown.color; }

		let embed = new Discord.RichEmbed()
			.setAuthor(config.Identities[identity].name)
			.setImage(imageURL)
			.setThumbnail(config.Identities[identity].picture)
			.setColor(config.Identities[identity].color)
			;

		if(message != "") {
			embed.setDescription(message);
		}		

		channel.send({embed}).catch(console.error);
	}

	static sendVideo(channel, identity, videoURL, message="") {
		channel.send(videoURL).catch(console.error);
	}

	static NoPermissionMessage(channel) {
		sendImage(channel,
			"cardinal", 
			"https://vignette.wikia.nocookie.net/sword-art-online/images/1/16/IO.png/revision/latest?cb=20170714153644&path-prefix=fr",
			"Error: No Permission");
	}

	static RegisterCommand(cmd, identity, data, aliases=[]) {
		if(typeof data === "function") {
			Chat.command[cmd] = data();
			for(let i in aliases) {
				Chat.command[aliases[i]] = data();
			}
		} else {
			Chat.command[cmd] = function(channel) {
				Chat.sendMessage(channel, identity, data);
			};
		}
	}
};