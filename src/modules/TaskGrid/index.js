import React, { useState, useContext, useEffect } from 'react';
import AppContext from '../../common/context';
import TaskCard from './TaskCard';
import './Task.css';
const TaskGrid = ({ tasks }) => {
	const [state, dispatch] = useContext(AppContext);
	const taskCards = tasks.map((task) => {
		return (
			<TaskCard
				id={task._id}
				completed={task.completed}
				description={task.description}
				createdAt={task.createdAt}
				key={task._id}
			/>
		);
	});
	return <section className='task-container'>{taskCards}</section>;
};

export default TaskGrid;
