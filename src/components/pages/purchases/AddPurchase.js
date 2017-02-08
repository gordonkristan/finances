import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import Expense from 'app/models/expense';
import Form from 'app/components/util/Form';

class AddPurchase extends React.Component {

	static propTypes = {
		models: React.PropTypes.shape({
			expenses: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Expense)).isRequired
		}).isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			cost: 0,
			expenseId: props.models.expenses[0].id,
			description: '',
			date: moment()
		};
	}

	////////////////////////////////////////

	onValueUpdated(name, value) {
		if (name === 'expenseId') {
			const expense = this.props.models.expenses.find(({ id }) => {
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
		const { expenses } = this.props.models;
		const { cost, expenseId, description, date } = this.state;

		if (!expenses) {
			return null;
		}

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
					onSubmit={this.add.bind(this)}
				/>
			</div>
		);
	}
}

export default AddPurchase;