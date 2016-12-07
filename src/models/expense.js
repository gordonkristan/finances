import Model from './model';

class Expense extends Model {
	get name() {
		return this._val.name;
	}

	get cost() {
		return this._val.cost;
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

	_setSurroundingExpenses(higherPriorityExpense, lowerPriorityExpense) {
		this._higherPriorityExpense = higherPriorityExpense;
		this._lowerPriorityExpense = lowerPriorityExpense;
	}

	raisePriority() {
		if (this._higherPriorityExpense) {
			const priority = this._val.priority;
			this._updateValue('priority', this._higherPriorityExpense._val.priority);
			this._higherPriorityExpense._updateValue('priority', priority);
		}
	}

	lowerPriority() {
		if (this._lowerPriorityExpense) {
			const priority = this._val.priority;
			this._updateValue('priority', this._lowerPriorityExpense._val.priority);
			this._lowerPriorityExpense._updateValue('priority', priority);
		}
	}
}

export default Expense;