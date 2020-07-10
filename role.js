module.exports = class User {
	static giveRole(user, role) {
		var roleObj = config.guild.roles.find("name", role);
		if(roleObj === null) { log("Erreur: wrong role \"" + role + "\""); return; }
		user.addRole(roleObj).catch(console.error);
		log("Added role \"" + role + "\" to " + user.user.username);
	}

	static hasRole(user, role) {
		return user.roles.find("name", role);
	}

	static isAdmin(message) {
		return message.member.roles.find("name", config.grades.admin);
	}
};