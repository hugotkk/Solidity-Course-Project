const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile_lottery');

// Deploy the contract

let accounts;
let manager
let lottery;
beforeEach(async () => {
    require('dotenv').config();
    accounts = await web3.eth.getAccounts();
    manager = accounts[0];
    lottery = await new web3.eth.Contract(JSON.parse(interface)).deploy({
        data: '0x'+bytecode,
    }).send({
        from: manager,
        gas: '1000000'
    });
});

describe('Lottery Contract', () => {

    it('deploy a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allow multiple accounts to enter', async() => {
        // send money to the contract with multiple players
        // check the players length, players address and contract balance
        const length = 3;
        const amount = 1;
        for(var i = 1; i <= length; i++) {
            await lottery.methods.enter().send({
                from: accounts[i],
                value: web3.utils.toWei(amount.toString(), 'ether')
            });
        }

        const players = await lottery.methods.getPlayers().call();
        assert(players.length == length);
        for(var i = 1; i <= length; i++) {
            assert(players[i-1] == accounts[i]);
        }

        const balance = await web3.eth.getBalance(lottery.options.address);
        const total = amount * length;

        assert(balance == web3.utils.toWei(total.toString(), 'ether'));
    });

    it('allow to select the winner and reset array', async () => {
        // send money to contract
        // select the winner
        // record player balance (before and after picking the winner)
        // check the difference of player balance is ~ to the eth he sent

        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('2', 'ether')
        });

        const before = await web3.eth.getBalance(accounts[1]);

        await lottery.methods.pickWinner().send({
            from: manager,
        });

        const after = await web3.eth.getBalance(accounts[1]);

        assert(after - before > web3.utils.toWei('1.8', 'ether'));

        // get contract balance and player array, check if they are reset
        const balance = await web3.eth.getBalance(lottery.options.address);
        assert(balance == 0);

        const players = await lottery.methods.getPlayers().call();
        assert(players.length == 0);

    });

    // call pickWinner function with non-manager account, assert in try catch
    it('only manager can select the winner', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[1],
                value: web3.utils.toWei('0.02', 'ether')
            });
            await lottery.methods.pickWinner().send({
                from: accounts[1],
            });
            assert(false);
        } catch {
            assert(true);
        }
    });
});
