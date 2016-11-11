import React from 'react';

const App = React.createClass({
	render() {
		return (
			<div>
				<nav className='navbar navbar-dark navbar-fixed-top bg-inverse'>
					<button
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
								<a className='nav-link' style={{ color: '#bbb' }}>Budget</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link' style={{ color: '#bbb' }}>Expenses</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link' style={{ color: '#bbb' }}>Log Purchase</a>
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