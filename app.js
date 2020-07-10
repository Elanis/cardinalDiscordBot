// NPM Libs
global.request = require('request');

// Discord interface
global.Discord = require('discord.js');
global.client = new Discord.Client();

// My Libs
require('./console')();
global.Chat = require('./chat');
global.Twitch = require('./twitch');
global.User = require('./user');
global.Welcome = require('./welcome');

/**
 * Configuration
 */
global.config = require('./config');

/**
 * App main code
 */
let app = {};

app.start = function() {
	console.log('App started & connected to discord !');

	// Initializations
	config.channelInit();
	config.guild = client.guilds.get("194027692809519105");

	setInterval(app.frequently, 300000); // Toutes les 5 minutes
	app.frequently();

	// Discord events
	client.on('message', treatMessage);

	client.on('guildMemberAdd', Welcome.join);
};

app.frequently = function() {
	// Twitch status checking
	Twitch.checkState(config.twitch.username, function(status) {
		if(status && !config.twitch.status) {
			var channel = client.channels.find('id',"194027692809519105");
			channel.sendMessage("Elanis est maintenant en live ! https://www.twitch.tv/" + config.twitch.username);
			config.twitch.status = true;
		} else if(!status) {
			config.twitch.status = false;
		}
	});

	// Change bot status
	changeStatus();
};

function changeStatus() {
	let activity = config.activities[Math.round(Math.random() * (config.activities.length-1))];
	client.user.setActivity(activity);
}

function treatMessage(message) {
	if(message.author.id == client.user.id) { return; } // Don't treat your own messages
	if(message.guild === undefined || !message.guild.available) { return; } // Blacklist PM & Prevent some bugs
	
	var words = message.cleanContent.split(" ");
	for(var i in words) {
		words[i] = words[i].toLowerCase();
	}

	var cleanMessage = message.cleanContent.toLowerCase();

	/**
	 * Cardinal
	 */

	// Give Excalibur
	if(User.isAdmin(message) && cleanMessage == "system command generate object id excalibur") {
		Chat.sendImage(message.channel,
			"cardinal", 
			"https://vignette.wikia.nocookie.net/swordartonline/images/2/20/Holy_Sword_Excalibur.png/revision/latest");	
	}

	// Set privileges
	if(User.isAdmin(message) && cleanMessage.substr(0,50) == "system command enable administrator privileges set") {
		var target = message.mentions.members.first();
		var lvl = parseInt(words[words.length - 1]) + 1; // On prends en compte le message de clear en plus

		if(isNaN(lvl)) { return; }
		if(target == undefined) { return; }
		if(target.roles.find("name", "Administrathor")) {
			Chat.NoPermissionMessage(message.channel);
			return;
		}

		if(lvl == 1) {
			target.removeRoles(target.roles).catch(console.error);
			Chat.sendMessage(message.channel, 'cardinal', "Removed all roles of " + target);
		} else {
			var roles = [
				"",
				"",
				"Galactae Tester",
				"Moderathor",
				"Community Manager",
				"Administrathor"
			];
			var role =  message.guild.roles.find("name", roles[lvl]);
			target.addRole(role).catch(console.error);

			Chat.sendMessage(message.channel, 'cardinal', "Granted privileges of " + roles[lvl] + " to " + target);
		}
	}

	if(User.isAdmin(message) && cleanMessage == "system commands") {
		Chat.sendMessage(message.channel, 'cardinal', "Avaialable commands: ");
	}

	/**
	 * G.L.A.D.O.S
	 */
	if(cleanMessage.substr(0,23) == "cette phrase est fausse") {
		Chat.sendMessage(message.channel, 'glados', "Ne pas analyser ! Ne pas analyser !");

		setTimeout(function() {
			Chat.sendMessage(message.channel, 'aegis', "DANGER: Activating AEGIS Firewall.");
		}, 10000);
		
	}

	/**
	 * Judge Dead
	 */
	if(User.isAdmin(message) && cleanMessage.substr(0,4) == "!ban") {
		let target = message.mentions.members.first();
		let msgList = [
			"Joueur " + target + " ! ",
			"En vous emparant deliberement d'un objet cheaté pour utiliser ses pouvoirs à votre profit, vous avez violé la charte.",
			"Souhaitez vous ajouter un dernier mot avant que la sentence ne soit rendue ?",
			"",
			"",
			"Ah, j'entends bien !",
			"Voici donc le jugement implacable de la justice divine qu'Horizon 1.1 reserve aux nuisibles tels que vous !",
			"Je vais effacer chacun de vos items, lentement, ...",
			"... vider vos reserves de crédits, ...",
			"... annuler vos points d'expériences et de réputation.",
			"Je vais effacer votre historique, ligne par ligne ...",
			"Je vais broyer votre misérable avatar, PIXEL par PIXEL !",
			"VOUS ENTENDEZ ?! VOUS ALLEZ PRENDRE POUR LES MILLIERS DE COMPTES PIRATES QUE JE NE PEUX PAS CHATIER ! MOUAHAAHAHAHAH !",
		];
		let time = 0;

		for(let i=0; i<msgList.length; i++) {
			if(msgList[i] != "") {
				setTimeout(function() {
					Chat.sendMessage(message.channel, 'judgeDead', msgList[i]);
				}, time);
			}
			time += 250 + msgList[i].length * 30;
		}
	}

	/**
	 * XANA
	 */
	if(cleanMessage == "!rvlp") {
		Chat.sendVideo(message.channel, 'xana', "https://youtu.be/2wFpvsWs6og");
	}

	/**
	 * Misc
	 */

	// Clear messages
	if(User.isAdmin(message) && words[0] == "!clear") {
		var count = parseInt(words[1]) + 1;
		if(count > 100) { count = 100; }

		message.channel.fetchMessages({ limit: count })
		.then(function(messages) {
			message.channel.bulkDelete(messages);
			messagesDeleted = messages.array().length; // number of messages deleted

			console.log('Deletion of messages successful. Total messages deleted: ' + messagesDeleted);
		})
		.catch(function(err) {
			console.log('Error while doing Bulk Delete');
			console.log(err);
		});
	}

	if(User.isAdmin(message) && words[0] == "!welcome") {
		Welcome.join(message.member);
	}

	if(User.isAdmin(message) && words[0] == "!mute") {
		User.mute(message.mentions.members.first(), words[2]);
	}

	/**
	 * Perceval
	 */
	if(cleanMessage == "chante sloubi") {
		Chat.sendMessage(message.channel, 'perceval', "Sloubi 1, Sloubi 2, Sloubi 3 et Sloubi 4, Sloubi 5, Sloubi 6 et Sloubi 7, ...");
	}

	Welcome.chooseLanguage(message.member, words[0]);

	var kaamemeList = [
		"https://youtu.be/dxEB0ssUfFA",
	];
	if(cleanMessage == "!kaameme") {
		let random = Math.round(kaamemeList.length * Math.random());
		Chat.sendVideo(message.channel, 'perceval', kaamemeList[random]);
	}

	if(message.channel == config.channel.welcome) {
		message.delete()
			.catch(console.error);
	}
}

client.login(config.discord.token);
client.on('ready', app.start);