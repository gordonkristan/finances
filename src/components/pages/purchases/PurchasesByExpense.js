import React from 'react';
import PurchasesTable from 'app/components/patterns/PurchasesTable';

import { isMobile } from 'app/util/mobile';
import { formatDollarAmount } from 'app/util/formatters';
import {
	observePurchases,
	observeExpense
} from 'app/util/firebase';

const PurchasesByExpense = React.createClass({

	contextTypes: {
		router: React.PropTypes.object
	},

	propsTypes: {
		params: React.PropTypes.object.isRequired
	},

	getInitialState() {
		return {
			purchases: null,
			expense: null
		};
	},

	componentDidMount() {
		const { expenseId, month } = this.props.params;

		this.observePurchases(expenseId, month);
		this.observeExpense(expenseId);
	},

	componentWillReceiveProps(nextProps) {
		const { expenseId, month } = nextProps.params;

		if (this.props.params.expenseId !== expenseId || this.props.params.month !== month) {
			this.stopObservingPurchases();
			this.stopObservingExpense();

			this.setState({
				purchases: null,
				expense: null
			});

			this.observePurchases(expenseId, month);
			this.observeExpense(expenseId);
		}
	},

	componentWillUnmount() {
		this.stopObservingPurchases();
		this.stopObservingExpense();
	},

	////////////////////////////////////////

	observePurchases(expenseId, month) {
		this.stopObservingPurchases = observePurchases({ expenseId, month }, (purchases) => {
			this.setState({ purchases });
		});
	},

	observeExpense(expenseId) {
		this.stopObservingExpense = observeExpense(expenseId, (expense) => {
			this.setState({ expense });
		});
	},

	onMonthChanged(month) {
		this.context.router.push(`/purchases/${month}/by-expense/${this.props.params.expenseId}`);
	},

	////////////////////////////////////////

	render() {
		const { purchases, expense } = this.state;
		if (!purchases || !expense) {
			return null;
		}

		return (
			<PurchasesTable
				purchases={purchases}
				totalBudgeted={expense.cost}
			    month={this.props.params.month}
			    onMonthChanged={this.onMonthChanged}
			/>
		);
	}

});

export default PurchasesByExpense;