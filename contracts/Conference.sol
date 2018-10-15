pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract Conference is Ownable {
  address public bsl;
  string public name;
  uint public startDate;
  uint public endDate;
  uint public conferenceCost;
  bool private active;

  mapping(address => Attendant) public attendants;

  struct Attendant {
    string email;
    string nick;
  }

  modifier onlyMasters() {
    require(msg.sender == owner || msg.sender == bsl);
    _;
  }

  modifier costs(uint cost) {
    require(active);
    require(cost * 1 ether == msg.value, 'You must pay the exact value');
    _;
  }

  constructor(string _name, uint _startDate, uint _endDate, uint _cost, address _bsl) public {
    name = _name;
    startDate = _startDate;
    endDate = _endDate;
    conferenceCost = _cost;
    bsl = _bsl;
    active = true;
  }

  function subscribe(string _email, string _nick) public payable costs(conferenceCost){
    attendants[msg.sender] = Attendant({email: _email, nick: _nick});
  }

  function getBalance() public view onlyOwner returns(uint) {
    return address(this).balance;
  }

  function close() public onlyMasters {
    address(bsl).transfer(address(this).balance);
    active = false;
  }
}
