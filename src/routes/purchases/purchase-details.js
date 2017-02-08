import PurchaseDetails from 'app/components/pages/purchases/PurchaseDetails';
import PurchaseObserver from 'app/firebase/observer/purchase';
import ExpensesObserver from 'app/firebase/observer/expenses';

import { createRouteComponent } from 'app/firebase/route';

const PurchaseDetailRouteContainer = createRouteComponent({
	Component: PurchaseDetails,

	getObservers({ purchaseId }) {
		return {
			expenses: new ExpensesObserver(),
			purchase: new PurchaseObserver(purchaseId)
		};
	}
});

export default PurchaseDetailRouteContainer;