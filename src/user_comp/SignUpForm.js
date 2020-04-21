import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import styles from './../mystyle.module.css';

class SignUpForm extends Component {
    constructor() {
        super()
        this.state = {
            firstName: "",
            lastName: "",
            street: "",
            aptNumber: "",
            city: "",
            stateInCountry: "",
            zipCode: "",
            phone: "",
            userEmail: "",
            userName: "",
            userPassword: "",
            userConfirmPassword: "",
            ssn: "",
            loginRedirect: false,
            goBack: false,
            message: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    checkInput = () => {
        if (this.state.firstName === ""
            || this.state.lastName === ""
            || this.state.street === ""
            || this.state.city === ""
            || this.state.stateInCountry === ""
            || this.state.zipCode === ""
            || this.state.phone === ""
            || this.state.userEmail === ""
            || this.state.userName === ""
            || this.state.userPassword === ""
            || this.state.userConfirmPassword === ""
            || this.state.ssn === "")
            return false;
        else return true;
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.checkInput()) {
            let formData = new FormData();
            formData.append('first_name', this.state.firstName);
            formData.append('last_name', this.state.lastName);
            formData.append('street', this.state.street);
            formData.append('apartment_number', this.state.aptNumber);
            formData.append('city', this.state.city);
            formData.append('stateInCountry', this.state.stateInCountry);
            formData.append('zipCode', this.state.zipCode);
            formData.append('phone', this.state.phone);
            formData.append('userEmail', this.state.userEmail);
            formData.append('userName', this.state.userName);
            formData.append('userPassword', this.state.userPassword);
            formData.append('userConfirmPassword', this.state.userConfirmPassword);
            formData.append('ssn', this.state.ssn);

            var self = this;
            axios({
                method: 'post',
                url: 'https://bank.cvs3.com/bank-app/api/userSignUp.php',
                data: formData,
                config: { headers: { 'Content-Type': 'x-www-form-urlencoded' } }
            }).then(function (response) {
                // Successfully added user
                // Redirect user to login page
                // Determine how to successfully add a user
                // console.log(response.data.customerAdded);
                if (response.data.customerAdded === true) {
                    self.login();
                }
                console.log(response)
            }).catch(function (error) {
                // handle error
                console.log(error)
            });
        } else {
            this.setState({
                message: 'Please fill out required fields!',
            })
        }
    }

    handleCancel = () => {
        this.setState({
            goBack: true
        })
    }

    login = () => {
        this.setState({
            loginRedirect: true
        })
    }

    render() {
        if (this.state.loginRedirect) {
            return <Redirect to="/" />
        }

        if (this.state.goBack) {
            return <Redirect to="/" />
        }

        return (
            <div className={styles.signup}>
                <div>
                    <h2 className='signup'>Sign Up</h2>
                    <p>Please fill out the following information to sign up for an account.</p>
                    <p>* = required</p>
                    <form >
                        <label>
                            First Name *:
                    </label> <br />
                        <input
                            type="text"
                            name="firstName"
                            placeholder="e.g. John"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                        /><br />
                        <label>
                            Last Name *:
                    </label> <br />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="e.g. Doe"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                        /><br />
                        <label>
                            Street *:
                    </label> <br />
                        <input
                            type="text"
                            name="street"
                            placeholder="e.g. 1st Street"
                            value={this.state.street}
                            onChange={this.handleChange}
                        /><br />
                        <label>
                            Apt. No.:
                    </label> <br />
                        <input
                            type="text"
                            name="aptNumber"
                            placeholder="e.g. 123"
                            value={this.state.aptNumber}
                            onChange={this.handleChange}
                        /><br />
                        <label>
                            City *:
                    </label> <br />
                        <input
                            type="text"
                            name="city"
                            placeholder="e.g. San Francisco"
                            value={this.state.city}
                            onChange={this.handleChange}
                        /><br />
                        <label>
                            State *:
                    </label> <br />
                        <input
                            type="text"
                            pattern="[A-Za-z]{2}" required
                            title="Please enter two letter state code"
                            name="stateInCountry"
                            placeholder="e.g. CA"
                            value={this.state.stateInCountry}
                            onChange={this.handleChange}
                        /><br />
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
                            Email *:
                    </label> <br />
                        <input
                            type="email" required
                            name="userEmail"
                            placeholder="e.g. johndoe@gmail.com"
                            value={this.state.userEmail}
                            onChange={this.handleChange}
                        /><br />
                        <label>
                            Mobile Number *:
                    </label> <br />
                        <input
                            type="tel"
                            name="phone"
                            pattern="[0-9]{10}" required
                            title="Please enter only numbers"
                            placeholder="e.g. 5555555555"
                            value={this.state.phone}
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
                        <button onClick={this.handleSubmit}>Submit</button>
                        {this.state.message}
                    </form>
                </div>
                <div>
                    <button className={styles.buttonsmall} onClick={this.handleCancel}>Back</button>
                </div>
            </div>
        );
    }
}

export default SignUpForm;
