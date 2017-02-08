import PurchasesByExpense from 'app/components/pages/purchases/PurchasesByExpense';
import ExpenseObserver from 'app/firebase/observer/expense';
import PurchasesByExpenseObserver from 'app/firebase/observer/purchases-by-expense';

import { createRouteComponent } from 'app/firebase/route';

const PurchasesByExpenseRouteContainer = createRouteComponent({
	Component: PurchasesByExpense,

	getObservers({ month, expenseId }) {
		return {
			expense: new ExpenseObserver(expenseId),
			purchases: new PurchasesByExpenseObserver(month, expenseId)
		};
	}
});

export default PurchasesByExpenseRouteContainer;