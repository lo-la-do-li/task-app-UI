import React, { useState, useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/core";
import taskAPI from '../../api/task';
import { getDate } from '../../utils';
import TaskGrid from '../TaskGrid';
import AppContext from '../../common/context';
import TaskForm from '../../ui/modal/TaskForm';
import Ellipses from '../../ui/loading/Ellipses';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		borderRadius: '20px',
		[theme.breakpoints.down('900')]: {
			overflow: 'scroll',
		},
	},
	header: {
		display: 'flex',
		padding: '10px 40px 20px 40px',
		justifyContent: 'space-between',
		width: '100%',
		height: 'fit-content',
		[theme.breakpoints.down('900')]: {
			padding: '10px 20px 40px 20px',
		},
	},
	container: {
		display: 'flex',
		justifyItems: 'space-between',
		minWidth: '240px',
		[theme.breakpoints.down('900')]: {
			flexFlow: 'wrap',
			padding: '0',
		},
	},
	box: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
	},
	addButton: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '10px',
	},
	dateBox: {
		borderRadius: '20px',
		padding: '20px',
		fontFamily: 'Source Sans Pro',
		color: '#2b2733',
		height: 'min-content',
		flexGrow: 1,
		[theme.breakpoints.down('600')]: {
			padding: '20px 15px',
		},
	},
	date: {
		fontSize: '28px',
		fontFamily: 'Martel Sans',
		fontWeight: '600',
	},
	weekday: {
		color: '#888892',
		fontFamily: 'Martel Sans',
		fontWeight: 'bold',
		fontSize: '16px',
	},
	fab: {
		outline: 'none',
		color: '#fff',
		border: 'none',
		background: '#2b2733',
		margin: '5px 0px 5px 0px',
		willChange: 'transform',
		cursor: 'pointer',
		transition: 'transform ease .3s',
		'&:hover': {
			transform: 'translateY(-1%)',
			color: '#fff',
			background: 'linear-gradient(to bottom right, #4d4ae8, #8375d3)',
		},
	},
}));

const Home = ({ token }) => {
	const [state, dispatch] = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false)
  const [sortToDo, setSortToDo] = useState('asc')
  const [sortDone, setSortDone] = useState('desc');
  const classes = useStyles()

	useEffect(() => {
  // Sets all tasks in state => getTasks(undefined, 'tasks');
    getTodayDate()
    updateTaskGrids()
	}, [sortToDo, sortDone]);

   const handleClose = () => {
    setOpen(false);
  };

    const handleClickOpen = () => {
    setOpen(true);
  };

	const updateTaskGrids = () => {
    getTasks('?completed=true', sortDone, 'completed');
		getTasks('?completed=false', sortToDo, 'toDo');
	};

  const handleSort = (direction, title) => {
    if (title === 'DONE') {
      return setSortDone(direction)
    } else {
      return setSortToDo(direction)
    }
  }

	const getTasks = async (query, sort, type) => {
    setIsLoading(true);
    if (token) {
			await taskAPI
				.getTasks(query, sort, token)
				.then((data) => setTasksInState(type, data));
		} else {
			return setTasksInState([]);
		}
    setIsLoading(false);
	};

	const setTasksInState = (type, tasks) => {
		const action = { type: `SET_${type.toUpperCase()}`, [type]: tasks };
		dispatch(action);
	};

  const submitNewTask = async (e, description) => {
    e.preventDefault()
    let newTask = {
      description, 
      completed: false,
    }
    await taskAPI.createTask(newTask).then(res => {
      return updateTaskGrids()
    })
    setOpen(false)
  }

  const getTodayDate = () => {
    let today = new Date();
    return getDate(today);
  }

  
	return (
		<div className={classes.root}>
			<Container className={classes.header}>
				<Paper className={classes.dateBox}>
					<div className={classes.date}>
						{`${getTodayDate()[0]} ${getTodayDate()[1]}`}
					</div>
					<div className={classes.weekday}>{getTodayDate()[2]}</div>
				</Paper>

				<Paper
					style={{
						borderRadius: '20px',
						padding: '8px',
						height: 'min-content',
					}}
				>
					<TaskForm
						open={open}
						handleClose={handleClose}
						create={true}
						task={null}
						submitAction={submitNewTask}
						button={
							<div className={classes.addButton}>
								<Fab onClick={handleClickOpen} className={classes.fab}>
									<AddIcon />
								</Fab>
							</div>
						}
					/>
				</Paper>
			</Container>

			{isLoading ? (
				<Container style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
					<span className={classes.date}>Loading your tasks</span>

					<Ellipses type='balls' color='#000000' />
				</Container>
			) : (
				<Container className={classes.container}>
					<TaskGrid
						title={'TO DO'}
						tasks={state.toDo}
						sort={sortToDo}
						handleSort={handleSort}
						updateTaskGrids={updateTaskGrids}
						emptyMessage={'Add tasks using the + button'}
					/>
					<TaskGrid
						title={'DONE'}
						tasks={state.completed}
						sort={sortDone}
						handleSort={handleSort}
						updateTaskGrids={updateTaskGrids}
						emptyMessage={"You haven't completed any tasks yet"}
					/>
				</Container>
			)}
		</div>
	);
};

export default Home;
