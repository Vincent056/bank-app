import React from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios'


//this variable will be exported to index.js so that usermain.js 
//and others know what data to send to backend
//if check credential pass, assign the input username with this
var id;

class LoginPage extends React.Component {
	constructor(){
		super()
		this.state ={
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
   
    handleSubmit= (event) => {
		event.preventDefault();
        let userInfo = new FormData();
		userInfo.append('username',this.state.username)
		userInfo.append('password',this.state.password)
        axios({
            method: 'post',
            url: 'http://localhost/bank-app/api/userLogin.php',
            data: userInfo,
            config: {headers: {'Content-Type': 'x-www-form-urlencoded; charset=UTF-8'}}
        }).then( (response) => {  
			let user_id = Number(response.data)
			console.log(response.data)
			if (user_id === 0){
				this.setState({
					invalid : "Invalid Username or Password! Please enter again!"
				})
			}
			else{
				this.setState({
					id: user_id,
					loggedIn : true,
				})
			}
        }).catch(function(error) {
            // handle error
            console.log(error)
		});
		
	}
	handleChange(event){
        const {name, value} = event.target
        this.setState({
            [name]: value
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
		id = this.state.id
			
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
			
            return <Redirect to="/signUp/"/>
		} 
		
        return(
			<div>
				<form>
					<h1>Login</h1>
					<label>Username</label><br></br>
					<input type ="text" 
							name="username" 
							value={this.state.username} 
                            onChange={this.handleChange}/><br></br>
					<label>Password</label><br></br>
					<input type ="password" 
							name = "password"
							value={this.state.password} 
                            onChange={this.handleChange}/><br></br>
					<button onClick={this.handleSubmit}>Submit</button>
				</form>
				<div>
						<button onClick={this.sign}>Sign Up</button>
						<button onClick={this.forgotPass}>Forgot Pasword?</button>
						<button onClick={this.managerLog}>Manager Login</button>
				</div>
				<div>{this.state.invalid}</div>
			</div>
        )
    }
}
//if backend return true, assign the username global variable 'username'
		//for right now I'm just test with this username
export{
	LoginPage, id}
