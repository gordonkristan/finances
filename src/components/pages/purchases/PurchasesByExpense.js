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
		const { expenseId } = this.props.params;

		this.observePurchases(expenseId);
		this.observeExpense(expenseId);
	},

	componentWillReceiveProps(nextProps) {
		const expenseId = nextProps.params.expenseId;

		if (this.props.params.expenseId !== expenseId) {
			this.stopObservingPurchases();
			this.stopObservingExpense();

			this.setState({
				purchases: null,
				expense: null
			});

			this.observePurchases(expenseId);
			this.observeExpense(expenseId);
		}
	},

	componentWillUnmount() {
		this.stopObservingPurchases();
		this.stopObservingExpense();
	},

	////////////////////////////////////////

	observePurchases(expenseId) {
		this.stopObservingPurchases = observePurchases({ expenseId }, (purchases) => {
			this.setState({ purchases });
		});
	},

	observeExpense(expenseId) {
		this.stopObservingExpense = observeExpense(expenseId, (expense) => {
			this.setState({ expense });
		});
	},

	////////////////////////////////////////

	render() {
		const { purchases, expense } = this.state;
		if (!purchases || !expense) {
			return null;
		}

		return <PurchasesTable purchases={purchases} totalBudgeted={expense.cost} />;
	}

});

export default PurchasesByExpense;