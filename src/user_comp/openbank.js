import React from 'react';
import { Redirect} from 'react-router-dom';
//import Account from './account.js';
//import {myaccounts} from './usermain.js';


class OpenAcc extends React.Component{
    state ={
        acctype: 'checking',
        goBack: false,
    }
    handleSubmit= () => {
        //event.preventDefault();

        let formData = new FormData();
        formData.append('acctype', this.state.acctype);
        this.setState({
            goBack: true
        })
        /** 
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
    handleChange = (event) => {
        this.setState({
            acctype: event.target.value
        })
    }
    handleCancel =() =>{
        this.setState({
            goBack: true
        })
    }
    render(){
        if (this.state.goBack ){
            return <Redirect to="/usermain/"/>
        } 
        
        return(
            <form >
                <h1>Open New Account</h1>
                <select value ={this.state.acctype}
                        onChange={this.handleChange} >
                        <option value= "checking">Checking </option>
                        <option value= "saving">Saving </option>
                    </select>
                <button onClick={this.handleSubmit}>Submit</button>
                <button onClick={this.handleCancel}>Cancel</button>
            </form>
        )
    }
}
export default OpenAcc