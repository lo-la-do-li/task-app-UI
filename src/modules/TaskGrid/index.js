import React, { useState, useEffect } from 'react';
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';


// App Imports
import PageAndSort from '../PageAndSort'
import taskAPI from '../../api/task';
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

const GreenCheckbox = withStyles({
	root: {
		color: '#021448a6',
		'&$checked': {
			color: '#021448a6',
		},
	},
	checked: {},
})((props) => <Checkbox color='default' {...props} />);

export default function TaskGrid({ tasks, handleSort, updateTaskGrids, title, emptyMessage }) {
	const classes = useStyles();
  const [page, setPage] = useState(tasks.slice(0, 2))

    const taskCards = tasks.map((task) => {
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
      <PageAndSort title={title} tasks={tasks} handleSort={handleSort}/>

			{!tasks.length ? (
				<h3 className={classes.message}>{emptyMessage}</h3>
			) : (
        <div>{taskCards}</div>
			)
      }
		</Container>
	);
}
