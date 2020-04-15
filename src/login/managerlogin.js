import React from 'react';
import axios from 'axios';
import { Redirect} from 'react-router-dom';

class ManagerLogin extends React.Component {
    constructor(){
        super()
        this.state ={
            username: "",
            password: "",
            temp: "ManagerLogin",
            loggedIn: false,
            customerLogin: false,
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
		
		let loginInfo = new FormData();
		
		loginInfo.append('username', this.state.username);
        loginInfo.append('password', this.state.password);
		
		axios({
            method: 'post',
            url: 'http://bank.cvs3.com/bank-app/api/managerlogin.php',
            data: loginInfo,
            config: {headers: {'Content-Type': 'x-www-form-urlencoded'}}
        }).then((response) => {
            console.log(response);
			
			//Successful Log in
            if(response.data.id){
                this.setState({
                    loggedIn: true
                })
            }
			
			}).catch(function(error) {
            // handle error
            console.log(error)
        });
        
        
    }
	customerLog = () => {
		this.setState({
            customerLogin: true
        })
	}
    render(){
        if (this.state.loggedIn ){
			//***********code to check databased data here
            return <Redirect to="/signUp/"/>
        } 
		if (this.state.customerLogin ){
            return <Redirect to="/"/>
        }
		
		return(
			<div>
				<form >
					<h1>Manager Login</h1>
					<label>Username</label><br></br>
                    <input 
                            type ='text' 
                            name='username' 
                            value={this.state.username} 
                            onChange={this.handleChange} 
                        ></input><br></br>
					<label>Password</label><br></br>
                    <input 
                            type ='password' 
                            name = 'password' 
                            value={this.state.password}
                            onChange={this.handleChange} 
                        ></input><br></br>
					<button onClick={this.handleSubmit}>Submit</button>
				</form>
				<div>
					<button onClick={this.customerLog}>Customer Login</button>
				</div>
			</div>
        )
    }
}
export default ManagerLogin        