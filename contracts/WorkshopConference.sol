pragma solidity ^0.4.22;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import './Conference.sol';

contract WorkshopConference is Conference {
  constructor(string _name, uint _startDate, uint _endDate, uint _cost, address _bsl)
    Conference(_name, _startDate, _endDate, _cost, _bsl) public {}

  function refund(address _assistant) public onlyOwner {
    address(_assistant).transfer(conferenceCost * 1 ether);
  }
}
