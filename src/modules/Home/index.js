import React, { useState, useContext, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import userAPI from '../../api/user';
import taskAPI from '../../api/task';
// import { getAccessToken } from '../../utils';
import TaskGrid from '../TaskGrid';
// import Nav from '../Nav';
import AppContext from '../../common/context';

const Home = ({ token }) => {
	const [state, dispatch] = useContext(AppContext);

	useEffect(() => {
		getTasks();
	}, []);

	const getTasks = async () => {
		console.log('', token);
		await taskAPI.getTasks(token).then((data) => setTasksInState(data));
	};

	const setTasksInState = (tasks) => {
		const action = { type: 'SET_TASKS', tasks: tasks };
		dispatch(action);
	};

	return (
		<>
			<div>This is the Home Page</div>
			{!state.tasks ? (
				<div>You haven't added any tasks yet</div>
			) : (
				<TaskGrid tasks={state.tasks} />
			)}
		</>
	);
};

export default Home;
