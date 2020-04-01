import React from 'react';
import { Redirect} from 'react-router-dom';
import Account from './account.js';

//connect to the database here ?

//this one should be replaced with accounts list from database
var myaccounts = [new Account('checking'), new Account('saving')]

class UserPage extends React.Component{
    constructor (props){
        super(props)
        this.state = {
            toupdate: false,
            tobilling: false,
            toopen: false,
			loggedOut: false
        }
        
    }
    addAccount(a){
        this.props.accounts.push(a)
    }
    renderAcc(a){ //for now it will like this
        if (a.length === 0) return <p>No Account.</p>
        return (
                a.map(account => (
                    <div className = 'account' key ={account}>
                        <li>ID: {account.getId()}</li> 
                        <li>Type: {account.getType()}</li>
                    </div>)    
                )
            )  
    }
    setBilling = () => {
        this.setState({
            tobilling: true
        })
    }
    openAcc= () => {
        this.setState({
            toopen: true
        })
    }
    updateInfo = () => {
        this.setState({
            toupdate: true
        })
    }
    deposit(){}
    atmPage(){}
    makeTrans(){}
    accountClick(){}
	logout = () => {
		this.setState({
			loggedOut: true
		})
	}
    
    render(){
        if (this.state.toupdate){
            return <Redirect to="/update/"/>
        } 
        if (this.state.toopen){
            return <Redirect to="/openacc/"/>
        } 
        if (this.state.tobilling){
            return <Redirect to="/billing/"/>
        } 
		if (this.state.loggedOut){
            return <Redirect to="/"/>
        } 
        return (
            <div>
                <h1>User Page</h1>
                <div>
                    {this.renderAcc(this.props.accounts)}
                </div>
                <div>
                    <button onClick={this.openAcc}>Open New Account</button>
                    <button onClick={this.updateInfo}>Update Information</button>
                    <button onClick={this.setBilling}>Set Up Billing</button>
                </div>
				<button onClick={this.logout}>Log Out</button>
            </div>
            )
        
    }
}
export {
    UserPage,
    myaccounts,
}