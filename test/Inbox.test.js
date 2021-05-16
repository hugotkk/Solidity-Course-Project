const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');


// Deploy the contract

let accounts;
let inbox;
beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    account = accounts[0];
    inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({
        data: bytecode,
        arguments: ['Hi! there!'],
    }).send({
        from: account,
        gas: '1000000'
    });
});

describe('Inbox', () => {
    it('deploy a contract', () => {
        // Check if the address is null or undefined
        assert.ok(inbox.options.address);
    });

    it('has a default mesaage', async() => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi! there!');
    });
});
