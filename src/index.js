import React from 'react';
// Shim this so we don't have to import it everywhere we use it
window.React = React;

import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import App from './components/App';
import SignIn from './components/pages/SignIn';
import Expenses from './components/pages/budget/Expenses';
import AddExpenseForm from './components/AddExpenseForm';

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

const page = (
	<Router history={hashHistory}>
		<Route path='/' component={App} onEnter={enterApp}>
			<Route path='/sign-in' component={SignIn} />
			<Route path='/budget'>
				<Route path='/budget/expenses' component={Expenses} />
			</Route>
			<Route path='/add-expense' component={AddExpenseForm} />
		</Route>
	</Router>
);

ReactDOM.render(page, document.getElementById('app'));