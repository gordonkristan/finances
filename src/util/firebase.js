const firebase = window.firebase;

const createDataRef = (path) => {
	const uid = firebase.auth().currentUser.uid;
	return firebase.database().ref(`data/${uid}/${path}`);
};

const createExpense = (data, callback) => {
	alert('Not allowed');
};

export {
	createDataRef,
	createExpense
};