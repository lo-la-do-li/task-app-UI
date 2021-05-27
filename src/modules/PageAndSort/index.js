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
		marginBottom: '20px',
		// border: '1px solid #2b2733',
		// boxShadow: '1px 3px 12px 0px rgb(0 0 0 / 20%)',
		borderRadius: '20px',
		// background: 'linear-gradient(to bottom right, #4d4ae8, #8375d3)',
		background: '#2b2733',
		color: '#fff',
		// color: '#2b2733',
		[theme.breakpoints.down('900')]: {
			padding: '8px 8px',
			minWidth: 'max-content',
		},
	},
	title: {
		textAlign: 'center',
		// color: '#2b2733',
		// color: '#59565e',
		fontSize: '20px',
		fontFamily: 'Martel Sans',
		width: 'inherit',
		flexGrow: 1,
	},
}));

export default function PageAndSort({ title, sort, handleSort, tasksPerPage, totalTasks, paginate }){
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
		<Container maxWidth='xl' className={classes.pageNav}>
			<>
				<ScheduleIcon />
				{sort === 'desc' ? (
					<IconButton
						style={{ padding: '0px 8px 0px 4px' }}
						onClick={() => handleSort('asc', title)}
					>
						<KeyboardArrowUpIcon style={{ fill: '#fff' }} />
					</IconButton>
				) : (
					<IconButton
						style={{ padding: '0px 8px 0px 4px' }}
						onClick={() => handleSort('desc', title)}
					>
						<KeyboardArrowDownIcon style={{ fill: '#fff' }} />
					</IconButton>
				)}
			</>
			<h3 className={classes.title}>{title}</h3>

			{number === 1 ? (
				<IconButton
					style={{ padding: '8px' }}
					onClick={handlePageDown}
					disabled
				>
					<NavigateBeforeIcon style={{ fill: '#888892' }} />
				</IconButton>
			) : (
				<IconButton style={{ padding: '8px' }} onClick={handlePageDown}>
					<NavigateBeforeIcon style={{ fill: '#fff' }} />
				</IconButton>
			)}
			<span style={{ fontFamily: 'Martel Sans' }}>{number}</span>

			{number === getAllPages().length ? (
				<IconButton style={{ padding: '8px' }} onClick={handlePageUp} disabled>
					<NavigateNextIcon style={{ fill: '#888892' }} />
				</IconButton>
			) : (
				<IconButton style={{ padding: '8px' }} onClick={handlePageUp}>
					<NavigateNextIcon style={{ fill: '#fff' }} />
				</IconButton>
			)}
		</Container>
	);
}
