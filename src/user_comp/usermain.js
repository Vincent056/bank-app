import React from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import styles from './../mystyle.module.css';
import Account from './account.js';
import AccSum from './accsum.js'
import Transfer from './transaction.js'
import Billing from './setbilling.js'
import ATM from './atm.js'
import Check from './depositcheck.js'

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
            toatm: false,
            openatm: false,
            check: false,
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
    FindATM = () => {
        this.setState({
            toatm: true
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
    sumback = () => {
        this.setState({
            tosum : false
        })
        this.apicall()
       
    }
    transback = () => {
        this.setState({
            totrans : false
        })
        this.apicall()
       
    }
    billback = () => {
        this.setState({
            tobilling : false
        })
        this.apicall() 
    }
    fakeatm =() => {
        this.setState({
            openatm: true,
            toatm: false
        })
    }
    atmback = () => {
        this.setState({
            openatm : false
        })
        this.apicall() 
    }
    backfindatm =() =>{
        this.setState({
            toatm: false
        })
    }
    depositcheck = () => {
		this.setState({
			check: true
		})
    }
    checkback = () => {
        this.setState({
            check : false
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
        if (this.state.toatm){
            return(
                <div>
                    <p>Mapping class or something goes here. Each Atm location found
                    will have this button (just an ATM simulation)</p>
                    <button onClick = {this.fakeatm}>Choose this ATM (Simulation)</button>
                    <button onClick = {this.backfindatm}>Back</button>
                </div>
            )
        } 
        if (this.state.openatm){
            return(
                <div>
                    <ATM accounts= {this.state.accounts}
                            goback ={this.atmback}/>
                </div>
            ) 
        } 
        if (this.state.tobilling){
            console.log(this.state.tobilling)
            return(
                <div>
                    <Billing accounts= {this.state.accounts}
                            goback ={this.billback}/>
                </div>
            ) 
        } 
		if (this.state.loggedOut){
            return <Redirect to="/"/>
        } 
        if (this.state.totrans){
            return(
                <div>
                    <Transfer accounts= {this.state.accounts}
                            goback ={this.transback}/>
                </div>
            ) 
        } 
        if (this.state.tosum){     
            return(
                <div>
                    <AccSum accid = {this.state.chosenacc}
                            goback ={this.sumback}/>
                </div>
            ) 
        }
        if (this.state.check){     
            return(
                <div>
                    <Check accounts= {this.state.accounts}
                            goback ={this.checkback}/>
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
					<a> <button className={styles.button} onClick={this.FindATM}>Find ATM</button></a>
                </div>
            </div>
            )      
    }
}
export default UserPage