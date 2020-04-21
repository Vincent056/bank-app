import React from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import styles from './../mystyle.module.css';

class Check extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            accid: this.props.accounts[0].account_id,
            amount: 0,
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit= (event) => {
        event.preventDefault();
       
        let userInfo = new FormData();
        userInfo.append('acc_id',this.state.accid)
        userInfo.append('amount',this.state.amount)
        userInfo.append('type','deposit')
        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/atmtransaction.php',
            data: userInfo,
            config: {headers: {'Content-Type': 'x-www-form-urlencoded'}}
        }).then( (response) => {  
            // handle success
            console.log(response.data)
            this.setState({
                message: "Deposit Complete!"
            })
        }).catch(function(error) {
            // handle error
            console.log(error)
        })
        
    }
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    handleCancel =() =>{
        this.props.goback()
    }
    render(){
        
        return(
            <div className={styles.center}>
			<div className={styles.topnav}>
				<a><button className={styles.buttontopnav} onClick={this.handleCancel}>Back</button></a>
			</div>
            <form className={styles.billing}>
                <h1>Deposit Check</h1>
                <label>Choose An Account</label><br></br>
                <select  name = 'accid'
                        value = {this.state.accfrom}
                        onChange={this.handleChange} >
                             {this.props.accounts.map(account => (
                           <option key = {account.account_id}
                                value= {account.account_id}>{account.account_id} 
                                        - {account.account_type}: {account.balance} </option>
                            ))}    
                    </select><br></br><br></br>
                    
                <label>Amount</label><br></br>
                <input type ='text' 
                        onChange ={this.handleChange}
                        name = 'amount'
                        value = {this.state.amount}></input> <br/>
                <button onClick ={this.handleSubmit}>Deposit</button>
            </form>
            {this.state.message}
            </div>
        )
    }
}
export default Check