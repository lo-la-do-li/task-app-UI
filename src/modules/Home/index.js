import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import userAPI from '../../api/user';
import taskAPI from '../../api/task';

import AppContext from '../../common/context';

const Home = () => {
	const [state, dispatch] = useContext(AppContext);

	const getAccessToken = () => {
		return localStorage.getItem('token');
	};
	const getUserId = () => {
		return localStorage.getItem('userId');
	};

	const getTasks = async () => {
		const token = getAccessToken();

		const userTasks = await taskAPI.getTasks(token).then((data) => data);

		console.log(userTasks);
	};
	getTasks();

	return <>{state.isAuthorized && <div>This is the Home Page</div>}</>;
};

export default Home;
