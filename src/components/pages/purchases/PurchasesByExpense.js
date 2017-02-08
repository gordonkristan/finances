import React from 'react';
import Expense from 'app/models/expense';
import Purchase from 'app/models/purchase';
import PurchasesTable from 'app/components/patterns/PurchasesTable';

class PurchasesByExpense extends React.Component {

	static contextTypes = {
		router: React.PropTypes.object
	};

	static propsTypes = {
		models: React.PropTypes.shape({
			expense: React.PropTypes.instanceOf(Expense).isRequired,
			purchases: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Purchase)).isRequired
		}).isRequired
	};

	////////////////////////////////////////

	onMonthChanged(month) {
		this.context.router.push(`/purchases/${month}/by-expense/${this.props.params.expenseId}`);
	}

	////////////////////////////////////////

	render() {
		const { purchases, expense } = this.props.models;

		return (
			<PurchasesTable
				purchases={purchases}
				totalBudgeted={expense.cost}
			    month={this.props.params.month}
			    onMonthChanged={this.onMonthChanged.bind(this)}
			/>
		);
	}

}

export default PurchasesByExpense;