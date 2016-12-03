import React from 'react';
import moment from 'moment';
import Purchase from 'app/models/purchase';
import PurchasesTable from 'app/components/patterns/PurchasesTable';

import { isMobile } from 'app/util/mobile';
import { createDataRef } from 'app/util/firebase';
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
		this.purchasesRef = createDataRef(`transactions/purchases`).
			orderByChild('date').
			startAt(moment().startOf('month').format('YYYY-MM-DD')).
			endAt(moment().endOf('month').format('YYYY-MM-DD'));

		this.purchasesRef.on('value', this.purchasesUpdated);
	},

	componentWillUnmount() {
		this.purchasesRef.off('value', this.purchasesUpdated);
	},

	////////////////////////////////////////

	purchasesUpdated(purchasesSnapshot) {
		const { expenseId } = this.props.params;
		const purchases = [];

		purchasesSnapshot.forEach((purchaseSnapshot) => {
			const purchase = new Purchase(purchaseSnapshot);

			if (purchase.expenseId === expenseId) {
				purchases.push(purchase);
			}
		});

		this.setState({ purchases });
	},

	////////////////////////////////////////

	render() {
		return <PurchasesTable purchases={this.state.purchases} />;
	}

});

export default PurchasesByExpense;