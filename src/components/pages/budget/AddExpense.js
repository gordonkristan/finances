import React from 'react';
import Form from 'app/components/util/Form';
import ExpenseCategory from 'app/models/expense-category';

import { createExpense } from 'app/util/firebase';

class App extends React.Component {

	static propTypes = {
		models: React.PropTypes.shape({
			expenseCategories: React.PropTypes.arrayOf(React.PropTypes.instanceOf(ExpenseCategory)).isRequired
		}).isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			name: '',
			cost: '',
			categoryId: props.models.expenseCategories[0].id,
			frequency: 'monthly',
			autoPay: false,
			fixedCost: false
		};
	}

	////////////////////////////////////////

	onValueUpdated(name, value) {
		this.setState({ [name]: value });
	}

	add() {
		const expense = {
			name: this.state.name.trim(),
			cost: parseInt(this.state.cost, 10),
			frequency: this.state.frequency,
			isDisabled: false,
			autoPay: this.state.autoPay,
			fixedCost: this.state.fixedCost
		};

		const category = this.props.models.expenseCategories.find((category) => {
			return (category.id === this.state.categoryId);
		});

		category.addExpense(expense, (success) => {
			if (success) {
				this.setState({
					name: '',
					cost: ''
				});
			} else {
				alert('Something went wrong...');
			}
		});
	}

	////////////////////////////////////////

	render() {
		const { name, cost, frequency, autoPay, fixedCost, categoryId } = this.state;

		const fields = [
			{
				type: 'string',
				name: 'name',
				title: 'Name',
				value: name
			},
			{
				type: 'number',
				name: 'cost',
				title: 'Cost',
				value: cost
			},
			{
				type: 'select',
				name: 'categoryId',
				title: 'Category',
				options: this.props.models.expenseCategories.map((category) => {
					return {
						title: category.name,
						value: category.id
					};
				}),
				value: categoryId
			},
			{
				type: 'select',
				name: 'frequency',
				title: 'Frequency',
				options: [
					{ title: 'Daily', value: 'daily' },
					{ title: 'Weekly', value: 'weekly' },
					{ title: 'Monthly', value: 'monthly' },
					{ title: 'Bi-Monthly', value: 'bimonthly' },
					{ title: 'Biannually', value: 'biannually' },
					{ title: 'Annually', value: 'annually' }
				],
				value: frequency
			},
			{
				type: 'checkbox',
				name: 'autoPay',
				title: 'Auto Pay?',
				value: autoPay
			},
			{
				type: 'checkbox',
				name: 'fixedCost',
				title: 'Fixed Cost?',
				value: fixedCost
			}
		];

		return (
			<div className='col-xs-12 col-md-8 offset-md-2'>
				<Form
					title='Add Expense'
					fields={fields}
					submitText='Add'
					onValueUpdated={this.onValueUpdated.bind(this)}
					onSubmit={this.add.bind(this)}
				/>
			</div>
		);
	}
}

export default App;