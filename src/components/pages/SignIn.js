import React from 'react';

const SignIn = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState() {
		return {
			email: '',
			password: '',
			failedLogin: false
		};
	},

	////////////////////////////////////////

	updateField(fieldName, event) {
		this.setState({
			[fieldName]: event.target.value,
			failedLogin: false
		});
	},

	signIn() {
		const { email, password } = this.state;
		firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
			this.context.router.replace('/');
		}, () => {
			this.setState({ failedLogin: true });
		});
	},

	////////////////////////////////////////

	render() {
		return (
			<div>
				<h4>Sign In</h4>
				{this.state.failedLogin &&
					<div className='alert alert-danger' role='alert'>
						Your email address or password was incorrect.
					</div>
				}
				<div>
					<div className='form-group'>
						<label htmlFor='sign-in-email'>Email</label>
						<input
							id='sign-in-email'
							className='form-control'
							type='email'
							value={this.state.email}
						    onChange={this.updateField.bind(null, 'email')}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='sign-in-password'>Password</label>
						<input
							id='sign-in-password'
							className='form-control'
							type='password'
						    value={this.state.password}
							onChange={this.updateField.bind(null, 'password')}
						/>
					</div>
					<button className='btn btn-success' onClick={this.signIn}>
						Sign In
					</button>
				</div>
			</div>
		);
	}
});

export default SignIn;