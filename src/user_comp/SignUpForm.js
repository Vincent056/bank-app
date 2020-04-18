import React, {Component} from 'react'
import {Redirect} from 'react-router-dom';
import axios from 'axios'

class SignUpForm extends Component{
    constructor(){
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
            birthday: "",
            ssn: "",
            loginRedirect: false,
            goBack: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event){
        event.preventDefault();

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
            config: {headers: {'Content-Type': 'x-www-form-urlencoded'}}
        }).then(function (response) {
            // Successfully added user
            // Redirect user to login page
            // Determine how to successfully add a user
            // console.log(response.data.customerAdded);
            if(response.data.customerAdded === true){
                self.login();
            }
            console.log(response)
        }).catch(function(error) {
            // handle error
            console.log(error)
        });
    }

    handleCancel =() =>{
        this.setState({
            goBack: true
        })
    }

    login = () => {
        this.setState({
            loginRedirect: true
        })
    }

    render(){
        if(this.state.loginRedirect){
            return <Redirect to="/" />
        }

        if(this.state.goBack){
            return <Redirect to="/" />
        }

        return (
            <div>
                <h2>Sign Up</h2>
                <p>Please fill out the following information to sign up for an account</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        First Name:
                        <input 
                            type="text" 
                            name="firstName" 
                            placeholder="e.g. John" 
                            value={this.state.firstName} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <label>
                        Last Name:
                        <input 
                            type="text" 
                            name="lastName" 
                            placeholder="e.g. Doe" 
                            value={this.state.lastName} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <label>
                        Street:
                        <input
                            type="text"
                            name="street"
                            placeholder="e.g. 1st Street"
                            value={this.state.street}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Apt. No.:
                        <input
                            type="text"
                            name="aptNumber"
                            placeholder="e.g. 123"
                            value={this.state.aptNumber}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        City:
                        <input
                            type="text"
                            name="city"
                            placeholder="e.g. San Francisco"
                            value={this.state.city}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        State:
                        <input
                            type="text"
                            name="stateInCountry"
                            placeholder="e.g. CA"
                            value={this.state.stateInCountry}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Zip Code:
                        <input 
                            type="text"
                            name="zipCode"
                            placeholder="e.g. 12345"
                            value={this.state.zipCode}
                            onChange={this.handleChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input 
                            type="email" 
                            name="userEmail"
                            placeholder="e.g. johndoe@gmail.com" 
                            value={this.state.userEmail} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <label>
                        Mobile Number:
                        <input 
                            type="tel" 
                            name="phone"
                            placeholder="e.g. 5555555555" 
                            value={this.state.phone} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    
                    <label>
                        Username:
                        <input 
                            type="text" 
                            name="userName"
                            placeholder="e.g. johndoe" 
                            value={this.state.userName} 
                            onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input 
                            type="password" 
                            name="userPassword"
                            placeholder="**********" 
                            value={this.state.userPassword} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <label>
                        Confirm Password:
                        <input 
                            type="password"
                            name="userConfirmPassword"
                            placeholder="**********" 
                            value={this.state.userConfirmPassword} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <label>
                        Social Security Number(SSN):
                        <input 
                            type="password" 
                            name="ssn"
                            placeholder="xxxxxxxxx" 
                            value={this.state.ssn} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form> 
                <div>
                    <button onClick={this.handleCancel}>Back</button>
                </div>
            </div>   
        );
    }
}

export default SignUpForm;
