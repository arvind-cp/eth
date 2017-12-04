import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Web3 from 'web3';
import _ from 'lodash';

//import Tabs from 'material-ui/Tabs';
//import Tab from 'material-ui/Tabs';

var provider=new Web3.providers.HttpProvider('http://metastock-ninantharakan.c9users.io:8080');
var ETHEREUM_CLIENT = new Web3(provider);
var acct=ETHEREUM_CLIENT.eth.accounts;

var MasterContractABI = [{"constant":false,"inputs":[{"name":"_userID","type":"string"},{"name":"_pwd","type":"string"},{"name":"_role","type":"string"},{"name":"userAddr","type":"address"}],"name":"addUser","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"useraddress","type":"address"}],"name":"getuserID","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}];
var usrABI= [{"constant":false,"inputs":[{"name":"piitype","type":"string"}],"name":"getPIIS_IN","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"bytes"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"piitype","type":"string"}],"name":"getPII","outputs":[{"name":"","type":"bytes32"},{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"bytes"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"piitype","type":"string"}],"name":"deletePII","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"piiType","type":"string"},{"name":"piiValue","type":"bytes"}],"name":"verifyPII","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"piiType","type":"string"},{"name":"piiValue","type":"bytes"},{"name":"exposepii","type":"string"},{"name":"digcert","type":"bytes"}],"name":"addUpdPII","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"string"},{"name":"password","type":"string"}],"name":"destructMe","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"string"},{"name":"password","type":"string"},{"name":"piitype","type":"string"}],"name":"usrApprovePII","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}];


var master_Addr='0x70f13ec755b61a468ea88a812032982021267670';
var usr_addr='0xfc209da57e7ac78236bc40b45c298e24a06d6075';


var MyUserContract= ETHEREUM_CLIENT.eth.contract(usrABI).at(usr_addr);

const style = {
  margin: 15,
};

class Dashboard extends Component {
  constructor(props){
   super(props);
    this.state = {

     userID: String,
     piiTypes: [],
     piiValues: [],
     certifierIds: [],
     piiValuesAppr:[],
     certifierIdsAppr: []
    };
  }
  
  componentWillMount() {
  // var userid = MyUserContract.getuserID.call(usr_addr,{from:acct[0]});
   var userid="Ninan";
   var pii=["Passport","DL","SSN","EmailID"];
   
   //Pending Approval PIIs              
   var PIIObj= [ MyUserContract.getPIIS_IN.call(pii[0],{from:acct[0]}),  
                 MyUserContract.getPIIS_IN.call(pii[1],{from:acct[0]}),
                 MyUserContract.getPIIS_IN.call(pii[2],{from:acct[0]}),
                 MyUserContract.getPIIS_IN.call(pii[3],{from:acct[0]})];
   var piival= [PIIObj[0][0],PIIObj[1][0],PIIObj[2][0],PIIObj[3][0]];
   var digcert= [PIIObj[0][3],PIIObj[1][3],PIIObj[2][3],PIIObj[3][3]];   
   
   //Approved PIIS              
     var PIIObjAppr= [ MyUserContract.getPII.call(pii[0],{from:acct[0]}),  
                       MyUserContract.getPII.call(pii[1],{from:acct[0]}),
                       MyUserContract.getPII.call(pii[2],{from:acct[0]}),
                       MyUserContract.getPII.call(pii[3],{from:acct[0]})];
   var piivalAppr= [PIIObjAppr[0][0],PIIObjAppr[1][0],PIIObjAppr[2][0],PIIObjAppr[3][0]];
   var digcertAppr= [PIIObjAppr[0][3],PIIObjAppr[1][3],PIIObjAppr[2][3],PIIObjAppr[3][3]];                    
                 
   //console.log("piival="+piival);
   this.setState({
    userID: userid,
    piiTypes: pii,
    piiValues: piival,
    certifierIds:digcert,
    piiValuesAppr: piivalAppr,
    certifierIdsAppr:digcertAppr   
     });
  }
     handleClick_approve(event){

 MyUserContract.usrApprovePII('Ninan','Pass123','SSN',{from:acct[0],gas:150000});
  //console.log("User Hash = "+MyUserContract.getPIIHash.call("SSN",{from:acct[0]}));
 this.props.history.push('/Dashboard');
 
 }
     
  
 render() {
  
  var TableRows = [];
  var TableRowsAppr=[];
    _.each(this.state.piiTypes,(value,index) =>{
   
   if(this.state.certifierIds[index]=="0x") {
  TableRows.push(
   <tr>
   <td>{index+1}</td>
   <td>{this.state.userID}</td> 
   <td>{this.state.piiTypes[index]}</td>
   <td>{this.state.piiValues[index]}</td>
   <td>{this.state.certifierIds[index]}</td>
   </tr>
   );
   }
   
   if(this.state.certifierIdsAppr[index]=="0x") {
   TableRowsAppr.push(
   <tr>
   <td>{index+1}</td>
   <td>{this.state.userID}</td> 
   <td>{this.state.piiTypes[index]}</td>
   <td>{this.state.piiValuesAppr[index]}</td>
   <td>{this.state.certifierIdsAppr[index]}</td>
   </tr>
   );
   }
  });
    return (
      
     <div>
        <MuiThemeProvider>
          <div className="App">
          <AppBar
             title="XXXID Manager"
           /> 
        <div className="App-Content">
        <h2>Approval Required</h2>
        <table>
        <thead>
        <tr>
        <th>Serial No</th>
        <th>User ID</th>
        <th>PII Type</th>
        <th>PII Value</th>
        <th>Certifier ID</th>
        </tr>
        </thead>
        <tbody>
        {TableRows}
        </tbody>
        </table>
     
   
    <RaisedButton label="Approve" primary={true} style={style} 
                onClick={(event) => this.handleClick_approve(event)}/>
               
       <RaisedButton label="Reject" primary={true} style={style} 
                onClick={(event) => this.handleClick_reject(event)}/>
                
        <h2>Approved PIIS</h2>
        <table>
        <thead>
        <tr>
        <th>Serial No</th>
        <th>User ID</th>
        <th>PII Type</th>
        <th>PII Value</th>
        <th>Certifier ID</th>
        </tr>
        </thead>
        <tbody>
        {TableRowsAppr}
        </tbody>
        </table>
            <RaisedButton label="Mask" primary={true} style={style} 
                onClick={(event) => this.handleClick_mask(event)}/>
               
       <RaisedButton label="Delete" primary={true} style={style} 
                onClick={(event) => this.handleClick_delete(event)}/>
        
        </div>
           </div>
           
             </MuiThemeProvider>
           </div>
      );
 }
}
export default Dashboard;
