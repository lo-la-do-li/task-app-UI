import React, { useState, useContext, useEffect } from 'react';
import taskAPI from '../../api/task';
import TaskGrid from '../TaskGrid';
import AppContext from '../../common/context';

const Home = ({ token }) => {
	const [state, dispatch] = useContext(AppContext);
	const [completed, setCompleted] = useState([]);

	useEffect(() => {
  // Sets all tasks in state:
	  // getTasks(undefined, 'tasks');
  // Sets toDo versus completed:
    updateTaskGrids()
	}, []);

	const updateTaskGrids = () => {
		getTasks('?completed=true', 'completed');
		getTasks('?completed=false', 'toDo');
	};

	const getTasks = async (query, type) => {
		if (token) {
			await taskAPI
				.getTasks(query, token)
				.then((data) => setTasksInState(type, data));
		} else {
			return setTasksInState([]);
		}
	};

	const setTasksInState = (type, tasks) => {
		const action = { type: `SET_${type.toUpperCase()}`, [type]: tasks };
		dispatch(action);
	};

	return (
		<div style={{ display: 'flex' }}>
			<TaskGrid tasks={state.toDo} updateTaskGrids={updateTaskGrids} />
			<TaskGrid tasks={state.completed} updateTaskGrids={updateTaskGrids} />
		</div>
	);
};

export default Home;
