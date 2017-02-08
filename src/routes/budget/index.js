import Budget from 'app/components/pages/budget/Budget';
import ExpensesObserver from 'app/firebase/observer/expenses';

import { createRouteComponent } from 'app/firebase/route';

const BudgetRouteContainer = createRouteComponent({
	Component: Budget,

	getObservers(params) {
		return {
			expenses: new ExpensesObserver()
		};
	}
});

export default BudgetRouteContainer;