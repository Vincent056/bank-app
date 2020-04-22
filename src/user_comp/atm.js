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

    checkInput() {
        if (this.state.accid === '' || this.state.type == ''
            || this.state.amount === 0.00) return "E"
        else if (this.state.amount < 0) return "A"
        else return "OK"
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let check = this.checkInput()
        if (check === 'OK') {
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
                if (response.data === "SHORT") {
                    this.setState({
                        message: "Not enough fund to withdraw!",
                    })
                }
                else {
                    this.setState({
                        message: "Transaction Complete!",
                    })
                }
            }).catch(function (error) {
                // handle error
                console.log(error)
            })
        }
        else if (check === "E") {
            this.setState({
                message: "One of the fields is empty!"
            })
        }
        else if (check === "A") {
            this.setState({
                message: "Invalid amount!"
            })
        }
    }
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
            message: ''
        })
    }

    render() {
        if (this.state.goback) {
            return <Redirect to='/usermain/' />
        }
        return (
            <div>
                <form className = 'atm_con'>
                    <h1 className='atm'>Welcome to ATM Simulation</h1>
                    <label>Choose An Account</label><br></br>
                    <select name='accid'
                        value={this.state.accid}
                        onChange={this.handleChange} >
                        <option value=''> </option>
                        {this.state.accounts.map(account => (
                            <option key={account.account_id}
                                value={account.account_id}>{account.account_id}
                                            - {account.account_type}: {account.balance} </option>
                        ))}
                    </select><br></br><br></br>
                    <label>Choose Action</label><br></br>
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
                        value={this.state.amount}></input><br></br><br></br>
                    <button className ='atm_butt'onClick={this.handleSubmit}>Go</button>
                    <button className ='atm_butt'onClick={this.handleCancel}>Back To Bank</button>
                    {this.state.message}<br></br><br></br>
                </form>
                
            </div>
        )
    }
}
export default ATM