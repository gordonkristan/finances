import React from 'react';

const Expense = React.createClass({
    render() {
        return (
            <div className='card card-block'>
                <h5 className='card-title'>{this.props.name}</h5>
                <p className='card-text'>Cost: ${this.props.amount}</p>
                <p className='card-text'>Frequency: {this.props.frequency}</p>
                <a className='card-link' href='#'>View Details</a>
            </div>
        );
    }
});

export default Expense;