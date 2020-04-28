import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import styles from './../mystyle.module.css';


/*this variable will be exported to index.js so that usermain.js 
and others know what data to send to backend
if check credential pass, assign the input id with this
*/
var id;

class LoginPage extends React.Component {
	constructor() {
		super()
		this.state = {
			id: 0,
			invalid: "",
			username: "",
			password: "",
			loggedIn: false,
			forgotPassword: false,
			managerLogin: false,
			signUp: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	/**
	 * Check for user input
	 * Return false if one of the required fields is empty
	 */
	checkInput = () => {
		if (this.state.username === "")
			return false;
		else if (this.state.password === "")
			return false;
		else return true;
	}

	/**
	 * Handle input username and password and send to API
	 */
	handleSubmit = (event) => {
		event.preventDefault();

		if (this.checkInput()) {
			let userInfo = new FormData();
			userInfo.append('username', this.state.username)
			userInfo.append('password', this.state.password)
			axios({
				method: 'post',
				url: 'https://bank.cvs3.com/bank-app/api/userLogin.php',
				data: userInfo,
				config: { headers: { 'Content-Type': 'x-www-form-urlencoded; charset=UTF-8' } }
			}).then((response) => {
				let user_id = Number(response.data)
				//if back end return error code 0, meaning invalid username/password
				if (user_id === 0) {
					this.setState({
						invalid: "Invalid Username or Password! Please enter again!"
					})
				}
				else {
					this.setState({
						id: user_id,
						loggedIn: true,
					})
				}
			}).catch(function (error) {
				// handle error
				console.log(error)
			});
		}
		else {
			this.setState({
				invalid: "Username or Password field is missing!",
			})
		}
	}

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
	 * Set state to manager login for rendering
	 */
	managerLog = () => {
		this.setState({
			managerLogin: true
		})
	}

	/**
	 * Set state to forgot password for rendering
	 */
	forgotPass = () => {
		this.setState({
			forgotPassword: true
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
		//store user id in variable to passed to other components
		id = this.state.id

		if (this.state.loggedIn) {
			return <Redirect to="/usermain/" />
		}
		if (this.state.managerLogin) {
			return <Redirect to="/managerlogin/" />
		}
		if (this.state.forgotPassword) {
			return <Redirect to="/forgotpassword/"/>
		}
		if (this.state.signUp) {
			return <Redirect to="/signUp/" />
		}

		return (
			<div className={styles.login}>
				<h1>Silicon Bank</h1>
				<form>
					<h2>Login</h2>
					<label>Username  </label>
					<input type="text"
						name="username"
						title="Please enter your username"
						value={this.state.username}
						onChange={this.handleChange} /><br></br><br></br>
					<label>Password  </label>
					<input type="password"
						name="password"
						title="Please enter your password"
						value={this.state.password}
						onChange={this.handleChange} /><br /><br />
					<div className='error'>{this.state.invalid}</div>
					<button onClick={this.handleSubmit}
						className='login_butt'>Log In</button>
				</form><br />
				<div>
					<button className='button' onClick={this.sign}>Sign Up</button>
					<button className='button' onClick={this.forgotPass}>Forgot Pasword?</button>
					<button className='button' onClick={this.managerLog}>Manager Login</button>
				</div><br />

			</div>
		)
	}
}

export {
	LoginPage, id
}