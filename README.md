# solidlity_course_pj_inbox

This repo is for self learning of [Ethereum and Solidity: The Complete Developer's Guide](https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/).

For testing,

- framework: mocha
- provider: ganache

For deployment,

we use
- provider: truffle HD wallet
- endpoint: [infura api](https://infura.io)
- testnet: [rinkeby](https://rinkeby.etherscan.io)
- testing account: [0xc7c452445555e5190d5ef2d3cfccda5f08a3cd1ca](https://rinkeby.etherscan.io/address/0xc7c452445555e5190d5ef2d3cfccda5f08a3cd1c)


# Useful links

- [Demo of blockchain](https://andersbrownworth.com/blockchain/blockchain)
- [Word Phase Explainsion](https://iancoleman.io/bip39/)
- [Getting eth to Rinkeby Testnet](https://faucet.rinkeby.io/)
- [Infura](https://infura.io)


# Configuration

Install the packages
``` bash
npm install
```

Setup the .env
``` bash
copy .env.sample .env
vi .env
```

``` bash
api_key=<endpoint of rinkeby testnet in infura>
word_phase='<12 word phase of your key>'
```

# Deployment (to testnet)

Inbox Contract
``` bash
node deploy.js
```

Lottery Contract
``` bash
node deploy_lottery.js
```

# Rub Test
``` node
npm test run
```
