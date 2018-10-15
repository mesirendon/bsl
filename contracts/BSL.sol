pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import './Conference.sol';
import './SimpleConference.sol';

contract BSL is Ownable {
  string public email;
  mapping(address => string) public conferences;

  constructor(string _email) public {
    email = _email;
  }

  function addConference(address _conferenceAddress, string _conference) public onlyOwner {
    conferences[_conferenceAddress] = _conference;
  }

  function getConference(address _conferenceAddress) public view onlyOwner returns(string) {
    return conferences[_conferenceAddress];
  }

  function getBalance() public view onlyOwner returns(uint) {
    return address(this).balance;
  }

  function withdraw() public onlyOwner {
    msg.sender.transfer(address(this).balance);
  }

  function() public payable {}
}
