import Model from './model';

class Expense extends Model {
	get name() {
		return this._val.name;
	}

	get cost() {
		return this._val.amount;
	}

	get frequency() {
		return this._val.frequency;
	}

	get autoPay() {
		return (this._val.autoPay || false);
	}

	set autoPay(autoPay) {
		this._updateValue('autoPay', !!autoPay);
	}

	get fixedCost() {
		return (this._val.fixedCost || false);
	}

	set fixedCost(fixedCost) {
		this._updateValue('fixedCost', !!fixedCost);
	}
}

export default Expense;