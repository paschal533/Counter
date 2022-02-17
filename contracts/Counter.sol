 // SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract Counter {
  uint count = 0;
  
  function IncrementCount() public{
    count += 1;
  }

  function DecrementCount() public {
    count -= 1;
  }

  function ViewCount() public view returns (uint) {
    return count;
  }
  
}
