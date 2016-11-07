import React from 'react';

const App = React.createClass({
	render() {
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-xs-12 col-md-8 offset-md-2'>
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
});

export default App;