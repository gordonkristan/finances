import _ from 'lodash';
import PurchasesObserver from './purchases';

class PurchasesByExpenseObserver extends PurchasesObserver {
	constructor(month, expenseId) {
		super(month);

		this.expenseId = expenseId;
	}

	_transform(snapshot) {
		const purchases = super._transform(snapshot);
		const { expenseId } = this;

		return _.filter(purchases, { expenseId });
	}
}

export default PurchasesByExpenseObserver;