import React from 'react';
import { Redirect} from 'react-router-dom';

class UpdateInfo extends React.Component {
    state ={
        goBack: false,
    }
    handleSubmit= () => {
        //***********code to modified databased data here
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
                <h1>Update Information</h1>
                <label>Email</label><br></br>
                <input type ='email' name='u_email'></input><br></br>
                <label>Phone</label><br></br>
                <input type ='tel' name='u_phone' 
                        pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'></input><br></br>
                <label>Street</label><br></br>
                <input type ='text' name = 'u_street'></input><br></br>
                <label>State</label><br></br>
                <input type = 'text' name = 'u_state' pattern = '[A-Za-z]{2}'></input><br></br>
                <label>ZipCode</label><br></br>
                <input type='text' name = 'u_zip'pattern= '[0-9]{5}'></input><br></br>
                <label>Apt Number (optional)</label><br></br>
                <input type='text' name ='u_aptnum'></input><br></br>
                <button onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}

export default UpdateInfo
