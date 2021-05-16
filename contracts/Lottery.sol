pragma solidity ^0.4.17;

contract Lottery {

    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value >= 0.01 ether);
        players.push(msg.sender);

    } 

    function pickWinner() public {
        // only the manager can pick the winner
        require(msg.sender == manager);

        // randomly pick the winner and send eth to his ac
        uint index = random() % players.length;
        players[index].transfer(this.balance);

        // Reset the player array after selecting the winner
        players = new address[](0);
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

}
