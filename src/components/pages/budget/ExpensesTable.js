import React from 'react';
import Expense from 'app/models/expense';
import Icon from 'app/components/util/Icon';
import Table from 'app/components/util/Table';

import { Link } from 'react-router';
import { isMobile } from 'app/util/mobile';
import {
	formatDollarAmount,
	formatBillingFrequency
} from 'app/util/formatters';

const CHECK_ICON = <Icon name='check' style={{color: 'green'}} />;
const CROSS_ICON = <Icon name='close' style={{color: 'red'}} />;

class ExpensesTable extends React.Component {

	static contextTypes = {
		router: React.PropTypes.object
	};

	static propTypes = {
		expenses: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Expense)).isRequired
	};

	renderMobileTable() {
		const headers = [
			{ label: 'Name' },
			{ label: 'Cost', justification: 'right' }
		];

		const data = this.props.expenses.map((expense) => {
			return [
				expense.name,
				formatDollarAmount(expense.monthlyCost)
			];
		});

		const footers = [[
			'Total Budgeted',
			formatDollarAmount(this.props.expenses.reduce((total, expense) => {
				return (total + expense.monthlyCost);
			}, 0)),
		]];

		const onRowClicked = (row, index) => {
			const expense = this.props.expenses[index];
			this.context.router.push(`/purchases/by-expense/${expense.id}`);
		};

		return { headers, data, footers, onRowClicked };
	}

	renderDesktopTable() {
		const headers = [
			{ label: 'Name' },
			{ label: 'Cost', justification: 'right' },
			{ label: 'Monthly Cost', justification: 'right' },
			{ label: 'Frequency', justification: 'right' },
			{ label: 'AutoPay', justification: 'center' },
			{ label: 'Fixed Cost', justification: 'center' },
			{ label: '', justification: 'center' },
			{ label: '', justification: 'center' }
		];

		const data = this.props.expenses.map((expense) => {
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
				</Link>
			];
		});

		const footers = [[
			'Total Budgeted Monthly',
			null,
			formatDollarAmount(this.props.expenses.reduce((total, expense) => {
				return (total + expense.monthlyCost);
			}, 0)),
			null,
			null,
			null,
			null,
			null
		]];

		return { headers, data, footers };
	}

	render() {
		const props = (isMobile ? this.renderMobileTable() : this.renderDesktopTable());

		return <Table {...props} />;
	}

}

export default ExpensesTable;