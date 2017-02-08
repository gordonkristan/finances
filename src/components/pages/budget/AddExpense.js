import React from 'react';
import Form from 'app/components/util/Form';

import { createExpense } from 'app/util/firebase';

const App = React.createClass({

	getInitialState() {
		return {
			name: '',
			cost: '',
			frequency: 'monthly',
			autoPay: false,
			fixedCost: false
		};
	},

	////////////////////////////////////////

	onValueUpdated(name, value) {
		this.setState({ [name]: value });
	},

	add() {
		const expense = {
			name: this.state.name.trim(),
			cost: parseInt(this.state.cost, 10),
			frequency: this.state.frequency,
			isDisabled: false,
			autoPay: this.state.autoPay,
			fixedCost: this.state.fixedCost
		};

		createExpense(expense, (success) => {
			if (success) {
				this.setState(this.getInitialState());
			}
		});
	},

	////////////////////////////////////////

	render() {
		const { name, cost, frequency, autoPay, fixedCost } = this.state;

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
					onValueUpdated={this.onValueUpdated}
					onSubmit={this.add}
				/>
			</div>
		);
	}

});

export default App;