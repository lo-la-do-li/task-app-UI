import React, { useState, useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core";
import taskAPI from '../../api/task';
import TaskGrid from '../TaskGrid';
import AppContext from '../../common/context';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    [theme.breakpoints.down("900")]: {
      flexFlow: 'wrap',
      padding: '0',
    },
  }
}));

const Home = ({ token }) => {
	const [state, dispatch] = useContext(AppContext);
	const [completed, setCompleted] = useState([]);

  const classes = useStyles()

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
		<Container className={classes.container}>
			<TaskGrid title={'TO DO'} emptyMessage={'You\'ve completed all your tasks!'} tasks={state.toDo} updateTaskGrids={updateTaskGrids} />
			<TaskGrid title={'DONE'} emptyMessage={'You haven\'t completed any tasks yet'} tasks={state.completed} updateTaskGrids={updateTaskGrids} />
		</Container>
	);
};

export default Home;
