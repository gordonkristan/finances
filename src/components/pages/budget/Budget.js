import React from 'react';
import Expense from 'app/models/expense';
import ExpensesTable from './ExpensesTable';

class Budget extends React.Component {
	static propTypes = {
		models: React.PropTypes.shape({
			expenses: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Expense)).isRequired
		}).isRequired
	};

	render() {
		return (
			<div className='col-xs-12'>
				<ExpensesTable expenses={this.props.models.expenses} />
			</div>
		);
	}
}

export default Budget;