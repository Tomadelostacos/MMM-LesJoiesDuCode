/* Magic Mirror
 * Node Helper: MMM-LesJoiesDuCode
 *
 * By AceLan Kao
 * MIT Licensed
 */

var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
	start: function () {
		console.log('MMM-LesJoiesDuCode helper started');
	},

	getData: function (data_url) {
		var self = this;
		request({ url: data_url,
			headers:{
				'Accept':'application/json',
				'User-Agent': 'MMM-LesJoiesDuCode (https://github.com/Tomadelostacos/MMM-LesJoiesDuCode)'
			},
			method: 'GET' }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var result = JSON.parse(response.body);
				console.log(result[0].title.rendered);
				console.log(result[0].content.rendered);
				self.sendSocketNotification('DATA_RESULT', result[0]);
			}
		});
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification == 'GET_DATA') {
			this.getData(payload);
		}
	}
});
