import React from 'react';
import Purchase from 'app/models/purchase';
import ExpenseCategory from 'app/models/expense-category';
import PurchasesTable from 'app/components/patterns/PurchasesTable';

class PurchasesList extends React.Component {

	static contextTypes = {
		router: React.PropTypes.object
	};

	static propsTypes = {
		models: React.PropTypes.shape({
			expenseCategories: React.PropTypes.arrayOf(React.PropTypes.instanceOf(ExpenseCategory)).isRequired,
			purchases: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Purchase)).isRequired
		}).isRequired
	};

	////////////////////////////////////////

	onMonthChanged(month) {
		this.context.router.push(`/purchases/${month}`);
	}

	////////////////////////////////////////

	render() {
		const { purchases, expenseCategories } = this.props.models;

		const totalBudgeted = expenseCategories.reduce((total, category) => {
			return (total + category.monthlyCost);
		}, 0);

		return (
			<PurchasesTable
				expenseCategories={expenseCategories}
				purchases={purchases}
				totalBudgeted={totalBudgeted}
				month={this.props.params.month}
				onMonthChanged={this.onMonthChanged.bind(this)}
			/>
		);
	}

}

export default PurchasesList;