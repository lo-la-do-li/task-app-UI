import React, { useReducer, useState, useEffect } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import AppContext from '../../common/context';
import { reducer, initialState } from '../../common/reducer';
import Login from '../Login';
import SignUp from '../SignUp';
import Home from '../Home';
import Nav from '../Nav';
import { getAccessToken } from '../../utils';
import useToken from '../../common/useToken';
import './App.css';

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	// const [token, setToken] = useState(false);
	const { token, setToken } = useToken();

	if (!token) {
		return <Login setToken={setToken} />;
	}

	// const checkToken = () => {
	// 	let token = getAccessToken();

	// 	if (token === null) {
	// 		console.log('no token');
	// 		setAuth(false);
	// 	} else if (token !== null) {
	// 		console.log('User in state');
	// 		let userInStorage = localStorage.getItem('user');
	// 		console.log(JSON.parse(userInStorage));
	// 		setAuthState(true);
	// 		setUserState(userInStorage);
	// 		setAuth(true);
	// 	}
	// };

	// const setAuthState = (value) => {
	// 	const action = { type: 'SET_AUTHORIZED', isAuthorized: value };
	// 	dispatch(action);
	// };

	// const setUserState = (user) => {
	// 	const action = { type: 'SET_USER', authUser: user };
	// 	dispatch(action);
	// };

	return (
		<AppContext.Provider value={[state, dispatch]}>
			<Nav token={token} />
			<Switch>
				{/* <Route exact path='/'>
					{!state.isAuthorized && <Redirect to='/login' />}
				</Route>
				<Route path='/login' component={Login} />
				<Route path='/register' component={SignUp} /> */}
				<Route
					exact
					path='/'
					render={() => {
						return <Home token={token} />;
					}}
				/>
				{/* {!auth && (
					<>
						<Route path='/login' component={Login} />
						<Route path='/register' component={SignUp} />
					</>
				)}{' '} */}
			</Switch>
		</AppContext.Provider>
	);
};

export default App;
