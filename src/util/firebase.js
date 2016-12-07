import _ from 'lodash';
import moment from 'moment';
import Expense from 'app/models/expense';
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

const observeExpenses = (callback) => {
	const dataRef = createDataRef('budget/expenses').
		orderByChild('priority');

	const valueCallback = (expensesSnapshot) => {
		const expenses = [];

		expensesSnapshot.forEach((expenseSnapshot) => {
			expenses.push(new Expense(expenseSnapshot));
		});

		expenses.forEach((expense, index, expenses) => {
			const higherPriorityExpense = (index === 0 ? null : expenses[index - 1]);
			const lowerPriorityExpense = (index === expenses.length - 1 ? null : expenses[index + 1]);
			expense._setSurroundingExpenses(higherPriorityExpense, lowerPriorityExpense);
		});

		callback(expenses);
	};

	dataRef.on('value', valueCallback);

	return () => {
		dataRef.off('value', valueCallback);
	};
};

const createExpense = (data, callback) => {
	const expensesCallback = (expenses) => {
		cancelObserver();

		const priority = _.max(_.map(expenses, 'priority')) + 1;
		const expense = Object.assign({ priority }, data);

		createDataRef(`budget/expenses`).push(expense, (error) => {
			callback(!error);
		});
	};

	const cancelObserver = observeExpenses(expensesCallback);
};

export {
	createDataRef,
	observePurchases,
	observeExpenses,
	createExpense
};