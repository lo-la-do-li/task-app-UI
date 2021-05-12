import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import userAPI from '../../api/user';
import AppContext from '../../common/context';

const Home = () => {
	const [state, dispatch] = useContext(AppContext);

	return <>{state.isAuthorized && <div>This is the Home Page</div>}</>;
};

export default Home;
