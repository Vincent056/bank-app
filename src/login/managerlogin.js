import React from 'react';
import { Redirect} from 'react-router-dom';

class ManagerLogin extends React.Component {
    state ={
        loggedIn: false,
		customerLogin: false,
    }
    handleSubmit= () => {
        //***********code to check databased data here
        this.setState({
            loggedIn: true
        })
    }
	customerLog = () => {
		this.setState({
            customerLogin: true
        })
	}
    render(){
        if (this.state.loggedIn ){
			//***********code to check databased data here
            //return <Redirect to="/managerMain/"/>
        } 
		if (this.state.customerLogin ){
            return <Redirect to="/"/>
        } 
        
        return(
			<div>
				<form >
					<h1>Manager Login</h1>
					<label>Username</label><br></br>
					<input type ='text' name='username'></input><br></br>
					<label>Password</label><br></br>
					<input type ='password' name = 'password'></input><br></br>
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