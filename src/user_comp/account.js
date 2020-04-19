import React from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import AccSum from './accsum.js'
//import Account from './account.js';
//import {myaccounts} from './usermain.js';

class Account extends React.Component{
    constructor(){
        super()
        this.state ={
            tosum: false,
            goBack: false
        }
        
    }
    
    accsummary = () => {
        this.props.sum()
    }
    render(){

        if (this.state.goBack ){
            return <Redirect to="/usermain/"/>
        } 
        if (this.state.tosum){
            return <Redirect to="/accsum"/>
        } 
        return(
            <div>
            <button className = 'account' 
                    onClick={this.accsummary}>
                            <li>ID: {this.props.acc.account_id}</li> 
                            <li>Type: {this.props.acc.account_type}</li>
                            <li>Balance: {this.props.acc.balance}</li>
                            <li>Status: {this.props.acc.status}</li>
                        </button>
            </div>
        )
    }
}
export default Account
