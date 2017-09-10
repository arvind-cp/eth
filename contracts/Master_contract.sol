pragma solidity ^0.4.4;

import "./User_Contract.sol";

contract Master_Contract {

  mapping (address => string) userIDs;
  mapping (string => string) roles;
  mapping (string => address) userAddresses;
  address adminAddr;

  function Master_Contract(){
  adminAddr=msg.sender;
  }
  
 
  function addUser(string _userID, string _pwd,string _role) returns (bool) {
  if((sha3(_role)==sha3("Certifier")) && (msg.sender!=adminAddr)) // strings can't be compared directly hence using sha3()
  {return false;}
  User_Contract con = new User_Contract(_userID, _pwd,_role,msg.sender);
  userAddresses[_userID] = address(con);
  userIDs[con] = _userID;
  roles[_userID] = _role;
  return true;
  }
  
  function deleteUser(string userId) returns (bool){
  if(userAddresses[userId]!=msg.sender || adminAddr!=msg.sender)
  {return false;}
  address uadd = userAddresses[userId];
  delete userAddresses[userId];
  delete userIDs[uadd];
  return true;
  }
  
  function getRole(string userId) returns (string){
  return roles[userId];
  }
  
  function getAddress(string userid) returns (address){
  return userAddresses[userid];
  }
  function getuserID(address useraddress) returns (string){
  return userIDs[useraddress];
  }
  
}
