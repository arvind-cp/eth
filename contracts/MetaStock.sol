pragma solidity ^0.4.4;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract MetaStock {
	mapping (address => uint) stockBalances;
	mapping (address => uint) ethBalances;
	// 1 MetaStock = 2 eth
	uint unit_val= 2;
        address company_address; 
	event Transfer(address indexed _from, address indexed _to, uint256 _value);
        event SendEther(address addr,uint val);
	
	function MetaStock() {
		// IPO issue of 10000 stocks
		stockBalances[tx.origin] = 10000;
		company_address = tx.origin;
	}


	function getStockBal(address addr) returns(uint) {
		return stockBalances[addr];
	}
	
	function getEthBal(address addr) returns(uint) {
                return ethBalances[addr];
        }


 	function buyMetaStock() payable public returns(bool) {
		ethBalances[msg.sender]+=msg.value;
		stockBalances[company_address]-=msg.value/unit_val;
		stockBalances[msg.sender]+=msg.value/unit_val;
		SendEther(msg.sender,msg.value);
		return true;
                }

	function sellMetaStock(address addr,uint noofstocks) returns(bool) 
	{
	      if(stockBalances[addr] < noofstocks) 
		{ return false; }
	         	
              if(!msg.sender.send(noofstocks*unit_val))
		{ throw; }

	      ethBalances[addr]-=noofstocks*unit_val;
	      stockBalances[addr]-=noofstocks;
	      stockBalances[company_address]+=noofstocks;	
		return true;
        }
}
