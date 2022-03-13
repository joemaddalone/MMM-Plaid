# MMM-Plaid

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

It displays account balances using the Plaid API.

## Dependencies

 - Sign up for [Plaid's Free Plan](https://plaid.com/pricing/).
   - Generate the access token for your bank/brokerage/whatevs accounts
## Installation

 - Clone this repo into your `/MagicMirror/modules` directory.
 - run `npm install` in `/MagicMirror/modules/MMM-Plaid`
 - Configure your `~/MagicMirror/config/config.js`:

To use this module, add the following configuration block to the modules array in the `config/config.js` file:

```js
var config = {
  modules: [
    {
      module: "MMM-Plaid",
      position: "top_left",
      config: {
        plaid: {
          "PLAID-CLIENT-ID": "nnnnnnnnnnnn",
          "PLAID-SECRET": "nnnnnnnnnnnn",
          "Plaid-Version": "2020-09-14"
        },
        accounts: {
          Vanguard: "access-development-nnnnnnn...",
          Robinhood: "access-development-nnnnnnn...",
          Somebank: "access-development-nnnnnnn..."
        }
      }
    }
  ]
};
```

![MMD-Plaid Screenshot](https://raw.githubusercontent.com/joemaddalone/mmm-plaid/master/screenshot.png)

