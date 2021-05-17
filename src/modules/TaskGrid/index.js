import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { green, grey } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

export default function TaskGrid({ tasks, getTasks, token }) {
	const classes = useStyles();
	const [checked, setChecked] = useState(false);
	const [completed, setCompleted] = useState({
		checked: false,
	});

	// const handleChange = (event) => {
	// 	console.log(event.target.name);
	// 	setCompleted({ ...completed, [event.target.name]: event.target.checked });
	// };

	const handleChange = async (event) => {
		let taskId = event.target.name;
		let checked = event.target.checked;

		let updates = {
			completed: checked,
		};

		await taskAPI.updateTask(token, taskId, updates).then((res) => {
			console.log(res);
			if (res.completed) {
				event.target.checked = true;
			} else if (!res.completed) {
				event.target.checked = false;
			}
			return getTasks();
		});
	};
	return (
		<>
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
											label='Did it!'
										/>
									</Grid>
								</>
							</Grid>
						</Paper>
					</div>
				))
			)}
		</>
	);
}
