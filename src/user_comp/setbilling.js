import React from 'react';
import { Redirect} from 'react-router-dom';

//connect database here

class Billing extends React.Component {
    state ={
        goBack: false,
    }
    handleSubmit= () => {
        //inpute code
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
                <h1>Set Up Billing</h1>
                <label>Ammount</label><br></br>
                <input type ='text' name='amount'></input><br></br>
                <label>Date</label><br></br>
                <input type ='text' name='date' 
                       ></input><br></br>
                <label>Routing Number</label><br></br>
                <input type ='text' name = 'routing'></input><br></br>
                <label>Recipient Account Number</label><br></br>
                <input type = 'text' name = 'recipient'></input><br></br>
                <button onClick={this.handleSubmit}>Submit</button>
                <button onClick={this.handleSubmit}>Cancel</button>
            </form>
        )
    }
}

export default Billing
