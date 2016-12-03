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
		purchases: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Purchase)).isRequired
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
		const { purchases } = this.props;

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
				this.getExpenseName(purchase.expenseId),
				purchase.description,
				formatDollarAmount(purchase.cost),
				<Link to={`/purchases/${purchase.id}/details`}>
					<i className='fa fa-cog' />
				</Link>
			];
		});

		const footer = [
			null,
			null,
			'Total',
			formatDollarAmount(_.sumBy(purchases, 'cost')),
			null
		];

		const props = { headers, data, footer };

		if (isMobile) {
			const mobileIndices = [0, 1, 3];

			props.headers = pickArrayIndices(props.headers, mobileIndices);
			props.footer = pickArrayIndices(props.footer, mobileIndices);
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