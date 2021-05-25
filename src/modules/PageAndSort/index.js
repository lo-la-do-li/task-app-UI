import React, { useState, useEffect } from 'react';
// import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ScheduleIcon from '@material-ui/icons/Schedule';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles } from '@material-ui/core/styles';

// import taskAPI from '../../api/task';

const useStyles = makeStyles((theme) => ({
	pageNav: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: '40px',
    maxWidth: 460,
    marginBottom: '20px',
		border: '1px solid white',
		boxShadow: '-1px 2px 2px rgb(0 0 0 / 20%)',
		background: 'white',
		borderRadius: '20px',
	},
	title: {
		textAlign: 'center',
		color: '#2b2733',
		fontFamily: 'Lato',
    flexGrow: 1
	},
}));

export default function Paginate({ title, tasks, handleSort }){
const classes = useStyles()

return (
	<Container className={classes.pageNav}>
		<>
			<IconButton onClick={() => handleSort('asc', title)}>
				<KeyboardArrowUpIcon style={{ fill: '#021448a6' }} />
			</IconButton>
      <ScheduleIcon />
			<IconButton onClick={() => handleSort('desc', title)}>
				<KeyboardArrowDownIcon style={{ fill: '#021448a6' }} />
			</IconButton>
		</>
		<h2 className={classes.title}>{title}</h2>
		{tasks.length > 2 && (
			<>
				<IconButton onClick={() => console.log('Previous Page')}>
					<NavigateBeforeIcon style={{ fill: '#021448a6' }} />
				</IconButton>
      
				<IconButton onClick={() => console.log('Next Page')}>
					<NavigateNextIcon style={{ fill: '#021448a6' }} />
				</IconButton>
			</>
		)}
	</Container>
);
}
