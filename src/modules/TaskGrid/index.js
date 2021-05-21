import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { green, grey } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ModalForm from '../../ui/ModalForm';
import { taskDate } from '../../utils';
import taskAPI from '../../api/task';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		overflow: 'hidden',
    [theme.breakpoints.down("900")]: {
      padding: '0',
      // maxWidth: 'max-content'
    },
	},
	paper: {
		maxWidth: 460,
		margin: `${theme.spacing(1)}px auto`,
		padding: theme.spacing(2),
    borderRadius: '20px'
	},
  title: {
    height: '40px',
    textAlign: 'center',
    color: '#021448a6',
    fontFamily: 'Lato',
    border: '1px solid white',
    boxShadow: '-1px 2px 2px rgb(0 0 0 / 20%)',
    background: 'white',
    borderRadius: '20px'
  },
  message: {
    color: '#2b2733',
    textAlign: 'center'
  },
	dateCreated: {
    fontFamily: 'Lato',
    fontWeight: 600,
    color: '#0214488a',
    width: '60px',
		borderRight: '1.5px solid #d9d5ed',
    // borderRight: '1.5px solid #e6cfd5',
		marginRight: '5px',
	},
  description: {
    display: '-webkit-box',
    boxOrient: 'vertical',

    lineClamp: 3,
    overflow: 'hidden'

  }
}));

const GreenCheckbox = withStyles({
	root: {
		color: green[400],
		'&$checked': {
			color: green[600],
		},
	},
	checked: {},
})((props) => <Checkbox color='default' {...props} />);

export default function TaskGrid({ tasks, updateTaskGrids, title, emptyMessage }) {
	const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [taskEdit, setTaskEdit] = useState(null)
  
  const handleClickOpen = (task) => {
    setTaskEdit(task)
    setOpen(true);
  };

  const handleClose = () => {
    setTaskEdit(null)
    setOpen(false);
  };

	const handleChange = async (e) => {
		let taskId = e.target.name;
		let checked = e.target.checked;

		let updates = {
			completed: checked,
		};

		await taskAPI.updateTask(taskId, updates).then((res) => {
      return updateTaskGrids()
		});
	};

  const submitUpdate = async (e, update, taskId) => {
    e.preventDefault()
    let updates = {
      description: update
    }
    await taskAPI.updateTask(taskId, updates).then(res => {
      return updateTaskGrids()
    })
    setTaskEdit(null)
    setOpen(false)
  }

	return (
		<Container maxWidth='lg'>
      <h2 className={classes.title}>{title}</h2>
			{!tasks.length ? (
				<h3 className={classes.message}>{emptyMessage}</h3>
			) : (
				tasks.map((task) => (
					<div key={task._id} className={classes.root}>
						<Paper className={classes.paper}>
							<Grid container wrap='nowrap' spacing={2}>
						
									<Grid item className={classes.dateCreated}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginLeft: '-8px',
                        textAlign: 'center',
                      }}
                    >
                      <span style={{ fontSize: 18}}>
                        {taskDate(task.createdAt)[0].toUpperCase()}
                      </span>
                      <span style={{ fontSize: 30}}>{taskDate(task.createdAt)[1]}</span>
                    </div>
									
									</Grid>
									<Grid item xs zeroMinWidth>
										<Typography className={classes.description}>{task.description}</Typography>
									</Grid>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                  <Grid item id={task._id}>
                    <ModalForm 
                      open={open}
                      handleClose={handleClose}
                      create={false}
                      task={taskEdit}
                      submitAction={submitUpdate}
                      button={(
                        <IconButton  
                          id={task._id} 
                          onClick={() => handleClickOpen(task)}
                        >
                          <EditIcon style={{fill: '#021448a6'}}/>
                        </IconButton>
                    )}
                    />
                  </Grid>
              
									<Grid item style={{alignSelf: 'center'}}>
                 
												<GreenCheckbox
													id={task._id}
													checked={task.completed}
													onChange={handleChange}
													name={task._id}
												/>
											
									</Grid>
                  </div>
								
							</Grid>

						</Paper>
					</div>
				))
			)}
		</Container>
	);
}
