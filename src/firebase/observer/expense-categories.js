import FirebaseObserver from './observer';
import ExpenseCategory from '../../models/expense-category';

import { createDataRef } from 'app/util/firebase';

class ExpenseCategoriesObserver extends FirebaseObserver {
	constructor() {
		super(createDataRef('budget/expenses'));
	}

	_transform(categoriesSnapshot) {
		const categories = [];

		categoriesSnapshot.forEach((categorySnapshot) => {
			categories.push(new ExpenseCategory(categorySnapshot));
		});

		return categories;
	}
}

export default ExpenseCategoriesObserver;