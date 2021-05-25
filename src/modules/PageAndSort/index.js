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
		boxShadow: '1px 3px 12px 0px rgb(0 0 0 / 20%)',
		borderRadius: '20px',
	},
	title: {
		textAlign: 'center',
		color: '#2b2733',
    // color: '#59565e',
    fontSize: '20px',
		fontFamily: 'Martel Sans',
    // fontWeight: 600,
		flexGrow: 1,
	},
}));

export default function PageAndSort({ title, tasks, sort, handleSort, tasksPerPage, totalTasks, paginate }){
	const classes = useStyles();
  const [allPages, setAllPages] = useState([])
  const [number, setNumber] = useState(1)
  
  useEffect(() => {
    setAllPages(getAllPages())
  }, [number])

  const getAllPages = () => {
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
			pageNumbers.push(i);
		}
    console.log(pageNumbers)
    return pageNumbers
  }

  const handlePageUp = () => {
    let pages = getAllPages()
    if (number !== pages.length) {
      setNumber(number +1)
      return paginate(number+1);
    } else {
      return
    }
  
  }
    const handlePageDown = () => {
      if (number > 1) {
				setNumber(number - 1);
				return paginate(number - 1);
			} else {
				return;
			}
		};

	return (
		<Container className={classes.pageNav}>
			<>
				<ScheduleIcon />
				{sort === 'desc' ? (
					<IconButton onClick={() => handleSort('asc', title)}>
						<KeyboardArrowUpIcon style={{ fill: '#6a6874' }} />
					</IconButton>
				) : (
					<IconButton onClick={() => handleSort('desc', title)}>
						<KeyboardArrowDownIcon style={{ fill: '#6a6874' }} />
					</IconButton>
				)}
			</>
			<h3 className={classes.title}>{title}</h3>

			<div key={number}>
				{number === 1 ? (
					<IconButton onClick={handlePageDown} disabled>
						<NavigateBeforeIcon />
					</IconButton>
				) : (
					<IconButton onClick={handlePageDown}>
						<NavigateBeforeIcon style={{ fill: '#6a6874' }} />
					</IconButton>
				)}
				{number}
				{number === getAllPages().length ? (
					<IconButton onClick={handlePageUp} disabled>
						<NavigateNextIcon />
					</IconButton>
				) : (
					<IconButton onClick={handlePageUp}>
						<NavigateNextIcon style={{ fill: '#6a6874' }} />
					</IconButton>
				)}
			</div>
		</Container>
	);
}
