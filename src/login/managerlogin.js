import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import styles from './../mystyle.module.css';

/*these variable will be exported to index.js so that managerdashboard.js 
and others know what data to send to backend
if check credential pass, assign the input id with this
*/
var manID;
var manuser;

class ManagerLogin extends React.Component {
    constructor() {
        super()
        this.state = {
            manID: 0,
            passeduser:"",
            username: "",
            password: "",
            invalid: "",
            loggedIn: false,
            customerLogin: false,
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
    handleSubmit(event) {
        event.preventDefault();
        if (this.checkInput()) {
            let loginInfo = new FormData();

            loginInfo.append('username', this.state.username);
            loginInfo.append('password', this.state.password);

            axios({
                method: 'post',
                url: 'https://bank.cvs3.com/bank-app/api/managerlogin.php',
                data: loginInfo,
                config: { headers: { 'Content-Type': 'x-www-form-urlencoded' } },

            }).then((response) => {
                let man_id = Number(response.data)
                //UnSuccessful Log in
                if (man_id === 0) {
                    this.setState({
                        invalid: "Invalid Username or Password! Please enter again!"
                    })
                }
                //Successful Log in
                else {
                    this.setState({
                        manID: man_id,
                        passeduser: this.state.username,
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
	 * Set state to customer login for rendering
	 */
    customerLog = () => {
        this.setState({
            customerLogin: true
        })
    }

    /**
	 * Render the page
	 */
    render() {
        //store user and id in variable to passed to other components
        manID = this.state.manID
        manuser = this.state.passeduser

        if (this.state.loggedIn) {
            return <Redirect to="/managerdashboard/" />
        }
        if (this.state.customerLogin) {
            return <Redirect to="/" />
        }

        return (
            <div className={styles.login}>
                <h1>Silicon Bank</h1>
                <form >
                    <h2>Manager Login</h2>
                    <label>Username</label><br></br>
                    <input
                        type='text'
                        name='username'
                        value={this.state.username}
                        onChange={this.handleChange}
                        title="Please enter your username"
                    ></input><br></br>
                    <label>Password</label><br></br>
                    <input
                        type='password'
                        name='password'
                        value={this.state.password}
                        title="Please enter your password"
                        onChange={this.handleChange}
                    ></input><br /><br />
                    <div>{this.state.invalid}</div><br></br>
                    <button className='login_butt' onClick={this.handleSubmit}>Log In</button>
                </form><br />
                <div>
                    <button className='button'
                        onClick={this.customerLog}>Customer Login</button>
                </div><br />
            </div>
        )
    }
}
export {
    ManagerLogin, manID, manuser
}	
