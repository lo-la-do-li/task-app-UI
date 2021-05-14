import React, { useReducer, useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import AppContext from '../../common/context';
import { reducer, initialState } from '../../common/reducer';
import Login from '../Login';
import SignUp from '../SignUp';
import Home from '../Home';
import { getAccessToken } from '../../utils';
import './App.css';

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [auth, setAuth] = useState(false);

	useEffect(() => {
		checkToken();
	}, [auth]);

	const checkToken = () => {
		let token = getAccessToken();

		if (token === null) {
			console.log('no token');
			setAuth(false);
		} else if (token !== null) {
			console.log('User in state');
			setAuth(true);
		}
	};
	return (
		<AppContext.Provider value={[state, dispatch]}>
			<Switch>
				{/* {!auth && <Route path='/login' component={Login} />} */}
				<Route exact path='/login' component={Login} />
				<Route path='/register' component={SignUp} />
				<Route exact path='/' component={Home} />
			</Switch>
		</AppContext.Provider>
	);
};

export default App;
