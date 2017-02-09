import PurchasesList from 'app/components/pages/purchases/PurchasesList';
import PurchasesObserver from 'app/firebase/observer/purchases';
import ExpenseCategoriesObserver from 'app/firebase/observer/expense-categories';

import { createRouteComponent } from 'app/firebase/route';

const PurchasesByMonthRouteContainer = createRouteComponent({
	Component: PurchasesList,

	getObservers({ month }) {
		return {
			expenseCategories: new ExpenseCategoriesObserver(),
			purchases: new PurchasesObserver(month)
		};
	}
});

export default PurchasesByMonthRouteContainer;