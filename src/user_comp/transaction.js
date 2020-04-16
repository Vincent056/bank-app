import React from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios';

class Transfer extends React.Component{
    constructor(){
        super()
        this.state ={
            acctotype: 'internal',
            accfrom: 'checking',
            rounting: '',
            acc_id: 0,
            recipient: '',
            amount: '',
            goBack: false,
            message: "",
        }
    }
    
    handleSubmit= (event) => {
        event.preventDefault();
        this.setState({
            goBack: true
        })
    }
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
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
            <div>
            <form >
                <h1>Transaction</h1>
                <label>Transfer To</label><br></br>
                <select value ={this.state.acctotype}
                        onChange={this.handleChange} >
                        <option value= "internal">Internal Account </option>
                        <option value= "external">External Account </option>
                    </select><br></br><br></br>
                <label>Transfer From</label><br></br>
                <select value ={this.state.accfrom}
                        onChange={this.handleChange} >
                        <option value= "checking">Checking </option>
                        <option value= "saving">Saving </option>
                    </select><br></br><br></br>
                <label>Routing Number</label><br></br>
                <input type ='text' name='routing' value = {this.state.routing}></input><br></br>
                <label>Account Number</label><br></br>
                <input type ='text' name='account'value = {this.state.acc_id}></input><br></br>
                <label>Recipient</label><br></br>
                <input type ='text' name='recipient' value = {this.state.recipient}></input><br></br>
                <label>Amount</label><br></br>
                <input type ='text' name='amount' value = {this.state.routing}></input><br></br>
                <button onClick={this.handleSubmit}>Submit</button>
                <button onClick={this.handleCancel}>Back</button>
            </form>
            <div>{this.state.message}</div>
            </div>
        )
    }
}
export default Transfer