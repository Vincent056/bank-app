import React from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import styles from './../mystyle.module.css';
import Account from './account.js';
import {Route,Switch} from 'react-router-dom';
import AccSum from './accsum.js'


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
            tosum: false,
            deposit: "Check",
            chosenacc: 0
        }
    }
    /****use this function to mount to the class
     * do not use axios in render as it will cause 
     * an infinity loop*/
    componentDidMount(){
        this.apicall()
    }

    apicall =() =>{
        let userInfo = new FormData();
        userInfo.append('id',this.props.cus_id)
        console.log(this.props.cus_id)
        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/usermain.php',
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
   accsum = (id) => {
        this.setState({
            chosenacc : id,
            tosum : true
        })
    }
    deposit(){}
    atmPage(){}
    maketrans = () => {
		this.setState({
			totrans: true
		})
	}
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
    sumback = () => {
        this.setState({
            tosum : false
        })
        this.apicall()
       
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
        if (this.state.tosum){     
            return(
                <div>
                    <AccSum accid = {this.state.chosenacc}
                            goback ={this.sumback}/>
                </div>
            ) 
        }
        
        return (
            <div className={styles.center}>
                <div className={styles.topnav}>
					<a>Welcome {this.state.firstname} {this.state.lastname}</a>\
					<a><button className={styles.buttontopnav} onClick={this.logout}>Log Out</button></a>
					<a><button className={styles.buttontopnav} onClick={this.updateInfo}>Update Information</button></a>
				</div>
                <div className={styles.main}>
                    {this.state.accounts.map(account => (
                    <Account acc = {account}
                             key ={account.account_id}
                             sum = {() => this.accsum(account.account_id)}/>
                ))}
                </div>
                <div className={styles.sidenav}>
                    <a><button className={styles.button} onClick={this.openAcc}>Open New Account</button></a>
                    <a><button className={styles.button} onClick={this.setBilling}>Set Up Billing</button></a>
                    <a><button className={styles.button} onClick={this.maketrans}>Make A Transfer</button></a>
					<a> <button className={styles.button} onClick={this.depositcheck}>Deposit Check</button></a>
					<a> <button className={styles.button} onClick={this.depositcash}>Deposit Cash</button></a>
                </div>
            </div>
            )      
    }
}
export default UserPage