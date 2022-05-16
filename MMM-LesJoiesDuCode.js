/* global Module */

/* Magic Mirror
 * Module: MMM-LesJoiesDuCode
 *
 * By Thomas Favre (TomaDeLosTacos)
 * MIT Licensed.
 */

"use strict";

Module.register("MMM-LesJoiesDuCode", {

	result: { title: "loading...", content: ""},

	defaults: {
		updateInterval: 3600000,
		grayscale: true, 
		language: "fr"
	},

	start: function() {
		this.getData();
		this.scheduleUpdate();
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.id = "ljdc-wrapper";

		var ljdcWrapper = document.createElement("div");
		ljdcWrapper.id = "ljdc-info";

		var flexWrapper = document.createElement("div");
		flexWrapper.id = "flex-wrapper";

		var ljdcName = document.createElement("p");
		ljdcName.innerHTML = this.result.title;
		ljdcName.id = "ljdc-name";
		wrapper.appendChild(ljdcName);
		
		var ljdcContent = document.createElement("div");
		ljdcContent.innerHTML = this.result.content;
		ljdcContent.id = "ljdc-content";
		if(this.config.grayscale) { 
			ljdcContent.id = "ljdc-content-grayscale"; 
		}
		ljdcWrapper.appendChild(ljdcContent);
		
		flexWrapper.appendChild(ljdcWrapper);
		
		wrapper.appendChild(flexWrapper);

		return wrapper;
	},

	getData: function() {
		var data_url = "https://lesjoiesducode.fr/wp-json/wp/v2/posts";
		if(this.config.language == "en")
			data_url = "https://thecodinglove.com/wp-json/wp/v2/posts";

		this.sendSocketNotification("GET_DATA", data_url);
		//this.sendSocketNotification("GET_DATA", (this.config.language == "en" ? "https://thecodinglove.com/wp-json/wp/v2/posts" : "https://lesjoiesducode.fr/wp-json/wp/v2/posts"));
	},

	scheduleUpdate: function() {
		setInterval(() => {
			this.getData();
		}, this.config.updateInterval);
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification == "DATA_RESULT") {
			this.result = { title: payload.title.rendered, content: payload.content.rendered };
			this.updateDom(1000);
		}
	},
	
	getStyles: function() {
		return [this.file('MMM-LesJoiesDuCode.css')]
	},
});
