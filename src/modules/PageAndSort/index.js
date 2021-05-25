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
		background: '#eae8ec',
		// background: '#2b2733',
		borderRadius: '20px',
	},
	title: {
		textAlign: 'center',
		color: '#2b2733',
		fontFamily: 'Lato',
		flexGrow: 1,
	},
}));

export default function PageAndSort({ title, tasks, handleSort, tasksPerPage, totalTasks, paginate }){
	const classes = useStyles();
  const [allPages, setAllPages] = useState([])
  const [number, setNumber] = useState(1)
  
  useEffect(() => {
    getAllPages()
    // return setNumber([allPages[0]])
  }, [])

  const getAllPages = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
			return pageNumbers.push(i);
		}
    console.log(pageNumbers)
    return setAllPages(pageNumbers)
    
  }

  const handlePageUp = () => {
    
      setNumber(number +1)
  
    return paginate(number+1, 'next');
  }
    const handlePageDown = () => {
			setNumber(number -1);
			return paginate(number-1, 'previous');
		};

	// alt fill color: #021448a6
	return (
		<Container className={classes.pageNav}>
			<>
				<IconButton onClick={() => handleSort('asc', title)}>
					<KeyboardArrowUpIcon style={{ fill: '#2b2733' }} />
				</IconButton>
				<ScheduleIcon />
				<IconButton onClick={() => handleSort('desc', title)}>
					<KeyboardArrowDownIcon style={{ fill: '#2b2733' }} />
				</IconButton>
			</>
			<h3 className={classes.title}>{title}</h3>
			{/* {tasks.length > 2 && ( */}
			{/* {pageNumbers.map((number) => ( */}
				<div key={number}>
					<IconButton onClick={handlePageDown}>
						<NavigateBeforeIcon style={{ fill: '#2b2733' }} />
					</IconButton>
					{number}
					<IconButton onClick={handlePageUp}>
						<NavigateNextIcon style={{ fill: '#2b2733' }} />
					</IconButton>
				</div>
			{/* ))} */}
			{/* )} */}
		</Container>
	);
}
