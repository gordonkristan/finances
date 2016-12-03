import React from 'react';

const Table = React.createClass({
	propTypes: {
		headers: React.PropTypes.arrayOf(React.PropTypes.shape({
			label: React.PropTypes.string.isRequired,
			justification: React.PropTypes.oneOf(['left', 'center', 'right'])
		})).isRequired,
		data: React.PropTypes.arrayOf(React.PropTypes.arrayOf(React.PropTypes.node)).isRequired,
		footer: React.PropTypes.arrayOf(React.PropTypes.node),
		onRowClicked: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			onRowClicked() {}
		};
	},

	render() {
		return (
			<table className='table table-striped'>
				<thead>
					<tr>
						{this.props.headers.map(({ label, justification = 'left' }, index) => {
							return (
								<th style={{textAlign: justification}} key={index}>
									{label}
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{this.props.data.map((row, index) => {
						return (
							<tr key={index} onClick={this.props.onRowClicked.bind(null, row, index)}>
								{row.map((cell, index) => {
									const { justification = 'left' } = this.props.headers[index];

									return (
										<td style={{textAlign: justification}} key={index}>
											{cell}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
				{this.props.footer &&
					<tfoot style={{fontWeight: 'bold'}}>
						<tr>
							{this.props.footer.map((cell, index) => {
								const { justification = 'left' } = this.props.headers[index];

								return (
									<td style={{textAlign: justification}} key={index}>
										{cell}
									</td>
								);
							})}
						</tr>
					</tfoot>
				}
			</table>
		);
	}
});

export default Table;