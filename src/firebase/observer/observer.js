import Model from '../../models/model';

class FirebaseObserver {

	// null is a valid value
	_lastData = undefined;
	_callback = null;
	_ref = null;

	constructor(ref) {
		this._ref = ref;

		ref.on('value', (snapshot) => {
			this._lastData = this._transform(snapshot);
			this._callback(this._lastData);
		});
	}

	_transform(snapshot) {
		return new Model(snapshot);
	}

	onValueUpdated(callback) {
		this._callback = callback;
		callback(this._lastData);
	}

	destroy() {
		this._ref.off();
		this._lastData = null;
		this._ref = null;
	}
}

export default FirebaseObserver;