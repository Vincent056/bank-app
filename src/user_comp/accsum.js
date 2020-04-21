import React from 'react';
import axios from 'axios';

//import Account from './account.js';
//import {myaccounts} from './usermain.js';


class AccSum extends React.Component{
    constructor(){
        super()
        this.state ={
            goBack: false,
            acc_type:'',
            balance:'',
            trans: [],
            bills:[],
            trans_view: true,
            bill_view : false
        }
        this.handleDelete = this.handleDelete.bind(this);
        
    }
    RetrieveInfo=() =>{
        let userInfo = new FormData();
        userInfo.append('acc_id',this.props.accid)
        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/accountsummary.php',
            data: userInfo,
            config: {headers: {'Content-Type': 'x-www-form-urlencoded; charset=UTF-8'}}
        }).then( (response) => {
            console.log(response.data)  
            let trans_array = response.data.slice(1)
            this.setState({
                acc_type: response.data[0].account_type,
                balance: response.data[0].balance,
                trans: trans_array
            }) 
        }).catch(function(error) {
            // handle error
            console.log(error)
        });
    }
    RetrieveBilling=()=>{
        let userInfo = new FormData();
        userInfo.append('id',this.props.accid)
    
        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/showbilling.php',
            data: userInfo,
            config: {headers: {'Content-Type': 'x-www-form-urlencoded'}}
        }).then( (response) => {  
            // handle success
            console.log(response.data)
            this.setState({
                bills: response.data,
            })
        }).catch(function(error) {
            // handle error
            console.log(error)
        })
    }
    componentDidMount(){
        this.RetrieveInfo()
        this.RetrieveBilling()
    }
    handleCancel =() =>{
        this.props.goback()
    }
    handleDelete =(event) =>{
        event.preventDefault();

        let userInfo = new FormData();
        userInfo.append('acc_id',this.props.accid)
        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/closebank.php',
            //url: 'http://localhost/openbank.php',
            data: userInfo,
            config: {headers: {'Content-Type': 'x-www-form-urlencoded'}}
        }).then( (response) => {  
            // handle success
            console.log(response.data)
            
        }).catch(function(error) {
            // handle error
            console.log(error)
        })
        this.props.goback()
    }
    ViewTransactions =() =>{
        this.setState({
            trans_view: true,
            bill_view: false
        })
    }
    ViewBillings =() =>{
        this.setState({
            bill_view: true,
            trans_view: false
        })
    }
    render(){
        return(
            <div className={styles.center}>
				<div className={styles.topnav}>
					<a><button className={styles.buttontopnav} onClick={this.handleCancel}>Back</button></a>
					<a><button className={styles.buttontopnav} onClick={this.handleDelete}>Delete This Account</button> </a> 
				</div>
                <h3>{(this.state.acc_type).toUpperCase()}</h3>
                <h4>Account: {this.props.accid}</h4>
                <p>Available balance:  {this.state.balance}</p><br></br>
                <button className={styles.buttonsmall} onClick ={this.ViewTransactions}>Transactions</button>
                <button className={styles.buttonsmall} onClick ={this.ViewBillings}>Billings</button>
                {this.state.trans_view === true && 
                <div>
                    {this.state.trans.length === 0 &&
                    <p>No Transactions.</p>}
                    {this.state.trans.length !== 0 &&
                <table>
                    <thead>
                        <tr>
                            <th scope ='col'>Date</th>
                            <th scope ='col'>Recipient</th>
                            <th scope ='col'>Account</th>
                            <th scope ='col'>Type</th>
                            <th scope ='col'>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.trans.map(tran => (
                            <tr key = {tran.transaction_id}>
                                <td>{tran.date}</td>
                                <td>{tran.recipient}</td>
                                <td>{tran.recipient_account_num}</td>
                                <td>{tran.transaction_type}</td>
                                {(tran.transaction_type === "Internal"||
                                  tran.transaction_type === "External"||
                                  tran.transaction_type === "Withdraw") &&
                                  <td>-{tran.amount}</td>}
                                {(tran.transaction_type === "Deposit"||
                                  tran.transaction_type === "Received") &&
                                  <td>   +{tran.amount}</td>}
                            </tr>
                            ))}
                        </tbody>
                    </table>}</div>}
                    {/*render billings table here*/}

            </div>
            
        )
    }
}
export default AccSum
