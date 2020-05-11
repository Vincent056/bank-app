import React from 'react';
import axios from 'axios';
import Bill from './bill.js'
import styles from './../mystyle.module.css';

class Billing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chosenacc: '',
            accto: '',
            otheracc: '',
            showbill: false,
            addbill: false,
            amount: '',
            day: '',
            end: '',
            billing: [],
            message1: "",
            message2: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitAccount = this.submitAccount.bind(this);

    }
    //go back to usermain
    handleCancel = () => {
        this.props.goback()
    }

    //Store input to value of state
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    //api call to show all the billing of chosen account
    showBilling = () => {
        if (this.state.chosenacc === '') {
            this.setState({
                message1: "Please choose an account!",
                addbill: false,
                showbill: false,
            })
        }
        else {
            let userInfo = new FormData();
            userInfo.append('id', this.state.chosenacc)

            axios({
                method: 'post',
                url: 'https://bank.cvs3.com/bank-app/api/showbilling.php',
                data: userInfo,
                config: { headers: { 'Content-Type': 'x-www-form-urlencoded' } }
            }).then((response) => {
                // handle success

                this.setState({
                    billing: response.data,
                    showbill: true,
                    addbill: false,
                    message1: ''
                })
            }).catch(function (error) {
                // handle error
                console.log(error)
            })
        }
    }

    //handle submit button after chosing an account
    submitAccount = (event) => {
        event.preventDefault();
        this.showBilling()
    }

    //handle button when user click add bill, a form shows up
    addBilling = () => {
        this.setState({
            showbill: false,
            addbill: true
        })
    }

    //handle cancel button when user click cancel add bill
    CancelAdd = () => {
        this.setState({
            addbill: false,
            showbill: true,
            addbill: false,
            destination: '',
            amount: 0,
            day: 0,
            end: '',
            message2: ''
        })
    }

    //check user input
    checkInput() {

        const date = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/
        let today = new Date()
        let enddate = new Date(Number(this.state.end.substring(0, 4)), Number(this.state.end.substring(5, 7)) - 1, Number(this.state.end.substring(8)))

        let toacc = this.props.accounts.find((element) =>{
            if (this.state.chosenacc === element.account_id) return true
        })
        if (Number(toacc.balance) <0) return 'NO'
        else if (this.state.chosenacc === ''
            || this.state.day === ''
            || this.state.end === ''
            || this.accto === ''
            || this.state.amount === '') return 'E'
        else if (this.state.accto === '-1' && this.state.otheracc === '') return 'O'
        else if (this.state.accto === '-1' && !(/^[0-9]+$/.test(this.state.otheracc)))
            return 'O'
        else if (this.state.accto === '-1' && (/0+/.test(this.state.otheracc)))
            return 'O'
        else if (!(/^([1-9]{1}|1[0-9]{1}|2[0-8]{1})$/.test(this.state.day))) return 'BILL'
        else if (!(date.test(this.state.end))
            || today.getTime() >= enddate.getTime()) return "DATE"
        else if (!(/^([0-9]+|([0-9]+).([0-9]{1})|([0-9]+).([0-9]{2}))$/.test(this.state.amount))
                ||(/^(0+|(0+).(0+))$/.test(this.state.amount))) return "A"
        else if (Number(this.state.amount) >1000) return "LIMIT"
        else return "OK" 
    }
    //api call to add the given info of new billing to database
    AddBill = (event) => {
        event.preventDefault();
        let check = this.checkInput()
        if (check === 'OK') {
            let userInfo = new FormData();
            userInfo.append('id', this.state.chosenacc)
        if (this.state.accto === '-1'){
            userInfo.append('reciver_acc', this.state.otheracc)
        }
        else{
            userInfo.append('reciver_acc', this.state.accto)
        }
            userInfo.append('dayinmonth', this.state.day)
            userInfo.append('end', this.state.end)
            userInfo.append('amount', this.state.amount)

            axios({
                method: 'post',
                url: 'https://bank.cvs3.com/bank-app/api/autobilling.php',
                data: userInfo,
                config: { headers: { 'Content-Type': 'x-www-form-urlencoded' } }
            }).then((response) => {
                // handle success
                
                if (response.data === 'OK') {
                    //reset the adding form
                    this.setState({
                        addbill: false,
                        destination: '',
                        amount: 0,
                        day: 0,
                        end: '',
                        message2: ''
                    })
                    this.showBilling()
                }
                else if(response.data ==='NE'){
                    this.setState({
                        message2: "The destination account does not exist."
                    })
                }
                else {
                    this.setState({
                        message2: "Oops! Something went wrong! Please try again!"
                    })
                }
            }).catch(function (error) {
                // handle error
                console.log(error)
            })
        }
        else if (check === 'E') {
            this.setState({
                message2: 'Please fill out all fields!',
            })
        }
        else if (check === 'NO') {
            this.setState({
                message2: 'Cannot set sp new Billing with negative balance!',
            })
        }
        else if (check === 'O') {
            this.setState({
                message2: 'Invalid To Account field!',
            })
        }
        else if (check === 'BILL') {
            this.setState({
                message2: 'Invalid bill day!',
            })
        }
        else if (check === 'DATE') {
            this.setState({
                message2: 'Invalid end date!',
            })
        }
        else if (check === 'A') {
            this.setState({
                message2: 'Invalid amount!',
            })
        }
        else if (check === 'LIMIT') {
            this.setState({
                message2: 'Limit for the amount is $1000!',
            })
        }
    }

    DeleteBilling = (id) => {
        let userInfo = new FormData();
        userInfo.append('id', id)
        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/cancelbilling.php',
            data: userInfo,
            config: { headers: { 'Content-Type': 'x-www-form-urlencoded' } }
        }).then((response) => {
            this.setState({
                showbill: false
            })
        }).catch(function (error) {
            // handle error
            console.log(error)
        })
        this.showBilling()

    }
    render() {

        return (
            <div className={styles.center}>
                <div className={styles.topnav}>
                    <a><button className={styles.buttontopnav} onClick={this.handleCancel}>Back</button></a>
                </div>
                <form className={styles.billing}>
                    <h1 className='bill'>Set Up Billing</h1>
                    <p>Only checking accounts are allowed for set up billing.</p>
                    <label>Please select the account: </label><br></br>
                    <select name='chosenacc'
                        value={this.state.chosenacc}
                        onChange={this.handleChange} >
                        <option value=''> </option>
                        {this.props.accounts.filter(account => {
                            if (account.account_type === "saving") return false
                            return true
                        }).map(account => (
                            <option key={account.account_id}
                                value={account.account_id}>SILICON {account.account_type.toUpperCase()} - {account.account_id} </option>
                        ))}
                    </select><br></br>
                    <button className='submit_butt' onClick={this.submitAccount}>Submit</button>
                    {this.state.message1}
                    </form>
                    {/*show all billings*/}
                    {this.state.showbill === true && this.state.billing.length !== 0 &&
                        <div>
                            <p className='table_name'>Current Billings</p>
                            <button className='button' onClick={this.addBilling}>Add Bill</button>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope='col'>To Account</th>
                                        <th scope='col'>Amount</th>
                                        <th scope='col'>Start Date</th>
                                        <th scope='col'>End Date</th>
                                        <th scope='col'>Bill Day</th>
                                        <th scope='col'> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.billing.map(bil => (
                                        <Bill bill={bil}
                                            key={bil.auto_billing_id}
                                            delete={() => this.DeleteBilling(bil.auto_billing_id)} />
                                    ))}
                                </tbody>
                            </table>
                        </div>}

                    {/*If no billings then return message*/}
                    {this.state.billing.length === 0 && this.state.showbill === true &&
                        <div>
                            <h3 className='table_name'>Current Billings</h3>
                            <button className='button' onClick={this.addBilling}>Add Billing</button><br></br>
                        You have no auto bill.
                        </div>}
                

                {/*If choose to add more billings then
                    show the adding form*/}
                {this.state.addbill === true &&
                    <form className>
                        <label>To Account (SILICON bank account only):</label><br></br>
                        <select
                        name='accto'
                        value={this.state.accto}
                        onChange={this.handleChange} >
                        <option value=''> </option>
                        {this.props.accounts.filter(account => {
                            if (account.account_id === this.state.chosenacc) return false
                            return true
                        }).map(account => (
                            <option key={account.account_id}
                                value={account.account_id}>SILICON {account.account_type.toUpperCase()} - {account.account_id}
                            </option>
                        ))}
                        <option
                            value={-1} >OTHER SILICON ACCOUNT</option>
                    </select><br></br>
                    {Number(this.state.accto) === -1 &&
                        <div>
                            <label>Account Number</label><br></br>
                            <input type='text'
                                name='otheracc'
                                onChange={this.handleChange}
                                value={this.state.otheracc}></input></div>}<br></br>
                        <label>Amount:</label><br></br>
                        $ <input type='text'
                            onChange={this.handleChange}
                            name='amount'
                            value={this.state.amount}></input><br></br>

                        <label>Bill Day:</label><br></br>
                        <input type='text'
                            title='Enter a day from 1 to 28'
                            onChange={this.handleChange}
                            name='day'
                            value={this.state.day}></input><br></br>

                        <label>End Date:</label><br></br>
                        <input type='text' pattern='YYYY-MM-DD'
                            placeholder="YYYY-MM-DD"
                            onChange={this.handleChange}
                            name='end'
                            value={this.state.end}></input><br></br>

                        <button onClick={this.AddBill}>Submit</button>
                        <button onClick={this.CancelAdd}>Cancel</button><br></br>
                        {this.state.message2}
                    </form>}
            </div>
        )
    }
}

export default Billing
