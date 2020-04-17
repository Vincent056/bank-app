import React from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import styles from './../mystyle.module.css';
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
            loggedOut: false,
            totrans: false,
            deposit: "Check",
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
    handleDelete(){}
    deposit(){}
    atmPage(){}
    maketrans = () => {
		this.setState({
			totrans: true
		})
	}
    accountClick(){}
	logout = () => {
		this.setState({
			loggedOut: true
		})
	}
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
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
        if (this.state.totrans){
            return <Redirect to="/transfer"/>
        } 
        return (
            <div className={styles.center}>
                <div className={styles.topnav}>
					<a>Welcome {this.state.firstname} {this.state.lastname}</a>\
					<a><button onClick={this.logout}>Log Out</button></a>
				</div>
                <div className={styles.main}>
                    {this.state.accounts.map(account => (
                    <div>
                        <div className = 'account' key ={account.account_id}>
                            <li>ID: {account.account_id}</li> 
                            <li>Type: {account.account_type}</li>
                            <li>Balance: {account.balance}</li>
                            <li>Status: {account.status}</li>
                        </div>
                        <button onClick={this.handleDelete}>Delete</button><br></br><br></br> 
                    </div> 
                )
             ) }
                </div>
                <div className={styles.sidenav}>
                    <a><button className={styles.button} onClick={this.openAcc}>Open New Account</button></a>
                    <a><button className={styles.button} onClick={this.updateInfo}>Update Information</button></a>
                    <a><button className={styles.button} onClick={this.setBilling}>Set Up Billing</button></a>
                    <a><button className={styles.button} onClick={this.maketrans}>Make A Transfer</button></a>
                    <label>Deposit </label>
                    <select value ={this.state.deposit}
                        onChange={this.handleChange} >
                        <option value= "Check">Check </option>
                        <option value= "Cash">Cash </option>
                    </select>
                </div>
				
            </div>
            )
        
    }
}
export default UserPage