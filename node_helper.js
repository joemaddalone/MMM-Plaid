/* Magic Mirror
 * Node Helper: MMM-Plaid
 *
 * By Joe Maddalone
 * MIT Licensed.
 */

var NodeHelper = require("node_helper");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
const accounting = require("accounting");
let plaidClient = null;

const api = {
  plaid: {
    balance: async (access_token) => {
      try {
        const accounts_response = await plaidClient.accountsBalanceGet({
          access_token
        });
        return accounts_response;
      } catch (error) {
        console.error(error);
      }
    },
    balances: async (plaidAccounts) => {
      const accountBalances = Object.keys(plaidAccounts).map(async (key) => {
        const acc = await api.plaid.balance(plaidAccounts[key]);
        return acc.data.accounts.map((a) => ({ ...a, key }));
      });
      return Promise.all(accountBalances);
    }
  }
};

const makeClient = (config) => {
  if (!plaidClient) {
    const configuration = new Configuration({
      basePath: PlaidEnvironments.development,
      baseOptions: {
        headers: { ...config.plaid }
      }
    });

    plaidClient = new PlaidApi(configuration);
  }
};

module.exports = NodeHelper.create({
  socketNotificationReceived: function (notification, config) {
    if (notification === "GET_ACCOUNTS") {
      const helper = this;
      let payload = [];
      makeClient(config);
      api.plaid
        .balances(config.accounts)
        .then((r) => {
          const acc = r.flat(Infinity);
          payload = acc.map((a) => {
            return {
              key: a.key,
              name: a.name,
              balance: a.balances.available || a.balances.current
            };
          });

          const balances = payload.map((p) => p.balance);
          const formattedBalances = accounting.formatColumn(balances, "$ ", 0);
          payload.forEach((p, i) => {
            p.balance = formattedBalances[i];
          });

          helper.sendSocketNotification("ACCOUNTS", payload);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
});
