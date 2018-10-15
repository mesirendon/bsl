pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract BSL is Ownable {
  string public email;

  constructor(string _email) public {
    email = _email;
  }

  function withdraw() public onlyOwner {
    msg.sender.transfer(address(this).balance);
  }
}
