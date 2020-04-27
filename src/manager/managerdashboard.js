import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import styles from './../mystyle.module.css';

class ManagerDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            attribute: "",
            input: "",
            firstname: '',
            lastname: '',
            Dashboard: [],
            showdashboard: false,
            loggedOut: false,
            message: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    checkInput = () => {
        if (this.state.attribute === "")
            return false;
        else if (this.state.input === "")
            return false;
        else return true;
    }

    /**
    * Store user input to state variables
    */
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    /**
     * send input to API and store response in Dashboard array
     */
    handleSubmit = (event) => {
        event.preventDefault();

        if (this.checkInput()) {
            let formData = new FormData();
            formData.append('man_id', this.props.man_id)
            formData.append('attribute', this.state.attribute);
            formData.append('input', this.state.input);

            axios({
                method: 'post',
                url: 'https://bank.cvs3.com/bank-app/api/managerquery.php',
                data: formData,
                config: { headers: { 'Content-Type': 'x-www-form-urlencoded' } }
            }).then((response) => {
                if (response.data.length === 0) {
                    this.setState({
                        message: "Not found!",
                        showdashboard: false,
                    })
                }
                else {
                    this.setState({
                        Dashboard: response.data,
                        showdashboard: true,
                        message: "",
                    })
                }
            }).catch(function (response) {
                // handle error
                console.log(response)
            });
        } else {
            this.setState({
                message: "Attribute or Input is empty!",
                showdashboard: false
            })
        }
    }

    //set log out state to true
    logout = () => {
        this.setState({
            loggedOut: true
        })
    }

    //render the page
    render() {
        if (this.state.loggedOut) {
            return <Redirect to="/managerlogin/" />
        }
        return (
            <div className={styles.center}>
				<div className={styles.topnav}>
                    <a>Welcome {this.props.man_user}</a>\
					<a><button className={styles.buttontopnav} onClick={this.logout}>Log Out</button></a>
                </div>
                <p>Fill out the following to perform a search. Attribute is the column being searched, input is what is being searched for.</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Customer Attribute:  </label>
                        <select className={styles.selectbox} onChange={this.handleChange}
                            name='attribute'
                            value={this.state.attribute}>
                            <option value=''>Chose An Attribute</option>
                            <option value='state'>State</option>
                            <option value='city'>City</option>
                            <option value='zip_code'>ZipCode</option>
                            <option value='street'>Street</option>
                            <option value='customer_id'>ID</option>
                            <option value='username'>Username</option>
                            <option value='first_name'>First Name</option>
                            <option value='last_name'>Last Name</option>
                        </select>
                    <br></br><br></br>
                    <label>
                        Attribute Input:  </label>
                        <input
                            type="text"
                            name="input"
                            value={this.state.input}
                            onChange={this.handleChange}
                        />   <br/>
                    <button className={styles.buttonsmall} onClick={this.handleSubmit}>Submit</button>
                </form>
                <p className='error'>{this.state.message}</p>
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
				<th>SUM(balance)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.Dashboard.map((info, index) => (
                                <tr key={index}>
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
				    <td>{info.SUM(balance)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
            </div>
        );
    }
}
export default ManagerDashboard;
