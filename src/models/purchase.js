import Model from './model';
import moment from 'moment';

class Purchase extends Model {
	get date() {
		return moment(this._val.date, 'YYYY-MM-DD');
	}

	set date(dateString) {
		this._updateValue('date', dateString);
	}

	get description() {
		return this._val.description;
	}

	set description(description) {
		this._updateValue('description', description);
	}

	get cost() {
		return this._val.cost;
	}

	set cost(cost) {
		this._updateValue('cost', cost);
	}

	get expenseId() {
		return this._val.category;
	}

	set expenseId(expenseId) {
		this._updateValue('expenseId', expenseId);
	}
}

export default Purchase;