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

	getInitialState() {
		return {
			purchases: null,
			expenses: null
		};
	},

	componentDidMount() {
		this.stopObservingPurchases = observePurchases(null, (purchases) => {
			this.setState({ purchases });
		});

		this.stopObservingExpenses = observeExpenses((expenses) => {
			this.setState({ expenses });
		});
	},

	componentWillUnmount() {
		this.stopObservingPurchases();
		this.stopObservingExpenses();
	},

	render() {
		const { purchases, expenses } = this.state;
		if (!purchases || !expenses) {
			return null;
		}

		const totalBudgeted = expenses.reduce((total, expense) => {
			return (total + expense.monthlyCost);
		}, 0);

		return <PurchasesTable purchases={purchases} totalBudgeted={totalBudgeted} />;
	}

});

export default PurchasesList;