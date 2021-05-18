import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import { green, grey } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ModalForm from '../../ui/ModalForm'
import { taskDate } from '../../utils';
import taskAPI from '../../api/task';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		overflow: 'hidden',
		padding: theme.spacing(0, 3),
	},
	paper: {
		maxWidth: 400,
		margin: `${theme.spacing(1)}px auto`,
		padding: theme.spacing(2),
	},
	dateCreated: {
		borderRight: '1.5px solid #2b2733',
		marginRight: '5px',
	},
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

export default function TaskGrid({ tasks, updateTaskGrids }) {
	const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    console.log(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const handleChange = async (event) => {
		let taskId = event.target.name;
		let checked = event.target.checked;

		let updates = {
			completed: checked,
		};

		await taskAPI.updateTask(taskId, updates).then((res) => {
		console.log(res)
      return updateTaskGrids()
		});
	};
  const submitUpdate = async (e, update, taskId) => {
    e.preventDefault()
    let updates = {
      description: update
    }
    // let taskId = event.target.id
    console.log(updates, taskId)
    await taskAPI.updateTask(taskId, updates).then(res => {
      console.log(res)
      return updateTaskGrids()
    })
    setOpen(false)
  }


	return (
		<Container maxWidth='sm'>
			{!tasks.length ? (
				<div>You haven't added any tasks yet</div>
			) : (
				tasks.map((task) => (
					<div key={task._id} className={classes.root}>
						<Paper className={classes.paper}>
							<Grid container wrap='nowrap' spacing={2}>
								<>
									<Grid item className={classes.dateCreated}>
										{taskDate(task.createdAt)}
									</Grid>
									<Grid item xs zeroMinWidth>
										<Typography noWrap>{task.description}</Typography>
									</Grid>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
                  <Grid item id={task._id}>
                    <ModalForm 
                      open={open}
                      handleClose={handleClose}
                      submitAction={submitUpdate}
                      task={task}
                      button={(
                        <IconButton  
                          id={task._id} 
                          onClick={() => handleClickOpen(task._id)}
                        >
                          <EditIcon />
                        </IconButton>
                    )}
                    />
                  </Grid>
              
									<Grid item>
                   
										<FormControlLabel
											control={
												<GreenCheckbox
													id={task._id}
													checked={task.completed}
													onChange={handleChange}
													name={task._id}
												/>
											}
											label='Done'
										/>
									</Grid>
                  </div>
								</>
							</Grid>

						</Paper>
					</div>
				))
			)}
		</Container>
	);
}
