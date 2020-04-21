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
            showdashboard: false, 
			Dashboard: [],
			loggedOut: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit= (event) =>{
        event.preventDefault();
        let formData = new FormData();

        formData.append('attribute', this.state.attribute);
        formData.append('input', this.state.input);
        
       
        axios({
            method: 'post',
              url: 'https://bank.cvs3.com/bank-app/api/managerquery.php',
              data: formData,
              config: {headers: {'Content-Type':'x-www-form-urlencoded'}}
          }).then((response) => {
             console.log(response.data)
              this.setState({
                  Dashboard: response.data,
                  showdashboard: true
              })
          }).catch(function(response) {
              // handle error
              console.log(response)
          });

    }
	
	logout = () => {
		this.setState({
			loggedOut: true
		})
	}
    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
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
                        <select onChange ={this.handleChange}
                                name = 'attribute'
                                value = {this.state.attribute}>
                                    <option value = 'state'>State</option>
                                    <option value = 'city'>City</option>
                                    <option value = 'zip_code'>ZipCode</option>
                                    <option value = 'street'>Street</option>
                                    <option value = 'customer_id'>ID</option>
                                    <option value = 'username'>Username</option>
                                    <option value = 'first_name'>First Name</option>
                                    <option value = 'last_name'>Last Name</option>
                                </select>
                    </label>
                    <label>
                        Attribute Input:
                        <input 
                            type="text" 
                            name="input" 
                            value={this.state.input} 
                            onChange={this.handleChange} 
                        />
                    </label>
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
                {this.state.showdashboard === true &&
                <table>
                    <thead>
                        <tr>
                            <th>CustomerID</th>
                            <th>AddressID</th>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Street</th>
                            <th>Apt</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zipcode</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.Dashboard.map((info,index) => (
                                <tr key = {index}>
                                    <td>{info.customer_id}</td>
                                    <td>{info.address_id}</td>
                                    <td>{info.username}</td>
                                    <td>{info.first_name}</td>
                                    <td>{info.last_name}</td>
                                    <td>{info.street}</td>
                                    <td>{info.apartment_number}</td>
                                    <td>{info.city}</td>
                                    <td>{info.state}</td>
                                    <td>{info.zip_code}</td>
                                    <td>{info.email}</td>
                                    <td>{info.phone}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>} 
				<button onClick={this.logout}>Log Out</button>
            </div>   
        );
    }
}
export default ManagerDashboard;
