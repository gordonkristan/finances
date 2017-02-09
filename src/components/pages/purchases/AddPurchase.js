import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import Form from 'app/components/util/Form';
import ExpenseCategory from 'app/models/expense-category';

class AddPurchase extends React.Component {

	static propTypes = {
		models: React.PropTypes.shape({
			expenseCategories: React.PropTypes.arrayOf(React.PropTypes.instanceOf(ExpenseCategory)).isRequired
		}).isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			cost: 0,
			expenseId: props.models.expenseCategories[0].id,
			description: '',
			date: moment()
		};
	}

	////////////////////////////////////////

	onValueUpdated(name, value) {
		if (name === 'expenseId') {
			const expense = this.findExpense(value);

			// If it's a fixed cost, pre-populate it
			if (expense && expense.fixedCost) {
				this.setState({
					expenseId: value,
					cost: expense.cost
				});

				return;
			}
		}

		this.setState({ [name]: value });
	}

	findExpense(expenseId) {
		const { expenseCategories } = this.props.models;

		for (let category of expenseCategories) {
			if (category.hasExpense(expenseId)) {
				return category.getExpense(expenseId);
			}
		}
	}

	add() {
		const stateProperties = ['cost', 'expenseId', 'description', 'date'];
		const purchase = _.pick(this.state, stateProperties);

		purchase.date = purchase.date.format('YYYY-MM-DD');

		const userId = firebase.auth().currentUser.uid;
		firebase.database().ref(`data/${userId}/transactions/purchases`).push(purchase, () => {
			this.setState({
				cost: 0,
				description: ''
			});
		});
	}

	////////////////////////////////////////

	render() {
		const { expenseCategories } = this.props.models;
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
				options: _(expenseCategories).
					map((category) => {
						return category.expenses.map((expense) => {
							return {
								title: category.name + ' - ' + expense.name,
								value: expense.id
							};
						});
					}).
					flatten().
					value(),
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
					title='Add Purchase'
					fields={fields}
					submitText='Save'
					onValueUpdated={this.onValueUpdated.bind(this)}
					onSubmit={this.add.bind(this)}
				/>
			</div>
		);
	}
}

export default AddPurchase;