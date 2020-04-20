import React from 'react';
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
            day: '',
            end: '',
            billid:'',
            billing: [],
            message: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitAccount = this.submitAccount.bind(this);
        this.DeleteBill = this.DeleteBill.bind(this)
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
        console.log(this.state.chosenacc)
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
            showbill:false,
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
    AddBill = (event) =>{
        event.preventDefault();
        let userInfo = new FormData();
        userInfo.append('id',this.state.chosenacc)
        userInfo.append('reciver_acc',this.state.destination)
        userInfo.append('dayinmonth',this.state.day)
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
                addbill: false,
                destination: '',
                amount: '',
                day: '',
                end: ''
            })
        }).catch(function(error) {
            // handle error
            console.log(error)
        })
        this.showBilling()
    }

    DeleteBill =(event) =>{
        event.preventDefault()
        let userInfo = new FormData();
        userInfo.append('id',this.state.billid)

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
    }
    DeleteBilling = (id) =>{
        console.log(id)
        this.setState({
            billid:id,
        })
        
    }
    render(){
        
        return(
            <div>
            <form >
                <h1>Set Up Billing</h1>
                <label>Select the account</label><br></br>
                <select  name = 'chosenacc'
                        value = {this.state.chosenacc}
                        onChange={this.handleChange} >
                             {this.props.accounts.filter(account =>{
                                 if (account.account_type === "saving") return false
                                 return true
                             }).map(account => (
                           <option key = {account.account_id}
                                value= {account.account_id}>{account.account_id} 
                                        - {account.account_type} </option>
                ))}
                </select><br></br>
                <button onClick={this.submitAccount}>Submit</button>
                <button onClick={this.handleCancel}>Cancel</button><br></br>
                {this.state.showbill === true && this.state.billing.length !== 0 &&
                <div>
                    <button onClick = {this.addBilling}>Add Billing</button><br></br>
                    <h3>Billings</h3>
                    <table>
                        <thead>
                        <tr>
                        <th scope ='col'>Destination</th>
                            <th scope ='col'>Amount</th>
                            <th scope ='col'>Start Date</th>
                            <th scope ='col'>End Date</th>
                            <th scope ='col'>Day</th>
                            <th scope ='col'> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.billing.map((bill,index) => (
                                <tr key = {bill.auto_billing_id}>
                                    <td key ={index}>{bill.destination}</td>
                                    <td  key ={index}>{bill.amount}</td>
                                    <td  key ={index}>{bill.start_date}</td>
                                    <td  key ={index}>{bill.end_date}</td>
                                    <td  key ={index}>{bill.day}</td>
                                    <td key ={index}>
                                        <button onClick = {() => {this.DeleteBilling(bill.auto_billing_id)}}>
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
                        <button onClick = {this.addBilling}>Add Billing</button><br></br>
                        No billing.
                        </div>}
                    </form>
                    {this.state.addbill === true &&
                    <form>
                        <label>To Internal Account</label><br></br>
                        <input type ='text' 
                        onChange ={this.handleChange}
                        name = 'destination'
                        value = {this.state.destination}></input><br></br>

                        <label>Amount</label><br></br>
                        <input type ='text' 
                        onChange ={this.handleChange}
                        name = 'amount'
                        value = {this.state.amount}></input><br></br>

                        <label>Day</label><br></br>
                        <input type ='text'
                        title ='Enter a day from 1 to 28'
                        onChange ={this.handleChange}
                        name = 'day'
                        value = {this.state.day}></input><br></br>

                        <label>End Date (optional)</label><br></br>
                        <input type ='text' pattern ='YYYY-MM-DD'
                        placeholder = "YYYY-MM-DD"
                        onChange ={this.handleChange}
                        name = 'end'
                        value = {this.state.end}></input><br></br>

                        <button onClick={this.AddBill}>Submit</button>
                        <button onClick={this.CancelAdd}>Cancel</button><br></br>
                    </form>}
                    </div>
        )
    }
}

export default Billing
