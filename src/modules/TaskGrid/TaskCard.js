import './Task.css';

const TaskCard = ({ id, completed, description, createdAt }) => {
	return (
		<div className='card'>
			{/* <h3 className='card-completed'>{completed}</h3> */}
			<p className='card-description'>{description}</p>
			<div className='checkbox'>
				<input type='checkbox' id={id} name='completed' value={completed} />
				<label for='completed'>Did it!</label>
			</div>
		</div>
	);
};

export default TaskCard;
