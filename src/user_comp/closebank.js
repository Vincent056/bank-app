import React from 'react';
import { Redirect} from 'react-router-dom';
import Account from './account.js';
import {myaccounts} from './usermain.js';

//connect database here

class CloseAcc extends React.Component{
    state ={
        goBack: false,
    }
    handleClick(a){
        
    }
    render(){
        if (this.state.goBack ){
            return <Redirect to="/"/>
        } 
        if (myaccounts.length === 0) return <p>No Account.</p>
        return (
                myaccounts.forEach((acc) =>{
                    <button classname = 'account' onclick = {this.handleClick(acc)}>
                        <li>ID: {acc.getId()}</li> 
                        <li>Type: {acc.getType()}</li>
                    </button>
                })
            )  
    }
}
export default (CloseAcc)