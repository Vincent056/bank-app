import React, {Component} from 'react'

class SignUpForm extends Component{
    constructor(){
        super()
        this.state = {
            firstName: "",
            lastName: "",
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
        
        let formData = new FormData();
        formData.append('first_name', this.state.firstName);
        formData.append('last_name', this.state.lastName);
        formData.append('phone', this.state.phone);
        formData.append('email', this.state.email);
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        formData.append('ssn', this.state.ssn);

        axios({
            method: 'post',
            url: 'bank.cvs3.com/bank-app/api/addCustomer.php',
            data: formData,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
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
                            value={this.state.value} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <label>
                        Last Name:
                        <input 
                            type="text" 
                            name="lastName" 
                            placeholder="e.g. Doe" 
                            value={this.state.value} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <label>
                        Mobile Number:
                        <input 
                            type="tel" 
                            name="phone"
                            placeholder="e.g. 5555555555" 
                            value={this.state.value} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <label>
                        Email:
                        <input 
                            type="email" 
                            name="email"
                            placeholder="e.g. johndoe@gmail.com" 
                            value={this.state.value} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <label>
                        Username:
                        <input 
                            type="text" 
                            name="username"
                            placeholder="e.g. johndoe" 
                            value={this.state.value} 
                            onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input 
                            type="password" 
                            name="password"
                            placeholder="**********" 
                            value={this.state.value} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <label>
                        Confirm Password:
                        <input 
                            type="password"
                            name="confirmPassword"
                            placeholder="**********" 
                            value={this.state.value} 
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
                            value={this.state.value} 
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