import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import styles from './../mystyle.module.css';
import Account from './account.js';
import AccSum from './accsum.js'
import Transfer from './transaction.js'
import Billing from './setbilling.js'
import ATM from './atm.js'
import Check from './depositcheck.js'

class UserPage extends React.Component {
    constructor(props) {
        super(props)
        this.accounts = []
        this.state = {
            firstname: '',
            lastname: '',
            accounts: [],
            toupdate: false,
            tobilling: false,
            toopen: false,
            loggedOut: false,
            totrans: false,
            tosum: false,
            toatm: false,
            openatm: false,
            check: false,
            deposit: "Check",
            chosenacc: 0,
            message: "",
        }
    }

    /**
     * Call API to retrieve information when the page is loaded
     */
    componentDidMount() {
        this.apicall()
    }

    /**
     * API call function, send customer input to API file and 
     * retrieve bank account information
     */
    apicall = () => {
        let userInfo = new FormData();
        userInfo.append('id', this.props.cus_id)
        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/usermain.php',
            data: userInfo,
            config: { headers: { 'Content-Type': 'x-www-form-urlencoded; charset=UTF-8' } }
        }).then((response) => {
            let acc_array = response.data.slice(1)
            acc_array = acc_array.filter(account => {
                if (account.status === "close") return false
                return true
            })
                this.setState({
                    accounts: acc_array,
                    firstname: response.data[0].first_name,
                    lastname: response.data[0].last_name,
                    message: "",
                })
            if (this.state.accounts.length === 0) {
                this.setState({
                    message: "   No Account.",
                })
            }
        
        }).catch(function (error) {
            // handle error
            console.log(error)
        });
    }

    //set state to set up billing
    setBilling = () => {
        this.setState({
            tobilling: true
        })
    }

    //set state to open new account
    openAcc = () => {
        this.setState({
            toopen: true
        })
    }

    //set state to update customer information
    updateInfo = () => {
        this.setState({
            toupdate: true
        })
    }

    //set state to find atm
    FindATM = () => {
        this.setState({
            toatm: true
        })
    }

    //set state to account summary with given account id
    accsum = (id) => {
        this.setState({
            chosenacc: id,
            tosum: true
        })
    }

    //set state to transfer money
    maketrans = () => {
        this.setState({
            totrans: true
        })
    }

    //set state to deposit check
    depositcheck = () => {
        this.setState({
            check: true
        })
    }

    //set state to log out
    logout = () => {
        this.setState({
            loggedOut: true
        })
    }

    //set state to go back from summary to usermain
    sumback = () => {
        this.setState({
            tosum: false
        })
        this.apicall()
    }

    //set state to go back from transfer money to usermain
    transback = () => {
        this.setState({
            totrans: false
        })
        this.apicall()

        //set state to go back from set up billing to usermain
    }
    billback = () => {
        this.setState({
            tobilling: false
        })
        this.apicall()
    }

      //set state to go from find atm to atm simulation (maybe remove later)
    fakeatm = () => {
        this.setState({
            openatm: true,
            toatm: false
        })
    }

    //set state to go back from atm simulation to find atm
    atmback = () => {
        this.setState({
            openatm: false
        })
        this.apicall()
    }

    //set state to go back from find atm to usermain
    backfindatm = () => {
        this.setState({
            toatm: false
        })
    }

    //set state to go back from deposit check to usermain
    checkback = () => {
        this.setState({
            check: false
        })
        this.apicall()
    }

    //render the page
    render() {
        //go to update customer information
        if (this.state.toupdate) {
            return <Redirect to="/update/" />
        }
        //go to open new account
        if (this.state.toopen) {
            return <Redirect to="/openacc/" />
        }
        //go to find atm
        if (this.state.toatm) {
            // return (
            //     <div>
            //         <p>Mapping class or something goes here. Each Atm location found
            //         will have this button (just an ATM simulation)</p>
            //         <button onClick={this.fakeatm}>Choose this ATM (Simulation)</button>
            //         <button onClick={this.backfindatm}>Back</button>
            //     </div>
            // )
            return <Redirect to={{
                pathname: '/map/',
                state: {customer_accounts: this.state.accounts} }}
            />
        }
        //go to atm simulation
        if (this.state.openatm) {
            return (
                <div>
                    <ATM accounts={this.state.accounts}
                        goback={this.atmback} />
                </div>
            )
        }
        //go to set up billing
        if (this.state.tobilling) {
            return (
                <div>
                    <Billing accounts={this.state.accounts}
                        goback={this.billback} />
                </div>
            )
        }
        //go to log out
        if (this.state.loggedOut) {
            return <Redirect to="/" />
        }
        //go to transfer money
        if (this.state.totrans) {
            return (
                <div>
                    <Transfer accounts={this.state.accounts}
                        goback={this.transback} />
                </div>
            )
        }
        //go to account summary
        if (this.state.tosum) {
            return (
                <div>
                    <AccSum accid={this.state.chosenacc}
                        goback={this.sumback} />
                </div>
            )
        }
        //go to deposit check
        if (this.state.check) {
            return (
                <div>
                    <Check accounts={this.state.accounts}
                        goback={this.checkback} />
                </div>
            )
        }
        //render the toolbar and the accounts
        return (
            <div className={styles.center}>
                <div className={styles.topnav}>
                    <a>Welcome {this.state.firstname} {this.state.lastname}</a>\
					<a><button className={styles.buttontopnav} onClick={this.logout}>Log Out</button></a>
                    <a><button className={styles.buttontopnav} onClick={this.updateInfo}>Update Information</button></a>
                </div><br></br>
                {this.state.message}
                <div className={styles.main}>
                    {this.state.accounts.map(account => (
                        <Account acc={account}
                            key={account.account_id}
                            sum={() => this.accsum(account.account_id)}/>
                    ))}
                </div>
                <div className={styles.sidenav}>
                    <a><button className={styles.button} onClick={this.openAcc}>Open New Account</button></a>
                    <a><button className={styles.button} onClick={this.setBilling}>Set Up Billing</button></a>
                    <a><button className={styles.button} onClick={this.maketrans}>Make A Transfer</button></a>
                    <a> <button className={styles.button} onClick={this.depositcheck}>Deposit Check</button></a>
                    <a> <button className={styles.button} onClick={this.FindATM}>Find ATM</button></a>
                </div>
            </div>
        )
    }
}
export default UserPage