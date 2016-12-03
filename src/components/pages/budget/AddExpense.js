import React from 'react';

const App = React.createClass({

	getInitialState() {
		return {
			name: '',
			cost: '',
			frequency: 'monthly',
			autoPay: false,
			fixedCost: false
		};
	},

	////////////////////////////////////////

	onValueChange(name, event) {
		let value = event.target.value;
		if (name === 'autoPay' || name === 'fixedCost') {
			value = event.target.checked;
		}

		this.setState({
			[name]: value
		});
	},

	add() {
		const expense = {
			name: this.state.name.trim(),
			cost: parseInt(this.state.cost, 10),
			frequency: this.state.frequency,
			isDisabled: false,
			autoPay: this.state.autoPay,
			fixedCost: this.state.fixedCost
		};

		const userId = firebase.auth().currentUser.uid;
		firebase.database().ref(`data/${userId}/budget/expenses`).push(expense, () => {
			this.setState(this.getInitialState());
		});
	},

	////////////////////////////////////////

	render() {
		return (
			<div className='col-xs-12 col-md-8 offset-md-2'>
				<h4>Add Expense</h4>
				<form>
					<div className='form-group'>
						<label htmlFor='add-expense-name'>Name</label>
						<input
							id='add-expense-name'
							className='form-control'
							value={this.state.name}
							onChange={this.onValueChange.bind(null, 'name')}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='add-expense-cost'>Cost</label>
						<input
							id='add-expense-cost'
							className='form-control'
							type='number'
							pattern='[0-9]*'
							inputMode='numeric'
							placeholder='Whole dollar amounts only'
						    value={this.state.cost}
						    onChange={this.onValueChange.bind(null, 'cost')}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='add-expense-frequency'>Frequency</label>
						<select
							id='add-expense-frequency'
							className='form-control'
						    value={this.state.frequency}
						    onChange={this.onValueChange.bind(null, 'frequency')}
						>
							<option value='daily'>Daily</option>
							<option value='weekly'>Weekly</option>
							<option value='monthly'>Monthly</option>
							<option value='biannually'>Biannually</option>
							<option value='annually'>Annually</option>
						</select>
					</div>
					<div className='form-check'>
						<label className='form-check-label' htmlFor='add-expense-auto-pay'>
							<input
								id='add-expense-auto-pay'
								type='checkbox'
								className='form-check-input'
								checked={this.state.autoPay}
								onChange={this.onValueChange.bind(null, 'autoPay')}
							/>
							&nbsp;AutoPay?
						</label>
					</div>
					<div className='form-check'>
						<label className='form-check-label' htmlFor='add-expense-fixed-cost'>
							<input
								id='add-expense-fixed-cost'
								type='checkbox'
								className='form-check-input'
								checked={this.state.fixedCost}
								onChange={this.onValueChange.bind(null, 'fixedCost')}
							/>
							&nbsp;Fixed Cost?
						</label>
					</div>
					<button className='btn btn-success' onClick={this.add}>
						Add
					</button>
				</form>
			</div>
		);
	}

});

export default App;