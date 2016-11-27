class Expense {
	constructor(snapshot) {
		this._snapshot = snapshot;
	}

	get id() {
		return this._snapshot.key;
	}

	get name() {
		return this._snapshot.val().name;
	}

	get cost() {
		return this._snapshot.val().amount;
	}

	get frequency() {
		return this._snapshot.val().frequency;
	}

	get autoPay() {
		return (this._snapshot.val().autoPay || false);
	}

	set autoPay(autoPay) {
		this._snapshot.ref.child('autoPay').set(!!autoPay);
	}

	get fixedCost() {
		return (this._snapshot.val().fixedCost || false);
	}

	set fixedCost(fixedCost) {
		this._snapshot.ref.child('fixedCost').set(!!fixedCost);
	}
}

export default Expense;