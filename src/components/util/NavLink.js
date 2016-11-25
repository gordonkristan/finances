import React from 'react';
import { Link } from 'react-router';

const NavLink = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	render() {
		const isActive = this.context.router.isActive(this.props.to, true);
		const className = `nav-item ${isActive ? 'active' : ''}`;

		return (
			<li className={className}>
				<Link className='nav-link' {...this.props}>
					{this.props.children}
				</Link>
			</li>
		);
	}
});

export default NavLink