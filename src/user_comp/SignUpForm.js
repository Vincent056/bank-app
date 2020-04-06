import React, {Component} from 'react'
import axios from 'axios'
import qs from 'qs'

class SignUpForm extends Component{
    constructor(){
        super()
        this.state = {
            firstName: "",
            lastName: "",
            street: "",
            aptNumber: "",
            city: "",
            state: "",
            zipCode: "",
            phone: "",
            email: "",
            userName: "",
            password: "",
            confirmPassword: "",
            birthday: "",
            ssn: ""
                
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleChange.bind(this);
    }

    handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event){
        event.preventDefault();

        let customerData = new FormData();
        let addressData = new FormData();

        customerData.append('first_name', this.state.firstName);
        customerData.append('last_name', this.state.lastName);
        customerData.append('phone', this.state.phone);
        customerData.append('email', this.state.email);
        customerData.append('username', this.state.username);
        customerData.append('password', this.state.password);
        customerData.append('ssn', this.state.ssn);

        addressData.append('street', this.state.street);
        addressData.append('apartment_number', this.state.aptNumber);
        addressData.append('city', this.state.city);
        addressData.append('state', this.state.stateInCountry);
        addressData.append('zipCode', this.state.zipCode);

        // Customer's Address
        // fetch('bank.cvs3.com/bank-app/api/addAddress.php', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type':'application/json'
        //     },
        //     body: JSON.stringify({
        //         street: this.state.street,
        //         aptNumber: this.state.aptNumber,
        //         city: this.state.city,
        //         stateInCountry: this.state.stateInCountry,
        //         zipCode: this.state.zipCode
        //     })
        // });

        //Customer Details
        // fetch('bank.cvs3.com/bank-app/api/addCustomer.php', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type':'application/json'
        //     },
        //     body: JSON.stringify({
        //         first_name: this.state.firstName,
        //         last_name: this.state.lastName,
        //         phone: this.state.phone,
        //         email: this.state.email,
        //         username: this.state.username,
        //         password: this.state.password,
        //         ssn: this.state.ssn 
        //     })
        // });

        console.log(window.addressData);

        const apiParams = {
            street: this.state.street,
            apartment_number: this.state.aptNumber,
            city: this.state.city,
            state: this.state.stateInCountry,
            zipCode: this.state.zipCode
        }
       
        axios({
            method: 'post',
            url: 'http://bank.cvs3.com/bank-app/api/addAddress.php',
            params: apiParams,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'},
        }).then(function (response) {
            // handle success
            console.log(response)
        }).catch(function(response) {
            // handle error
            console.log(response)
        });

        axios({
            method: 'post',
            url: 'http://bank.cvs3.com/bank-app/api/addCustomer.php',
            data: customerData,
            config: {headers: {'Content-Type': 'x-www-form-urlencoded'}}
        })
        .then(function (response) {
            // handle success
            console.log(response)
        })
        .catch(function(response) {
            // handle error
            console.log(response)
        });
        
    }

    render(){
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
                            placeholder="e.g. California"
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
                            name="email"
                            placeholder="e.g. johndoe@gmail.com" 
                            value={this.state.email} 
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
                            name="username"
                            placeholder="e.g. johndoe" 
                            value={this.state.userName} 
                            onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input 
                            type="password" 
                            name="password"
                            placeholder="**********" 
                            value={this.state.password} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <label>
                        Confirm Password:
                        <input 
                            type="password"
                            name="confirmPassword"
                            placeholder="**********" 
                            value={this.state.confirmPassword} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <label>
                        Birthday:
                    </label>
                    <label>
                        Social Security Number(SSN):
                        <input 
                            type="text" 
                            name="ssn"
                            placeholder="xxxxxxxxx" 
                            value={this.state.ssn} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form> 
            </div>   
        );
    }
}

export default SignUpForm;