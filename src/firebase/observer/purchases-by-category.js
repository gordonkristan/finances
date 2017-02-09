import PurchasesObserver from './purchases';
import ExpenseCategoryObserver from './expense-category';

class PurchasesByCategoryObserver {

	_purchasesObserver = null;
	_categoryObserver = null;
	_lastPurchases = null;
	_lastCategory = null;
	// null is a valid value
	_lastData = undefined;
	_callback = null;

	constructor(month, categoryId) {
		this._purchasesObserver = new PurchasesObserver(month);
		this._categoryObserver = new ExpenseCategoryObserver(categoryId);

		this._purchasesObserver.onValueUpdated(this._purchasesUpdated.bind(this));
		this._categoryObserver.onValueUpdated(this._categoryUpdated.bind(this));
	}

	_purchasesUpdated(purchases) {
		this._lastPurchases = purchases;
		this._updateValue();
	}

	_categoryUpdated(category) {
		this._lastCategory = category;
		this._updateValue();
	}

	_updateValue() {
		const purchases = this._lastPurchases;
		const category = this._lastCategory;

		if (purchases && category) {
			this._lastData = purchases.filter(({ expenseId }) => {
				return (expenseId === category.id || category.hasExpense(expenseId));
			});

			this._callback(this._lastData);
		}
	}

	onValueUpdated(callback) {
		this._callback = callback;
		callback(this._lastData);
	}

	destroy() {
		this._purchasesObserver.destroy();
		this._categoryObserver.destroy();
	}
}

export default PurchasesByCategoryObserver;