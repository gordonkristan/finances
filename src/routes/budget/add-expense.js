import AddExpense from 'app/components/pages/budget/AddExpense';
import ExpenseCategoriesObserver from 'app/firebase/observer/expense-categories';

import { createRouteComponent } from 'app/firebase/route';

const AddExpenseRouteContainer = createRouteComponent({
	Component: AddExpense,

	getObservers(params) {
		return {
			expenseCategories: new ExpenseCategoriesObserver()
		};
	}
});

export default AddExpenseRouteContainer;