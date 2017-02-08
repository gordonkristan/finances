const firebase = window.firebase;

const createDataRef = (path) => {
	const uid = firebase.auth().currentUser.uid;
	return firebase.database().ref(`data/${uid}/${path}`);
};

const createExpense = (data, callback) => {
	createDataRef(`budget/expenses`).push(data, (error) => {
		callback(!error);
	});
};

export {
	createDataRef,
	createExpense
};