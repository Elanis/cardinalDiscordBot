module.exports = function() {
	/**
	 * Color a text
	 *
	 * @param      {string}  string  The text to log
	 * @return     {string}  text		The colored text
	 */
	this.redText = function(str) {
		return '\u001b[31m' + str + '\u001b[39m';
	};
	this.greenText = function(str) {
		return '\u001b[32m' + str + '\u001b[39m';
	};
	this.yellowText = function(str) {
		return '\u001b[33m' + str + '\u001b[39m';
	};
	this.blueText = function(str) {
		return '\u001b[36m' + str + '\u001b[39m';
	};

	/**
	 * Write something in console
	 *
	 * @param      {string}  msg     	The text to log
	 * @param      {string}             type    The type of text (for color)
	 * @param      {boolean}            nodate  Activate the date log ?
	 */
	this.log = function (msg,type,nodate) {
		let text = msg;
		switch(type) {
			case "warn":
				text = redText('WARNING:') + yellowText(text);
				break;
			case "error":
				text = redText('ERROR:') + redText(text);
				break;
			case "fail":
				text = yellowText(text);
				break;
			case "success":
				text = blueText(text);
				break;
			case "info":
				text = greenText(text);
				break;
			default:
		}
		if(nodate==false||nodate==undefined) { text = logdate() + " " + text;}

		console.log(text);
	};

	/**
     * Gets the date time.
     *
     * @return     {string}  The date time.
     */
    this.getDateTime = function(date = new Date()) {
        
	    let hour = date.getHours();
	    hour = (hour < 10 ? "0" : "") + hour;

	    let min  = date.getMinutes();
	    min = (min < 10 ? "0" : "") + min;

	    let sec  = date.getSeconds();
	    sec = (sec < 10 ? "0" : "") + sec;

	    let year = date.getFullYear();

	    let month = date.getMonth() + 1;
	    month = (month < 10 ? "0" : "") + month;

	    let day  = date.getDate();
	    day = (day < 10 ? "0" : "") + day;

		return day + "/" + month + "/" + year + " " + hour + ":" + min + ":" + sec;
	};

    /**
     * Parse text given in a chat command
     *
     * @param      {string}  str     The time to parse
     * @return     {number}  Time parsed in seconds
     */
    this.parseChatTime = function(str) {
        let unit = str.charAt(str.length-1).toLowerCase();
        let count = parseInt(str.substr(0,str.length-1));

        if(typeof count != "number" || Number.isNaN(count)) {
            return -1; // Send error code
        }

        switch(unit) {
            case "d": // Days
                return 86400000*count;
            case "h": // Hour
                return 3600000*count;
            case "m": // Minutes
                return 60000*count;
            case "s": // Seconds
                return 1000*count;
            default: // Wrong unit
                return -1;
        }
    };

	/**
	 * Retourner la date en jaune
	 *
	 * @return     {string}  text		Date en jaune
	 */
	this.logdate = function() {
		return yellowText(getDateTime());
	};
};