import _ from 'lodash';
import Model from './model';
import Expense from './expense';

class ExpenseCategory extends Model {

	constructor(snapshot) {
		super(snapshot);

		this._expenses = [];

		snapshot.child('expenses').forEach((expenseSnapshot) => {
			this._expenses.push(new Expense(expenseSnapshot, this));
		});
	}

	get name() {
		return this._val.name;
	}

	get monthlyCost() {
		return this.expenses.reduce((total, expense) => {
			return (total + expense.monthlyCost);
		}, 0);
	}

	get expenses() {
		return this._expenses;
	}

	get expenseIds() {
		const childIds = _.map(this.expenses, 'id');
		return new Set([this.id].concat(childIds));
	}

	hasExpense(expenseId) {
		return this.expenseIds.has(expenseId);
	}

	getExpense(expenseId) {
		return this.expenses.find(({ id }) => {
			return (id === expenseId);
		}) || null;
	}
}

export default ExpenseCategory;