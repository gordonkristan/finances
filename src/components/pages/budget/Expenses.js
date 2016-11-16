import _ from 'lodash';
import React from 'react';
import Expense from '../../Expense';

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
						<Expense key={i} name={expense.name} amount={expense.amount}
						         frequency={expense.frequency}/>
					);
				})}
			</div>
		);
	}

});

export default Expenses;