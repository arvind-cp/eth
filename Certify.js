import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Web3 from 'web3';

var provider=new Web3.providers.HttpProvider('http://metastock-ninantharakan.c9users.io:8080');
var ETHEREUM_CLIENT = new Web3(provider);
var acct=ETHEREUM_CLIENT.eth.accounts;

var usrABI= [{"constant":false,"inputs":[{"name":"piitype","type":"string"}],"name":"getPIIdigCert","outputs":[{"name":"","type":"bytes"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"piitype","type":"string"}],"name":"deletePII","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"piiType","type":"string"},{"name":"piiValue","type":"bytes"}],"name":"verifyPII","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"piitype","type":"string"}],"name":"getPIIFlag","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"piitype","type":"string"}],"name":"getPIICertifier","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"piitype","type":"string"}],"name":"getPIIHash","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"piiType","type":"string"},{"name":"piiValue","type":"bytes"},{"name":"exposepii","type":"string"},{"name":"digcert","type":"bytes"}],"name":"addUpdPII","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"string"},{"name":"password","type":"string"}],"name":"destructMe","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"string"},{"name":"password","type":"string"},{"name":"piitype","type":"string"}],"name":"usrApprovePII","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[{"name":"userID","type":"string"},{"name":"password","type":"string"},{"name":"userAddress","type":"address"}],"payable":false,"type":"constructor"}];

var master_Addr='0x70f13ec755b61a468ea88a812032982021267670';
var usr_addr='0xfc209da57e7ac78236bc40b45c298e24a06d6075';

var MyUserContract= ETHEREUM_CLIENT.eth.contract(usrABI).at(usr_addr);

const style = {
  margin: 15,
};


 
class Certify extends Component {
    
   constructor(props) {
    super(props);
    this.state = {
      userid:'',
      value: '',
      attributevalue:''
    };
  }

 handleChange = (event, index, value) => this.setState({value});

 handleClick(event){
  if(this.state.userid.length>0 && this.state.attributevalue.length>0){
  
  var res = MyUserContract.addUpdPII("Passport",this.state.attributevalue,'YYY','0x123456',{from:acct[0],gas:150000});
             
            
             if (res)
             {
              
              this.props.history.push('/Dashboard');
              
             }
             else{
               this.props.history.push('/Certify');
             }
  }
              else{
      alert("Input field value is missing");
    }
 }

    render() {
    return (
        
       <div>
        <MuiThemeProvider>
          <div className="App">
          <AppBar
             title="XXXID Manager"
           /> 
           <h2>Certify Identity</h2>
      
            User ID :   
           <TextField
             hintText="Enter your Uer ID"
             floatingLabelText="User ID"
             onChange = {(event,newValue) => this.setState({userid:newValue})}
          />
           <br/>
            Attribute Type :
          
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
             <MenuItem value={1} primaryText="Passport" />
             <MenuItem value={2} primaryText="DL" />
             <MenuItem value={2} primaryText="SSN" />
             <MenuItem value={2} primaryText="EmailID" />
          </DropDownMenu>
              <br/>
            Attribute Value : 
           <TextField
               hintText="Attribute Value"
               floatingLabelText="Attribute Value"
               onChange = {(event,newValue) => this.setState({attributevalue:newValue})}
               />
                <br/>
               <br/>
               
               I certify that
               
               <br/>
               <br/>
                <RaisedButton label="certify" primary={true} style={style} 
                onClick={(event) => this.handleClick(event)}/>
               
           </div>
            </MuiThemeProvider>
        </div>
        );
    }
}
export default Certify;
