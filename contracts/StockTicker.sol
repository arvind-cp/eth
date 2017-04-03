pragma solidity ^0.4.4;

contract StockTicker
{
mapping(address => uint) tickerVal;
address adminAddr;

    //constructor to set the admin address
    function StockTicker()
    {
    adminAddr=msg.sender;
    }

    // get current stock price
    function getTickerVal(address addr) constant returns(uint)
    {
    return tickerVal[addr];
    }

    //set the stock price . Can be invoked by admin only
    function setTickerVal(address addr,uint val) returns(bool)
    {
        if(msg.sender!=adminAddr)
            {throw; }
        tickerVal[addr]=val;    
        return true;
    }
}