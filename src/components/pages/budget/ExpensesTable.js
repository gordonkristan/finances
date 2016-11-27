import React from 'react';
import Expense from 'app/models/expense';

import { Link } from 'react-router';
import { isMobile } from 'app/util/mobile';
import {
	formatDollarAmount,
	formatBillingFrequency
} from 'app/util/formatters';

const ExpensesTable = React.createClass({

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

	renderMobileTable() {
		return (
			<table className='table table-striped'>
				<thead>
					<tr>
						<th>Name</th>
						<th style={{textAlign: 'right'}}>Cost</th>
					</tr>
				</thead>
				<tbody>
					{this.state.expenses.map((expense) => {
						return (
							<tr key={expense.id}>
								<td>{expense.name}</td>
								<td style={{textAlign: 'right'}}>
									{formatDollarAmount(expense.cost)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	},

	renderDesktopTable() {
		const columnStyle = {textAlign: 'right', width: 1, whiteSpace: 'nowrap'};

		return (
			<table className='table table-striped'>
				<thead>
					<tr>
						<th>Name</th>
						<th style={columnStyle}>
							Cost
						</th>
						<th style={columnStyle}>
							Frequency
						</th>
						<th style={columnStyle}>
							AutoPay
						</th>
						<th style={columnStyle}>
							Fixed Cost
						</th>
						<th style={columnStyle} />
					</tr>
				</thead>
				<tbody>
				{this.state.expenses.map((expense) => {
					return (
						<tr key={expense.id}>
							<td>
								{expense.name}
							</td>
							<td style={columnStyle}>
								{formatDollarAmount(expense.cost)}
							</td>
							<td style={columnStyle}>
								{formatBillingFrequency(expense.frequency)}
							</td>
							<td style={columnStyle}>
								<input
									type='checkbox'
									className='form-check-input'
									checked={expense.autoPay}
									readOnly={true}
								/>
							</td>
							<td style={columnStyle}>
								<input
									type='checkbox'
									className='form-check-input'
									checked={expense.fixedCost}
									readOnly={true}
								/>
							</td>
							<td style={columnStyle}>
								<Link to={`/budget/expenses/${expense.id}/details`}>
									<i className='fa fa-cog' />
								</Link>
							</td>
						</tr>
					);
				})}
				</tbody>
			</table>
		);
	},

	render() {
		return (isMobile ? this.renderMobileTable() : this.renderDesktopTable());
	}

});

export default ExpensesTable;