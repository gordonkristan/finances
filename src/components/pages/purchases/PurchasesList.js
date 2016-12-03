import React from 'react';
import PurchasesTable from 'app/components/patterns/PurchasesTable';

import { isMobile } from 'app/util/mobile';
import { observePurchases } from 'app/util/firebase';
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
		this.stopObservingPurchases = observePurchases(null, (purchases) => {
			this.setState({ purchases });
		});
	},

	componentWillUnmount() {
		this.stopObservingPurchases()
	},

	render() {
		return <PurchasesTable purchases={this.state.purchases} />;
	}

});

export default PurchasesList;