import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import styles from './../mystyle.module.css';

class ForgotPassword extends Component {
    constructor() {
		super()
		this.state = {
			invalid: "",
			zipcode: "",
			sssn: "",
			userPassword: "",
            userConfirmPassword: "",
			success: false,
			login: false,
		}
		this.handleChange = this.handleChange.bind(this);
		//this.handleSubmit = this.handleSubmit.bind(this);
	}

	/**
	 * Check for user input
	 * Return false if one of the required fields is empty
	 */
	checkInput = () => {
		if (this.state.zipcode === "")
			return false;
		else if (this.state.ssn === "")
			return false;
		else if (this.state.userPassword === "")
			return false;
		else if (this.state.userConfirmPassword === "")
			return false;
		else return true;
	}

	/**
	 * Handle input zipcode and ssn and send to API
	 */
	 /*
	handleSubmit = (event) => {
		event.preventDefault();

		if (this.checkInput()) {
			let userInfo = new FormData();
			userInfo.append('zipcode', this.state.zipcode)
			userInfo.append('ssn', this.state.ssn)
			userInfo.append('userPassword', this.state.userPassword);
            userInfo.append('userConfirmPassword', this.state.userConfirmPassword);
			axios({
				method: 'post',
				url: 'https://bank.cvs3.com/bank-app/api/userLogin.php',
				data: userInfo,
				config: { headers: { 'Content-Type': 'x-www-form-urlencoded; charset=UTF-8' } }
			}).then((response) => {
				let user_id = Number(response.data)
				//if back end return error code 0, meaning invalid zipcode/ssn
				if (user_id === 0) {
					this.setState({
						invalid: "Invalid zipcode or ssn! Please enter again!"
					})
				}
				else {
					this.setState({
						id: user_id,
						success: true,
					})
				}
			}).catch(function (error) {
				// handle error
				console.log(error)
			});
		}
		else {
			this.setState({
				invalid: "Zipcode or ssn field is missing!",
			})
		}
	}
	*/

	/**
	 * Store user input to state variables
	 */
	handleChange(event) {
		const { name, value } = event.target
		this.setState({
			[name]: value
		})
	}

	/**
	 * Set state to login for rendering
	 */
	returnLog = () => {
		this.setState({
			login: true
		})
	}

	/**
	 * Set state to sign up for rendering
	 */
	sign = () => {
		this.setState({
			signUp: true
		})
	}

	/**
	 * Render the page
	 */
	render() {

		if (this.state.success) {
			//return <Redirect to="/resetPassword/" />
		}
		if (this.state.login) {
			return <Redirect to="/" />
		}

		return (
			<div className={styles.signup}>
				<h1>Silicon Bank</h1>
				<form>
					<h2>Password Reset Verification</h2>
					<label>Zipcode  </label> <br />
					<input type="text"
						name="zipcode"
						title="Please enter your zipcode"
						value={this.state.zipcode}
						onChange={this.handleChange} /><br></br>
					<label>Social Security Number  </label> <br />
					<input type="ssn"
						name="ssn"
						title="Please enter your ssn"
						value={this.state.ssn}
						onChange={this.handleChange} /><br />
					<label>
                            New Password *:
                    </label> <br />
                        <input
                            type="password"
                            name="userPassword"
                            placeholder="**********"
                            value={this.state.userPassword}
                            onChange={this.handleChange}
                        /><br />
                        <label>
                            Confirm New Password *:
                    </label> <br />
                        <input
                            type="password"
                            name="userConfirmPassword"
                            placeholder="**********"
                            value={this.state.userConfirmPassword}
                            onChange={this.handleChange}
                        />
					<div className='error'>{this.state.invalid}</div>
					<button onClick={this.handleSubmit}
						className='login_butt'>Reset Password</button>
				</form><br />
				<div>
					<button className='button' onClick={this.returnLog}>Return to Login</button>
				</div><br />

			</div>
		)
	}
}

export default ForgotPassword;