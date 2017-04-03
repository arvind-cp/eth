pragma solidity ^0.4.4;

import "./StockTicker.sol";
// 1 MetaStock = 2000000000000000000 Wei = 2 Eth


contract MetaStock {
        mapping (address => uint) stockBalances;
        uint unit_val;
        address company_address;
        
        //Declare Stock Ticker Object
        address tickerAddr;
        StockTicker ST;
        
        event buyMetaStockEvent(address addr,uint val);
        event sellMetaStockEvent(address addr,uint val);
        event ErrInsufficientEth(address addr,uint val);
        event ErrInsufficientStock(address addr,uint val);
        event ErrNotAuthorized(address addr);
        
        function MetaStock() {
                // IPO issue of 10000 stocks
                stockBalances[msg.sender] = 10000;
                //Set company address
                company_address = msg.sender;
                
        }
        // Set the stock market ticker 
        function setTicker(address addr)  returns(bool) {
               if(msg.sender!=company_address)
                {ErrNotAuthorized(addr); return false; }
                // Connect to the Stock Ticker 
                 ST = StockTicker(addr);
                 return true;
        }

        
        //Get the company stock price. Invokes StockTicker object
        function getStockPrice() constant returns(uint) {
            // Get the unit value from stock ticker
            unit_val=ST.getTickerVal(company_address);
            return unit_val;
            }

        //Get the no of stocks assigned to sender    
        function getStockBal() constant returns(uint) {
                return stockBalances[msg.sender];
        }

        //Get the value of stocks assigned to sender    
        function getEthBal() constant returns(uint) {
                
                return stockBalances[msg.sender]*unit_val;
        }
    
        
        // buy Stock
        function buyMetaStock(uint noofstocks) payable public returns(bool) {
            // Get the unit value from stock ticker
            unit_val=ST.getTickerVal(company_address);
           // noofstocks that can be bought with the ether recieved
            var noofstocksforeth = msg.value / unit_val;
            
         // Check if company is offering enough stocks required    
            if(stockBalances[company_address] < noofstocks)
                { ErrInsufficientStock(msg.sender,noofstocks); return false; }
                
            // Check if stocks can be bought with the ether recieved
            if( noofstocks != noofstocksforeth)
               { ErrInsufficientEth(msg.sender,noofstocks); return false;}
                
                stockBalances[company_address]-=noofstocks;
                stockBalances[msg.sender]+=noofstocks;
           
                buyMetaStockEvent(msg.sender,noofstocks);
                return true;
                }

        function sellMetaStock(uint noofstocks) public returns(bool)
        {
              
              var addr=msg.sender;
              // Get the unit value from stock ticker
              unit_val=ST.getTickerVal(company_address);
            
              if(stockBalances[addr] < noofstocks)
                { ErrInsufficientEth(msg.sender,noofstocks); return false;}

              stockBalances[addr]-=noofstocks;
              stockBalances[company_address]+=noofstocks;

                 if(!msg.sender.send(noofstocks*unit_val))
                { throw; }
                
                sellMetaStockEvent(addr,noofstocks);
                return true;
        }
        
        function withdrawCompany(uint ethVal) public returns(bool)
        {
            var addr=msg.sender;
            // Check if withdraw from company address only
            if(addr!=company_address)
            {ErrNotAuthorized(addr); return false; }   
                     
            if(!company_address.send(ethVal))
                { throw; }
                return true;
            
        }
        
}
