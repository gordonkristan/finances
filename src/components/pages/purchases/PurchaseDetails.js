import _ from 'lodash';
import React from 'react';
import Expense from 'app/models/expense';
import Purchase from 'app/models/purchase';

const PurchaseDetails = React.createClass({
	propTypes: {
		params: React.PropTypes.object.isRequired
	},

	getInitialState() {
		return {
			purchase: null,
			expenses: [],
			cost: '',
			expenseId: undefined,
			description: '',
			date: ''
		};
	},

	componentDidMount() {
		const uid = firebase.auth().currentUser.uid;
		const { purchaseId } = this.props.params;

		this.purchaseRef = firebase.database().ref(`data/${uid}/transactions/purchases/${purchaseId}`);
		this.purchaseRef.on('value', this.purchaseUpdated);

		this.expensesRef = firebase.database().ref(`data/${uid}/budget/expenses`);
		this.expensesRef.on('value', this.expensesUpdated);
	},

	componentWillUnmount() {
		this.purchaseRef.off('value', this.purchaseUpdated);
	},

	////////////////////////////////////////

	purchaseUpdated(purchaseSnapshot) {
		const purchase = new Purchase(purchaseSnapshot);

		this.setState({
			purchase,
			cost: purchase.cost.toString(),
			expenseId: purchase.expenseId,
			description: purchase.description,
			date: purchase.date.format('YYYY-MM-DD')
		});
	},

	expensesUpdated(expensesSnapshot) {
		const expenses = [];

		expensesSnapshot.forEach((expenseSnapshot) => {
			expenses.push(new Expense(expenseSnapshot));
		});

		this.setState({ expenses });
	},

	updateValue(key, event) {
		this.setState({
			[key]: event.target.value
		});
	},

	save() {
		const { purchase, cost, expenseId, description, date } = this.state;

		purchase.cost = parseInt(cost, 10);
		purchase.description = description;
		purchase.expenseId = expenseId;
		purchase.date = date;
	},

	////////////////////////////////////////

	render() {
		return (
			<div className='col-xs-12 col-md-8 offset-md-2'>
				<h4>Purchase Details</h4>
				<form>
					<div className='form-group'>
						<label htmlFor='expense-add-cost'>Cost</label>
						<input
							id='expense-add-cost'
							className='form-control'
							type='number'
							pattern='[0-9]*'
							inputMode='numeric'
							value={this.state.cost}
							onChange={this.updateValue.bind(null, 'cost')}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='expense-add-category'>Category</label>
						<select
							id='expense-add-category'
							className='form-control'
							value={this.state.expenseId}
							onChange={this.updateValue.bind(null, 'expenseId')}
						>
							{this.state.expenses.map((expense) => {
								return (
									<option value={expense.id} key={expense.id}>
										{expense.name}
									</option>
								);
							})}
						</select>
					</div>
					<div className='form-group'>
						<label htmlFor='expense-add-description'>Description</label>
						<input
							id='expense-add-description'
							className='form-control'
							value={this.state.description}
							onChange={this.updateValue.bind(null, 'description')}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='expense-add-date'>Date</label>
						<input
							id='expense-add-date'
							className='form-control'
							type='date'
							value={this.state.date}
							onChange={this.updateValue.bind(null, 'date')}
						/>
					</div>
					<button className='btn btn-success' onClick={this.save}>Save</button>
				</form>
			</div>
		);
	}
});

export default PurchaseDetails;