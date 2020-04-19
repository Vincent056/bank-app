import React from 'react';
import axios from 'axios';

//import Account from './account.js';
//import {myaccounts} from './usermain.js';


class AccSum extends React.Component{
    constructor(){
        super()
        this.state ={
            goBack: false,
           
        }
        
    }
    
    handleCancel =() =>{
        this.props.goback()
    }
    handleDelete =(event) =>{
        event.preventDefault();

        let userInfo = new FormData();
        userInfo.append('acc_id',this.props.accid)
        axios({
            method: 'post',
            url: 'https://bank.cvs3.com/bank-app/api/closebank.php',
            //url: 'http://localhost/openbank.php',
            data: userInfo,
            config: {headers: {'Content-Type': 'x-www-form-urlencoded'}}
        }).then( (response) => {  
            // handle success
            console.log(response.data)
            
        }).catch(function(error) {
            // handle error
            console.log(error)
        })
        this.props.goback()
    }
    render(){
       
        console.log(this.props.accid)
        return(
            <div>
                <p>This is the account summary</p>
                
                <button onClick={this.handleCancel}>Back</button>
                <button onClick={this.handleDelete}>Delete This Account</button>
            </div>
        )
    }
}
export default AccSum
