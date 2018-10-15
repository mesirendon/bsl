pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import './Conference.sol';

contract SimpleConference is Conference {

  constructor(string _name, uint _startDate, uint _endDate, uint _cost, address _bsl)
    Conference(_name, _startDate, _endDate, _cost, _bsl) public {}
}
