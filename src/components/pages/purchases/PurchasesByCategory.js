import React from 'react';
import Purchase from 'app/models/purchase';
import ExpenseCategory from 'app/models/expense-category';
import PurchasesTable from 'app/components/patterns/PurchasesTable';

class PurchasesByCategory extends React.Component {

	static contextTypes = {
		router: React.PropTypes.object
	};

	static propsTypes = {
		params: React.PropTypes.shape({
			month: React.PropTypes.string.isRequired
		}).isRequired,
		models: React.PropTypes.shape({
			category: React.PropTypes.instanceOf(ExpenseCategory).isRequired,
			purchases: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Purchase)).isRequired
		}).isRequired
	};

	////////////////////////////////////////

	onMonthChanged(month) {
		this.context.router.push(`/purchases/${month}/by-category/${this.props.models.category.id}`);
	}

	////////////////////////////////////////

	render() {
		const { purchases, category } = this.props.models;

		return (
			<PurchasesTable
				expenseCategories={[category]}
				purchases={purchases}
				totalBudgeted={category.monthlyCost}
			    month={this.props.params.month}
			    onMonthChanged={this.onMonthChanged.bind(this)}
			/>
		);
	}

}

export default PurchasesByCategory;