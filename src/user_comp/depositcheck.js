import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import styles from './../mystyle.module.css';

class Check extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accid: this.props.accounts[0].account_id,
            amount: 0.00,
            preview_file: null,
            file: null,
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.previewImage = this.previewImage.bind(this);
    }
    checkInput() {
        if (this.state.file === null
            || this.state.amount === 0.00) return "E"
        else if (this.state.file.type !== "image/jpeg"
            && this.state.file.type !== "image/png"
            && this.state.file.type !== "image/jpg") return "I"
        else if (this.state.amount < 0) return "A"
        else return "OK"
    }
    previewImage = (event) => {
        this.setState({
            preview_file: URL.createObjectURL(event.target.files[0]),
            file: event.target.files[0]
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let check = this.checkInput();
        if (check === "OK") {
            let userInfo = new FormData();
            userInfo.append('acc_id', this.state.accid)
            userInfo.append('amount', this.state.amount)
            userInfo.append('type', 'deposit')
            axios({
                method: 'post',
                url: 'https://bank.cvs3.com/bank-app/api/atmtransaction.php',
                data: userInfo,
                config: { headers: { 'Content-Type': 'x-www-form-urlencoded' } }
            }).then((response) => {
                // handle success
                console.log(response.data)
                this.setState({
                    message: "Deposit Complete!"
                })
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
        else if (check === "I") {
            this.setState({
                message: "Invalid file type!"
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
            [name]: value
        })
    }
    handleCancel = () => {
        this.props.goback()
    }
    render() {

        return (
            <div className={styles.center}>
                <div className={styles.topnav}>
                    <a><button className={styles.buttontopnav} onClick={this.handleCancel}>Back</button></a>
                </div>
                <form className={styles.billing}>
                    <h1>Deposit Check</h1>
                    <input type='file'
                        onChange={this.previewImage}
                        name='file'></input><br></br>
                    <img src={this.state.preview_file} width='400' height='200' /><br></br>
                    <label>Choose An Account</label><br></br>
                    <select name='accid'
                        value={this.state.accfrom}
                        onChange={this.handleChange} >
                        {this.props.accounts.map(account => (
                            <option key={account.account_id}
                                value={account.account_id}>{account.account_id}
                                        - {account.account_type}: {account.balance} </option>
                        ))}
                    </select><br></br><br></br>
                    <label>Amount</label><br></br>
                    <input type='number' step='0.01'
                        onChange={this.handleChange}
                        name='amount'
                        value={this.state.amount}></input>
                    <button onClick={this.handleSubmit}>Deposit</button>
                    <p className = 'error'>{this.state.message}</p>
                </form>
                
            </div>
        )
    }
}
export default Check