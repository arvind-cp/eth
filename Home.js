import React, { Component } from 'react'
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router-dom';

class Home extends Component {
    
     render() {
    return (
        <div>
        <MuiThemeProvider>
       <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/Register'>Register</Link></li>
        <li><Link to='/Login'>Login</Link></li>
      </ul>
    </nav>
  </header>
        </MuiThemeProvider>
        </div>
        );
         
     }
}
export default Home;
