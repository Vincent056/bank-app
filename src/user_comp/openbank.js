import React from 'react';
import { Redirect} from 'react-router-dom';
import Account from './account.js';
import {myaccounts} from './usermain.js';

//connect database here

class OpenAcc extends React.Component{
    state ={
        acctype: 'checking',
        goBack: false,
    }
    handleSubmit= () => {
        //code to be changed
        
        var newacc = new Account(this.state.acctype)
        myaccounts.push(newacc)
        this.setState({
            goBack: true
        })
    }
    handleChange = (event) => {
        this.setState({
            acctype: event.target.value
        })
    }
    handleCancel =() =>{
        this.setState({
            goBack: true
        })
    }
    render(){
        if (this.state.goBack ){
            return <Redirect to="/usermain/"/>
        } 
        
        return(
            <form >
                <h1>Open New Account</h1>
                <select value ={this.state.acctype}
                        onChange={this.handleChange} >
                        <option value= "checking">Checking </option>
                        <option value= "saving">Saving </option>
                    </select>
                <button onClick={this.handleSubmit}>Submit</button>
                <button onClick={this.handleCancel}>Cancel</button>
            </form>
        )
    }
}
export default OpenAcc