import FirebaseObserver from './observer';
import Expense from '../../models/expense';

import { createDataRef } from 'app/util/firebase';

class ExpensesObserver extends FirebaseObserver {
	constructor() {
		super(createDataRef('budget/expenses'));
	}

	_transform(expensesSnapshot) {
		const expenses = [];

		expensesSnapshot.forEach((expenseSnapshot) => {
			expenses.push(new Expense(expenseSnapshot));
		});

		return expenses;
	}
}

export default ExpensesObserver;