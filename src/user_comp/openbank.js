import React from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import styles from './../mystyle.module.css';

//import Account from './account.js';
//import {myaccounts} from './usermain.js';


class OpenAcc extends React.Component{
    constructor(){
        super()
        this.state ={
            acctype: 'checking',
            goBack: false,
            message: "",
        }
    }
    
    handleSubmit= (event) => {
        event.preventDefault();

        let userInfo = new FormData();
        userInfo.append('id',this.props.cus_id)
        userInfo.append('acctype',this.state.acctype)
        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/openbank.php',
            //url: 'http://localhost/openbank.php',
            data: userInfo,
            config: {headers: {'Content-Type': 'x-www-form-urlencoded'}}
        }).then( (response) => {  
            // handle success
            console.log(response.data)
            this.setState({
                message: "Account created!"
            })
        }).catch(function(error) {
            // handle error
            console.log(error)
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
            <div className={styles.center}>
				<div className={styles.topnav}>
					<a><button className={styles.buttontopnav} onClick={this.handleCancel}>Back</button></a>
				</div>
            <form >
                <h1>Open New Account</h1>
                <select className={styles.selectbox} value ={this.state.acctype}
                        onChange={this.handleChange} >
                        <option value= "checking">Checking </option>
                        <option value= "saving">Saving </option>
                    </select><br/>
                <button className={styles.buttonsmall} onClick={this.handleSubmit}>Submit</button> 
            </form>
            <div>{this.state.message}</div>
            </div>
        )
    }
}
export default OpenAcc
