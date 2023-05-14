/* Magic Mirror
 * Node Helper: MMM-LesJoiesDuCode
 *
 * By AceLan Kao
 * Review by @bugsounet (05/2023)
 * MIT Licensed
 */

var NodeHelper = require('node_helper')
const axios = require("axios")

module.exports = NodeHelper.create({
  start: function () {
    this.data_url = "https://lesjoiesducode.fr/wp-json/wp/v2/posts"
  },

  getData: function () {
    let results = []
    axios({ url: this.data_url+"?seed="+Date.now() })
      .then(response => {
        if (response.data.length) {
          response.data.forEach(ljdc => {
            let content = {}
            content.title = ljdc.title.rendered
            content.content = ljdc.content.rendered
            results.push(content)
            console.log("[LJDC] Fetch:", ljdc.title.rendered)
          })
          this.sendSocketNotification("DATA_RESULTS", results)
        }
      })
      .catch(error => {
        console.error("[LJDC] Fetch data error:", error)
      })
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification == "INIT") this.initialize(payload)
  },

  initialize: function(payload) {
    console.log('[LJDC] MMM-LesJoiesDuCode started')
    this.config= payload
    if (this.config.language == "en") this.data_url = "https://thecodinglove.com/wp-json/wp/v2/posts"
    this.getData()
    setInterval(() => { this.getData() }, this.config.updateInterval)
  }
});
