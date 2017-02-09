import FirebaseObserver from './observer';
import ExpenseCategory from '../../models/expense-category';

import { createDataRef } from 'app/util/firebase';

class ExpenseCategoryObserver extends FirebaseObserver {
	constructor(categoryId) {
		super(createDataRef(`budget/expenses/${categoryId}`));
	}

	_transform(categorySnapshot) {
		return new ExpenseCategory(categorySnapshot);
	}
}

export default ExpenseCategoryObserver;