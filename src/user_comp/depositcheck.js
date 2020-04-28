import React from 'react';
import axios from 'axios';
import styles from './../mystyle.module.css';

class Check extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accid: '',
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
        if (this.state.file === null || this.state.accid === ''
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
            userInfo.append('check', this.state.file)
            axios({
                method: 'post',
                url: 'https://bank.cvs3.com/bank-app/api/checkdeposit.php',
                data: userInfo,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            }).then((response) => {
                console.log(response.data)
                if (response.data === 'OK')
                this.setState({
                    message: "Deposit Complete!"
                })
                else{
                    this.setState({
                        message: "Oops! Something went wrong! Please try again!"
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
        else if (check === "I") {
            this.setState({
                message: 'Invalid file type! The allowed file types are .jpg, .jpeg, and .png'
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
    handleCancel = () => {
        this.props.goback()
    }

    formatAmount(balance) {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        if (formatter.format(balance).length > 16){
            let format = formatter.format(balance).substring(0,16)
            format = format.concat('...')
            return format
        }
        return formatter.format(balance);
    }
    render() {

        return (
            <div className={styles.center}>
                <div className={styles.topnav}>
                    <a><button className={styles.buttontopnav} onClick={this.handleCancel}>Back</button></a>
                </div>
                <form className={styles.billing}>
                    <h1 className='deposit'>Deposit Check</h1>
                    <input type='file'
                        onChange={this.previewImage}
                        name='file'></input><br></br>
                    <img src={this.state.preview_file} width='400' height='200' /><br></br>
                    <label>Choose An Account</label><br></br>
                    <select name='accid'
                        value={this.state.accid}
                        onChange={this.handleChange} >
                        <option value=''> </option>
                        {this.props.accounts.map(account => (
                            <option key={account.account_id}
                                value={account.account_id}>
                                {account.account_id} - {account.account_type.toUpperCase()}: {this.formatAmount(account.balance)}
                            </option>
                        ))}
                    </select><br></br><br></br>
                    <label>Amount</label><br></br>
                    <input type='number' step='0.01'
                        onChange={this.handleChange}
                        name='amount'
                        value={this.state.amount}></input>
                    <button className='submit_butt' onClick={this.handleSubmit}>Deposit</button>
                    <p className='error'>{this.state.message}</p>
                </form>

            </div>
        )
    }
}
export default Check