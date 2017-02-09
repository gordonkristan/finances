import React from 'react';
import Expense from 'app/models/expense';
import Purchase from 'app/models/purchase';
import PurchasesTable from 'app/components/patterns/PurchasesTable';

class PurchasesByExpense extends React.Component {

	static contextTypes = {
		router: React.PropTypes.object
	};

	static propsTypes = {
		params: React.PropTypes.shape({
			month: React.PropTypes.string.isRequired
		}).isRequired,
		models: React.PropTypes.shape({
			expense: React.PropTypes.instanceOf(Expense).isRequired,
			purchases: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Purchase)).isRequired
		}).isRequired
	};

	////////////////////////////////////////

	onMonthChanged(month) {
		this.context.router.push(`/purchases/${month}/by-expense/${this.props.models.expense.id}`);
	}

	////////////////////////////////////////

	render() {
		const { purchases, expense } = this.props.models;

		return (
			<PurchasesTable
				expenseCategories={[expense.category]}
				purchases={purchases}
				totalBudgeted={expense.monthlyCost}
			    month={this.props.params.month}
			    onMonthChanged={this.onMonthChanged.bind(this)}
			/>
		);
	}

}

export default PurchasesByExpense;