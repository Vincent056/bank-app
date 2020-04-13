import React from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios'
//import Account from './account.js';


/*********************retrieve username from login.js user's input 
(for right now I just choose a random user from the database)*/

class UserPage extends React.Component{
    constructor (props){
        super(props)
        this.accounts = []
        this.state = {
            firstname: '',
            lastname: '',
            accounts: [],
            toupdate: false,
            tobilling: false,
            toopen: false,
			loggedOut: false
        }
    }
    /****use this function to mount to the class
     * do not use axios in render as it will cause 
     * an infinity loop*/
    componentDidMount(){
        axios({
            method: 'post',
            url: 'http://bank.cvs3.com/bank-app/api/usermain.php',
            data: {
                username: this.props.user
            },
            config: {headers: {'Content-Type': 'x-www-form-urlencoded'}}
        }).then( (response) => {   
            
            let temp = []
            temp.push(response.data)  
            this.setState({
                accounts: temp,
                firstname: temp[0].firstname,
                lastname: temp[0].lastname
            })
            console.log(this.state.accounts) //just to check, delete later        
        }).catch(function(error) {
            // handle error
            console.log(error)
        });
    }
    addAccount(a){
        this.props.accounts.push(a)
    }
    renderAcc(a){ //for now it will like this
        if (a.length === 0) return <p>No Account.</p>
        return (
                a.map(account => (
                    <div className = 'account' key ={account}>
                        <li>ID: {account.accountID}</li> 
                        <li>Type: {account.accountType}</li>
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
                <h1>Welcome {this.state.firstname} {this.state.lastname}</h1>
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