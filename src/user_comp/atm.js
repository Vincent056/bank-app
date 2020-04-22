import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class ATM extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accounts: this.props.location.state.customer_accounts,
            accid: '',
            amount: 0.00,
            type: '',
            message: '',
            goback: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       

    }

    checkInput() {
        if (this.state.file.size < 0 ||
            this.state.amount) return "E"
    }
    handleCancel = () => {
        this.setState({
            goback: true
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.accid)
        console.log(this.state.amount)
        console.log(this.state.type)
        let userInfo = new FormData();
        userInfo.append('acc_id', this.state.accid)
        userInfo.append('amount', this.state.amount)
        userInfo.append('type', this.state.type)
        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/atmtransaction.php',
            data: userInfo,
            config: { headers: { 'Content-Type': 'x-www-form-urlencoded' } }
        }).then((response) => {
            // handle success
            console.log(response.data)
            this.setState({
                message: "Transaction Complete!",
            })
        }).catch(function (error) {
            // handle error
            console.log(error)
        })

    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        if (this.state.goback) {
            return <Redirect to='/usermain/' />
        }
        return (
            <div>
                <form>
                    <h1>ATM</h1>
                    <label>Choose An Account</label><br></br>
                    <select name='accid'
                        value={this.state.accid}
                        onChange={this.handleChange} >
                        {this.state.accounts.map(account => (
                            <option key={account.account_id}
                                value={account.account_id}>{account.account_id}
                                            - {account.account_type}: {account.balance} </option>
                        ))}
                    </select><br></br><br></br>
                    <select name='type'
                        value={this.state.type}
                        onChange={this.handleChange} >
                        <option value=''>Deposit/Withdraw</option>
                        <option value='deposit'>Deposit</option>
                        <option value='withdraw'>Withdraw</option>
                    </select><br></br>
                    <label>Amount</label><br></br>
                    <input type='number' step='0.01'
                        onChange={this.handleChange}
                        name='amount'
                        value={this.state.amount}></input>
                    <button onClick={this.handleSubmit}>Go</button>
                    <button onClick={this.handleCancel}>Back To Bank</button>
                </form>
                {this.state.message}
            </div>
        )
    }
}
export default ATM