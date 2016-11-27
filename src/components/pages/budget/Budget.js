import React from 'react';
import ExpensesTable from './ExpensesTable';

const Budget = React.createClass({
	render() {
		return (
			<div className='col-xs-12'>
				<ExpensesTable />
			</div>
		);
	}
});

export default Budget;