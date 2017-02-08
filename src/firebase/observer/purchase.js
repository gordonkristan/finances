import FirebaseObserver from './observer';
import Purchase from '../../models/purchase';

import { createDataRef } from 'app/util/firebase';

class PurchaseObserver extends FirebaseObserver {
	constructor(purchaseId) {
		const dataRef = createDataRef(`transactions/purchases/${purchaseId}`);

		super(dataRef);
	}

	_transform(purchaseSnapshot) {
		return new Purchase(purchaseSnapshot);
	}
}

export default PurchaseObserver;