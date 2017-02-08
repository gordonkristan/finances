import AddPurchase from 'app/components/pages/purchases/AddPurchase';
import ExpensesObserver from 'app/firebase/observer/expenses';

import { createRouteComponent } from 'app/firebase/route';

const AddPurchaseRouteContainer = createRouteComponent({
	Component: AddPurchase,

	getObservers(params) {
		return {
			expenses: new ExpensesObserver()
		};
	}
});

export default AddPurchaseRouteContainer;