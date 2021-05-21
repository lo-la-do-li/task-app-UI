import React, { useState, useContext, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeStyles } from "@material-ui/core";
import taskAPI from '../../api/task';
import { taskDate } from '../../utils';
import TaskGrid from '../TaskGrid';
import AppContext from '../../common/context';
import ModalForm from '../../ui/ModalForm';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingTop: '2%',
    overflow: 'hidden',
    backgroundColor: '#8372ae0f',
    borderRadius: '8px'
  },
  container: {
    display: 'flex',
    justifyItems: 'space-between',
    [theme.breakpoints.down("900")]: {
      flexFlow: 'wrap',
      padding: '0',
    },
    box: {
      display: 'flex', 
      flexDirection: 'column', 
      textAlign: 'center', 
      // width: 'inherit'
    },
  paper: {
    width: '80%',
		margin: `${theme.spacing(2)}px auto`,
		padding: theme.spacing(2),
    borderRadius: '200px',
    display: 'flex',
    flexDirection: 'column'
    },
  title: {
    textAlign: 'center',
    fontFamily: 'Lato',
  },
  }
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
    return taskDate(today)
  }
	return (
    <div className={classes.root}>
      <Box style={{padding: '0px 40px'}}>
        <div style={{fontSize: '32px', fontFamily: 'Lato', fontWeight: '600'}}>{`${getTodayDate()[0]} ${getTodayDate()[1]}`}</div>
        <div>{getTodayDate()[2]}</div>
      </Box>
      <Paper style={{borderRadius: '10px', width:'200px'}}className={classes.paper}>
        <ModalForm
          open={open}
          handleClose={handleClose}
          create={true}
          task={null}
          submitAction={submitNewTask}
          button={
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px'}}>
          <span style={{fontSize: '20px', color: 'rgba(0, 0, 0, 0.54)', fontFamily: 'Lato', fontWeight: '600'}}>Add a task</span>
          <IconButton  
            onClick={handleClickOpen}
          >
            <AddCircleOutlineIcon style={{ fontSize: 60 }}/>
          </IconButton>
          </div>
          }
        />
       
     
      </Paper>

      <Container className={classes.container}>
        <TaskGrid title={'TO DO'} emptyMessage={'You\'ve completed all your tasks!'} tasks={state.toDo} updateTaskGrids={updateTaskGrids} />
        <TaskGrid title={'DONE'} emptyMessage={'You haven\'t completed any tasks yet'} tasks={state.completed} updateTaskGrids={updateTaskGrids} />
      </Container>
    </div>
	);
};

export default Home;
