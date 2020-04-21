import React from 'react';


class Bill extends React.Component{
    constructor(props){
        super(props)
        
        this.handleDelete = this.handleDelete.bind(this);
    }
   

    handleDelete = (event) => {
        event.preventDefault()
        this.props.delete()
    }
    render(){

        return(

                <tr>
                    <td>{this.props.bill.destination}</td>
                    <td>{this.props.bill.amount}</td>
                    <td>{this.props.bill.start_date}</td>
                    <td>{this.props.bill.end_date}</td>
                    <td>{this.props.bill.day}</td>
                    <td>
                    <button onClick = {this.handleDelete}>
                        Cancel
                    </button>
                    </td>
                </tr>
        )
    }
}
export default Bill
