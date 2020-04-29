import React from 'react';
import axios from 'axios';
import styles from './../mystyle.module.css';

class Transfer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            accto: '',
            accfrom: '',
            externalacc: '',
            routing: '',
            recipient: '',
            amount: 0.00,
            message: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    checkInput(){
        if (this.state.accfrom === ''
            ||this.state.accto ===''
            ||this.state.amount === 0.00) return 'E'
        else if(this.state.accto === '-1'&& this.state.externalacc < 1)
            return 'X'
        else if(this.state.accto === '-1'&& !(/\d{9}/.test(this.state.routing)))
            return 'R'
        else if (this.state.amount < 0) return 'A'
        else return 'OK'
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let check = this.checkInput()
        if (check === 'OK'){
        let userInfo = new FormData();
        userInfo.append('id', this.state.accfrom)
        if (this.state.externalacc === '') {
            userInfo.append('acct_num', this.state.accto)
        }
        else {
            userInfo.append('acct_num', this.state.externalacc)
            userInfo.append('routing', this.state.routing)
        }
        userInfo.append('receiver', this.state.recipient)
        userInfo.append('amount', this.state.amount)

        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/trasnferfund.php',
            data: userInfo,
            config: { headers: { 'Content-Type': 'x-www-form-urlencoded' } }
        }).then((response) => {
            // handle success
            if (response.data === 'OK'){
            this.setState({
                message: "Transaction Complete!"
            })}
            else if(response.data === 'SHORT'){
                this.setState({
                    message: 'The transfer amount excceds available balance, Please transfer a smaller amount!'
                })}
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
    else if (check === 'E'){
        this.setState({
            message: 'Please fill out all required fields!',
        })
    }
    else if (check === 'X'){
        this.setState({
            message: 'Invalid external account number!',
        })
    }
    else if (check === 'R'){
        this.setState({
            message: 'Invalid routing number',
        })
    }
    else if (check === 'A'){
        this.setState({
            message: 'Invalid amount!',
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
    render() {

        return (
            //render the options
            <div className={styles.center}>
                <div className={styles.topnav}>
                    <a><button className={styles.buttontopnav} onClick={this.handleCancel}>Back</button></a>
                </div>
                <form className={styles.billing}>
                    <h1 className='transfer'>Transfer Money</h1>
                    <label>Transfer From</label><br></br>
                    <select name='accfrom'
                        value={this.state.accfrom}
                        onChange={this.handleChange} >
                        <option value=''> </option>
                        {this.props.accounts.map(account => (
                            <option key={account.account_id}
                                value={account.account_id}>
                                    {account.account_id} - {account.account_type.toUpperCase()}: {this.formatAmount(account.balance)}</option>
                        ))}

                    </select><br></br><br></br>
                    <label>Transfer To</label><br></br>
                    <select
                        name='accto'
                        value={this.state.accto}
                        onChange={this.handleChange} >
                        <option value=''> </option>
                        {this.props.accounts.filter(account => {
                            if (account.account_id === this.state.accfrom) return false
                            return true
                        }).map(account => (
                            <option key={account.account_id}
                                value={account.account_id}>{account.account_id} - {account.account_type.toUpperCase()}:
                               {this.formatAmount(account.balance)} </option>
                        ))}
                        {/*If transfer to external account then set accto = 0*/}
                        <option
                            value={-1} >External Account</option>
                    </select><br></br><br></br>

                    {/*If external account is chosen then show input for routing 
                    and account id*/}
                    {Number(this.state.accto) === -1 &&
                        <div>
                            <label>Routing Number</label><br></br>
                            <input type='text'
                                name='routing'
                                placeholder = '9 digits numbers'
                                title = 'Please enter 9 digit numbers of the bank routing'
                                onChange={this.handleChange}
                                value={this.state.routing}></input><br></br>

                            <label>External Account Number</label><br></br>
                            <input type='number'
                                name='externalacc'
                                title = 'Enter the account number'
                                onChange={this.handleChange}
                                value={this.state.externalacc}></input><br></br>
                            <br></br>
                        </div>}<br></br>

                    <label>Recipient Name (Optional)</label><br></br>
                    <input type='text'
                        name='recipient'
                        onChange={this.handleChange}
                        value={this.state.recipient} ></input><br></br>

                    <label>Amount</label><br></br>
                    $ <input type='number' step = '0.01' name='amount'
                        onChange={this.handleChange}
                        value={this.state.amount} ></input><br></br>
                    <button className='submit_butt' onClick={this.handleSubmit}>Submit</button>
                    {this.state.message}
                </form>
                
            </div>
        )
    }
}
export default Transfer