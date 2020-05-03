import React from 'react';
import axios from 'axios';
import styles from './../mystyle.module.css';



class AccSum extends React.Component {
    constructor() {
        super()
        this.state = {
            goBack: false,
            acc_type: '',
            balance: '',
            trans: [],
            bills: [],
            trans_view: true,
            bills_view: false
        }
        this.handleDelete = this.handleDelete.bind(this);

    }
    RetrieveInfo = () => {
        let userInfo = new FormData();
        userInfo.append('acc_id', this.props.accid)
        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/accountsummary.php',
            data: userInfo,
            config: { headers: { 'Content-Type': 'x-www-form-urlencoded; charset=UTF-8' } }
        }).then((response) => {
            let trans_array = response.data.slice(1)
            this.setState({
                acc_type: response.data[0].account_type,
                balance: response.data[0].balance,
                trans: trans_array.reverse()
            })
        }).catch(function (error) {
            // handle error
            console.log(error)
        });
    }
    RetrieveBilling = () => {
        let userInfo = new FormData();
        userInfo.append('id', this.props.accid)

        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/showbilling.php',
            data: userInfo,
            config: { headers: { 'Content-Type': 'x-www-form-urlencoded' } }
        }).then((response) => {
            // handle success
            this.setState({
                bills: response.data,
            })
        }).catch(function (error) {
            // handle error
            console.log(error)
        })
    }
    componentDidMount() {
        this.RetrieveInfo()
        this.RetrieveBilling()
    }
    handleCancel = () => {
        this.props.goback()
    }
    async handleDelete(event) {
        event.preventDefault();

        let userInfo = new FormData();
        userInfo.append('acc_id', this.props.accid)
        await axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/closebank.php',
            data: userInfo,
            config: { headers: { 'Content-Type': 'x-www-form-urlencoded' } }
        }).then((response) => {
            // handle success
            console.log(response.data)

        }).catch(function (error) {
            // handle error
            console.log(error)
        })
        this.props.goback()
    }
    ViewTransactions = () => {
        this.setState({
            trans_view: true,
            bills_view: false
        })
    }
    ViewBillings = () => {
        this.setState({
            bills_view: true,
            trans_view: false
        })
    }
    formatAmount(balance) {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return formatter.format(balance);
    }
    render() {
        return (
            <div className={styles.center}>
                <div className={styles.topnav}>
                    <a><button className={styles.buttontopnav} onClick={this.handleCancel}>Back</button></a>
                    <a><button className={styles.buttontopnav} onClick={this.handleDelete}>Delete This Account</button> </a>
                </div>
                <div className='acc_info'>
                    <h3 className='accsum'>SILICON {(this.state.acc_type).toUpperCase()}</h3>
                    <h3>Account number: {this.props.accid}</h3>
                    <h3>Available balance:  {this.formatAmount(this.state.balance)}</h3>
                </div>
                <button className='tab' onClick={this.ViewTransactions}>Transactions</button>
                <button className='tab' onClick={this.ViewBillings}>Billings</button>
                {this.state.trans.length === 0 && this.state.trans_view === true &&
                    <div>
                        <p className='table_name'>Transactions</p>
                        <p>No Transactions.</p>
                    </div>}
                {this.state.trans.length !== 0 && this.state.trans_view === true &&
                    <div>
                        <p className='table_name'>Transactions</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope='col'>Date</th>
                                    <th scope='col'>Recipient</th>
                                    <th scope='col'>Account</th>
                                    <th scope='col'>Type</th>
                                    <th scope='col'>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.trans.map(tran => (
                                    <tr key={tran.transaction_id}>
                                        <td>{tran.date}</td>
                                        <td>{tran.recipient}</td>
                                        <td>{tran.recipient_account_num}</td>
                                        <td>{tran.transaction_type}</td>
                                        {(tran.transaction_type === "Internal" ||
                                            tran.transaction_type === "External" ||
                                            tran.transaction_type === "Withdraw"||
                                            tran.transaction_type === "automated_billing_send"||
                                            tran.transaction_type === "automated_billing") &&
                                            <td>-{this.formatAmount(tran.amount)}</td>}
                                        {(tran.transaction_type === "Deposit" ||
                                            tran.transaction_type === "Received") &&
                                            <td>   +{this.formatAmount(tran.amount)}</td>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
                {this.state.bills.length === 0 && this.state.bills_view === true &&
                    <div>
                        <p className='table_name'>Current Billings</p>
                        <p>No Auto Billing.</p>
                    </div>}
                {this.state.bills.length !== 0 && this.state.bills_view === true &&
                    <div>
                        <p className='table_name'>Current Billings</p>
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
                                {this.state.bills.map(bill => (
                                    <tr>
                                        <td>{bill.destination}</td>
                                        <td>{this.formatAmount(bill.amount)}</td>
                                        <td>{bill.start_date}</td>
                                        <td>{bill.end_date}</td>
                                        <td>{bill.day}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
            </div>

        )

    }
}
export default AccSum
