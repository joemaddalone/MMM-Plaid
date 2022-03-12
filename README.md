# MMM-Plaid

This is a module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/).

It displays account balances using the Plaid API.

## Using the module

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
          Vanguard: "access-development-nnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnn",
          Robinhood: "access-development-nnnnnnn-nnnn-nnnn-nnnn-nnnnnnnnnn"
        }
      }
    }
  ]
};
```
