import moment from 'moment';
import FirebaseObserver from './observer';
import Purchase from '../../models/purchase';

import { createDataRef } from 'app/util/firebase';

class PurchasesObserver extends FirebaseObserver {
	constructor(month) {
		const dataRef = createDataRef('transactions/purchases').
			orderByChild('date').
			startAt(moment(month, 'YYYY-MM').startOf('month').format('YYYY-MM-DD')).
			endAt(moment(month, 'YYYY-MM').endOf('month').format('YYYY-MM-DD'));

		super(dataRef);
	}

	_transform(purchasesSnapshot) {
		const purchases = [];

		purchasesSnapshot.forEach((purchaseSnapshot) => {
			purchases.push(new Purchase(purchaseSnapshot));
		});

		return purchases;
	}
}

export default PurchasesObserver;