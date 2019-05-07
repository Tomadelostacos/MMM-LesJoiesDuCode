/* global Module */

/* Magic Mirror
 * Module: MMM-LesJoiesDuCode
 *
 * By Thomas Favre (TomaDeLosTacos)
 * MIT Licensed.
 */

Module.register("MMM-LesJoiesDuCode", {
	defaults: {
		delay: 3600000,
		grayscale: true, 
		language: "fr"
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;
		
		setInterval(function() {
			self.updateDom();
		}, this.config.delay);
	},

	getDom: function() { 
		var wrapper = document.createElement("div");
		wrapper.id = "ljdc-wrapper";
		
		
		this.getData(wrapper);
		return wrapper;
	},
	
	getData: function(wrapper) {
		var self = this;

		var postsApiURL = (this.config.language == "en" ? "https://thecodinglove.com/wp-json/wp/v2/posts" : "https://lesjoiesducode.fr/wp-json/wp/v2/posts");
		var getPostsRequest = new XMLHttpRequest();
		getPostsRequest.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				var response = JSON.parse(this.responseText);
				Log.log(response);
				self.createContent(response[0], wrapper);
			}
			 else {
				 return "Loading...";
			 }
		}
		getPostsRequest.open("GET", postsApiURL, true);
		getPostsRequest.send();

	},
	
	createContent: function(data, wrapper) { //Creates the elements for display
		Log.log(data);

		var ljdcWrapper = document.createElement("div");
		ljdcWrapper.id = "ljdc-info";

		var flexWrapper = document.createElement("div");
		flexWrapper.id = "flex-wrapper";

		var ljdcName = document.createElement("p");
		ljdcName.innerHTML = data.title.rendered;
		ljdcName.id = "ljdc-name";
		wrapper.appendChild(ljdcName);
		
		var ljdcContent = document.createElement("div");
		ljdcContent.innerHTML = data.content.rendered;
		ljdcContent.id = "ljdc-content";
		if(this.config.grayscale) { 
			ljdcContent.id = "ljdc-content-grayscale"; 
		}
		ljdcWrapper.appendChild(ljdcContent);
		
		flexWrapper.appendChild(ljdcWrapper);
		
		wrapper.appendChild(flexWrapper);
	},
	
	getStyles: function() {
		return [this.file('MMM-LesJoiesDuCode.css')]
	},
});
