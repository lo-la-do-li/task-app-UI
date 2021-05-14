// import React, { useState, useContext, useEffect } from 'react';
// import AppContext from '../../common/context';
// import TaskCard from './TaskCard';
// import './Task.css';
// const TaskGrid = ({ tasks }) => {
// 	const [state, dispatch] = useContext(AppContext);
// 	const taskCards = tasks.map((task) => {
// 		return (
// 			<TaskCard
// 				id={task._id}
// 				completed={task.completed}
// 				description={task.description}
// 				createdAt={task.createdAt}
// 				key={task._id}
// 			/>
// 		);
// 	});
// 	return <section className='task-container'>{taskCards}</section>;
// };

// export default TaskGrid;
import React from 'react';
import Paper from '@material-ui/core/Paper';
import { green } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

export default function TaskGrid({ tasks }) {
	const classes = useStyles();
	const [state, setState] = React.useState({
		checked: true,
	});
	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	return (
		<>
			{tasks.map((task) => (
				<div className={classes.root}>
					<Paper className={classes.paper}>
						<Grid container wrap='nowrap' spacing={2}>
							<>
								<Grid item>
									<Avatar>T</Avatar>
								</Grid>
								<Grid item xs zeroMinWidth>
									<Typography noWrap>{task.description}</Typography>
								</Grid>
								<Grid item>
									<FormControlLabel
										control={
											<GreenCheckbox
												checked={state.checked}
												onChange={handleChange}
												name='checked'
											/>
										}
										label='Did it!'
									/>
								</Grid>
							</>
						</Grid>
					</Paper>
				</div>
			))}
		</>
	);
}
