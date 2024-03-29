import React from 'react';
import Expense from 'app/models/expense';
import Purchase from 'app/models/purchase';
import Form from 'app/components/util/Form';

class PurchaseDetails extends React.Component {
	static propTypes = {
		params: React.PropTypes.object.isRequired
	};

	static propsTypes = {
		models: React.PropTypes.shape({
			purchase: React.PropTypes.instanceOf(Purchase).isRequired,
			expenses: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Expense)).isRequired
		}).isRequired
	};

	constructor(props) {
		super(props);

		this.state = this.purchaseToState(props.models.purchase);
	}

	componentWillReceiveProps(nextProps) {
		const { purchase } = nextProps.models;
		this.setState(this.purchaseToState(purchase));
	}

	////////////////////////////////////////

	purchaseToState(purchase) {
		return {
			cost: purchase.cost,
			expenseId: purchase.expenseId,
			description: purchase.description,
			date: purchase.date
		};
	}

	onValueUpdated(key, value) {
		this.setState({
			[key]: value
		});
	}

	save() {
		const { purchase } = this.props.models;
		const { cost, expenseId, description, date } = this.state;

		purchase.cost = parseInt(cost, 10);
		purchase.description = description;
		purchase.expenseId = expenseId;
		purchase.date = date.format('YYYY-MM-DD');
	}

	////////////////////////////////////////

	render() {
		const { expenses } = this.props.models;
		const { cost, expenseId, description, date } = this.state;

		const fields = [
			{
				type: 'number',
				name: 'cost',
				title: 'Cost',
				value: cost
			},
			{
				type: 'select',
				name: 'expenseId',
				title: 'Expense',
				options: expenses.map(({ id, name }) => {
					return { title: name, value: id };
				}),
				value: expenseId
			},
			{
				type: 'string',
				name: 'description',
				title: 'Description',
				value: description
			},
			{
				type: 'date',
				name: 'date',
				title: 'Purchase Date',
				value: date
			}
		];

		return (
			<div className='col-xs-12 col-md-8 offset-md-2'>
				<Form
					title='Purchase Details'
					fields={fields}
					submitText='Save'
					onValueUpdated={this.onValueUpdated.bind(this)}
					onSubmit={this.save.bind(this)}
				/>
			</div>
		);

		// return (
		// 	<div className='col-xs-12 col-md-8 offset-md-2'>
		// 		<h4>Purchase Details</h4>
		// 		<form>
		// 			<div className='form-group'>
		// 				<label htmlFor='purchase-edit-cost'>Cost</label>
		// 				<input
		// 					id='purchase-edit-cost'
		// 					className='form-control'
		// 					type='number'
		// 					pattern='[0-9]*'
		// 					inputMode='numeric'
		// 					value={this.state.cost}
		// 					onChange={this.updateValue.bind(this, 'cost')}
		// 				/>
		// 			</div>
		// 			<div className='form-group'>
		// 				<label htmlFor='purchase-edit-expense'>Expense</label>
		// 				<select
		// 					id='purchase-edit-expense'
		// 					className='form-control'
		// 					value={this.state.expenseId}
		// 					onChange={this.updateValue.bind(this, 'expenseId')}
		// 				>
		// 					{this.props.models.expenses.map((expense) => {
		// 						return (
		// 							<option value={expense.id} key={expense.id}>
		// 								{expense.name}
		// 							</option>
		// 						);
		// 					})}
		// 				</select>
		// 			</div>
		// 			<div className='form-group'>
		// 				<label htmlFor='purchase-edit-description'>Description</label>
		// 				<input
		// 					id='purchase-edit-description'
		// 					className='form-control'
		// 					value={this.state.description}
		// 					onChange={this.updateValue.bind(this, 'description')}
		// 				/>
		// 			</div>
		// 			<div className='form-group'>
		// 				<label htmlFor='purchase-edit-date'>Date</label>
		// 				<input
		// 					id='purchase-edit-date'
		// 					className='form-control'
		// 					type='date'
		// 					value={this.state.date}
		// 					onChange={this.updateValue.bind(this, 'date')}
		// 				/>
		// 			</div>
		// 			<button className='btn btn-success' onClick={this.save.bind(this)}>
		// 				Save
		// 			</button>
		// 		</form>
		// 	</div>
		// );
	}
}

export default PurchaseDetails;