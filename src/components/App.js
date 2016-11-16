import React from 'react';
import { Link } from 'react-router';

const App = React.createClass({
	render() {
		return (
			<div>
				<nav className='navbar navbar-dark navbar-fixed-top bg-inverse'>
					<button
						id='navbar-hamburger-button'
						className='navbar-toggler'
						type='button'
						data-toggle='collapse'
						data-target='#navbar'
					/>
					<div className='collapse' id='navbar'>
						<ul className='nav nav-pills nav-stacked'>
							<li className='nav-item'>
								<a className='nav-link' style={{ color: '#bbb' }}>Home</a>
							</li>
							<li className='nav-item'>
								<Link to='/budget/expenses' className='nav-link' style={{ color: '#bbb' }}>
									Budget
								</Link>
							</li>
							<li className='nav-item'>
								<Link
									to='/budget/add-expense'
									className='nav-link'
									style={{ color: '#bbb', marginLeft: '1em' }}
								>
									Add Expense
								</Link>
							</li>
							<li className='nav-item'>
								<a className='nav-link' style={{ color: '#bbb' }}>Purchases</a>
							</li>
							<li className='nav-item'>
								<Link
									to='/purchases/add-purchase'
									className='nav-link'
									style={{ color: '#bbb', marginLeft: '1em' }}
								>
									Log Purchase
								</Link>
							</li>
						</ul>
					</div>
				</nav>
				<div className='container'>
					<div className='row'>
						<div className='col-xs-12 col-md-8 offset-md-2'>
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
		);
	}
});

export default App;