/* global Module */

/* Magic Mirror
 * Module: MMM-Plaid
 *
 * By Joe Maddalone
 * MIT Licensed.
 */

Module.register("MMM-Plaid", {
  requiresVersion: "2.1.0", // Required version of MagicMirror
  start: function () {
    this.plaidData = [];
    this.getPlaidData();
  },
  getDom: function () {
    const wrapper = document.createElement("div");
    const table = document.createElement("table");
    this.plaidData.forEach((item) => {
      table.insertAdjacentHTML(
        "beforeend",
        `<tr>
		  <td>
		    <span class="dimmed small">${item.key} ${item.name}</span>
		  </td>
		  <td>
		    <span class="bright small balance-pre">${item.balance}</span>
		  </td>
		</tr>`
      );
    });
    wrapper.appendChild(table);
    return wrapper;
  },
  getStyles: function () {
    return ["MMM-Plaid.css"];
  },
  getHeader: function () {
    return "Account Balances";
  },
  getPlaidData: function () {
    var self = this;
    self.sendSocketNotification("GET_ACCOUNTS", self.config);
  },
  scheduleUpdate: function (delay) {
    var self = this;
    setTimeout(function () {
      self.getPlaidData();
    }, 60 * 1000 * 30);
  },
  socketNotificationReceived: function (notification, payload) {
    switch (notification) {
      case "ACCOUNTS":
        this.plaidData = payload;
        this.updateDom();
        this.scheduleUpdate();
        break;
    }
  }
});
