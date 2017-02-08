import PurchasesList from 'app/components/pages/purchases/PurchasesList';
import ExpensesObserver from 'app/firebase/observer/expenses';
import PurchasesObserver from 'app/firebase/observer/purchases';

import { createRouteComponent } from 'app/firebase/route';

const PurchasesByMonthRouteContainer = createRouteComponent({
	Component: PurchasesList,

	getObservers({ month }) {
		return {
			expenses: new ExpensesObserver(),
			purchases: new PurchasesObserver(month)
		};
	}
});

export default PurchasesByMonthRouteContainer;