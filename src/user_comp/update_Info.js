import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import styles from './../mystyle.module.css';

class UpdateInfo extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            phone: "",
            street: "",
            city: "",
            state: "",
            zipcode: "",
            aptnum: "",
            goBack: false,
            message: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    checkInput = () => {
        const state = /^[A-Z]{2}$/
        const zip = /^[0-9]{5}$/
        const phone = /^[0-9]{10}$/
        const email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

        if (this.state.street === ""
            || this.state.city === ""
            || this.state.state === ""
            || this.state.zipcode === ""
            || this.state.phone === ""
            || this.state.email === "")
            return 'E';
        else if (!(email.test(this.state.email))) return 'EM'
        else if (!(phone.test(this.state.phone))) return 'P'
        else if (!(state.test(this.state.state))) return 'S'
        else if (!(zip.test(this.state.zipcode))) return 'Z'


        else return 'OK';
    }
    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let check = this.checkInput()
        if (check === 'OK') {
            let userInfo = new FormData();
            userInfo.append('id', this.props.cus_id)
            userInfo.append('street', this.state.street)
            userInfo.append('city', this.state.city)
            userInfo.append('stateInCountry', this.state.state)
            userInfo.append('phone', this.state.phone)
            userInfo.append('userEmail', this.state.email)
            userInfo.append('zipCode', this.state.zipcode)
            userInfo.append('apartment_number', this.state.aptnum)

            axios({
                method: 'post',
                url: 'https://bank.cvs3.com/bank-app/api/updateprofile.php',
                data: userInfo,
                config: { headers: { 'Content-Type': 'x-www-form-urlencoded' } }
            }).then((response) => {
                // handle success
                console.log(response.data)
                if (response.data === 'OK'){
                this.setState({
                    message: 'Updated! '
                })
            }
            else{
                this.setState({
                    message: 'Oops! Something went wrong! Please try again!'
                })
            }
            }).catch(function (error) {
                // handle error
                console.log(error)
            })
        }
        else if (check === 'E') {
            this.setState({
                message: 'Please fill out required fields!',
            })
        }
        else if (check === 'S') {
            this.setState({
                message: 'Invalid State format!',
                state: ''
            })
        }
        else if (check === 'Z') {
            this.setState({
                message: 'Invalid Zip Code format!',
                zipcode: ''
            })
        }
        else if (check === 'P') {
            this.setState({
                message: 'Invalid Phone format!',
                phone: ''
            })
        }
        else if (check === 'EM') {
            this.setState({
                message: 'Invalid Email format!',
                email: ''
            })
        }
    }

    handleCancel = () => {
        this.setState({
            goBack: true
        })
    }
    render() {
        if (this.state.goBack) {
            return <Redirect to="/usermain/" />
        }

        return (
            <div className={styles.center}>
                <div className={styles.topnav}>
                    <a><button className={styles.buttontopnav} onClick={this.handleCancel}>Back</button></a>
                </div>
                {this.props.cus_id === undefined &&
                    <p>Please log in to use this option.</p>}
                 {this.props.cus_id !== undefined &&
                <form className={styles.signup}>
                    <h1 className ='update'>Update Information</h1>
                   
                    <label>Email</label><br></br>
                    <input type='text'
                        name='email'
                        placeholder="e.g. johndoe@gmail.com"
                        value={this.state.email}
                        onChange={this.handleChange}
                    ></input><br></br>
                    <label>Phone</label><br></br>
                    <input type='text'
                        name='phone'
                        title="Please enter only numbers"
                        placeholder="e.g. 5555555555"
                        onChange={this.handleChange}
                        value={this.state.phone}></input><br></br>
                    <label>Street</label><br></br>
                    <input type='text'
                        name='street'
                        onChange={this.handleChange}
                        placeholder="e.g. 1st Street"
                        value={this.state.street}></input><br></br>
                    <label>City</label><br></br>
                    <input type='text'
                        name='city'
                        placeholder="e.g. San Francisco"
                        onChange={this.handleChange}
                        value={this.state.city}></input><br></br>
                    <label>State</label><br></br>
                    <input type='text'
                        name='state'
                        onChange={this.handleChange}
                        placeholder="e.g. CA"
                        title="Please enter two letter state code"
                        value={this.state.state}></input><br></br>
                    <label>ZipCode</label><br></br>
                    <input type='text'
                        name='zipcode'
                        title="Please enter five number zip code"
                        placeholder="e.g. 12345"
                        onChange={this.handleChange}
                        value={this.state.zipcode}></input><br></br>
                    <label>Apt Number (optional)</label><br></br>
                    <input type='text'
                        name='aptnum'
                        placeholder="e.g. 123"
                        onChange={this.handleChange}
                        value={this.state.aptnum}></input><br></br><br></br>
                    <button className ='submit_butt' onClick={this.handleSubmit}>Submit</button>
                    {this.state.message}
                </form>}
            </div>
        )
    }
}

export default UpdateInfo
