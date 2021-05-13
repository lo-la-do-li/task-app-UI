import './Task.css';

const TaskCard = ({ id, completed, description, createdAt }) => {
	return (
		<div className='card'>
			<h3 className='card-completed'>{completed}</h3>
			<p className='card-description'>{description}</p>
			<button className='complete-btn'>COMPLETED</button>
		</div>
	);
};

export default TaskCard;
