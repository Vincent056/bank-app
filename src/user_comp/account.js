import React from 'react';


class Account extends React.Component {

    accsummary = () => {
        this.props.sum()
    }
    formatAmount(balance) {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        if (formatter.format(balance).length > 16){
            let format = formatter.format(balance).substring(0,16)
            format = format.concat('...')
            return format
        }
        return formatter.format(balance);
    }
    render() {

        return (
            <div>
                <button className='account'
                    onClick={this.accsummary}>
                    <p className='acc_name'>SILICON  {this.props.acc.account_type.toUpperCase()}   -   {this.props.acc.account_id}</p>
                    <p className='acc_money' >{this.formatAmount(this.props.acc.balance)}</p>
                    <p className='acc_name'> {this.props.acc.status}</p>
                </button><br></br>
            </div>
        )
    }
}
export default Account
