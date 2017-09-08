pragma solidity ^0.4.4;

contract User_Contract {
  
   struct PII {
   bytes32 PIIHash;
   string ExposePII;
    }
              
   string PIIType;
   address masterAddress;
   mapping (string => PII) piis;    //piis that are certified and approved by user
   mapping (string => PII) piis_in; //piis that  are certified but yet to be approved by user
  
  //Constructor to initialize
  function User_Contract(string userID,string password,address userAddress){
   piis["UserID"].PIIHash=sha3(userID);
   piis["UserID"].ExposePII="Y";
   piis["Password"].PIIHash=sha3(password);
   piis["Password"].ExposePII="Y";
   piis["UserAddress"].PIIHash= sha3(userAddress);
   piis["UserAddress"].ExposePII="Y";
   masterAddress=msg.sender;
  }
  
  // Add or update a new Certified PII
   function addUpdPII(string piiType, bytes32 piiValue,string exposepii) returns (bool){
   bytes32 piiHash = sha3(piiValue);
   piis_in[piiType].PIIHash=piiHash;
   piis_in[piiType].ExposePII=exposepii;
   return true;
   }
   
   // Delete a PII
   function deletePII(string piitype) returns (bool){
   delete piis[piitype];
   return true;
   }
   
   //Verify if the PII value match with the certified PII
    function verifyPII(string piiType, bytes32 piiValue) returns( bool ){
    if(sha3(piiValue)!=piis[piiType].PIIHash)
      { return false;}
     return true;
  }
  
  //get the PII Hash Value
  function getPIIHash(string piitype) returns(bytes32){
   return (piis[piitype].PIIHash);
   }
   
   //get the PII Flag Value
   function getPIIFlag(string piitype) returns(string){
   return (piis[piitype].ExposePII);
   }
  
  // User approve the certified PIIs
  function usrApprovePII(string userID,string password,string piitype) returns (bool)
  {
  //if(sha3(userID)!=piis["UserID"].PIIHash || sha3(password)!=piis["Password"].PIIHash || sha3(msg.sender)!=piis["UserAddress"].PIIHash)
    // {return false;}
  piis[piitype]=piis_in[piitype];
  delete(piis_in[piitype]);
  return true;
  }
   
  // Destroy the User Contract and return any funds to the user
  function destructMe(string userID,string password) returns (bool)
  {
  //if(sha3(userID)!=piis["UserID"].PIIHash || sha3(password)!=piis["Password"].PIIHash || sha3(msg.sender)!=piis["UserAddress"].PIIHash)
    //{return false;}
  selfdestruct(msg.sender);
  return true;
  }
  
  
   
}
