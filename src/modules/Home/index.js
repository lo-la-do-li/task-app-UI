import React, { useState, useContext, useEffect } from 'react';
import taskAPI from '../../api/task';
import TaskGrid from '../TaskGrid';
import AppContext from '../../common/context';

const Home = ({ token }) => {
	const [state, dispatch] = useContext(AppContext);

	useEffect(() => {
		getTasks();
	}, []);

	const getTasks = async () => {
		if (token) {
			await taskAPI.getTasks(token).then((data) => setTasksInState(data));
		} else {
			return setTasksInState([]);
		}
	};

	const setTasksInState = (tasks) => {
		const action = { type: 'SET_TASKS', tasks: tasks };
		dispatch(action);
	};

	return (
		<>
			<TaskGrid tasks={state.tasks} getTasks={getTasks} token={token} />
		</>
	);
};

export default Home;
