import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
// import Container from '@material-ui/core/Container';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// App Imports
import TaskForm from '../../ui/modal/TaskForm';
import { getDate } from '../../utils';
import taskAPI from '../../api/task';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		overflow: 'hidden',
		[theme.breakpoints.down('900')]: {
			padding: '0',
		},
	},
	paper: {
		// maxWidth: 460,
		fontFamily: 'Source Sans Pro',
		border: '1px solid white',
		backgroundColor: '#fffcfc',
		// margin: `${theme.spacing(1)}px auto`,
		margin: '10px 3px 10px 3px',
		padding: theme.spacing(2),
		// padding: '16px, 8px, 16px, 8px',
		borderRadius: '20px',
		boxShadow: '-1px 2px 4px 1px rgb(0 0 0 / 20%)',
	},
	dateCreated: {
		// color: '#888892',
		color: '#201f31ab',
		width: '60px',
		borderRight: '1.75px solid #d9d5ed',
		marginRight: '5px',
	},
	dateBox: {
		display: 'flex',
		justifyItems: 'space-between',
		flexDirection: 'column',
		marginLeft: '-8px',
		textAlign: 'center',
		fontSize: '18px',
	},
	description: {
		display: '-webkit-box',
		boxOrient: 'vertical',
		color: '#2B2733',
		// color: '#201f31ab',
		fontSize: '18px',
		fontFamily: 'Source Sans Pro',
		lineClamp: 3,
		overflow: 'hidden',
	},
	deleteBtn: {
		padding: '8px 12px 0px 12px',
		'&:hover': {
			transform: 'translateY(-5%)',
			// color: 'linear-gradient(to bottom right, #4d4ae8, #8375d3)',
			background: 'transparent',
		},
	},
}));

const CustomCheckBox = withStyles({
	root: {
		color: '#4d4ae8',
		'&$checked': {
			color: '#4d4ae8',
		},
	},
	checked: {},
})((props) => <Checkbox color='default' {...props} />);

const TaskCard = ({ id, task, completed, description, createdAt, updateTaskGrids }) => {
  const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [taskEdit, setTaskEdit] = useState(null);

    const handleClickOpen = (task) => {
			setTaskEdit(task);
			setOpen(true);
		};

		const handleClose = () => {
			setTaskEdit(null);
			setOpen(false);
		};

		const handleChange = async (e) => {
			let taskId = e.target.name;
			let checked = e.target.checked;

			let updates = {
				completed: checked,
			};

			await taskAPI.updateTask(taskId, updates).then((res) => {
				return updateTaskGrids();
			});
		};

		const submitUpdate = async (e, update, taskId) => {
			e.preventDefault();
			let updates = {
				description: update,
			};
			await taskAPI.updateTask(taskId, updates).then((res) => {
				return updateTaskGrids();
			});
			setTaskEdit(null);
			setOpen(false);
		};

	return (
		<div key={id} className={classes.root}>
			<Paper className={classes.paper}>
				<Grid container wrap='nowrap' spacing={2}>
          <div style={{padding: '5px 0px 0px 0px'}}>
					<Grid item className={classes.dateCreated}>
						<div className={classes.dateBox}>
							<span>{getDate(createdAt)[0].toUpperCase()}</span>
							<span style={{ fontSize: 20 }}>{getDate(createdAt)[1]}</span>
							<Grid item style={{ alignSelf: 'center' }}>
								<CustomCheckBox
									id={id}
									checked={completed}
									onChange={handleChange}
									name={id}
								/>
							</Grid>
				
						</div>
					</Grid>
          </div>
					<Grid item xs zeroMinWidth>
						<Typography className={classes.description}>
							{description}
						</Typography>
					</Grid>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							flexDirection: 'column',
						}}
					>
						<Grid item id={id}>
							<TaskForm
								open={open}
								handleClose={handleClose}
								create={false}
								task={taskEdit}
								submitAction={submitUpdate}
								button={
									<IconButton id={id} onClick={() => handleClickOpen(task)}>
										<EditIcon style={{ fill: '#888892' }} />
									</IconButton>
								}
							/>
						</Grid>

						<Grid item id={id}>
							<IconButton
								id={id}
								onClick={() => console.log('delete Task:', task)}
								disableRipple
							>
								<DeleteIcon
									// previous fill: #201f31ab
									style={{
										fill: '#888892',
									}}
								/>
							</IconButton>
						</Grid>
					</div>
				</Grid>
			</Paper>
		</div>
	);
};

export default TaskCard;
