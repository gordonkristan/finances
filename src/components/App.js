import React from 'react';
import NavLink from './util/NavLink';

import { Link } from 'react-router';

const App = React.createClass({
	render() {
		return (
			<div>
				<nav className='navbar navbar-dark navbar-fixed-top bg-inverse'>
					<button
						id='navbar-hamburger-button'
						className='navbar-toggler hidden-lg-up'
						type='button'
						data-toggle='collapse'
					    data-target='#responsive-navbar'
					/>
					<div className='collapse navbar-toggleable-md' id='responsive-navbar'>
						<Link className='navbar-brand hidden-sm-down' to='/'>
							Finances
						</Link>
						<ul className='nav navbar-nav'>
							<NavLink to='/budget'>Budget</NavLink>
							<NavLink to='/budget/add-expense'>Add Expense</NavLink>
							<NavLink to='/purchases'>Purchases</NavLink>
							<NavLink to='/purchases/add-purchase'>Log Purchase</NavLink>
						</ul>
					</div>
				</nav>
				<div className='container'>
					<div className='row'>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
});

export default App;