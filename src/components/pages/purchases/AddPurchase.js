import React from 'react';

const AddPurchase = React.createClass({
	render() {
		return (
			<div>
				<h4>Add Expense</h4>
				<form>
					<div className='form-group'>
						<label htmlFor='expense-add-cost'>Cost</label>
						<input
							id='expense-add-cost'
							className='form-control'
							type='number'
							pattern='[0-9]*'
							inputMode='numeric'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='expense-add-category'>Category</label>
						<select id='expense-add-category' className='form-control'>
							<option>Bars and Restaurants</option>
							<option>Groceries</option>
							<option>Gas</option>
							<option>Bill</option>
							<option>Household item</option>
							<option>Other</option>
						</select>
					</div>
					<div className='form-group'>
						<label htmlFor='expense-add-description'>Description</label>
						<input id='expense-add-description' className='form-control' />
					</div>
					<div className='form-group'>
						<label htmlFor='expense-add-date'>Date</label>
						<input id='expense-add-date' className='form-control' type='date'/>
					</div>
					<button className='btn btn-success'>Add</button>
					&nbsp;
					<button className='btn btn-secondary'>Cancel</button>
				</form>
			</div>
		);
	}
});

export default AddPurchase;