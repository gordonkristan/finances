import Budget from 'app/components/pages/budget/Budget';
import ExpenseCategoriesObserver from 'app/firebase/observer/expense-categories';

import { createRouteComponent } from 'app/firebase/route';

const BudgetRouteContainer = createRouteComponent({
	Component: Budget,

	getObservers(params) {
		return {
			expenseCategories: new ExpenseCategoriesObserver()
		};
	}
});

export default BudgetRouteContainer;