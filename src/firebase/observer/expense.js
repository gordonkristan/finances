import FirebaseObserver from './observer';
import Expense from '../../models/expense';

import { createDataRef } from 'app/util/firebase';

class ExpenseObserver extends FirebaseObserver {
	constructor(expenseId) {
		super(createDataRef(`budget/expenses/${expenseId}`));
	}

	_transform(expenseSnapshot) {
		return new Expense(expenseSnapshot);
	}
}

export default ExpenseObserver;