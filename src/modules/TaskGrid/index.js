import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

// App Imports
import PageAndSort from '../PageAndSort'
// import taskAPI from '../../api/task';
import TaskCard from '../TaskCard'

const useStyles = makeStyles((theme) => ({

	message: {
		color: '#2b2733',
		textAlign: 'center',
	},

	container: {
		padding: '20px 30px',
		[theme.breakpoints.down('900')]: {
			paddingBottom: '40px',
		},
	},
}));

export default function TaskGrid({ tasks, sort, handleSort, updateTaskGrids, title, emptyMessage }) {
	const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(3);
  
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const taskCards = currentTasks.map((task) => {
    return (
      <TaskCard 
        id={task._id}
        key={task._id} 
        task={task}
        completed={task.completed}
        description={task.description}
        createdAt={task.createdAt}
        updateTaskGrids={updateTaskGrids}
      />
    )
  })

	return (
		<Container maxWidth='lg' className={classes.container}>
			
      <PageAndSort
				title={title}
        sort={sort}
				handleSort={handleSort}
				tasksPerPage={tasksPerPage}
				totalTasks={tasks.length}
        paginate={paginate}
			/>

			{!tasks.length ? (
				<h3 className={classes.message}>{emptyMessage}</h3>
			) : (
				<div>{taskCards}</div>
			)}
		</Container>
	);
}
