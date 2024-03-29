import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import Icon from 'app/components/util/Icon';
import Table from 'app/components/util/Table';
import ExpenseCategory from 'app/models/expense-category';

import { Link } from 'react-router';
import { isMobile } from 'app/util/mobile';
import {
	formatDollarAmount,
	formatBillingFrequency
} from 'app/util/formatters';

const CHECK_ICON = <Icon name='check' style={{color: 'green'}} />;
const CROSS_ICON = <Icon name='close' style={{color: 'red'}} />;

const pickArrayIndices = (array, indices) => {
	return _.map(indices, (index) => array[index]);
};

class ExpensesTable extends React.Component {

	static contextTypes = {
		router: React.PropTypes.object
	};

	static propTypes = {
		expenseCategories: React.PropTypes.arrayOf(React.PropTypes.instanceOf(ExpenseCategory)).isRequired
	};

	////////////////////////////////////////

	getTableRows(expenseCategories) {
		return expenseCategories.reduce((rows, category) => {
			const categoryRow = this.getCategoryRow(category);
			const expenseRows = category.expenses.map(this.getExpenseRow.bind(this));

			return rows.concat([categoryRow]).concat(expenseRows);
		}, []);
	}

	getCategoryRow(category) {
		return [
			<Link to={`/purchases/${moment().format('YYYY-MM')}/by-category/${category.id}`}>
				{category.name}
			</Link>,
			null,
			formatDollarAmount(category.monthlyCost),
			null,
			null,
			null,
			<Link to={`/budget/categories/${category.id}/details`} title='Edit Expense'>
				<Icon name='cog' />
			</Link>
		];
	}

	getExpenseRow(expense) {
		const marginLeft = (isMobile ? 0 : '2em');

		return [
			<Link to={`/purchases/${moment().format('YYYY-MM')}/by-expense/${expense.id}`} style={{marginLeft}}>
				{isMobile ? '\u2014' : ''} {expense.name}
			</Link>,
			formatDollarAmount(expense.cost),
			formatDollarAmount(expense.monthlyCost),
			formatBillingFrequency(expense.frequency),
			(expense.autoPay ? CHECK_ICON : CROSS_ICON),
			(expense.fixedCost ? CHECK_ICON : CROSS_ICON),
			<Link to={`/budget/expenses/${expense.id}/details`} title='Edit Expense'>
				<Icon name='cog' />
			</Link>
		];
	}

	////////////////////////////////////////

	render() {
		let headers = [
			{ label: 'Name' },
			{ label: 'Cost', justification: 'right' },
			{ label: 'Monthly Cost', justification: 'right' },
			{ label: 'Frequency', justification: 'right' },
			{ label: 'AutoPay', justification: 'center' },
			{ label: 'Fixed Cost', justification: 'center' },
			{ label: '', justification: 'center' },
			{ label: '', justification: 'center' }
		];

		let data = this.getTableRows(this.props.expenseCategories);

		let footers = [[
			'Total Budgeted Monthly',
			null,
			formatDollarAmount(this.props.expenseCategories.reduce((total, category) => {
				return (total + category.monthlyCost);
			}, 0)),
			null,
			null,
			null,
			null
		]];

		if (isMobile) {
			const indices = [0, 2];

			headers = pickArrayIndices(headers, indices);

			data = data.map((row) => {
				return pickArrayIndices(row, indices);
			});

			footers = [pickArrayIndices(footers[0], indices)];
		}

		return <Table headers={headers} data={data} footers={footers} />;
	}

}

export default ExpensesTable;