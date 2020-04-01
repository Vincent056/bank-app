import React from 'react';
import { Redirect} from 'react-router-dom';

class LoginPage extends React.Component {
    state ={
        loggedIn: false,
		forgotPassword: false,
		managerLogin: false
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

    render(){
        if (this.state.loggedIn ){
			//***********code to check databased data here
            return <Redirect to="/usermain/"/>
        } 
		if (this.state.managerLogin ){
            //return <Redirect to="/managerlogin/"/>
        } 
		if (this.state.forgotPassword ){
			
            //return <Redirect to="/forgotpassword/"/>
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
						<button onClick={this.forgotPass}>Forgot Pasword?</button>
						<button onClick={this.managerLog}>Manager Login</button>
				</div>
			</div>
        )
    }
}

export default LoginPage