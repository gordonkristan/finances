import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import Expense from 'app/models/expense';

const AddPurchase = React.createClass({

	getInitialState() {
		return {
			expenses: [],
			cost: '',
			expenseId: undefined,
			description: '',
			date: moment().format('YYYY-MM-DD')
		};
	},

	componentDidMount() {
		const uid = firebase.auth().currentUser.uid;
		this.dataRef = firebase.database().ref(`data/${uid}/budget/expenses`);
		this.dataRef.on('value', this.expensesUpdated);
	},

	componentWillUnmount() {
		this.dataRef.off('value', this.expensesUpdated);
	},

	////////////////////////////////////////

	expensesUpdated(expensesSnapshot) {
		const expenses = [];

		expensesSnapshot.forEach((expenseSnapshot) => {
			expenses.push(new Expense(expenseSnapshot));
		});

		this.setState({
			expenses,
			expenseId: (this.state.expenseId || expenses[0].id)
		});
	},

	updateValue(name, event) {
		const value = event.target.value;

		if (name === 'expenseId') {
			const expense = this.state.expenses.find(({ id }) => {
				return (id === value);
			});

			// If it's a fixed cost, pre-populate it
			if (expense.fixedCost) {
				this.setState({
					expenseId: value,
					cost: expense.cost
				});
			}
		}

		this.setState({ [name]: value });
	},

	add() {
		const stateProperties = ['cost', 'expenseId', 'description', 'date'];
		const purchase = _.pick(this.state, stateProperties);

		purchase.cost = parseInt(purchase.cost, 10);

		const userId = firebase.auth().currentUser.uid;
		firebase.database().ref(`data/${userId}/transactions/purchases`).push(purchase, () => {
			this.setState({
				cost: '',
				description: ''
			});
		});
	},

	////////////////////////////////////////

	render() {
		return (
			<div className='col-xs-12 col-md-8 offset-md-2'>
				<h4>Add Purchase</h4>
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
						<label htmlFor='expense-add-expense'>Expense</label>
						<select
							id='expense-add-expense'
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
					<button className='btn btn-success' onClick={this.add}>Add</button>
				</form>
			</div>
		);
	}
});

export default AddPurchase;