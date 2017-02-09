import PurchasesByCategory from 'app/components/pages/purchases/PurchasesByCategory';
import ExpenseCategoryObserver from 'app/firebase/observer/expense-category';
import PurchasesByCategoryObserver from 'app/firebase/observer/purchases-by-category';

import { createRouteComponent } from 'app/firebase/route';

const PurchasesByCategoryRouteContainer = createRouteComponent({
	Component: PurchasesByCategory,

	getObservers({ month, categoryId }) {
		return {
			category: new ExpenseCategoryObserver(categoryId),
			purchases: new PurchasesByCategoryObserver(month, categoryId)
		};
	}
});

export default PurchasesByCategoryRouteContainer;