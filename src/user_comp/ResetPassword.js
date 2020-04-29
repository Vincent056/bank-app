import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import styles from './../mystyle.module.css';

class ResetPassword extends Component {
    constructor() {
        super()
        this.state = {
            zipCode: "",
            ssn: "",
            userName: "",
            userPassword: "",
            userConfirmPassword: "",
            goBack: false,
            signUp: false,
            message: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Check user input
     * Return E if one of the fields is empty
     * Return OK if everything is format correctly
     * Return error code according to the field
     */
    checkInput = () => {
        const zip = /^[0-9]{5}$/
        const ssn = /^[0-9]{9}$/
        if (this.state.zipCode === ""
            || this.state.ssn === ""
            || this.state.userName === ""
            || this.state.userPassword === ""
            || this.state.userConfirmPassword === "")
            return 'E';
        else if(this.state.userPassword != this.state.userConfirmPassword) return 'NEQ'
        else if (!(zip.test(this.state.zipCode))) return 'Z'
        else if (!(ssn.test(this.state.ssn))) return 'SN'
        else return 'OK';
    }

    //store user input in to state variables
    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    //check user input, if pass then make an API call to create an new user account
    handleSubmit(event) {
        event.preventDefault();
        let check = this.checkInput()
        if (check === 'OK') { //input check pass
            let formData = new FormData();
            formData.append('zipCode', this.state.zipCode);
            formData.append('ssn', this.state.ssn);
            formData.append('userName', this.state.userName);
            formData.append('userPassword', this.state.userPassword);
            formData.append('userConfirmPassword', this.state.userConfirmPassword);

            axios({
                method: 'post',
                url: 'https://bank.cvs3.com/bank-app/api/resetPwd.php',
                data: formData,
                config: { headers: { 'Content-Type': 'x-www-form-urlencoded' } }
            }).then((response) => {
                // Successfully added user
                // Redirect user to login page
                // Determine how to successfully add a user
                console.log(response.data.pwdCreated);
                if (response.data.userFound === true && response.data.pwdCreated === true) {
                    {
                        this.setState({
                            message: 'Password has been reset! Please go back to Login.'
                        })
                    }
                }
                else if(response.data.userFound === false){
                    {
                        this.setState({
                            message: 'User not found. Please sign up for an account.'
                        })
                    }
                }
                else if (response.data.userFound === true && response.data.pwdCreated === false) {
                    this.setState({
                        message: 'Unable to reset password'
                    })
                }
            }).catch(function (error) {
                // handle error
                console.log(error)
            });

        } else if (check === 'E') { 
            this.setState({
                message: 'Please fill out required fields!',
            })
        }
        else if (check === 'Z') {
            this.setState({
                message: 'Invalid Zip Code format!',
                zipCode: ''
            })
        }
        else if (check === 'SN') {
            this.setState({
                message: 'Invalid SSN format!',
                ssn: ''
            })
        }
        else if (check === 'NEQ') {
            this.setState({
                message: 'Password fields do not match!',
                zipCode: '',
                ssn: '',
                userName: '',
                userPassword: '',
                userConfirmPassword: ''
            })
        }

    }

    handleSignUp = () => {
        this.setState({
            signUp: true
        })
    }

    //set state to go back
    handleCancel = () => {
        this.setState({
            goBack: true
        })
    }

    //render the page
    render() {
        if (this.state.goBack) {
            return <Redirect to="/" />
        }
        if (this.state.signUp) {
            return <Redirect to="/signUp/" />
        }

        return (
            <div className={styles.signup}>
                <div>
                    <h2 className='signup'>Password Reset</h2>
                    <p>Please fill out the following information to reset your password</p>
                    <p>* = required</p>
                    <form >
                        <label>
                            Zip Code *:
                        </label> <br />
                        <input
                            type="text"
                            name="zipCode"
                            pattern="[0-9]{5}" required
                            title="Please enter five number zip code"
                            placeholder="e.g. 12345"
                            value={this.state.zipCode}
                            onChange={this.handleChange}
                        /><br />
                        <label>
                            Social Security Number(SSN) *:
                        </label> <br />
                        <input
                            type="password"
                            name="ssn"
                            pattern="[0-9]{9}" required
                            title="Please enter only numbers"
                            placeholder="xxxxxxxxx"
                            value={this.state.ssn}
                            onChange={this.handleChange}
                        /><br />
                        <label>
                            Username *:
                        </label> <br />
                        <input
                            type="text"
                            name="userName"
                            placeholder="e.g. johndoe"
                            value={this.state.userName}
                            onChange={this.handleChange}
                        /><br />
                        <label>
                            Password *:
                        </label> <br />
                        <input
                            type="password"
                            name="userPassword"
                            placeholder="**********"
                            value={this.state.userPassword}
                            onChange={this.handleChange}
                        /><br />
                        <label>
                            Confirm Password *:
                        </label> <br />
                        <input
                            type="password"
                            name="userConfirmPassword"
                            placeholder="**********"
                            value={this.state.userConfirmPassword}
                            onChange={this.handleChange}
                        /><br />
                        <button onClick={this.handleSubmit}>Submit</button>
                        {this.state.message}
                    </form>
                </div>
                <div>
                    <button className={styles.buttonsmall} onClick={this.handleCancel}>Back</button>
                    <button className={styles.buttonsmall} onClick={this.handleSignUp}>Sign Up</button>
                </div>
            </div>
        );
    }
}

export default ResetPassword;