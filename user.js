module.exports = class User {
	static giveRole(user, role) {
		var roleObj = config.guild.roles.find("name", role);
		if(roleObj === null) { log("Erreur: wrong role \"" + role + "\""); return; }
		user.addRole(roleObj).catch(console.error);
		log("Added role \"" + role + "\" to " + user.user.username);
	}

	static delRole(user, role) {
		var roleObj = config.guild.roles.find("name", role);
		if(roleObj === null) { log("Erreur: wrong role \"" + role + "\""); return; }
		user.removeRole(roleObj).catch(console.error);
		log("Removed role \"" + role + "\" to " + user.user.username);
	}

	static hasRole(user, role) {
		return user.roles.find("name", role);
	}

	static isAdmin(message) {
		return message.member.roles.find("name", config.grades.admin);
	}

	static mute(user, time) {
		let nbMs = parseChatTime(time);
		if(nbMs < 0) { nbMs = 300000; }
		
		User.giveRole(user, "Muted");
		setTimeout(function() {
			User.delRole(user, "Muted");
			// @TODO: permissions
		}, nbMs);
	}
};