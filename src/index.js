const $ = window.jQuery = window.$ = require('jquery');
window.Tether = require('tether');
require('bootstrap');

import React from 'react';
// Shim this so we don't have to import it everywhere we use it
window.React = React;

import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import App from './components/App';
import SignIn from './components/pages/SignIn';
import Expenses from './components/pages/budget/Expenses';
import AddExpense from './components/pages/budget/AddExpense';
import AddPurchase from './components/pages/purchases/AddPurchase';

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
			<Route path='/sign-in' component={SignIn} />
			<Route path='/budget'>
				<Route path='/budget/expenses' component={Expenses} />
				<Route path='/budget/add-expense' component={AddExpense} />
			</Route>
			<Route path='/purchases'>
				<Route path='/purchases/add-purchase' component={AddPurchase} />
			</Route>
		</Route>
	</Router>
);

ReactDOM.render(page, document.getElementById('app'));