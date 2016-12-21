import React from 'react';

const Icon = React.createClass({

	propTypes: {
		name: React.PropTypes.string.isRequired
	},

	render() {
		const { name, className, style, ...props } = this.props;

		return (
			<i
				className={`fa fa-${name} ${className}`}
				style={{cursor: 'pointer', ...style}}
				{...props}
			/>
		);
	}

});

export default Icon;