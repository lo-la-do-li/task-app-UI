import React, { useReducer, useState, useEffect } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import AppContext from '../../common/context';
import { reducer, initialState } from '../../common/reducer';
import Login from '../Login';
import SignUp from '../SignUp';
import Home from '../Home';
import Nav from '../Nav';
// import { getAccessToken } from '../../utils';
import useToken from '../../common/useToken';
import './App.css';

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { token, setToken } = useToken();

	useEffect(() => {
		// checkToken();
	}, [token]);

	return (
		<AppContext.Provider value={[state, dispatch]}>
			<Switch>
				<Route exact path='/'>
					{!token && <Redirect to='/login' />}
					{token && (
						<>
							<Nav token={token} setToken={setToken} />
							<Home token={token} />
						</>
					)}
				</Route>

				<Route
					path='/login'
					render={() => {
						return <Login setToken={setToken} />;
					}}
				/>
				<Route
					path='/register'
					render={() => {
						return <SignUp setToken={setToken} />;
					}}
				/>
			</Switch>
		</AppContext.Provider>
	);
};

export default App;
