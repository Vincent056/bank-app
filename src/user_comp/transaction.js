import React from 'react';
import axios from 'axios';

class Transfer extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            accto: this.props.accounts[0].account_id,
            accfrom: this.props.accounts[0].account_id,
            external: false,
            externalacc: '',
            routing: '',
            recipient: '',
            amount: '',
            
            message: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit= (event) => {
        event.preventDefault();
       
        let userInfo = new FormData();
        userInfo.append('id',this.state.accfrom)
        if (this.state.externalacc === ''){
            userInfo.append('acct_num',this.state.accto)
        } 
        else {
            userInfo.append('acct_num',this.state.externalacc)
            userInfo.append('routing',this.state.routing)
        }
        userInfo.append('receiver',this.state.recipient)
        userInfo.append('amount',this.state.amount)
        
        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/trasnferfund.php',
            data: userInfo,
            config: {headers: {'Content-Type': 'x-www-form-urlencoded'}}
        }).then( (response) => {  
            // handle success
            console.log(response.data)
            this.setState({
                message: "Sent!"
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
            <div>
            <form >
                <h1>Transfer Money</h1>
                <label>Transfer From</label><br></br>
                <select  name = 'accfrom'
                        value = {this.state.accfrom}
                        onChange={this.handleChange} >
                             {this.props.accounts.map(account => (
                           <option key = {account.account_id}
                                value= {account.account_id}>{account.account_id} 
                                        - {account.account_type}: {account.balance} </option>
                ))}
                        
                    </select><br></br><br></br>
                <label>Transfer To</label><br></br>
                <select 
                        name = 'accto'
                        value = {this.state.accto}
                        onChange={this.handleChange} >
                             {this.props.accounts.map(account => (
                           <option key = {account.account_id}
                                value= {account.account_id}>{account.account_id} 
                                        - {account.account_type}: {account.balance} </option>
                ))}
                            <option 
                                value = {0} >External Account</option>
                    </select><br></br><br></br>
                    
                {this.state.accto === 0 &&
                    <div>
                        <label>Routing Number</label><br></br>
                        <input type ='text'
                        name = 'routing'
                        onChange={this.handleChange}
                        value = {this.state.routing}></input><br></br>

                        <label>External Account Number</label><br></br>
                        <input type ='text'
                        name = 'externalacc'
                        onChange={this.handleChange}
                        value = {this.state.externalacc}></input><br></br>
                        <br></br>
                    </div>}<br></br>           
              
                    <label>Recipient Name</label><br></br>
                        <input type ='text' 
                        name='recipient'
                        onChange={this.handleChange}
                        value = {this.state.recipient} ></input><br></br>
                <label>Amount</label><br></br>
                <input type ='text' name='amount'
                        onChange={this.handleChange}
                        value ={this.state.amount} ></input><br></br>
                <button onClick={this.handleSubmit}>Submit</button>
                <button onClick={this.handleCancel}>Back</button>
            </form>
            <div>{this.state.message}</div>
            </div>
        )
    }
}
export default Transfer