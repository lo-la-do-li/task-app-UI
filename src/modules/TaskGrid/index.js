import TaskCard from './TaskCard';
import './TaskGrid.css';
const TaskGrid = ({ tasks }) => {
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
