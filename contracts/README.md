
Meta Stock Contract
-------------------
            This contract represents the functions performed by a stock broker . Companies can use this contract to issue an IPO with
            the specified no of stocks.Users can interact with this contract to buy and sell stocks of the  company. It interacts with another contracts names StockTicker to get the current stock price

    This contract uses the below data elements

        mapping (address => uint) stockBalances - This is a key value pair of user's address to the stock balance
        uint unit_val - Current stock price
        address company_address -  variable to store the company's address
    

    This contract uses the below functions to perform various operations

        1. function MetaStock() -- Constructor to issue initial IPO. This also sets the variable to store the company address

        2. function setTicker(address addr) -- Sets the stock ticker to be used for getting the current stock price. For e.g. this can be the address where the contract representing BSE/NSE that is running on block chain. This function instantiates an object from the contract StockTicker.sol which is imported at the initial section. This function can be invoked only by the company. Else it'll throw an error.

        3. function getStockPrice()  - Get the company stock price. Invokes StockTicker object

        4. function getStockBal() - Get the no of stocks assigned to sender.

        5. function getEthBal() - Get the value of stocks assigned to sender 
    
        
        6. function buyMetaStock(uint noofstocks) payable - This function can be invoked to buy stocks.  Please note the keyword payable added to the function definition. It means that this function can accept money (ether) .The invoker have to pass the no of stocks they want to buy and the ether amount required to buy. Even though ether amount is not mentioned in the function definition the value can be passed in  the below format while invoking the function.

        meta.buyMetaStock(10,{value: 200});

        After doing the checks it adds the stocks bought to the sender's account and reduces it from the company's account. Please note that the ether value will be added to the contract's account at this point (not to the company address)

        7. function sellMetaStock(uint noofstocks) - This function can be invoked to sell the stocks. It checks if the invoker has enough stocks in his/her balance . It reduces the stocks from the senders account and adds back to the company account. It also sends the value of the stocks in ether to the user's accounts.
        ** Contract is expected to have enough funds to send to the users once they sell the stock . Additional logic to be added if an exception occurs due to contract not having enough balances.

        8. function withdrawCompany(uint ethVal) - This function will be invoked by the company to withdraw the funds collected through the IPO to it's own account.


Below are the steps for MetaStock Demo to be executed in truffle console . Steps 1-3 can be executed prior to the actual Demo
1. Deploy MetaStock and StockTicker
2. Set the variablesvar meta = MetaStock.at(<address>)var tkr=StockTicker.at(<address>)var accounts = web3.eth.accountsvar infy=accounts[0]var contract= meta.addressvar buyer=accounts[1]
3. Set the stock ticker to be used by MetaStock and set the stock pricetkr.setTickerVal(infy, 2000000000000000000)meta.setTicker(tkr.address)
4. Check Stock and Ether balancesmeta.getStockBal.call({from:buyer});meta.getStockBal.call({from:infy});web3.eth.getBalance(buyer);web3.eth.getBalance(contract);web3.eth.getBalance(infy);
5. Buy Stock
meta.buyMetaStock(10, {from:buyer,value: 20000000000000000000 });Execute Step1
6. Sell Stock
meta.sellMetaStock(5, {from:buyer}); Execute Step1
7. Withdraw funds by company     web3.eth.getBalance(infy);     meta.withdrawCompany(100000000000000000000,{from:infy});     web3.eth.getBalance(infy);     web3.eth.getBalance(contract);
