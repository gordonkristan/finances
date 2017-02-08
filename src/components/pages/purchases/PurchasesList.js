import React from 'react';
import Expense from 'app/models/expense';
import Purchase from 'app/models/purchase';
import PurchasesTable from 'app/components/patterns/PurchasesTable';

class PurchasesList extends React.Component {

	static contextTypes = {
		router: React.PropTypes.object
	};

	static propsTypes = {
		models: React.PropTypes.shape({
			expenses: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Expense)).isRequired,
			purchases: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Purchase)).isRequired
		}).isRequired
	};

	////////////////////////////////////////

	onMonthChanged(month) {
		this.context.router.push(`/purchases/${month}`);
	}

	////////////////////////////////////////

	render() {
		const { purchases, expenses } = this.props.models;

		const totalBudgeted = expenses.reduce((total, expense) => {
			return (total + expense.monthlyCost);
		}, 0);

		return (
			<PurchasesTable
				purchases={purchases}
				totalBudgeted={totalBudgeted}
				month={this.props.params.month}
				onMonthChanged={this.onMonthChanged.bind(this)}
			/>
		);
	}

}

export default PurchasesList;