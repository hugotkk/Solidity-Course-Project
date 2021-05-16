require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    process.env.word_phase,
    process.env.api_endpoint,
);
const web3 = new Web3(provider);

const deploy = async () => {
    accounts = await web3.eth.getAccounts();
    account = accounts[0];
    inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({
        data: '0x'+bytecode,
        arguments: ['Hi! there!'],
    }).send({
        from: account,
        gas: '1000000',
        gasPrice: web3.utils.toWei('2', 'gwei')
    });
    console.log("Deploying the contract to address: " + inbox.options.address);

};

deploy();
