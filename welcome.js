module.exports = class Welcome {
	static join(member) {
		/*config.channel.welcome.send('Hello ' + member + '! Welcome on Dysnomia !\n' +
			'To gain access to channels, please choose your language: type `!en` for english, `!fr` for french, `!oth` for other\n\n' +
			'Bonjour ' + member + '! Bienvenue sur Dysnomia !\n' +
			'Afin d\'accéder aux canaux, veuillez choisir votre langage: tapez `!en` pour anglais, `!fr` pour francais, `!oth` pour autre'
		);*/
		config.channel.welcome.send('Hello ' + member + '! Welcome on Dysnomia !\n' +
			'Bonjour ' + member + '! Bienvenue sur Dysnomia !\n'
		);
	}

	static chooseLanguage(user, cmd) {
		/*switch(cmd) {
			case '!fr':
				if(!User.hasRole(user, 'Francais')) {
					User.giveRole(user, 'Francais');
					config.channel.welcome.send(user + ', vous avez maintenant le role "Francais" !');
				} else {
					config.channel.welcome.send(user + ', vous avez déjà le role "Francais" !');
				}
				break;
			case '!en':
				if(!User.hasRole(user, 'English')) {
					User.giveRole(user, 'English');
					config.channel.welcome.send(user + ', you now have "English" role !');
				} else {
					config.channel.welcome.send(user + ', you already have "English" role !');
				}
				break;
			case '!oth':
				if(!User.hasRole(user, 'Other')) {
					User.giveRole(user, 'Other');
					config.channel.welcome.send(user + ', you now have "Other" role !');
				} else {
					config.channel.welcome.send(user + ', you already have "Other" role !');
				}
				break;
			default:
				// Do nothing
		}*/
	}
};