import ExpenseCategoriesObserver from './expense-categories';

class ExpenseObserver extends ExpenseCategoriesObserver {
	_expenseId = null;

	constructor(expenseId) {
		super();

		this._expenseId = expenseId;
	}

	_transform(snapshot) {
		const categories = super._transform(snapshot);
		const expenseId = this._expenseId;

		for (let category of categories) {
			if (category.hasExpense(expenseId)) {
				return category.getExpense(expenseId);
			}
		}
	}
}

export default ExpenseObserver;