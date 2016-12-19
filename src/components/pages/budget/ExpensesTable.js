import React from 'react';
import Table from 'app/components/util/Table';

import { Link } from 'react-router';
import { isMobile } from 'app/util/mobile';
import { observeExpenses } from 'app/util/firebase';
import {
	formatDollarAmount,
	formatBillingFrequency
} from 'app/util/formatters';

const CHECK_ICON = <i className='fa fa-check' style={{color: 'green'}} />;
const CROSS_ICON = <i className='fa fa-close' style={{color: 'red'}} />;

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

	getMonthlyCost(cost, frequency) {
		switch (frequency) {
			case 'yearly':
			case 'annually':
				return (cost / 12);
			case 'biannually':
				return (cost / 6);
			case 'weekly':
				return (cost * 4);
			case 'monthly':
				return cost;
			case 'bimonthly':
				return (cost / 2);
		}
	},

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
				formatDollarAmount(this.getMonthlyCost(expense.cost, expense.frequency))
			];
		});

		const footer = [
			'Total Budgeted',
			formatDollarAmount(this.state.expenses.reduce((total, expense) => {
				return (total + this.getMonthlyCost(expense.cost, expense.frequency));
			}, 0)),
		];

		const onRowClicked = (row, index) => {
			const expense = this.state.expenses[index];
			this.context.router.push(`/purchases/by-expense/${expense.id}`);
		};

		return { headers, data, footer, onRowClicked };
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
				formatDollarAmount(this.getMonthlyCost(expense.cost, expense.frequency)),
				formatBillingFrequency(expense.frequency),
				(expense.autoPay ? CHECK_ICON : CROSS_ICON),
				(expense.fixedCost ? CHECK_ICON : CROSS_ICON),
				<Link to={`/purchases/by-expense/${expense.id}`} title='View Purchases'>
					<i className='fa fa-bars' />
				</Link>,
				<Link to={`/budget/expenses/${expense.id}/details`} title='Edit Expense'>
					<i className='fa fa-cog' />
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

		const footer = [
			'Total Budgeted Monthly',
			null,
			formatDollarAmount(this.state.expenses.reduce((total, expense) => {
				return (total + this.getMonthlyCost(expense.cost, expense.frequency));
			}, 0)),
			null,
			null,
			null,
			null,
			null,
			null,
			null
		];

		return { headers, data, footer };
	},

	render() {
		const props = (isMobile ? this.renderMobileTable() : this.renderDesktopTable());

		return <Table {...props} />;
	}

});

export default ExpensesTable;