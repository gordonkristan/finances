import AddPurchase from 'app/components/pages/purchases/AddPurchase';
import ExpenseCategoriesObserver from 'app/firebase/observer/expense-categories';

import { createRouteComponent } from 'app/firebase/route';

const AddPurchaseRouteContainer = createRouteComponent({
	Component: AddPurchase,

	getObservers(params) {
		return {
			expenseCategories: new ExpenseCategoriesObserver(),
		};
	}
});

export default AddPurchaseRouteContainer;