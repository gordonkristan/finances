import React from 'react';
import Expense from 'app/models/expense';

import { isMobile } from 'app/util/mobile';
import {
	formatDollarAmount,
	formatBillingFrequency
} from 'app/util/formatters';

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
		const expenses = [];

		expensesSnapshot.forEach((expenseSnapshot) => {
			expenses.push(new Expense(expenseSnapshot));
		});

		this.setState({ expenses });
	},

	////////////////////////////////////////

	render() {
		return (
			<div className='col-xs-12'>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Cost</th>
							{!isMobile && <th>Frequency</th>}
							{!isMobile && <th>AutoPay</th>}
							{!isMobile && <th>Fixed Cost</th>}
						</tr>
					</thead>
					<tbody>
						{this.state.expenses.map((expense) => {
							return (
								<tr key={expense.id}>
									<td>{expense.name}</td>
									<td>{formatDollarAmount(expense.cost)}</td>
									{!isMobile && <td>{formatBillingFrequency(expense.frequency)}</td>}
									{!isMobile &&
										<td>
											<input
												type='checkbox'
												className='form-check-input'
												checked={expense.autoPay}
												readOnly={true}
											/>
										</td>
									}
									{!isMobile &&
										<td>
											<input
												type='checkbox'
												className='form-check-input'
												checked={expense.fixedCost}
												readOnly={true}
											/>
										</td>
									}
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