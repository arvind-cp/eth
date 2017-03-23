import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var MetaCoinABI = [{"constant":false,"inputs":[],"name":"buyMetaStock","outputs":[{"name":"","type":"bool"}],"payable":true,"type":"function"},{"constant":true,"inputs":[],"name":"getStockBal","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"noofstocks","type":"uint256"}],"name":"sellMetaStock","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getEthBal","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"},{"indexed":false,"name":"val","type":"uint256"}],"name":"SendEther","type":"event"}] ;

var MetaCoinADDR='0x57fb86961c422c15502164b592f27090386da079';
var MyMetaCoin=ETHEREUM_CLIENT.eth.contract(MetaCoinABI).at(MetaCoinADDR);
var accounts=ETHEREUM_CLIENT.eth.accounts
var names=['Ninan','Arvind','Nikhil']
class App extends Component {

constructor(props)
	{
	super(props)
	this.state={
		firstName: [],
		acctAddress: [],
		CoinBal: [],
		EthBal: []
		   }
	}

 componentWillMount()
   {
    console.log(ETHEREUM_CLIENT)
    console.log(MyMetaCoin.getStockBal.call())
    console.log(names)
   var data = MyMetaCoin.getStockBal.call();
   var data1 = MyMetaCoin.getEthBal.call();

   this.setState({
	firstName: names[0],
	acctAddress: accounts[0],
	CoinBal: data.c[0],
	EthBal: data1.c[0]
	})	  
 }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Ninans React App</h2>
        </div>
        <pre>{this.state.firstName}</pre>
	<pre>{this.state.acctAddress}</pre>
	<pre>{this.state.CoinBal}</pre>
	<pre>{this.state.EthBal}</pre>

	<table><thead><tr>
		<th>Name</th>
	  	<th>Address</th>
		<th>Coin Balance</th>
	</tr></thead></table>

      </div>
    );
  }
}

export default App;
