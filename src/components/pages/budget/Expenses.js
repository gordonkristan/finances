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
			expenses: expensesSnapshot.val()
		});
	},

	////////////////////////////////////////

	render() {
		return (
			<div>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Cost</th>
						</tr>
					</thead>
					<tbody>
						{_.map(this.state.expenses, (expense, id) => {
							return (
								<tr key={id}>
									<td>{expense.name}</td>
									<td>{expense.amount}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}

});

export default Expenses;