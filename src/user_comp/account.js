import React from 'react';


class Account extends React.Component{
    
    accsummary = () => {
        this.props.sum()
    }
    render(){

        return(
            <div>
            <button className = 'account' 
                    onClick={this.accsummary}>
                            <li>ID: {this.props.acc.account_id}</li> 
                            <li>Type: {this.props.acc.account_type}</li>
                            <li>Balance: {this.props.acc.balance}</li>
                            <li>Status: {this.props.acc.status}</li>
                        </button>
            </div>
        )
    }
}
export default Account
