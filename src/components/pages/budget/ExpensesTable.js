import React from 'react';
import Icon from 'app/components/util/Icon';
import Table from 'app/components/util/Table';

import { Link } from 'react-router';
import { isMobile } from 'app/util/mobile';
import { observeExpenses } from 'app/util/firebase';
import {
	formatDollarAmount,
	formatBillingFrequency
} from 'app/util/formatters';

const CHECK_ICON = <Icon name='check' style={{color: 'green'}} />;
const CROSS_ICON = <Icon name='close' style={{color: 'red'}} />;

const ExpensesTable = React.createClass({

	contextTypes: {
		router: React.PropTypes.object
	},

	getInitialState() {
		return {
			expenses: []
		};
	},

	componentDidMount() {
		this.cancelObserver = observeExpenses((expenses) => {
			this.setState({ expenses });
		});
	},

	componentWillUnmount() {
		this.cancelObserver();
	},

	////////////////////////////////////////

	moveExpenseUp(expense) {
		expense.raisePriority();
	},

	moveExpenseDown(expense) {
		expense.lowerPriority();
	},

	////////////////////////////////////////

	renderMobileTable() {
		const headers = [
			{ label: 'Name' },
			{ label: 'Cost', justification: 'right' }
		];

		const data = this.state.expenses.map((expense) => {
			return [
				expense.name,
				formatDollarAmount(expense.monthlyCost)
			];
		});

		const footers = [[
			'Total Budgeted',
			formatDollarAmount(this.state.expenses.reduce((total, expense) => {
				return (total + expense.monthlyCost);
			}, 0)),
		]];

		const onRowClicked = (row, index) => {
			const expense = this.state.expenses[index];
			this.context.router.push(`/purchases/by-expense/${expense.id}`);
		};

		return { headers, data, footers, onRowClicked };
	},

	renderDesktopTable() {
		const headers = [
			{ label: 'Name' },
			{ label: 'Cost', justification: 'right' },
			{ label: 'Monthly Cost', justification: 'right' },
			{ label: 'Frequency', justification: 'right' },
			{ label: 'AutoPay', justification: 'center' },
			{ label: 'Fixed Cost', justification: 'center' },
			{ label: '', justification: 'center' },
			{ label: '', justification: 'center' },
			{ label: '', justification: 'center' },
			{ label: '', justification: 'center' }
		];

		const data = this.state.expenses.map((expense, index, expenses) => {
			return [
				expense.name,
				formatDollarAmount(expense.cost),
				formatDollarAmount(expense.monthlyCost),
				formatBillingFrequency(expense.frequency),
				(expense.autoPay ? CHECK_ICON : CROSS_ICON),
				(expense.fixedCost ? CHECK_ICON : CROSS_ICON),
				<Link to={`/purchases/by-expense/${expense.id}`} title='View Purchases'>
					<Icon name='bars' />
				</Link>,
				<Link to={`/budget/expenses/${expense.id}/details`} title='Edit Expense'>
					<Icon name='cog' />
				</Link>,
				(index !== 0 &&
					<i
						className='fa fa-caret-up'
						style={{cursor: 'pointer'}}
						onClick={this.moveExpenseUp.bind(null, expense)}
					/>
				),
				(index !== expenses.length - 1 &&
					<i
						className='fa fa-caret-down'
						style={{cursor: 'pointer'}}
						onClick={this.moveExpenseDown.bind(null, expense)}
					/>
				)
			];
		});

		const footers = [[
			'Total Budgeted Monthly',
			null,
			formatDollarAmount(this.state.expenses.reduce((total, expense) => {
				return (total + expense.monthlyCost);
			}, 0)),
			null,
			null,
			null,
			null,
			null,
			null,
			null
		]];

		return { headers, data, footers };
	},

	render() {
		const props = (isMobile ? this.renderMobileTable() : this.renderDesktopTable());

		return <Table {...props} />;
	}

});

export default ExpensesTable;