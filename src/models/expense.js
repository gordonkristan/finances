import Model from './model';

class Expense extends Model {
	constructor(snapshot, category) {
		super(snapshot);

		this._category = category;
	}

	get name() {
		return this._val.name;
	}

	get category() {
		return this._category;
	}

	get cost() {
		return this._val.cost;
	}

	get monthlyCost() {
		switch (this.frequency) {
			case 'weekly':
				return (this.cost * 4);
			case 'bimonthly':
				return (this.cost / 2);
			case 'semiannually':
				return (this.cost / 6);
			case 'annually':
				return (this.cost / 12);
			case 'monthly':
			default:
				return this.cost;
		}
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

	get isDisabled() {
		return !!this._val.isDisabled;
	}

	set isDisabled(disabled) {
		this._updateValue('isDisabled', disabled);
	}
}

export default Expense;