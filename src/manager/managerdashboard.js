import React from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios'
//import Account from './account.js';


/*********************retrieve username from login.js user's input 
(for right now I just choose a random user from the database)*/

class ManagerDashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            attribute: "",
            input: "", 
			firstname: '',
            lastname: '', 
			Dashboard: [],
			loggedOut: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
	
	/****use this function to mount to the class
     * do not use axios in render as it will cause 
     * an infinity loop*/
    componentDidMount(){
        let userInfo = new FormData();
        userInfo.append('username',this.props.user)
        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/usermain.php',
            data: userInfo,
            config: {headers: {'Content-Type': 'x-www-form-urlencoded; charset=UTF-8'}}
        }).then( (response) => {  
            this.setState({
                firstname: response.data[0].first_name,
                lastname: response.data[0].last_name,

            })
            console.log(this.state.accounts) //just to check, delete later        
        }).catch(function(error) {
            // handle error
            console.log(error)
        });
    }


    handleSubmit(event){
        event.preventDefault();
        let formData = new FormData();

        formData.append('attribute', this.state.attribute);
        formData.append('input', this.state.input);
        
       
        // axios({
        //     method: 'post',
        //     url: 'http://bank.cvs3.com/bank-app/api/addAddress.php',
        //     data: addressData,
        //     config: {headers: {'Content-Type':'x-www-form-urlencoded'}}
        // }).then(function (response) {
        //     // handle success
        //     console.log(response)
        // }).catch(function(response) {
        //     // handle error
        //     console.log(response)
        // });

/*
        axios({
            method: 'post',
            url: 'http://bank.cvs3.com/bank-app/api/signup.php',
            data: formData,
            config: {headers: {'Content-Type': 'x-www-form-urlencoded'}}
        }).then(function (response) {
            // handle success
            console.log(response)
        }).catch(function(error) {
            // handle error
            console.log(error)
        });
*/

    }
	
	logout = () => {
		this.setState({
			loggedOut: true
		})
	}

    render(){
		if (this.state.loggedOut){
            return <Redirect to="/"/>
        } 
		
        return (
            <div>
                <h1>Welcome {this.state.firstname} {this.state.lastname}</h1>
                <p>Fill out the following to perform a search. Attribute is the column being searched, input is what is being searched for.</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Customer Attribute:
                        <input 
                            type="text" 
                            name="attribute" 
                            placeholder="e.g. Zipcode" 
                            value={this.state.attribute} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <label>
                        Attribute Input:
                        <input 
                            type="text" 
                            name="input" 
                            placeholder="e.g. 46232" 
                            value={this.state.input} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form> 
				<button onClick={this.logout}>Log Out</button>
            </div>   
        );
    }
}
export default ManagerDashboard;
