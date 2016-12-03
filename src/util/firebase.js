import _ from 'lodash';
import moment from 'moment';
import Purchase from 'app/models/purchase';

const firebase = window.firebase;

const createDataRef = (path) => {
	const uid = firebase.auth().currentUser.uid;
	return firebase.database().ref(`data/${uid}/${path}`);
};

const observePurchases = (query, callback) => {
	const dataRef = createDataRef('transactions/purchases').
		orderByChild('date').
		startAt(moment().startOf('month').format('YYYY-MM-DD')).
		endAt(moment().endOf('month').format('YYYY-MM-DD'));

	const valueCallback = (purchasesSnapshot) => {
		const purchases = [];

		purchasesSnapshot.forEach((purchaseSnapshot) => {
			purchases.push(new Purchase(purchaseSnapshot));
		});

		callback(_.filter(purchases, query || {}));
	};

	dataRef.on('value', valueCallback);

	return () => {
		dataRef.off('value', valueCallback);
	};
};

export {
	createDataRef,
	observePurchases
};