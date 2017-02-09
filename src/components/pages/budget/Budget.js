import React from 'react';
import ExpensesTable from './ExpensesTable';
import ExpenseCategory from 'app/models/expense-category';

class Budget extends React.Component {
	static propTypes = {
		models: React.PropTypes.shape({
			expenseCategories: React.PropTypes.arrayOf(React.PropTypes.instanceOf(ExpenseCategory)).isRequired
		}).isRequired
	};

	render() {
		return (
			<div className='col-xs-12'>
				<ExpensesTable expenseCategories={this.props.models.expenseCategories} />
			</div>
		);
	}
}

export default Budget;