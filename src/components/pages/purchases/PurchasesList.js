import React from 'react';
import moment from 'moment';
import Purchase from 'app/models/purchase';
import PurchasesTable from 'app/components/patterns/PurchasesTable';

import { isMobile } from 'app/util/mobile';
import { createDataRef } from 'app/util/firebase';
import { formatDollarAmount } from 'app/util/formatters';

const PurchasesList = React.createClass({

	contextTypes: {
		router: React.PropTypes.object
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
		const purchases = [];

		purchasesSnapshot.forEach((purchaseSnapshot) => {
			purchases.push(new Purchase(purchaseSnapshot));
		});

		this.setState({ purchases });
	},

	////////////////////////////////////////

	render() {
		return <PurchasesTable purchases={this.state.purchases} />;
	}

});

export default PurchasesList;