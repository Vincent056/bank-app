import React from 'react';
import { Redirect} from 'react-router-dom';

//this variable will be exported to index.js so that usermain.js 
//and others know what data to send to backend
//if check credential pass, assign the input username with this
let username = '';

class LoginPage extends React.Component {
    state ={
        loggedIn: false,
		forgotPassword: false,
		managerLogin: false,
		signUp: false
    }
    handleSubmit= () => {
        //***********code to check databased data here
        this.setState({
            loggedIn: true
		})
		
    }
	managerLog = () => {
		this.setState({
            managerLogin: true
        })
	}
	forgotPass = () => {
		this.setState({
            forgotPassword: true
        })
	}
	sign = () => {
		this.setState({
            signUp: true
        })
	}

    render(){
        if (this.state.loggedIn ){
			//***********code to check databased data here
            return <Redirect to="/usermain/"/>
        } 
		if (this.state.managerLogin ){
            return <Redirect to="/managerlogin/"/>
        } 
		if (this.state.forgotPassword ){
			
            //return <Redirect to="/forgotpassword/"/>
        } 
		if (this.state.signUp ){
			
            //return <Redirect to="/signUp/"/>
        } 
        
        return(
			<div>
				<form >
					<h1>Login</h1>
					<label>Username</label><br></br>
					<input type ='text' name='username'></input><br></br>
					<label>Password</label><br></br>
					<input type ='password' name = 'password'></input><br></br>
					<button onClick={this.handleSubmit}>Submit</button>
				</form>
				<div>
						<button onClick={this.sign}>Sign Up</button>
						<button onClick={this.forgotPass}>Forgot Pasword?</button>
						<button onClick={this.managerLog}>Manager Login</button>
				</div>
			</div>
        )
    }
}
//if backend return true, assign the username global variable 'username'
		//for right now I'm just test with this username
		username = "JDoe"
export{
	LoginPage, username}