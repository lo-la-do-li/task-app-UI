import React, { useReducer, useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import AppContext from '../../common/context';
import { reducer, initialState } from '../../common/reducer';
import Login from '../Login';
import './App.css';

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<AppContext.Provider value={[state, dispatch]}>
			<Switch>
				<Route exact path='/' component={Login} />
			</Switch>
		</AppContext.Provider>
	);
};

export default App;
