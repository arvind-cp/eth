pragma solidity ^0.4.4;

contract MetaDNS {
        mapping (string => address) cntrct_addr;
        event ErrNotAuthorized(address addr);
function MetaDNS()
		{
		cntrct_addr["Admin"] = msg.sender;
		}
function set(string cntrct, address addr) returns(bool)
        {
    if(msg.sender!=cntrct_addr["Admin"])
            {ErrNotAuthorized(msg.sender); return false; }
            cntrct_addr[cntrct]=addr;
            return true;
        }		
function get(string cntrct) constant returns(address)
        { 
            return cntrct_addr[cntrct];
        }
}