import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userAPI from '../../api/user';
import taskAPI from '../../api/task';
import { getAccessToken } from '../../utils';
import TaskGrid from '../TaskGrid';

import AppContext from '../../common/context';

const Home = () => {
	const [state, dispatch] = useContext(AppContext);

	useEffect(() => {
		getTasks();
	}, []);

	const getTasks = async () => {
		const token = getAccessToken();

		await taskAPI
			.getTasks(token)
			.then((data) => setTasksInState(data))
			.then(console.log(state.tasks));
	};

	const setTasksInState = (tasks) => {
		const action = { type: 'SET_TASKS', tasks: tasks };
		dispatch(action);
	};

	return (
		<>
			<div>This is the Home Page</div>
			<TaskGrid tasks={state.tasks} />
		</>
	);
};

export default Home;
