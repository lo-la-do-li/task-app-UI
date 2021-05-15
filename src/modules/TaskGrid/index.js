import React from 'react';
import Paper from '@material-ui/core/Paper';
import { green, grey } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { taskDate } from '../../utils';

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
		// margin: '-8px 0px -8px -8px',
		// padding: '8px',
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
		checked: false,
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
								<Grid item className={classes.dateCreated}>
									{/* {convertDate(task.createdAt)} */}
									{taskDate(task.createdAt)}
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
			))}
		</>
	);
}
