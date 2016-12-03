import React from 'react';
import moment from 'moment';
import Expense from 'app/models/expense';
import Purchase from 'app/models/purchase';
import Table from 'app/components/util/Table';

import { Link } from 'react-router';
import { isMobile } from 'app/util/mobile';
import { formatDollarAmount } from 'app/util/formatters';

const PurchasesTable = React.createClass({

	contextTypes: {
		router: React.PropTypes.object
	},

	getInitialState() {
		return {
			purchases: [],
			expenses: {}
		};
	},

	componentDidMount() {
		const uid = firebase.auth().currentUser.uid;

		this.purchasesRef = firebase.database().
			ref(`data/${uid}/transactions/purchases`).
			orderByChild('date').
			startAt(moment().startOf('month').format('YYYY-MM-DD')).
			endAt(moment().endOf('month').format('YYYY-MM-DD'));

		this.purchasesRef.on('value', this.purchasesUpdated);

		this.expensesRef = firebase.database().ref(`data/${uid}/budget/expenses`);
		this.expensesRef.on('value', this.expensesUpdated);
	},

	componentWillUnmount() {
		this.purchasesRef.off('value', this.purchasesUpdated);
		this.expensesRef.off('value', this.expensesUpdated);
	},

	////////////////////////////////////////

	purchasesUpdated(purchasesSnapshot) {
		const purchases = [];

		purchasesSnapshot.forEach((purchaseSnapshot) => {
			purchases.push(new Purchase(purchaseSnapshot));
		});

		this.setState({ purchases });
	},

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

	renderMobileTable() {
		const headers = [
			{ label: 'Date' },
			{ label: 'Expense' },
			{ label: 'Cost', justification: 'right' }
		];

		const data = this.state.purchases.map((purchase) => {
			return [
				purchase.date.format('MMM d'),
				this.getExpenseName(purchase.expenseId),
				formatDollarAmount(purchase.cost)
			];
		});

		const onRowClicked = (row, index) => {
			const purchase = this.state.purchases[index];
			this.context.router.push(`/purchases/${purchase.id}/details`);
		};

		return { headers, data, onRowClicked };
	},

	renderDesktopTable() {
		const headers = [
			{ label: 'Date' },
			{ label: 'Expense' },
			{ label: 'Description' },
			{ label: 'Cost', justification: 'right' },
			{ label: '', justification: 'center' }
		];

		const data = this.state.purchases.map((purchase) => {
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

		return { headers, data };
	},

	render() {
		const props = (isMobile ? this.renderMobileTable() : this.renderDesktopTable());

		return <Table {...props} />;
	}

});

export default PurchasesTable;