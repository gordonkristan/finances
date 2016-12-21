import React from 'react';
import moment from 'moment';

const Form = React.createClass({

	propTypes: {
		title: React.PropTypes.string.isRequired,
		fields: React.PropTypes.arrayOf(React.PropTypes.shape({
			type: React.PropTypes.oneOf(['number', 'string', 'select', 'date', 'checkbox']),
			name: React.PropTypes.string.isRequired,
			title: React.PropTypes.string.isRequired,
			options: React.PropTypes.arrayOf(React.PropTypes.shape({
				title: React.PropTypes.string.isRequired,
				value: React.PropTypes.string.isRequired
			})),
			value: React.PropTypes.oneOfType([
				React.PropTypes.string,
				React.PropTypes.number,
				React.PropTypes.bool,
				React.PropTypes.instanceOf(moment)
			]).isRequired
		})).isRequired,
		submitText: React.PropTypes.string.isRequired,
		onValueUpdated: React.PropTypes.func.isRequired,
		onSubmit: React.PropTypes.func.isRequired
	},

	////////////////////////////////////////

	createNumberInput(name, value) {
		return (
			<input
				id={`dynamic-form-${name}`}
				className='form-control'
				type='number'
				pattern='[0-9]*'
				inputMode='numeric'
				value={value.toString()}
				onChange={(event) => {
					this.props.onValueUpdated(name, parseInt(event.target.value, 10));
				}}
			/>
		);
	},

	createStringInput(name, value) {
		return (
			<input
				id={`dynamic-form-${name}`}
				className='form-control'
				type='text'
				value={value}
				onChange={(event) => {
					this.props.onValueUpdated(name, event.target.value);
				}}
			/>
		);
	},

	createDateInput(name, value) {
		return (
			<input
				id={`dynamic-form-${name}`}
				className='form-control'
				type='date'
				value={value.format('YYYY-MM-DD')}
				onChange={(event) => {
					this.props.onValueUpdated(name, moment(event.target.value, 'YYYY-MM-DD'));
				}}
			/>
		);
	},

	createSelect(name, options, value) {
		const onChange = (event) => {
			this.props.onValueUpdated(name, event.target.value);
		};

		return (
			<select id={`dynamic-form-${name}`} className='form-control' value={value} onChange={onChange}>
				{options.map(({ title, value }) => {
					return (
						<option value={value} key={value}>
							{title}
						</option>
					);
				})}
			</select>
		);
	},

	createCheckbox(name, checked) {
		return (
			<input
				id={`dynamic-form-${name}`}
				className='form-control'
			    type='checkbox'
			    checked={checked}
			    onChange={(event) => {
			    	this.props.onValueUpdated(name, event.target.checked);
			    }}
			/>
		);
	},

	////////////////////////////////////////

	render() {
		const { title, fields, submitText, onSubmit } = this.props;

		return (
			<div>
				<h4>{title}</h4>
				{fields.map(({ type, name, title, options, value }) => {
					let input;

					switch(type) {
						case 'number':
							input = this.createNumberInput(name, value);
							break;
						case 'string':
							input = this.createStringInput(name, value);
							break;
						case 'date':
							input = this.createDateInput(name, value);
							break;
						case 'select':
							input = this.createSelect(name, options, value);
							break;
						case 'checkbox':
							input = this.createCheckbox(name, value);
							break;
					}

					return (
						<div className='form-group' key={name}>
							<label htmlFor={`dynamic-form-${name}`}>
								{title}
								{type === 'checkbox' ? input : null}
							</label>
							{type === 'checkbox' ? null : input}
						</div>
					);
				})}
				<button className='btn btn-success' onClick={onSubmit}>
					{submitText}
				</button>
			</div>
		);
	}

});

export default Form;