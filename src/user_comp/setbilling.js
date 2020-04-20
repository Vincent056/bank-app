import React from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios';


class Billing extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            chosenacc: this.props.accounts[0].account_id,
            showbill: false,
            addbill: false,
            destination: '',
            amount: '',
            start: '',
            end: '',
            billing: [],
            message: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitAccount = this.submitAccount.bind(this);
    }
    //go back to usermain
    handleCancel =() =>{
        this.props.goback()
    }

    //Store input to value of state
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    //api call to show all the billing of chosen account
    showBilling(){
        let userInfo = new FormData();
        userInfo.append('id',this.state.chosenacc)
    
        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/showbilling.php',
            data: userInfo,
            config: {headers: {'Content-Type': 'x-www-form-urlencoded'}}
        }).then( (response) => {  
            // handle success
            console.log(response.data)
            this.setState({
                billing: response.data,
                showbill: true
            })
        }).catch(function(error) {
            // handle error
            console.log(error)
        })
    }
    
    //handle submit button after chosing an account
    submitAccount=(event)=>{
       event.preventDefault();
       this.showBilling()
    }
    
    //handle button when user click add bill, a form shows up
    addBilling =() => {
        this.setState({
            addbill: true
        })
    }

    //handle cancel button when user click cancel add bill
    CancelAdd =() =>{
        this.setState({
            addbill: false
        })
    }

    //api call to add the given info of new billing to database
    AddBill = () =>{
        let userInfo = new FormData();
        userInfo.append('id',this.state.chosenacc)
        userInfo.append('reciver_acc',this.state.destination)
        userInfo.append('start',this.state.start)
        userInfo.append('end',this.state.end)
        userInfo.append('amount',this.state.amount)
       
        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/autobilling.php',
            data: userInfo,
            config: {headers: {'Content-Type': 'x-www-form-urlencoded'}}
        }).then( (response) => {  
            // handle success
            console.log(response.data)
            this.setState({
                addbill: false
            })
        }).catch(function(error) {
            // handle error
            console.log(error)
        })
        this.showBilling()
    }

    DeleteBill =(id) =>{
        let userInfo = new FormData();
        userInfo.append('id',id)

        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/cancelbilling.php',
            data: userInfo,
            config: {headers: {'Content-Type': 'x-www-form-urlencoded'}}
        }).then( (response) => {  
            // handle success
            console.log(response.data)
        }).catch(function(error) {
            // handle error
            console.log(error)
        })
        this.showBilling()
    }
    render(){
        
        return(
            <form >
                <h1>Set Up Billing</h1>
                <label>Select the account</label><br></br>
                <select  name = 'chosenacc'
                        value = {this.state.chosenacc}
                        onChange={this.handleChange} >
                             {this.props.accounts.map(account => (
                           <option key = {account.account_id}
                                value= {account.account_id}>{account.account_id} 
                                        - {account.account_type} </option>
                ))}
                </select><br></br>
                <button onClick={this.submitAccount}>Submit</button>
                <button onClick={this.handleCancel}>Cancel</button><br></br>
                {this.state.showbill === true && this.state.billing.length !== 0 &&
                <div>
                    <button onClick = {this.addBilling}>Add Billing</button>
                    <h3>Billings</h3>
                    <table>
                        <thead>
                        <th scope ='col'>Destination</th>
                            <th scope ='col'>Amount</th>
                            <th scope ='col'>Start Date</th>
                            <th scope ='col'>End Date</th>
                            <th scope ='col'>Last Date</th>
                            <th scope ='col'> </th>
                        </thead>
                        <tbody>
                            {this.state.billing.map(bill => (
                                <tr key = {bill.auto_billing_id}>
                                    <td>{bill.destination}</td>
                                    <td>{bill.amount}</td>
                                    <td>{bill.start_date}</td>
                                    <td>{bill.end_date}</td>
                                    <td>{bill.last_date}</td>
                                    <td>
                                        <button onClick = {() => this.DeleteBill(bill.auto_billing_id)}>
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>}
                    {this.state.billing.length === 0 && this.state.showbill === true &&
                    <div>
                        <button onClick = {this.addBilling}>Add Billing</button>
                        No billing.
                        </div>}
                    {this.state.addbill === true &&
                    <form>
                        <input type ='text' 
                        onChange ={this.handleChange}
                        name = 'destination'
                        value = {this.state.destination}></input>

                        <input type ='text' 
                        onChange ={this.handleChange}
                        name = 'destination'
                        value = {this.state.destination}></input>

                        <input type ='date' pattern ="YYYY-MM-DD"
                        placeholder = "YYYY-MM-DD"
                        onChange ={this.handleChange}
                        name = 'start'
                        value = {this.state.start}></input>

                        <input type ='date' pattern ="YYYY-MM-DD"
                        placeholder = "YYYY-MM-DD"
                        onChange ={this.handleChange}
                        name = 'end'
                        value = {this.state.end}></input>

                        <button onClick={this.AddBill}>Submit</button>
                        <button onClick={this.CancelAdd}>Cancel</button><br></br>
                    </form>}
            </form>
        )
    }
}

export default Billing
