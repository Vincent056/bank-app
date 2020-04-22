import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import styles from './../mystyle.module.css';


class OpenAcc extends React.Component {
    constructor() {
        super()
        this.state = {
            acctype: 'checking',
            goBack: false,
            message: "",
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let userInfo = new FormData();
        userInfo.append('id', this.props.cus_id)
        userInfo.append('acctype', this.state.acctype)
        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/openbank.php',
            data: userInfo,
            config: { headers: { 'Content-Type': 'x-www-form-urlencoded' } }
        }).then((response) => {
            if (response.data === 'OK') {
                this.setState({
                    message: "Account created!"
                })
            }
            else {
                this.setState({
                    message: "Oops! Something went wrong! Please try again!"
                })
            }
        }).catch(function (error) {
            // handle error
            console.log(error)
        })
    }
    handleChange = (event) => {
        this.setState({
            acctype: event.target.value
        })
    }
    handleCancel = () => {
        this.setState({
            goBack: true
        })
    }
    render() {
        if (this.state.goBack) {
            return <Redirect to="/usermain/" />
        }

        return (
            <div className={styles.center}>
                <div className={styles.topnav}>
                    <a><button className={styles.buttontopnav} onClick={this.handleCancel}>Back</button></a>
                </div>
                <form >
                    <h1 className='newacc' >New Account</h1>
                    <p>Please choose the account type:</p>
                    <select className={styles.selectbox} value={this.state.acctype}
                        onChange={this.handleChange} >
                        <option value="checking">Checking </option>
                        <option value="saving">Saving </option>
                    </select><br />
                    <button className={styles.buttonsmall} onClick={this.handleSubmit}>Submit</button>
                    <div>{this.state.message}</div>
                </form>
            </div>
        )
    }
}
export default OpenAcc
