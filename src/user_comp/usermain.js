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
        let userInfo = new FormData();
        userInfo.append('id',this.props.cus_id)
        console.log(this.props.cus_id)
        axios({
            method: 'post',
            url: 'http://bank.cvs3.com/bank-app/api/usermain.php',
            data: userInfo,
            config: {headers: {'Content-Type': 'x-www-form-urlencoded; charset=UTF-8'}}
        }).then( (response) => {
            this.setState({
                accounts: response.data,
                firstname: response.data[0].first_name,
                lastname: response.data[0].last_name,

            })
            console.log(this.state.accounts) //just to check, delete later        
        }).catch(function(error) {
            // handle error
            console.log(error)
        });
    }

    renderAcc(a){ //for now it will like this
        if (a.length === 0) return <p>No Account.</p>
        return (
                a.map(account => (
                    <div>
                        <div className = 'account' key ={account}>
                            <li>ID: {account.account_id}</li> 
                            <li>Type: {account.account_type}</li>
                            <li>Balance: {account.balance}</li>
                            <li>Status: {account.status}</li>
                        </div> 
                    </div> 
                )
            ) ) 
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