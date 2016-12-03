import React from 'react';
import PurchasesTable from 'app/components/patterns/PurchasesTable';

import { isMobile } from 'app/util/mobile';
import { observePurchases } from 'app/util/firebase';
import { formatDollarAmount } from 'app/util/formatters';

const PurchasesByExpense = React.createClass({

	contextTypes: {
		router: React.PropTypes.object
	},

	propsTypes: {
		params: React.PropTypes.object.isRequired
	},

	getInitialState() {
		return {
			purchases: []
		};
	},

	componentDidMount() {
		this.observePurchases(this.props.params.expenseId);
	},

	componentWillReceiveProps(nextProps) {
		if (this.props.params.expenseId !== nextProps.params.expenseId) {
			this.stopObservingPurchases();
			this.observePurchases(nextProps.params.expenseId);
		}
	},

	componentWillUnmount() {
		this.stopObservingPurchases();
	},

	////////////////////////////////////////

	observePurchases(expenseId) {
		this.stopObservingPurchases = observePurchases({ expenseId }, (purchases) => {
			this.setState({ purchases });
		});
	},

	////////////////////////////////////////

	render() {
		return <PurchasesTable purchases={this.state.purchases} />;
	}

});

export default PurchasesByExpense;