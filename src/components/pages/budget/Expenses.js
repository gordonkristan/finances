import _ from 'lodash';
import React from 'react';

const Expenses = React.createClass({

	getInitialState() {
		return {
			expenses: []
		};
	},

	componentDidMount() {
		const uid = firebase.auth().currentUser.uid;
		this.dataRef = firebase.database().ref(`data/${uid}/budget/expenses`);
		this.dataRef.on('value', this.expensesUpdated);
	},

	componentWillUnmount() {
		this.dataRef.off('value', this.expensesUpdated);
	},

	////////////////////////////////////////

	expensesUpdated(expensesSnapshot) {
		this.setState({
			expenses: _.values(expensesSnapshot.val())
		});
	},

	////////////////////////////////////////

	render() {
		return (
			<div>
				{this.state.expenses.map((expense, i) => {
					return (
						<div className='card card-block' key={i}>
							<h5 className='card-title'>{expense.name}</h5>
							<p className='card-text'>Cost: ${expense.amount}</p>
							<p className='card-text'>Frequency: {expense.frequency}</p>
							<a className='card-link' href='#'>View Details</a>
						</div>
					);
				})}
			</div>
		);
	}

});

export default Expenses;