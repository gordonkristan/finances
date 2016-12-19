import _ from 'lodash';
import React from 'react';
import Expense from 'app/models/expense';
import Purchase from 'app/models/purchase';
import Table from 'app/components/util/Table';

import { Link } from 'react-router';
import { isMobile } from 'app/util/mobile';
import { createDataRef } from 'app/util/firebase';
import { formatDollarAmount } from 'app/util/formatters';

const pickArrayIndices = (array, indices) => {
	return _.map(indices, (index) => array[index]);
};

const PurchasesTable = React.createClass({

	contextTypes: {
		router: React.PropTypes.object
	},

	propTypes: {
		purchases: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Purchase)).isRequired,
		totalBudgeted: React.PropTypes.number.isRequired
	},

	getInitialState() {
		return {
			expenses: {}
		};
	},

	componentDidMount() {
		this.expensesRef = createDataRef('budget/expenses');
		this.expensesRef.on('value', this.expensesUpdated);
	},

	componentWillUnmount() {
		this.expensesRef.off('value', this.expensesUpdated);
	},

	////////////////////////////////////////

	expensesUpdated(expensesSnapshot) {
		const expenses = {};

		expensesSnapshot.forEach((expenseSnapshot) => {
			const expense = new Expense(expenseSnapshot);
			expenses[expense.id] = expense;
		});

		this.setState({ expenses });
	},

	getExpenseName(id) {
		const expense = this.state.expenses[id];
		return (expense ? expense.name : '-');
	},

	////////////////////////////////////////

	render() {
		const { purchases, totalBudgeted } = this.props;

		const headers = [
			{ label: 'Date' },
			{ label: 'Expense' },
			{ label: 'Description' },
			{ label: 'Cost', justification: 'right' },
			{ label: '', justification: 'center' }
		];

		const data = purchases.map((purchase) => {
			return [
				purchase.date.format('MMM D'),
				<Link to={`/purchases/by-expense/${purchase.expenseId}`}>
					{this.getExpenseName(purchase.expenseId)}
				</Link>,
				purchase.description,
				formatDollarAmount(purchase.cost),
				<Link to={`/purchases/${purchase.id}/details`}>
					<i className='fa fa-cog' />
				</Link>
			];
		});

		const totalSpent = _.sumBy(purchases, 'cost');
		const diff = (totalBudgeted - totalSpent);
		const diffColor = (diff === 0 ? 'black' : (diff > 0 ? 'green' : 'red'));

		const footers = [[
			null,
			null,
			'Total Spent',
			formatDollarAmount(totalSpent),
			null
		], [
			null,
			null,
			'Amount Budgeted',
			formatDollarAmount(totalBudgeted),
			null
		], [
			null,
			null,
			<span style={{color: diffColor}}>
					{diff >= 0 ? 'Amount Left' : 'Amount Overspent'}
				</span>,
			<span style={{color: diffColor}}>
					{formatDollarAmount(diff).replace('$-', '-$')}
				</span>,
			null
		]];

		const props = { headers, data, footers };

		if (isMobile) {
			const mobileIndices = [0, 1, 3];

			props.headers = pickArrayIndices(props.headers, mobileIndices);
			props.footers = props.footers.map((row) => {
				return pickArrayIndices(row, mobileIndices);
			});

			props.data = props.data.map((row) => {
				return pickArrayIndices(row, mobileIndices);
			});

			props.onRowClicked = (row, index) => {
				const purchase = purchases[index];
				this.context.router.push(`/purchases/${purchase.id}/details`);
			};
		}

		return <Table {...props} />;
	}

});

export default PurchasesTable;