import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import Purchase from 'app/models/purchase';
import Icon from 'app/components/util/Icon';
import Table from 'app/components/util/Table';
import ExpenseCategory from 'app/models/expense-category';

import { Link } from 'react-router';
import { isMobile } from 'app/util/mobile';
import { formatDollarAmount } from 'app/util/formatters';

const pickArrayIndices = (array, indices) => {
	return _.map(indices, (index) => array[index]);
};

class PurchasesTable extends React.Component {

	static contextTypes = {
		router: React.PropTypes.object
	};

	static propTypes = {
		expenseCategories: React.PropTypes.arrayOf(React.PropTypes.instanceOf(ExpenseCategory)).isRequired,
		purchases: React.PropTypes.arrayOf(React.PropTypes.instanceOf(Purchase)).isRequired,
		totalBudgeted: React.PropTypes.number.isRequired,
		month: React.PropTypes.string.isRequired,
		onMonthChanged: React.PropTypes.func.isRequired
	};

	////////////////////////////////////////

	getExpenseName(id) {
		const { expenseCategories } = this.props;

		for (let category of expenseCategories) {
			if (category.id === id) {
				return category.name;
			}

			if (category.hasExpense(id)) {
				return category.getExpense(id).name;
			}
		}
	}

	getAvailableMonths() {
		const months = [];
		const date = moment([2016, 11]);

		while (date.valueOf() <= Date.now()) {
			months.push(date.format('YYYY-MM'));

			date.add(1, 'month');
		}

		return months;
	}

	onMonthChanged(event) {
		const month = event.target.value;
		this.props.onMonthChanged(month);
	}

	////////////////////////////////////////

	render() {
		const { purchases, totalBudgeted, month } = this.props;

		const headers = [
			{ label: 'Date' },
			{ label: 'Expense' },
			{ label: 'Description' },
			{ label: 'Cost', justification: 'right' },
			{ label: '', justification: 'center' }
		];

		const data = purchases.map((purchase) => {
			return [
				purchase.date.format('MMM D'),
				<Link to={`/purchases/${month}/by-expense/${purchase.expenseId}`}>
					{this.getExpenseName(purchase.expenseId)}
				</Link>,
				purchase.description,
				formatDollarAmount(purchase.cost),
				<Link to={`/purchases/${purchase.id}/details`}>
					<Icon name='cog' />
				</Link>
			];
		});

		const totalSpent = _.sumBy(purchases, 'cost');
		const diff = (totalBudgeted - totalSpent);
		const diffColor = (diff === 0 ? 'black' : (diff > 0 ? 'green' : 'red'));

		const footers = [[
			null,
			null,
			'Total Spent',
			formatDollarAmount(totalSpent),
			null
		], [
			null,
			null,
			'Amount Budgeted',
			formatDollarAmount(totalBudgeted),
			null
		], [
			null,
			null,
			<span style={{color: diffColor}}>
				{diff >= 0 ? 'Amount Left' : 'Amount Overspent'}
			</span>,
			<span style={{color: diffColor}}>
				{formatDollarAmount(diff).replace('$-', '-$')}
			</span>,
			null
		]];

		const props = { headers, data, footers };

		if (isMobile) {
			const mobileIndices = [0, 1, 3];

			props.headers = pickArrayIndices(props.headers, mobileIndices);
			props.footers = props.footers.map((row) => {
				return pickArrayIndices(row, mobileIndices);
			});

			props.data = props.data.map((row) => {
				return pickArrayIndices(row, mobileIndices);
			});

			props.onRowClicked = (row, index) => {
				const purchase = purchases[index];
				this.context.router.push(`/purchases/${purchase.id}/details`);
			};
		}

		const dropdownStyle = {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			opacity: 0,
			cursor: 'pointer'
		};

		return (
			<div>
				<div style={{position: 'relative', textAlign: 'center'}}>
					<h3 style={{marginBottom: '0.5em', fontWeight: 'bold'}}>
						{moment(this.props.month, 'YYYY-MM').format('MMMM YYYY')}
					</h3>
					<select style={dropdownStyle} value={this.props.month} onChange={this.onMonthChanged.bind(this)}>
						{this.getAvailableMonths().map((month) => {
							return (
								<option value={month} key={month}>
									{moment(month, 'YYYY-MM').format('MMMM YYYY')}
								</option>
							);
						})}
					</select>
				</div>
				<Table {...props} />
			</div>
		);
	}

}

export default PurchasesTable;