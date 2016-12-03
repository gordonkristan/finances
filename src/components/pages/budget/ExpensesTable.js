import _ from 'lodash';
import React from 'react';
import Expense from 'app/models/expense';
import Table from 'app/components/util/Table';

import { Link } from 'react-router';
import { isMobile } from 'app/util/mobile';
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
			const expense = new Expense(expenseSnapshot);

			if (!expense.isDisabled) {
				expenses.push(expense);
			}
		});

		this.setState({ expenses });
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
				formatDollarAmount(expense.cost)
			];
		});

		const footer = [
			'Total Budgeted',
			formatDollarAmount(_.sumBy(this.state.expenses, 'cost'))
		];

		const onRowClicked = (row, index) => {
			const expense = this.state.expenses[index];
			this.context.router.push(`/budget/expenses/${expense.id}/details`);
		};

		return { headers, data, footer, onRowClicked };
	},

	renderDesktopTable() {
		const headers = [
			{ label: 'Name' },
			{ label: 'Cost', justification: 'right' },
			{ label: 'Frequency', justification: 'right' },
			{ label: 'AutoPay', justification: 'center' },
			{ label: 'Fixed Cost', justification: 'center' },
			{ label: '', justification: 'center' },
			{ label: '', justification: 'center' }
		];

		const data = this.state.expenses.map((expense) => {
			return [
				expense.name,
				formatDollarAmount(expense.cost),
				formatBillingFrequency(expense.frequency),
				(expense.autoPay ? CHECK_ICON : CROSS_ICON),
				(expense.fixedCost ? CHECK_ICON : CROSS_ICON),
				<Link to={`/purchases/by-expense/${expense.id}`} title='View Purchases'>
					<i className='fa fa-bars' />
				</Link>,
				<Link to={`/budget/expenses/${expense.id}/details`} title='Edit Expense'>
					<i className='fa fa-cog' />
				</Link>
			];
		});

		const footer = [
			'Total Budgeted',
			formatDollarAmount(_.sumBy(this.state.expenses, 'cost')),
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