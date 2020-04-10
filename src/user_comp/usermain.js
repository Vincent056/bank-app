import React from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios'
//import Account from './account.js';

//connect to the database here ?

/*********************retrieve username from login.js user's input 
(for right now I just choose a random user from the database)*/

class UserPage extends React.Component{
    constructor (props){
        super(props)
        this.state = {
            accounts: [],
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
                        <li>ID: {account.account_id}</li> 
                        <li>Type: {account.account_type}</li>
                        <li>Balance: {account.balance}</li>
                        <li>Status: {account.status}</li>
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
    /**Adding a proxy to the url is no a good approach... */
    render(){
        axios({
            method: 'get',
            url: 'https://cors-anywhere.herokuapp.com/http://bank.cvs3.com/bank-app/api/login1.php',
            config: {headers: {'Content-Type': 'application/json'}}
        }).then( (response) => {
            this.setState({
                accounts: response.data,
            })
        }).catch(function(error) {
            // handle error
            console.log(error)
        });

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
                    {this.renderAcc(this.state.accounts)}
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
export default UserPage