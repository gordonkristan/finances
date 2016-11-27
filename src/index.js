const $ = window.jQuery = window.$ = require('jquery');
window.Tether = require('tether');
require('bootstrap');

import React from 'react';
// Shim this so we don't have to import it everywhere we use it
window.React = React;

import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App';
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';
import Budget from './components/pages/budget/Budget';
import AddExpense from './components/pages/budget/AddExpense';
import AddPurchase from './components/pages/purchases/AddPurchase';
import ExpenseDetails from './components/pages/budget/expenses/Details';

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
			<Route path='/sign-in' component={SignIn} />
			<Route path='/budget'>
				<IndexRoute component={Budget} />
				<Route path='/budget/add-expense' component={AddExpense} />
				<Route path='/budget/expenses/:expenseId/details' component={ExpenseDetails} />
			</Route>
			<Route path='/purchases'>
				<Route path='/purchases/add-purchase' component={AddPurchase} />
			</Route>
		</Route>
	</Router>
);

ReactDOM.render(page, document.getElementById('app'));