import React, { useEffect, useReducer } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AppContext from '../../common/context';
import { reducer, initialState } from '../../common/reducer';
import Login from '../Login';
import SignUp from '../SignUp';
import Home from '../Home';
import NavDrawer from '../NavDrawer';
import useToken from '../../common/useToken';

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { token, setToken } = useToken();

  useEffect(() => {
    checkUserState()
  }, [])
  
  const checkUserState = () => {
    console.log(state.authUser)
  }

	return (
		<AppContext.Provider value={[state, dispatch]}>
			<Switch>
				<Route exact path='/'>
					{!token && <Redirect to='/login' />}
					{token && (
						<>
							<NavDrawer token={token} setToken={setToken}>
								<Home token={token} />
							</NavDrawer>
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
