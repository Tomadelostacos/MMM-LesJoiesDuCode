/* global Module */

/* Magic Mirror
 * Module: MMM-LesJoiesDuCode
 *
 * By Thomas Favre (TomaDeLosTacos)
 * Review by @bugsounet (05/2023)
 * MIT Licensed.
 */

"use strict";

Module.register("MMM-LesJoiesDuCode", {
  defaults: {
    updateInterval: 3600000,
    rotateInterval: 60000,
    grayscale: false,
    language: "fr"
  },

  start: function() {
    this.results= [ { title: "loading...", content: ""} ]
    this.rotate = null
    this.sendSocketNotification("INIT", this.config)
  },

  getDom: function() {
    var wrapper = document.createElement("div")
    wrapper.id = "ljdc-wrapper"

    var ljdcWrapper = document.createElement("div")
    ljdcWrapper.id = "ljdc-info"

    var flexWrapper = document.createElement("div")
    flexWrapper.id = "flex-wrapper"

    var ljdcName = document.createElement("p")
    ljdcName.innerHTML = this.results[0].title
    ljdcName.id = "ljdc-name"
    wrapper.appendChild(ljdcName)

    var ljdcContent = document.createElement("div")
    ljdcContent.innerHTML = this.results[0].content

    ljdcContent.id = "ljdc-content"
    if(this.config.grayscale) ljdcContent.id = "ljdc-content-grayscale"

    ljdcWrapper.appendChild(ljdcContent)

    flexWrapper.appendChild(ljdcWrapper)

    wrapper.appendChild(flexWrapper)

    return wrapper
  },

  socketNotificationReceived: async function(notification, payload) {
    if (notification == "DATA_RESULTS") {
      clearInterval(this.rotate)
      this.rotate = null
      this.results = payload
      this.hide(500, () => {this.reFreshContent()}, {lockString: "ljdc"})
      this.rotate = setInterval(() => {
        this.hide(500, () => {this.reFreshContent()}, {lockString: "ljdc"})
      }, this.config.rotateInterval)
    }
  },

  reFreshContent: function () {
    let ramdom = this.getRandomInt(this.results.length)
    let name = document.getElementById("ljdc-name")
    name.innerHTML = this.results[ramdom].title
    let content = document.getElementById("ljdc-content")
    content.innerHTML = this.results[ramdom].content
    let video = content.querySelector("video")
    if (video) video.play()
    this.show(500, () => {}, {lockString: "ljdc"})
  },

  getStyles: function() {
    return [this.file('MMM-LesJoiesDuCode.css')]
  },

  getRandomInt: function(max) {
    return Math.floor(Math.random() * max)
  }
});
