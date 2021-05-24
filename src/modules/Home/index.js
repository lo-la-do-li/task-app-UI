import React, { useState, useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeStyles } from "@material-ui/core";
import taskAPI from '../../api/task';
import { getDate } from '../../utils';
import TaskGrid from '../TaskGrid';
import AppContext from '../../common/context';
import TaskForm from '../../ui/modal/TaskForm';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		height: '100vh',
		// paddingTop: '2vh',
		// overflow: 'hidden',
		// backgroundColor: '#8372ae0f',
		borderRadius: '20px',
		[theme.breakpoints.down('900')]: {
			paddingTop: '4vh',
		},
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		padding: '10px 40px 20px 40px',
		justifyContent: 'space-between',
		width: '100%',
		[theme.breakpoints.down('900')]: {
			padding: '10px 20px 40px 20px',
		},
	},
	container: {
		display: 'flex',
		justifyItems: 'space-between',
		[theme.breakpoints.down('900')]: {
			flexFlow: 'wrap',
			padding: '0',
		},
	},
	box: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		// width: 'inherit'
	},
	addButton: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '10px',
	},
	paper: {
		margin: `${theme.spacing(2)}px auto`,
		display: 'flex',
		flexDirection: 'column',
	},
	title: {
		fontSize: '16px',
		color: '#2b2733',
		fontFamily: 'Lato',
		fontWeight: '600',
	},
}));

const Home = ({ token }) => {
	const [state, dispatch] = useContext(AppContext);
  const [open, setOpen] = useState(false)
  const classes = useStyles()

	useEffect(() => {
  // Sets all tasks in state => getTasks(undefined, 'tasks');
    getTodayDate()
    updateTaskGrids()
	}, []);

   const handleClose = () => {
    setOpen(false);
  };

    const handleClickOpen = () => {
    setOpen(true);
  };

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

  const submitNewTask = async (e, description) => {
    e.preventDefault()
    let newTask = {
      description, 
      completed: false,
    }
    await taskAPI.createTask(newTask).then(res => {
      // console.log(res)
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
      <div className={classes.header}>
        <Box >
          <div style={{fontSize: '32px', fontFamily: 'Lato', fontWeight: '600'}}>{`${getTodayDate()[0]} ${getTodayDate()[1]}`}</div>
          <div>{getTodayDate()[2]}</div>
        </Box>
        <Paper style={{borderRadius: '20px', padding: '8px'}}>
          <TaskForm
            open={open}
            handleClose={handleClose}
            create={true}
            task={null}
            submitAction={submitNewTask}
            button={
            <div className={classes.addButton}>
              <span className={classes.title}>Add a task</span>
              <IconButton  
                onClick={handleClickOpen}
                style={{padding: '8px 0 4px 0'}}
              >
                <AddCircleOutlineIcon style={{ fontSize: 40 }}/>
              </IconButton>
            </div>
            }
          />
      
        </Paper>
      </div>

      <Container className={classes.container}>
        <TaskGrid title={'TO DO'} emptyMessage={'You\'ve completed all your tasks!'} tasks={state.toDo} updateTaskGrids={updateTaskGrids} />
        <TaskGrid title={'DONE'} emptyMessage={'You haven\'t completed any tasks yet'} tasks={state.completed} updateTaskGrids={updateTaskGrids} />
      </Container>
    </div>
	);
};

export default Home;
