import React from 'react';
import PurchasesTable from 'app/components/patterns/PurchasesTable';

import { isMobile } from 'app/util/mobile';
import { formatDollarAmount } from 'app/util/formatters';
import {
	observePurchases,
	observeExpenses
} from 'app/util/firebase';

const PurchasesList = React.createClass({

	contextTypes: {
		router: React.PropTypes.object
	},

	propsTypes: {
		params: React.PropTypes.object.isRequired
	},

	getInitialState() {
		return {
			purchases: null,
			expenses: null
		};
	},

	componentDidMount() {
		this.observePurchases(this.props.params.month);

		this.stopObservingExpenses = observeExpenses((expenses) => {
			this.setState({ expenses });
		});
	},

	componentWillReceiveProps(nextProps) {
		const { month } = nextProps.params;

		if (this.props.params.month !== month) {
			this.stopObservingPurchases();
			this.setState({ purchases: null });
			this.observePurchases(month);
		}
	},

	componentWillUnmount() {
		this.stopObservingPurchases();
		this.stopObservingExpenses();
	},

	////////////////////////////////////////

	observePurchases(month) {
		this.stopObservingPurchases = observePurchases({ month }, (purchases) => {
			this.setState({ purchases });
		});
	},

	onMonthChanged(month) {
		this.context.router.push(`/purchases/${month}`);
	},

	////////////////////////////////////////

	render() {
		const { purchases, expenses } = this.state;
		if (!purchases || !expenses) {
			return null;
		}

		const totalBudgeted = expenses.reduce((total, expense) => {
			return (total + expense.monthlyCost);
		}, 0);

		return (
			<PurchasesTable
				purchases={purchases}
				totalBudgeted={totalBudgeted}
				month={this.props.params.month}
			    onMonthChanged={this.onMonthChanged}
			/>
		);
	}

});

export default PurchasesList;