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
            currpwd: "",
            newpwd: "",
            confirmpwd: "",
            goBack: false,
            updatepwd: false,
            message: '',
            message2: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitPwd = this.handleSubmitPwd.bind(this);
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
    updatepwd = (event) => {
        event.preventDefault();
        this.setState({
            updatepwd: true
        })
    }
    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    handleSubmitPwd = (event) => {
        event.preventDefault();
        if (this.state.currpwd === '' ||
            this.state.newpwd === '' ||
            this.state.confirmpwd === '') {
            this.setState({
                message2: 'Please fill out all fields.'
            })
        }
        else {
            let userInfo = new FormData();
            userInfo.append('userid', this.props.cus_id)
            userInfo.append('olduserPassword', this.state.currpwd)
            userInfo.append('userPassword', this.state.newpwd)
            userInfo.append('userConfirmPassword', this.state.confirmpwd)

            axios({
                method: 'post',
                url: 'https://bank.cvs3.com/bank-app/api/updatePwd.php',
                data: userInfo,
                config: { headers: { 'Content-Type': 'x-www-form-urlencoded' } }
            }).then((response) => {
                // handle success
                console.log(response.data)
                if (response.data === 'OK') {
                    this.setState({
                        message2: 'Updated! '
                    })
                }
                else if (response.data === 'NOT MATCHING') {
                    this.setState({
                        message2: 'New Password and Confirm New Password do not match!'
                    })
                }
                else if (response.data === 'WRONG PASS') {
                    this.setState({
                        message2: 'Incorrect current password!'
                    })
                }
                else {
                    this.setState({
                        message2: 'Oops! Something went wrong! Please try again!'
                    })
                }
            }).catch(function (error) {
                // handle error
                console.log(error)
            })
        }
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
                if (response.data === 'OK') {
                    this.setState({
                        message: 'Updated! '
                    })
                }
                else {
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

    handleCancelPwd = () => {
        this.setState({
            updatepwd: false,
            message2: '',
            currpwd: '',
            newpwd: '',
            confirmpwd: ''
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
                        <h1 className='update'>Update Information</h1>
                        {this.state.updatepwd === false &&
                            <div>
                                <button className='submit_butt' onClick={this.updatepwd}>Change Password</button><br></br><br></br>
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
                                <button className='submit_butt' onClick={this.handleSubmit}>Submit</button>
                                {this.state.message}
                            </div>}

                        {this.state.updatepwd === true &&
                            <div>
                                <label>Current Password</label><br></br>
                                <input type='password'
                                    name='currpwd'
                                    onChange={this.handleChange}
                                    value={this.state.currpwd}></input><br></br>
                                <label>New Password</label><br></br>
                                <input type='password'
                                    name='newpwd'
                                    onChange={this.handleChange}
                                    value={this.state.newpwd}></input><br></br>
                                <label>Confirm New Password</label><br></br>
                                <input type='password'
                                    name='confirmpwd'
                                    onChange={this.handleChange}
                                    value={this.state.confirmpwd}></input><br></br>
                                <button className='submit_butt' onClick={this.handleSubmitPwd}>Submit</button>
                                <button className='submit_butt' onClick={this.handleCancelPwd}>Back</button><br></br>
                                {this.state.message2}
                            </div>}
                    </form>}
            </div>
        )
    }
}

export default UpdateInfo
