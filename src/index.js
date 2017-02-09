import $ from 'jquery';
import React from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, IndexRoute, hashHistory } from 'react-router';

import App from './components/App';
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import AddExpense from './components/pages/budget/AddExpense';
import ExpenseDetails from './components/pages/budget/expenses/Details';

import BudgetRouteContainer from './routes/budget/index';
import AddPurchaseRouteContainer from './routes/purchases/add-purchase';
import PurchasesByMonthRouteContainer from './routes/purchases/by-month';
import PurchasesByExpenseRouteContainer from './routes/purchases/by-expense';
import PurchasesByCategoryRouteContainer from './routes/purchases/by-category';
import PurchaseDetailRouteContainer from './routes/purchases/purchase-details';

const enterApp = (nextState, replace, callback) => {
	firebase.auth().onAuthStateChanged((user) => {
		const isLoggedIn = !!user;
		const isSignInPage = (nextState.location.pathname === '/sign-in');

		if (!isLoggedIn && !isSignInPage) {
			replace('/sign-in');
		} else if (isLoggedIn && isSignInPage) {
			replace('/');
		}

		callback();
	});
};

const routeChange = (prevState, nextState, replace) => {
	const button = $('#navbar-hamburger-button');

	if (button.attr('aria-expanded') === 'true') {
		button.click();
	}
};

const page = (
	<Router history={hashHistory}>
		<Route path='/' component={App} onEnter={enterApp} onChange={routeChange}>
			<IndexRoute component={Home} />
			<Route path='sign-in' component={SignIn} />
			<Route path='budget'>
				<IndexRoute component={BudgetRouteContainer} />
				<Route path='add-expense' component={AddExpense} />
				<Route path='expenses/:expenseId/details' component={ExpenseDetails} />
			</Route>
			<Route path='purchases'>
				<IndexRedirect to={`/purchases/${moment().format('YYYY-MM')}`} />
				<Route path=':month/by-category/:categoryId' component={PurchasesByCategoryRouteContainer} />
				<Route path=':month/by-expense/:expenseId' component={PurchasesByExpenseRouteContainer} />
				<Route path='add-purchase' component={AddPurchaseRouteContainer} />
				<Route path=':purchaseId/details' component={PurchaseDetailRouteContainer} />
				<Route path=':month' component={PurchasesByMonthRouteContainer} />
			</Route>
		</Route>
	</Router>
);

ReactDOM.render(page, document.getElementById('app'));