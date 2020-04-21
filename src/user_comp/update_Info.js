import React from 'react';
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import styles from './../mystyle.module.css';

class UpdateInfo extends React.Component {
    constructor(){
        super()
        this.state = {
            email: "",
            phone: "",
            street: "",
            city: "",
            state: "",
            zipcode: "",
            aptnum: "",
            goBack: false
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

    handleSubmit= (event) => {
        event.preventDefault();

        let userInfo = new FormData();
        userInfo.append('id',this.props.cus_id)
        userInfo.append('street',this.state.street)
        userInfo.append('city',this.state.city)
        userInfo.append('stateInCountry',this.state.state)
        userInfo.append('phone',this.state.phone)
        userInfo.append('userEmail',this.state.email)
        userInfo.append('zipCode',this.state.zipcode)
        userInfo.append('apartment_number',this.state.aptnum)

        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/updateprofile.php',
           
            data: userInfo,
            config: {headers: {'Content-Type': 'x-www-form-urlencoded'}}
        }).then( (response) => {  
            // handle success
            console.log(response.data)
            this.setState({
                goBack: true
            })
        }).catch(function(error) {
            // handle error
            console.log(error)
        })
    }

    handleCancel= () => {
        this.setState({
            goBack: true
        })
    }
    render(){
        if (this.state.goBack ){
            return <Redirect to="/usermain/"/>
        } 
        
        return(
		<div className={styles.center}>
			<div className={styles.topnav}>
				<a><button className={styles.buttontopnav} onClick={this.handleCancel}>Back</button></a>
			</div>
            <form className={styles.signup}>
                <h1>Update Information</h1>
                <label>Email</label><br></br>
                <input type ='text'
                    name = 'email'
                    value = {this.state.email}
                    onChange={this.handleChange}
                    ></input><br></br>
                <label>Phone</label><br></br>
                <input type ='text'
                    name = 'phone'
                    onChange={this.handleChange}
                    value = {this.state.phone}></input><br></br>
                <label>Street</label><br></br>
                <input type ='text'
                    name = 'street'
                    onChange={this.handleChange} 
                    value = {this.state.street}></input><br></br>
                <label>City</label><br></br>
                <input type ='text'
                    name = 'city'
                    onChange={this.handleChange} 
                    value = {this.state.city}></input><br></br>
                <label>State</label><br></br>
                <input type = 'text'
                    name = 'state'
                    onChange={this.handleChange}
                    value = {this.state.state}></input><br></br>
                <label>ZipCode</label><br></br>
                <input type='text'
                    name = 'zipcode'
                    onChange={this.handleChange}
                    value = {this.state.zipcode}></input><br></br>
                <label>Apt Number (optional)</label><br></br>
                <input type='text' 
                    name = 'aptnum'
                    onChange={this.handleChange}
                    value = {this.state.aptnum}></input><br></br>
                <button onClick={this.handleSubmit}>Submit</button> <br/>
            </form>
		</div>
        )
    }
}

export default UpdateInfo
