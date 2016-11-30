class Model {
	constructor(snapshot) {
		this._snapshot = snapshot;
	}

	get id() {
		return this._snapshot.key;
	}

	get _val() {
		return this._snapshot.val();
	}

	_updateValue(key, newValue) {
		const oldValue = this[key];

		if (oldValue !== newValue) {
			this._snapshot.ref.child(key).set(newValue);
		}
	}
}

export default Model;