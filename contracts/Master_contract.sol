pragma solidity ^0.4.4;

import "./User_Contract.sol";

contract Master_Contract {

  mapping (address => string) userIDs;
  mapping (string => string) roles;
  mapping (string => address) userAddresses;
 
  function addUser(string _userID, string _pwd, string _role) returns (bool) {
  User_Contract con = new User_Contract(_userID, _pwd, msg.sender);
  userAddresses[_userID] = address(con);
  userIDs[con] = _userID;
  roles[_userID] = _role;
  return true;
  }
  
  function getRole(string userId) returns (string){
  return roles[userId];
  }
  
  function getAddress(string userid) returns (address){
  return userAddresses[userid];
  }
  
  function deleteUser(string userId) returns (bool){
  address uadd = userAddresses[userId];
  delete userAddresses[userId];
  delete userIDs[uadd];
  return true;
  }
  
}
